# portfolio-tracker

A tiny FastAPI service that records portfolio page visits in Supabase and
serves a 24-hour summary. It's the backend half of a small analytics loop:

```
 Browser (Tracker.tsx)  ──POST /track──▶  FastAPI  ──insert──▶  Supabase
                                             │                  (portfolio_visits)
 GitHub Actions (daily) ──GET /summary──────▶│
        │                                    ▼
        └────────── scripts/digest.py ──▶ Gmail digest email
```

- The site fires a fire-and-forget beacon on page load ([`components/Tracker.tsx`](../components/Tracker.tsx)).
- The backend enriches each hit (GeoIP, device/OS/browser, bot filtering) in a
  background task and writes one row to Supabase.
- A daily GitHub Actions cron ([`scripts/digest.py`](../scripts/digest.py))
  calls `/summary` and emails a plain-text report.

Bots are dropped, and the slow work (GeoIP + DB write) runs *after* the
response is sent, so `/track` returns `204` almost instantly.

## Endpoints

| Method | Path       | Auth                          | Purpose                                             |
| ------ | ---------- | ----------------------------- | --------------------------------------------------- |
| `POST` | `/track`   | none (CORS-restricted origin) | Record a visit. Fire-and-forget, returns `204`.     |
| `GET`  | `/summary` | `X-Admin-Token: <SUMMARY_TOKEN>` | Last-24h stats as JSON.                          |
| `GET`  | `/health`  | none                          | Liveness ping (also warms the free-tier dyno).      |

`POST /track` body (all fields optional):

```json
{ "path": "/", "referrer": "https://linkedin.com", "src": "resume" }
```

`src` is the `?src=` UTM value the site is shared with (e.g. `resume`,
`linkedin`, `colddm`) — the field that matters most for attribution.

`GET /summary` response shape:

```json
{
  "window_hours": 24,
  "generated_at_utc": "2026-07-05T16:30:00+00:00",
  "total_visits": 12,
  "unique_ips": 9,
  "by_src": { "resume": 5, "direct": 4, "linkedin": 3 },
  "top_countries": { "India": 7, "United States": 3 },
  "top_pages": { "/": 12 },
  "by_device": { "desktop": 8, "mobile": 4 }
}
```

## Configuration

All config comes from environment variables (see [`.env.example`](.env.example)):

| Variable               | Required | Description                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------ |
| `SUPABASE_URL`         | yes      | Supabase project URL (Project Settings → API).                     |
| `SUPABASE_SERVICE_KEY` | yes      | **Service-role** key — bypasses RLS. Server-side only, never ship. |
| `SUMMARY_TOKEN`        | yes      | Long random secret guarding `GET /summary`.                        |
| `ALLOWED_ORIGINS`      | no       | Comma-separated browser origins allowed to call `/track`.          |

Generate a token with:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

## Database setup (one time)

Run [`schema.sql`](schema.sql) in the Supabase SQL editor
(Dashboard → SQL Editor → New query). It creates the `public.portfolio_visits`
table plus indexes on `created_at` and `src`, and enables Row Level Security
with **no policies** — so only the service-role key can read or write, and the
public anon key can't touch the table. Timestamps are stored in UTC.

## Run locally

```bash
cd tracker
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # then fill in the values
set -a && source .env && set +a
uvicorn main:app --reload --port 8000
```

Smoke test:

```bash
# should return 204 and (a moment later) insert one row
curl -s -X POST localhost:8000/track \
  -H 'content-type: application/json' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' \
  -H 'x-forwarded-for: 8.8.8.8' \
  -d '{"path":"/","src":"resume","referrer":"https://linkedin.com"}' -i

curl -s localhost:8000/summary -H "X-Admin-Token: $SUMMARY_TOKEN" | python -m json.tool
```

## Deploy (Render)

Deployed as a free-tier Render **web service**. Either commit
[`render.yaml`](render.yaml) and use Render's Blueprint flow, or create the
service by hand with equivalent settings:

| Setting          | Value                                             |
| ---------------- | ------------------------------------------------- |
| Root directory   | `tracker`                                         |
| Build command    | `pip install -r requirements.txt`                 |
| Start command    | `uvicorn main:app --host 0.0.0.0 --port $PORT`    |
| Health check     | `/health`                                         |

Set `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `SUMMARY_TOKEN`, and
`ALLOWED_ORIGINS` in the service's **Environment** tab (they're `sync: false`
in the blueprint, so they're never stored in git).

> **Free-tier note:** the dyno sleeps after inactivity and cold-starts take
> ~30s. The frontend beacon uses `keepalive` and swallows failures, and the
> digest script retries, so a cold start is invisible to visitors.

## Daily email digest

[`scripts/digest.py`](../scripts/digest.py) (stdlib-only, no `pip install`)
fetches `/summary` and emails a report via Gmail SMTP. It's run by the
[`digest.yml`](../.github/workflows/digest.yml) GitHub Actions workflow on a
cron (`30 16 * * *` UTC = 22:00 IST) and can also be triggered manually from
the Actions tab.

Required GitHub Actions **secrets**:

| Secret               | Description                                          |
| -------------------- | --------------------------------------------------- |
| `TRACKER_URL`        | Deployed base URL, e.g. `https://portfolio-tracker.onrender.com` |
| `SUMMARY_TOKEN`      | Must match the backend's `SUMMARY_TOKEN`.           |
| `GMAIL_USER`         | Sending Gmail address.                              |
| `GMAIL_APP_PASSWORD` | A Gmail **App Password** (not the account password). |
| `DIGEST_TO`          | Recipient (defaults to `GMAIL_USER`).               |

## Files

| File               | Purpose                                          |
| ------------------ | ------------------------------------------------ |
| `main.py`          | FastAPI app: routes, bot filter, GeoIP, DB write. |
| `schema.sql`       | Supabase table + indexes + RLS lockdown.         |
| `render.yaml`      | Render Blueprint for the web service.            |
| `requirements.txt` | Python dependencies.                             |
| `.env.example`     | Template for local environment variables.        |
