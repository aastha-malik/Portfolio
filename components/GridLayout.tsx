"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Tile } from "./Tile";
import { ExpandedPanel } from "./ExpandedPanel";
import { content, type TileId } from "@/data/content";

export function GridLayout() {
  const [activeTileId, setActiveTileId] = useState<TileId | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveTileId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openTile = (id: TileId) => {
    if (id === "profile") return;
    setActiveTileId(id);
  };

  const closeTile = () => {
    setActiveTileId(null);
  };

  return (
    /* Full viewport, no scroll */
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "5rem 8rem",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
      className="bg-[color:var(--background)] text-[color:var(--foreground)]"
    >
      {/* Header — fixed height, shrink-proof */}
      <div
        style={{ flexShrink: 0, marginBottom: "1rem", textAlign: "center", width: "100%" }}
      >
      </div>

      {/* Bento Grid — fills remaining viewport height */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr",
          gridTemplateRows: "1fr 2fr 1fr",
          gap: "0.8rem",
          margin: "0 auto",
          aspectRatio: "1 / 1",
          maxHeight: "100%",
          maxWidth: "100%",
        }}
        className="bento-grid"
      >
        {/* ── ROW 1 ── */}

        <div style={{ gridColumn: "1 / 3", gridRow: "1" }}>
          <Tile
            id="projects"
            label="Projects"
            activeTileId={activeTileId}
            isActive={activeTileId === "projects"}
            onOpen={() => openTile("projects")}
            fullHeight
          >
            <span className="text-base font-semibold">Selected work</span>
          </Tile>
        </div>

        <div style={{ gridColumn: "3 / 4", gridRow: "1" }}>
          <Tile
            id="dsa"
            label="DSA"
            activeTileId={activeTileId}
            isActive={activeTileId === "dsa"}
            onOpen={() => openTile("dsa")}
            fullHeight
          >
            <span className="text-base font-semibold">Problem solving</span>
          </Tile>
        </div>

        {/* ── ROW 2 ── */}

        <div style={{ gridColumn: "1 / 2", gridRow: "2" }}>
          <Tile
            id="resume"
            label="Resume"
            activeTileId={activeTileId}
            isActive={activeTileId === "resume"}
            onOpen={() => openTile("resume")}
            fullHeight
          >
            <span className="text-base font-semibold">Experience</span>
          </Tile>
        </div>

        <div style={{ gridColumn: "2 / 3", gridRow: "2" }}>
          <Tile
            id="profile"
            label="Profile"
            activeTileId={activeTileId}
            isActive={activeTileId === "profile"}
            isProfile
            fullHeight
            noPadding
          >
            <div className="relative h-full w-full">
              <Image
                src={content.profile.imageSrc}
                alt={content.profile.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Overlay with name and role for better visibility */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pb-8">
                <div className="relative inline-block">
                  {/* Highlight Background for Name */}
                  <div className="absolute inset-0 -mx-2 -my-1 bg-[color:var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-90 rounded-sm -z-10" />
                  <p className="relative z-10 text-2xl font-bold text-white tracking-tight leading-tight transition-all duration-300 group-hover:scale-105 origin-left">
                    {content.profile.name}
                  </p>
                </div>

                <div className="relative mt-2 block">
                  {/* Highlight Background for Role (slightly more subtle) */}
                  <div className="absolute inset-0 -mx-1 bg-[color:var(--accent)]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-75 origin-left rounded-sm -z-10" />
                  <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 transition-all duration-300 group-hover:translate-x-1">
                    {content.profile.role}
                  </p>
                </div>
              </div>
            </div>
          </Tile>
        </div>

        <div style={{ gridColumn: "3 / 4", gridRow: "2" }}>
          <Tile
            id="tech"
            label="Tech Stack"
            activeTileId={activeTileId}
            isActive={activeTileId === "tech"}
            onOpen={() => openTile("tech")}
            fullHeight
          >
            <span className="text-base font-semibold">What I use</span>
          </Tile>
        </div>

        {/* ── ROW 3 ── */}

        <div style={{ gridColumn: "1 / 2", gridRow: "3" }}>
          <Tile
            id="contact"
            label="Contact Me"
            activeTileId={activeTileId}
            isActive={activeTileId === "contact"}
            onOpen={() => openTile("contact")}
            fullHeight
          >
            <span className="text-base font-semibold">
              Let&apos;s talk about systems
            </span>
          </Tile>
        </div>

        <div style={{ gridColumn: "2 / 4", gridRow: "3" }}>
          <Tile
            id="basic"
            label="Basic Info"
            activeTileId={activeTileId}
            isActive={activeTileId === "basic"}
            onOpen={() => openTile("basic")}
            fullHeight
          >
            <span className="text-base font-semibold">
              {content.basicInfo.headline}
            </span>
          </Tile>
        </div>
      </div>

      <ExpandedPanel activeTileId={activeTileId} onClose={closeTile} />
    </div>
  );
}
