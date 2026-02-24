import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { content, type TileId } from "@/data/content";
import Link from "next/link";
import Image from "next/image";

type ExpandedPanelProps = {
  activeTileId: TileId | null;
  onClose: () => void;
};

export function ExpandedPanel({ activeTileId, onClose }: ExpandedPanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeTileId) return;
    closeButtonRef.current?.focus();
  }, [activeTileId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!activeTileId || activeTileId === "profile") {
    return null;
  }

  const renderContent = () => {
    switch (activeTileId) {
      case "projects":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {content.projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-white/5 bg-black/10 p-4"
                >
                  <h3 className="text-base font-semibold">{project.name}</h3>
                  <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[color:var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <PanelButton href={project.demoUrl}>Live Demo</PanelButton>
                    <PanelButton href={project.githubUrl} variant="outline">
                      GitHub
                    </PanelButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "dsa":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold tracking-tight">DSA</h2>
            <p className="text-sm text-[color:var(--text-secondary)]">
              Consistent problem solving practice with a bias toward
              data-structures, algorithms, and patterns that show up in real
              systems.
            </p>
            <div className="flex flex-wrap gap-4">
              {content.dsaProfiles.map((profile) => (
                <PanelButton key={profile.platform} href={profile.href}>
                  {profile.platform} Profile
                </PanelButton>
              ))}
            </div>
          </div>
        );
      case "resume":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold tracking-tight">Resume</h2>
            <div className="overflow-hidden rounded-xl border border-white/5 bg-black/20">
              <Image
                src={content.resume.previewImage}
                alt="Resume preview"
                width={1200}
                height={800}
                className="h-auto w-full object-cover"
              />
            </div>
            <PanelButton href={content.resume.downloadUrl}>
              Download Resume
            </PanelButton>
          </div>
        );
      case "tech":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold tracking-tight">Tech Stack</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {content.techStack.map((category) => (
                <div
                  key={category.id}
                  className="rounded-xl border border-white/5 bg-black/10 p-4"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--text-secondary)]">
                    {category.label}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[color:var(--foreground)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold tracking-tight">Contact</h2>
            <ul className="space-y-3 text-sm">
              {content.contact.map((item) => (
                <li key={item.id} className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--text-secondary)]">
                    {item.label}
                  </span>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-[color:var(--foreground)] underline-offset-4 hover:text-[color:var(--accent)] hover:underline"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      case "basic":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">About</h2>
            <p className="text-sm text-[color:var(--text-secondary)]">
              {content.basicInfo.headline}
            </p>
            <p className="text-sm text-[color:var(--foreground)]">
              {content.basicInfo.intro}
            </p>
            <p className="text-sm text-[color:var(--text-secondary)]">
              {content.basicInfo.subheadline}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {activeTileId && (
        <motion.div
          className="fixed inset-0 z-30 flex items-center justify-center px-4 sm:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            aria-hidden="true"
          />
          <motion.div
            layoutId={`tile-${activeTileId}`}
            className="relative z-10 max-h-[72vh] w-full max-w-3xl rounded-2xl bg-[color:var(--surface)] p-5 text-[color:var(--foreground)] tile-shadow"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-[color:var(--text-secondary)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            >
              Close
            </button>
            <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
              {renderContent()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type PanelButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
};

function PanelButton({
  href,
  children,
  variant = "solid",
}: PanelButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]";

  const variantClasses =
    variant === "solid"
      ? "bg-[color:var(--accent)] text-white hover:bg-[#c32c77]"
      : "border border-[color:var(--accent)] text-[color:var(--accent)] hover:bg-[color:var(--accent)]/10";

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </Link>
  );
}

