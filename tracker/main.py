"""
Minimal visitor-tracking backend for the portfolio.

  POST /track    called by the portfolio on page load (fire-and-forget)
  GET  /summary  last-24h stats, protected by a secret token header
  GET  /health   liveness ping (handy for warming the free-tier dyno)

Storage is Supabase Postgres via the supabase-py client (PostgREST over
HTTP) — no ORM, no connection string. GeoIP + the DB write happen in a
background task so the visitor's request returns immediately.
"""

import os
from collections import Counter
from datetime import datetime, timedelta, timezone

import httpx
from fastapi import BackgroundTasks, FastAPI, Header, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import Client, create_client
from user_agents import parse as parse_ua

# --------------------------------------------------------------------------- #
# Config (all from environment — see .env.example)
# --------------------------------------------------------------------------- #
SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_KEY"]  # service-role key, server-side only
SUMMARY_TOKEN = os.environ["SUMMARY_TOKEN"]        # secret for GET /summary
# Comma-separated list of allowed browser origins, e.g.
# "https://aastha-malik-portfolio.onrender.com,http://localhost:3000"
ALLOWED_ORIGINS = [
    o.strip() for o in os.environ.get("ALLOWED_ORIGINS", "").split(",") if o.strip()
]
TABLE = "portfolio_visits"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI(title="portfolio-tracker", docs_url=None, redoc_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,   # only the portfolio may call us from a browser
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["Content-Type"],
    max_age=86400,                   # cache the preflight for a day
)

# Substrings that mark an obvious crawler/monitor when the UA parser misses it.
BOT_TOKENS = (
    "bot", "crawl", "spider", "slurp", "bingpreview", "facebookexternalhit",
    "embedly", "quora link preview", "pinterest", "developers.google.com",
    "headless", "phantomjs", "python-requests", "python-httpx", "go-http-client",
    "curl", "wget", "axios", "node-fetch", "libwww", "lighthouse",
    "uptimerobot", "pingdom", "statuscake", "ahrefs", "semrush", "dataprovider",
)


class TrackPayload(BaseModel):
    path: str = "/"
    referrer: str | None = None
    src: str | None = None  # the ?src= UTM param — the field that matters most


def client_ip(request: Request) -> str:
    """First hop in X-Forwarded-For (Render sits behind a proxy), else peer."""
    xff = request.headers.get("x-forwarded-for", "")
    if xff:
        return xff.split(",")[0].strip()
    return request.client.host if request.client else ""


def is_bot(ua_string: str) -> bool:
    if not ua_string.strip():
        return True  # no UA at all → treat as a bot/probe, don't store
    low = ua_string.lower()
    if any(tok in low for tok in BOT_TOKENS):
        return True
    try:
        return parse_ua(ua_string).is_bot
    except Exception:
        return False


def geo_lookup(ip: str) -> tuple[str | None, str | None]:
    """Free GeoIP via ip-api.com. Returns (city, country); None on any failure."""
    if not ip:
        return None, None
    try:
        r = httpx.get(
            f"http://ip-api.com/json/{ip}",
            params={"fields": "status,country,city"},
            timeout=4.0,
        )
        data = r.json()
        if data.get("status") == "success":
            return data.get("city") or None, data.get("country") or None
    except Exception:
        pass
    return None, None


def store_visit(ip: str, ua_string: str, payload: TrackPayload) -> None:
    """Runs in a background thread AFTER the response is sent."""
    ua = parse_ua(ua_string)
    if ua.is_mobile:
        device = "mobile"
    elif ua.is_tablet:
        device = "tablet"
    elif ua.is_pc:
        device = "desktop"
    else:
        device = "other"

    city, country = geo_lookup(ip)  # slow bit — fine, we're off the response path

    row = {
        "ip": ip or None,
        "user_agent": ua_string[:512] or None,
        "os": (ua.os.family or None),
        "browser": (ua.browser.family or None),
        "device": device,
        "city": city,
        "country": country,
        "referrer": (payload.referrer or None),
        "path": payload.path or "/",
        "src": (payload.src or None),
        # created_at is filled by the DB default (now() in UTC)
    }
    try:
        supabase.table(TABLE).insert(row).execute()
    except Exception as exc:  # never crash a background task
        print(f"[track] insert failed: {exc}", flush=True)


@app.post("/track")
async def track(
    payload: TrackPayload,
    request: Request,
    background: BackgroundTasks,
) -> Response:
    ua_string = request.headers.get("user-agent", "")
    if is_bot(ua_string):
        return Response(status_code=204)  # skip crawlers silently

    ip = client_ip(request)
    # Schedule the slow work (GeoIP + insert) and return immediately.
    background.add_task(store_visit, ip, ua_string, payload)
    return Response(status_code=204)


@app.get("/summary")
def summary(x_admin_token: str = Header(default="")) -> dict:
    if x_admin_token != SUMMARY_TOKEN:
        raise HTTPException(status_code=401, detail="unauthorized")

    since = datetime.now(timezone.utc) - timedelta(hours=24)
    rows = (
        supabase.table(TABLE)
        .select("ip,src,country,path,device,created_at")
        .gte("created_at", since.isoformat())
        .execute()
        .data
    ) or []

    by_src = Counter((r.get("src") or "direct") for r in rows)
    by_country = Counter(r["country"] for r in rows if r.get("country"))
    by_path = Counter((r.get("path") or "/") for r in rows)
    by_device = Counter((r.get("device") or "other") for r in rows)

    def top(counter: Counter, n: int = 8) -> dict:
        return dict(counter.most_common(n))

    return {
        "window_hours": 24,
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "total_visits": len(rows),
        "unique_ips": len({r["ip"] for r in rows if r.get("ip")}),
        "by_src": top(by_src),
        "top_countries": top(by_country),
        "top_pages": top(by_path),
        "by_device": dict(by_device),
    }


@app.get("/health")
def health() -> dict:
    return {"ok": True}
