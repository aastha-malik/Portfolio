"""
Daily portfolio-visit digest.

Calls the tracker's /summary endpoint and emails a short plain-text report
via Gmail SMTP. Uses only the Python standard library, so GitHub Actions
needs no `pip install` step.

Environment (provided as GitHub Actions secrets):
    TRACKER_URL          e.g. https://portfolio-tracker.onrender.com
    SUMMARY_TOKEN        must match the backend's SUMMARY_TOKEN
    GMAIL_USER           the Gmail address that sends the mail
    GMAIL_APP_PASSWORD   a Gmail App Password (not your normal password)
    DIGEST_TO            recipient (defaults to GMAIL_USER)
"""

import json
import os
import smtplib
import ssl
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage

IST = timezone(timedelta(hours=5, minutes=30))


def fetch_summary(url: str, token: str) -> dict:
    """GET /summary, retrying to ride out the free-tier cold start (~30s)."""
    req = urllib.request.Request(
        f"{url.rstrip('/')}/summary",
        headers={"X-Admin-Token": token},
    )
    last_err: Exception | None = None
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=90) as resp:
                return json.loads(resp.read().decode())
        except Exception as exc:  # noqa: BLE001 - retry on anything (cold start, timeout)
            last_err = exc
            print(f"attempt {attempt + 1} failed: {exc}", file=sys.stderr)
            time.sleep(10)
    raise SystemExit(f"could not reach /summary after retries: {last_err}")


def block(title: str, counts: dict, empty: str = "  (none)") -> str:
    """Render a dict of {label: count} as an aligned plain-text block."""
    if not counts:
        return f"{title}\n{empty}"
    width = max(len(str(k)) for k in counts)
    lines = [f"  {str(k).ljust(width)}  {v}" for k, v in counts.items()]
    return title + "\n" + "\n".join(lines)


def build_email(data: dict) -> tuple[str, str]:
    total = data.get("total_visits", 0)
    unique = data.get("unique_ips", 0)
    now_ist = datetime.now(IST)
    day = now_ist.strftime("%d %b")

    if total == 0:
        subject = f"Portfolio · no visits today ({day})"
        body = (
            "Your portfolio wasn't opened in the last 24 hours.\n\n"
            f"— sent {now_ist.strftime('%d %b %Y, %H:%M IST')}"
        )
        return subject, body

    by_src = data.get("by_src", {})
    src_bits = ", ".join(f"{n} from {s}" for s, n in by_src.items())
    subject = f"Portfolio · {total} visit{'s' if total != 1 else ''} today ({day})"

    body = "\n\n".join(
        [
            f"Your portfolio was opened {total} time{'s' if total != 1 else ''} "
            f"in the last 24h ({unique} unique visitor{'s' if unique != 1 else ''})."
            + (f"\n{src_bits}." if src_bits else ""),
            block("By source", by_src),
            block("Top countries", data.get("top_countries", {})),
            block("Devices", data.get("by_device", {})),
            block("Top pages", data.get("top_pages", {})),
            f"— sent {now_ist.strftime('%d %b %Y, %H:%M IST')}",
        ]
    )
    return subject, body


def send_email(subject: str, body: str) -> None:
    user = os.environ["GMAIL_USER"]
    password = os.environ["GMAIL_APP_PASSWORD"]
    to = os.environ.get("DIGEST_TO", user)

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = user
    msg["To"] = to
    msg.set_content(body)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=ssl.create_default_context()) as smtp:
        smtp.login(user, password)
        smtp.send_message(msg)
    print(f"sent to {to}: {subject}")


def main() -> None:
    data = fetch_summary(os.environ["TRACKER_URL"], os.environ["SUMMARY_TOKEN"])
    subject, body = build_email(data)
    send_email(subject, body)


if __name__ == "__main__":
    main()
