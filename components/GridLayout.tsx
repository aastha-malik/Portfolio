"use client";

import { useEffect, useState } from "react";
import { ExpandedPanel } from "./ExpandedPanel";
import { content, type Project } from "@/data/content";

const techPrimary = ["Python", "FastAPI", "PostgreSQL"];
const techRest = content.techStack
  .flatMap((c) => c.items)
  .filter((i) => !techPrimary.includes(i));

type ModalState =
  | null
  | { type: "project"; data: Project }
  | { type: "dsa" }
  | { type: "resume" }
  | { type: "tech" }
  | { type: "contact" };

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

const leftRailItems = ["BACKEND","FASTAPI","POSTGRES","ML · PIPELINES","OAUTH / JWT","SHIPPING DAILY","DOCKER","OPEN TO WORK"];
const rightRailItems = ["AASTHA MALIK","PORTFOLIO · V2","2026","PYTHON","REST · WEBSOCKET","HUGGING FACE","SAM2 · PROPAINTER","SYSTEMS THINKING"];

export function GridLayout() {
  const [modal, setModal] = useState<ModalState>(null);

  // Reveal + counter animations
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = parseInt(el.dataset.delay || "0");
          setTimeout(() => {
            el.classList.add("in");
            const numEl = el.querySelector<HTMLElement>("[data-count]");
            if (numEl && !numEl.dataset.counted) {
              numEl.dataset.counted = "1";
              const target = parseFloat(numEl.dataset.count || "0");
              const suffix = numEl.dataset.suffix || "";
              const dur = 1400;
              const start = performance.now();
              const tick = (t: number) => {
                const p = Math.min(1, (t - start) / dur);
                const eased = 1 - Math.pow(1 - p, 3);
                numEl.textContent = String(Math.round(target * eased)) + suffix;
                if (p < 1) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
            }
          }, delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );

    // Stat counters
    document.querySelectorAll<HTMLElement>(".stat .num").forEach((n) => {
      const txt = n.textContent?.trim() || "";
      const m = txt.match(/^(\d+)(.*)$/);
      if (m) {
        const wrap = document.createElement("span");
        wrap.dataset.count = m[1];
        wrap.dataset.suffix = m[2];
        wrap.textContent = "0";
        n.textContent = "";
        n.appendChild(wrap);
        const parent = n.closest<HTMLElement>(".stat");
        if (parent) {
          parent.classList.add("reveal");
          io.observe(parent);
        }
      }
    });

    // Trigger hero headline reveal immediately
    document.querySelectorAll<HTMLElement>(".reveal-text").forEach((el) => {
      el.classList.add("in");
    });

    return () => io.disconnect();
  }, []);

  // Magnetic tilt + hero cursor spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>(".tile").forEach((tile) => {
        const rect = tile.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        const dist = Math.hypot(dx, dy);
        if (tile.classList.contains("hero-tile")) {
          const mx = ((e.clientX - rect.left) / rect.width) * 100;
          const my = ((e.clientY - rect.top) / rect.height) * 100;
          tile.style.setProperty("--mx", mx + "%");
          tile.style.setProperty("--my", my + "%");
        }
        if (dist < 0.7) {
          tile.style.transform = `perspective(1000px) rotateX(${dy * -4}deg) rotateY(${dx * 4}deg) translateZ(0)`;
        } else {
          tile.style.transform = "";
        }
      });
    };
    const handleMouseLeave = () => {
      document.querySelectorAll<HTMLElement>(".tile").forEach((t) => {
        t.style.transform = "";
      });
    };
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div className="aurora" aria-hidden="true" />

      {/* Left rail */}
      <div className="v-rail left" aria-hidden="true">
        <div className="v-rail-track">
          {[0, 1].flatMap((d) =>
            leftRailItems.flatMap((item) => [
              <span key={`${d}-${item}-t`} className="v-rail-item">{item}</span>,
              <span key={`${d}-${item}-s`} className="v-rail-star">✦</span>,
            ])
          )}
        </div>
      </div>

      {/* Right rail */}
      <div className="v-rail right" aria-hidden="true">
        <div className="v-rail-track">
          {[0, 1].flatMap((d) =>
            rightRailItems.flatMap((item) => [
              <span key={`${d}-${item}-t`} className="v-rail-item">{item}</span>,
              <span key={`${d}-${item}-s`} className="v-rail-star">✦</span>,
            ])
          )}
        </div>
      </div>

      <div className="portfolio-wrap">
        <div className="bento">

          {/* ── HERO ── */}
          <div className="tile hero-tile static">
            <div>
              <div className="status">
                <span className="pulse" />
                Open to backend roles · 2026
              </div>
              <h1>
                <span className="reveal-text">
                  <span>
                    <span className="sig">Hi, I&apos;m</span>
                    <br />Aastha Malik.
                  </span>
                </span>
              </h1>
              <p className="tagline">
                I design, build, and deploy production-grade backend systems — REST APIs, auth, ML pipelines. Always shipping something new.
              </p>
            </div>
            <div className="meta-row">
              <div className="meta">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
                India · UTC+5:30
              </div>
              <div className="meta">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" />
                </svg>
                Python · FastAPI · Postgres
              </div>
              <div className="meta">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16v16H4z" /><path d="M4 9h16M9 4v16" />
                </svg>
                4 shipped projects
              </div>
            </div>
          </div>

          {/* ── PROFILE ── */}
          <div className="tile profile-tile static">
            <div
              className="photo"
              style={{ backgroundImage: `url(${content.profile.imageSrc})` }}
            />
            <div className="grain" />
            <div className="veil" />
            <div className="badge">● Portrait · 2026</div>
            <div className="corner-mark">AM — 001</div>
            <div className="identity">
              <div className="role">Backend / Systems</div>
              <div className="name">{content.profile.name}</div>
            </div>
          </div>

          {/* ── PROJECTS ── */}
          <div className="tile projects-tile static" style={{ cursor: "default" }}>
            <div className="proj-head">
              <div>
                <div className="tile-label">
                  <span className="num">01</span>/ Selected work
                </div>
                <div className="tile-title" style={{ marginTop: 4 }}>Projects</div>
              </div>
              <div className="proj-count">{content.projects.length} SHIPPED</div>
            </div>
            <div className="proj-list">
              {content.projects.map((p, i) => (
                <div
                  key={p.id}
                  className="proj-item"
                  onClick={() => setModal({ type: "project", data: p })}
                >
                  <span className="idx">0{i + 1}</span>
                  <div>
                    <div className="proj-name">{p.name}</div>
                    <div className="proj-meta">{p.kind} · {p.tech.slice(0, 3).join(" / ")}</div>
                  </div>
                  <span className="arr"><Arrow /></span>
                </div>
              ))}
            </div>
          </div>

          {/* ── DSA ── */}
          <div className="tile sq dsa-tile" onClick={() => setModal({ type: "dsa" })}>
            <div>
              <div className="tile-label"><span className="num">02</span>/ Problem solving</div>
              <div className="tile-title">DSA</div>
              <div className="dsa-platforms">
                {content.dsaProfiles.map((p) => (
                  <span key={p.platform} className="dsa-chip">{p.platform}</span>
                ))}
              </div>
            </div>
            <div className="big">∞<sub>daily</sub></div>
            <div className="arrow"><Arrow /></div>
          </div>

          {/* ── RESUME ── */}
          <div className="tile sq resume-tile" onClick={() => setModal({ type: "resume" })}>
            <div>
              <div className="tile-label"><span className="num">03</span>/ Experience</div>
              <div className="tile-title">Résumé</div>
              <div className="tile-sub">PDF · One page · Updated Mar &apos;26</div>
            </div>
            <div className="preview" />
            <div className="arrow"><Arrow /></div>
          </div>

          {/* ── CONTACT ── */}
          <div className="tile contact-tile" onClick={() => setModal({ type: "contact" })}>
            <div>
              <div className="tile-label"><span className="num">04</span>/ Let&apos;s talk</div>
              <div className="tile-title">Contact</div>
            </div>
            <div className="links">
              {content.contact.slice(0, 3).map((c) => (
                <div className="link" key={c.id}>
                  <span className="plat">{c.label}</span>
                  <span>↗</span>
                </div>
              ))}
            </div>
            <div className="arrow"><Arrow /></div>
          </div>

          {/* ── TECH ── */}
          <div className="tile tech-tile" onClick={() => setModal({ type: "tech" })}>
            <div className="tile-label"><span className="num">05</span>/ What I use</div>
            <div className="tile-title" style={{ marginTop: 4 }}>Tech stack</div>
            <div className="tech-grid">
              {techPrimary.map((t) => (
                <span key={t} className="tech-chip hi">{t}</span>
              ))}
              {techRest.slice(0, 14).map((t) => (
                <span key={t} className="tech-chip">{t}</span>
              ))}
              {techRest.length > 14 && (
                <span className="tech-chip" style={{ borderStyle: "dashed" }}>
                  +{techRest.length - 14} more
                </span>
              )}
            </div>
            <div className="arrow"><Arrow /></div>
          </div>

          {/* ── ABOUT ── */}
          <div className="tile about-tile static">
            <div className="about-grid">
              <div>
                <div className="tile-label">
                  <span style={{ color: "var(--accent-2)" }}>06</span>/ About
                </div>
                <div className="about-lead">
                  Backend-first — <em>API design to cloud deployment</em>, end to end.
                </div>
              </div>
              <div className="about-body">
                {content.basicInfo.intro} Comfortable owning a project from schema to production: auth flows, background jobs, webhooks, Dockerized ML pipelines, and the boring-but-critical bits like migrations and health checks.
              </div>
              <div className="about-stats">
                <div className="stat">
                  <div className="num">55+</div>
                  <div className="lab">REST endpoints shipped</div>
                </div>
                <div className="stat">
                  <div className="num">4</div>
                  <div className="lab">Live deployments</div>
                </div>
                <div className="stat">
                  <div className="num">2</div>
                  <div className="lab">ML pipelines on HF</div>
                </div>
              </div>
            </div>
          </div>

        </div>{/* end .bento */}

        <div className="footbar">
          <div className="left">
            <span>© Aastha Malik</span>
            <span>Built w/ care</span>
          </div>
          <div className="right">
            <span>v2.0 · Portfolio</span>
            <span style={{ color: "var(--accent-2)" }}>●</span>
          </div>
        </div>
      </div>

      <ExpandedPanel modal={modal} onClose={() => setModal(null)} />
    </>
  );
}
