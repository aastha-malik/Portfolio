"use client";

import { useEffect } from "react";

// Set this in the Render static-site env as NEXT_PUBLIC_TRACKER_URL, or just
// replace the placeholder below once the backend is deployed. It's baked in at
// build time (static export), so changing it means a rebuild.
const TRACKER_URL =
  process.env.NEXT_PUBLIC_TRACKER_URL ?? "https://portfolio-tracker.onrender.com";

// Module-scoped guard: survives React 19 StrictMode's mount→unmount→remount
// (a useRef would be recreated on remount). Keyed by path so each distinct
// page view fires at most once.
const tracked = new Set<string>();

function sendHit() {
  if (typeof window === "undefined") return;

  const { pathname, search } = window.location;
  if (tracked.has(pathname)) return;
  tracked.add(pathname);

  const params = new URLSearchParams(search);
  const src = params.get("src") ?? params.get("utm_source"); // ?src= is what we tag with

  // fire-and-forget: keepalive survives navigation, and any failure (incl. the
  // ~30s free-tier cold start) is swallowed so the page is never affected.
  try {
    fetch(`${TRACKER_URL}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || null,
        src,
      }),
      keepalive: true,
      cache: "no-store",
    }).catch(() => {});
  } catch {
    /* never let tracking throw into the app */
  }
}

/** Invisible component. Mount once (e.g. in the root layout). Renders nothing. */
export default function Tracker() {
  useEffect(() => {
    sendHit();
  }, []);
  return null;
}
