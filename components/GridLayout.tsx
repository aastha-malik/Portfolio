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
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-[84px] w-[84px] rounded-full border border-[color:var(--accent)]/60 bg-black/30">
                <Image
                  src={content.profile.imageSrc}
                  alt={content.profile.imageAlt}
                  fill
                  sizes="84px"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="space-y-1.5 text-center">
                <p className="text-sm font-medium">{content.profile.name}</p>
                <p className="text-xs text-[color:var(--text-secondary)]">
                  {content.profile.role}
                </p>
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
