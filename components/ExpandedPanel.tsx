"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { content, type Project, type ComparePair } from "@/data/content";

type ModalState =
  | null
  | { type: "project"; data: Project }
  | { type: "dsa" }
  | { type: "resume" }
  | { type: "tech" }
  | { type: "contact" };

type Props = {
  modal: ModalState;
  onClose: () => void;
};

function getTitle(modal: ModalState): string {
  if (!modal) return "";
  switch (modal.type) {
    case "project": return modal.data.name;
    case "dsa":     return "DSA · Problem solving";
    case "resume":  return "Résumé";
    case "tech":    return "Tech stack";
    case "contact": return "Let's talk";
  }
}

function MediaPlaceholder({ hint, label }: { hint: string; label?: string }) {
  return (
    <div className="pmedia-ph">
      <span className="pmedia-ph-hint">{hint}</span>
      {label && <span className="pmedia-ph-label">{label}</span>}
    </div>
  );
}

function CompareSlider({ pair }: { pair: ComparePair }) {
  const [pct, setPct] = useState(50);
  const beforeLabel = pair.beforeLabel ?? "Input";
  const afterLabel = pair.afterLabel ?? "Output";
  return (
    <div className="compare">
      <div className="compare-layer">
        {pair.after ? (
          <Image src={pair.after} alt={afterLabel} fill sizes="(max-width: 700px) 90vw, 860px" />
        ) : (
          <MediaPlaceholder hint={`${afterLabel} (after)`} />
        )}
      </div>
      <div className="compare-layer compare-clip" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
        {pair.before ? (
          <Image src={pair.before} alt={beforeLabel} fill sizes="(max-width: 700px) 90vw, 860px" />
        ) : (
          <MediaPlaceholder hint={`${beforeLabel} (before)`} />
        )}
      </div>
      <div className="compare-line" style={{ left: `${pct}%` }} />
      <span className="compare-tag left">{beforeLabel}</span>
      <span className="compare-tag right">{afterLabel}</span>
      <input
        className="compare-range"
        type="range"
        min={0}
        max={100}
        value={pct}
        onChange={(e) => setPct(Number(e.target.value))}
        aria-label="Drag to compare before and after"
      />
    </div>
  );
}

function ProjectModal({ p }: { p: Project }) {
  return (
    <div className="pcard">
      <div className="phead">
        <div>
          <div className="pname">{p.name}</div>
          <div className="pkind">{p.kind}</div>
        </div>
        {p.postUrl && (
          <a href={p.postUrl} target="_blank" rel="noopener noreferrer">
            <button className="pbtn">View X post ↗</button>
          </a>
        )}
      </div>

      {p.compare && <CompareSlider pair={p.compare} />}

      <div className="ptech">
        {p.tech.map((t) => (
          <span className="tech-chip" key={t}>{t}</span>
        ))}
      </div>
      <ul>
        {p.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      <div className="pbtns">
        {p.demoUrl && (
          <a href={p.demoUrl} target="_blank" rel="noopener noreferrer">
            <button className="pbtn primary">Live Demo ↗</button>
          </a>
        )}
        {p.githubUrl && (
          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
            <button className="pbtn">GitHub ↗</button>
          </a>
        )}
      </div>
    </div>
  );
}

function ModalContent({ modal }: { modal: NonNullable<ModalState> }) {
  switch (modal.type) {
    case "project":
      return <ProjectModal p={modal.data} />;

    case "dsa":
      return (
        <div>
          <p style={{ color: "var(--text-2)", fontSize: 15, lineHeight: 1.6, marginTop: 0 }}>
            Consistent practice biased toward patterns that show up in real systems — graph traversals, sliding windows, dynamic programming.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
            {content.dsaProfiles.map((d) => (
              <a key={d.platform} href={d.href} target="_blank" rel="noopener noreferrer">
                <button className="pbtn primary">{d.platform} profile ↗</button>
              </a>
            ))}
          </div>
        </div>
      );

    case "resume":
      return (
        <div>
          <div className="resume-embed">
            <object data={`${content.resume.pdfUrl}#view=FitH`} type="application/pdf">
              <iframe
                src={`${content.resume.pdfUrl}#view=FitH`}
                title="Aastha Malik — Résumé"
                style={{ width: "100%", height: "100%", border: 0 }}
              />
            </object>
          </div>
          <div className="resume-embed-foot">
            <span>Links in the résumé are clickable.</span>
            <a
              href={content.resume.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-openlink"
            >
              Open full PDF ↗
            </a>
          </div>
        </div>
      );

    case "tech":
      return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {content.techStack.map((cat) => (
            <div key={cat.id} className="modal-cat">
              <div className="modal-cat-label">{cat.label}</div>
              <div className="modal-cat-chips">
                {cat.items.map((item) => (
                  <span className="tech-chip" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "contact":
      return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {content.contact.map((c) => (
            <a
              key={c.id}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-contact-item"
            >
              <div className="modal-contact-label">{c.label}</div>
              <div className="modal-contact-value">{c.value}</div>
            </a>
          ))}
        </div>
      );
  }
}

export function ExpandedPanel({ modal, onClose }: Props) {
  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="modal"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <div className="modal-title">{getTitle(modal)}</div>
              <button className="modal-close" onClick={onClose}>Close · Esc</button>
            </div>
            <div className="modal-body">
              <ModalContent modal={modal} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
