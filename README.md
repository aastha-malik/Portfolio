# Aastha Malik — Portfolio

A minimal, dark-themed developer portfolio built with Next.js 16, TypeScript, Tailwind CSS 4, and Framer Motion.

**[Live Site →](https://aastha-malik-portfolio.onrender.com/)**

---

## About

This portfolio showcases my work as a backend developer — featuring selected projects, my DSA journey, tech stack, resume, and contact info. The UI follows an interactive card-based layout where each section opens as a detailed modal, keeping the landing page clean and focused.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Static Export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Deployment:** Render (Static Site)

## Features

- Dark-themed, responsive design
- Interactive modal-based navigation — sections expand on click
- Smooth page transitions and animations with Framer Motion
- Static export for fast load times and easy hosting
- Mobile-friendly layout

## Projects Featured

- **Chikitsa Cloud** — A full-stack healthcare records management platform with 35 REST API endpoints, OAuth2, JWT auth, QR code scanning, and OpenStreetMap integration. Built with Python, FastAPI, PostgreSQL, and Supabase.

- **Blossom** — A gamified task management platform with streaks, XP/points, rewards, and multi-method authentication. Built with Python, FastAPI, PostgreSQL, and deployed on Render.

## Getting Started

```bash
# Clone the repo
git clone https://github.com/aastha-malik/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Build & Deploy

```bash
# Build for static export
npm run build

# Output directory: out/
```

Deployed on Render as a static site. The `next.config.ts` includes:

```ts
output: 'export',
images: { unoptimized: true }
```

## Project Structure

```
├── app/            # Next.js App Router pages & layouts
├── components/     # Reusable UI components
├── data/           # Project data, content, and config
├── public/         # Static assets (images, resume, etc.)
├── next.config.ts  # Next.js configuration
├── tsconfig.json   # TypeScript config
└── package.json
```

## Contact

- **GitHub:** [aastha-malik](https://github.com/aastha-malik)
- **LinkedIn:** [Aastha Malik](https://www.linkedin.com/in/aastha-malik-/)

---

Built with ☕ and Next.js
