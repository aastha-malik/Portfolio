"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { content, type Project } from "@/data/content";

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

function ModalContent({ modal }: { modal: NonNullable<ModalState> }) {
  switch (modal.type) {
    case "project":
      return (
        <div className="pcard">
          <div className="phead">
            <div>
              <div className="pname">{modal.data.name}</div>
              <div className="pkind">{modal.data.kind}</div>
            </div>
          </div>
          <div className="ptech">
            {modal.data.tech.map((t) => (
              <span className="tech-chip" key={t}>{t}</span>
            ))}
          </div>
          <ul>
            {modal.data.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="pbtns">
            <a href={modal.data.demoUrl} target="_blank" rel="noopener noreferrer">
              <button className="pbtn primary">
                {modal.data.name === "Chikitsa Cloud" ? "Demo Video ↗" : "Live Demo ↗"}
              </button>
            </a>
            <a href={modal.data.githubUrl} target="_blank" rel="noopener noreferrer">
              <button className="pbtn">GitHub ↗</button>
            </a>
          </div>
        </div>
      );

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
          <div style={{ overflow: "hidden", borderRadius: 12, border: "1px solid var(--border)" }}>
            <Image
              src={content.resume.previewImage}
              alt="Resume preview"
              width={791}
              height={1024}
              quality={100}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <div style={{ marginTop: 18 }}>
            <a href={content.resume.downloadUrl} target="_blank" rel="noopener noreferrer">
              <button className="pbtn primary">Download PDF ↓</button>
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
