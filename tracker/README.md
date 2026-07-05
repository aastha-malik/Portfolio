# portfolio-tracker

Tiny FastAPI service that records portfolio visits in Supabase.

## Endpoints
- `POST /track` — called by the site on page load. Fire-and-forget, returns `204`.
- `GET /summary` — last-24h stats. Requires header `X-Admin-Token: <SUMMARY_TOKEN>`.
- `GET /health` — liveness ping.

## Run locally
```bash
cd tracker
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # fill in the values
set -a && source .env && set +a
uvicorn main:app --reload --port 8000
```

Smoke test:
```bash
curl -s -X POST localhost:8000/track \
  -H 'content-type: application/json' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' \
  -H 'x-forwarded-for: 8.8.8.8' \
  -d '{"path":"/","src":"resume","referrer":"https://linkedin.com"}' -i

curl -s localhost:8000/summary -H "X-Admin-Token: $SUMMARY_TOKEN" | python -m json.tool
```

## Deploy
See the "Deployment" section of the main hand-off notes. One-time DB setup:
run `schema.sql` in the Supabase SQL editor.
