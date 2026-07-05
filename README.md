# Aastha Malik — Portfolio

A minimal, dark-themed developer portfolio built with Next.js 16, TypeScript,
Tailwind CSS 4, and Framer Motion. The landing page is an interactive **bento
grid** — each tile expands into a detailed panel, keeping the surface clean and
letting visitors drill into only what interests them.

**[Live Site →](https://aastha-malik-portfolio.onrender.com/)**

---

## About

I'm a backend developer. This portfolio presents my experience, selected
projects, tech stack, DSA profile, resume, and contact links. Everything on the
page is driven from a single typed content file ([`data/content.ts`](data/content.ts)),
so updating the site is a data edit rather than a markup change.

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Analytics:** self-hosted FastAPI + Supabase visitor tracker (see below)
- **Deployment:** Render (static site)

## Features

- **Bento-grid layout** — hand-tuned tile spans; click any tile to expand it
  into a full detail panel
- Dark-themed, fully responsive, mobile-friendly design
- Smooth expand/collapse transitions and page animations via Framer Motion
- **Data-driven** — all content lives in one typed `content.ts`; no hardcoded
  copy in components
- **Static export** for fast loads and cheap hosting
- **Privacy-light visitor analytics** — a fire-and-forget beacon reports page
  views to a self-hosted backend (no third-party trackers, no cookies)

## Featured Projects

Pulled from [`data/content.ts`](data/content.ts):

- **Klipo** — multilingual subtitle & captioning engine over open-source ML
  models, with user-editable styling burned into the video via ffmpeg.
- **Tendr** — solo full-stack gamified task manager with a virtual pet: 30+ REST
  endpoints, server-enforced XP, dual auth (email/OTP + Google OAuth2). Launched
  to #66 on Product Hunt.
- **Video Object Remover** — click-to-remove pipeline (SAM2 → ProPainter →
  ffmpeg) with SSE/WebSocket progress streaming, deployed on Hugging Face Spaces.
- **Chikitsa Cloud** — healthcare backend: 35 REST endpoints, OAuth2 + JWT,
  QR-based family access control, and OpenStreetMap hospital search.
- **Face Fusion** — frame-by-frame face-swap pipeline (InsightFace → inswapper →
  GFPGAN) at ~12 fps on a T4 GPU via ONNX Runtime.

## Getting Started

```bash
git clone https://github.com/aastha-malik/Portfolio.git
cd Portfolio

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

To change any content — projects, experience, tech stack, contact links —
edit [`data/content.ts`](data/content.ts); no component changes needed.

## Build & Deploy

```bash
npm run build      # static export → out/
```

Deployed on Render as a static site. [`next.config.ts`](next.config.ts) sets:

```ts
output: 'export',
images: { unoptimized: true }
```

## Project Structure

```
├── app/                # Next.js App Router — layout, page, global styles
│   ├── layout.tsx      # root layout (mounts the visitor Tracker)
│   └── page.tsx        # single-page bento grid
├── components/
│   ├── GridLayout.tsx    # the bento grid + tile spans
│   ├── Tile.tsx          # individual clickable tile
│   ├── ExpandedPanel.tsx # expanded detail panel
│   └── Tracker.tsx       # invisible visitor-analytics beacon
├── data/
│   └── content.ts      # single source of truth for all page content
├── public/             # static assets (profile image, resume PDF, previews)
├── scripts/
│   └── digest.py       # daily email digest of visitor stats
├── tracker/            # FastAPI + Supabase visitor-tracking backend
├── .github/workflows/  # daily digest cron (GitHub Actions)
├── next.config.ts
└── package.json
```

## Visitor Analytics

The site includes a small, self-hosted analytics loop — no third-party scripts,
no cookies:

```
Browser (Tracker.tsx) ──▶ FastAPI (tracker/) ──▶ Supabase
                                    ▲
GitHub Actions (daily) ─────────────┘──▶ scripts/digest.py ──▶ email digest
```

- [`components/Tracker.tsx`](components/Tracker.tsx) fires a fire-and-forget
  beacon on page load, tagging the `?src=` share parameter.
- [`tracker/`](tracker/) is a FastAPI service that enriches each hit (GeoIP,
  device, bot filtering) and stores it in Supabase — see
  [`tracker/README.md`](tracker/README.md).
- A daily GitHub Actions cron runs [`scripts/digest.py`](scripts/digest.py) to
  email a 24-hour summary.

## Contact

- **Email:** aasthamalik.work@gmail.com
- **GitHub:** [aastha-malik](https://github.com/aastha-malik)
- **LinkedIn:** [aastha-malik-](https://www.linkedin.com/in/aastha-malik-/)
- **Twitter / X:** [aastha__malik](https://x.com/aastha__malik)
- **Hugging Face:** [aastha-malik](https://huggingface.co/aastha-malik)

---

Built with ☕ and Next.js
