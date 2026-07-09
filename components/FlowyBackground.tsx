"use client";

import { useEffect, useRef } from "react";

// Explicit ribbon layout: 1 from the left, 2 from the right, staggered so the
// single left ribbon sits vertically between the two on the right — balanced.
const RIBBONS = [
  { side: "left" as const, vy: 0.46, tilt: 0.1, color: "#ff2e8f", baseWidth: 300, speed: 0.7, drift: 70 },
  { side: "right" as const, vy: 0.22, tilt: -0.12, color: "#d63384", baseWidth: 280, speed: 1.0, drift: 60 },
  { side: "right" as const, vy: 0.74, tilt: 0.14, color: "#ff5fa8", baseWidth: 310, speed: 0.85, drift: 80 },
];

type Blob = {
  color: string;
  angle: number;
  startX: number;
  startY: number;
  length: number;
  baseWidth: number;
  speed: number;
  drift: number;
  seedsA: number[];
  seedsB: number[];
};

/**
 * Freeform flowing ribbons — diagonal streaks with independently wobbling
 * edges, blurred and screen-blended over the page background.
 * Ported from the redesign prototype's canvas blob loop.
 */
export function FlowyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Seeds stay stable across resizes so geometry recomputes without a visual jump.
    const seeds = RIBBONS.map(() => ({
      seedsA: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
      seedsB: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
    }));

    let blobs: Blob[] = [];
    let t = 0;
    let rafId = 0;

    const computeBlobs = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      blobs = RIBBONS.map((r, i) => {
        const fromLeft = r.side === "left";
        return {
          color: r.color,
          // left-emitters point inward-right; right-emitters point inward-left
          angle: fromLeft ? r.tilt : Math.PI - r.tilt,
          startX: fromLeft ? -0.15 * w : 1.15 * w,
          startY: h * r.vy,
          length: w * 1.4,
          baseWidth: r.baseWidth,
          speed: r.speed,
          drift: r.drift,
          seedsA: seeds[i].seedsA,
          seedsB: seeds[i].seedsB,
        };
      });
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      computeBlobs();
    };

    const segments = 14;

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs.forEach((b) => {
        const dx = Math.cos(b.angle);
        const dy = Math.sin(b.angle);
        const px = -dy;
        const py = dx; // perpendicular axis, for width offset
        const driftX = Math.sin(t * b.speed * 0.6) * b.drift;
        const driftY = Math.cos(t * b.speed * 0.5) * b.drift * 0.6;

        const topEdge: [number, number][] = [];
        const botEdge: [number, number][] = [];
        for (let i = 0; i <= segments; i++) {
          const f = i / segments;
          const alongX = b.startX + dx * b.length * f + driftX;
          const alongY = b.startY + dy * b.length * f + driftY;
          const widthWob = b.seedsA.reduce(
            (acc, seed, si) => acc + Math.sin(f * (si + 3) * Math.PI + t * (1.2 + si * 0.7) + seed),
            0
          );
          const centerWob = b.seedsB.reduce(
            (acc, seed, si) => acc + Math.sin(f * (si + 2) * Math.PI + t * (1.0 + si * 0.5) + seed),
            0
          );
          const width = Math.max(20, b.baseWidth * (0.5 + Math.sin(f * Math.PI)) + widthWob * 30);
          const centerShift = centerWob * 70;
          const cx = alongX + px * centerShift;
          const cy = alongY + py * centerShift;
          topEdge.push([cx + px * width, cy + py * width]);
          botEdge.push([cx - px * width, cy - py * width]);
        }

        ctx.beginPath();
        ctx.moveTo(topEdge[0][0], topEdge[0][1]);
        for (let i = 1; i < topEdge.length; i++) ctx.lineTo(topEdge[i][0], topEdge[i][1]);
        for (let i = botEdge.length - 1; i >= 0; i--) ctx.lineTo(botEdge[i][0], botEdge[i][1]);
        ctx.closePath();

        // Anchor the glow at the ribbon's emitting edge (its start) so it reads
        // as coming out of the left/right side, fading toward the center.
        const grad = ctx.createRadialGradient(
          topEdge[0][0], topEdge[0][1], 0,
          topEdge[0][0], topEdge[0][1], b.length * 0.7
        );
        grad.addColorStop(0, b.color);
        grad.addColorStop(0.45, b.color);
        grad.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    };

    const loop = () => {
      t += 0.02;
      drawFrame();
      rafId = requestAnimationFrame(loop);
    };

    resize();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      drawFrame(); // single static frame
    } else {
      loop();
    }

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="flowy-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
