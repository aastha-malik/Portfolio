import { motion } from "framer-motion";
import { ReactNode } from "react";
import type { TileId } from "@/data/content";

type TileProps = {
  id: TileId;
  label?: string;
  children?: ReactNode;
  isActive: boolean;
  activeTileId: TileId | null;
  onOpen?: () => void;
  isProfile?: boolean;
  fullHeight?: boolean;
};

export function Tile({
  id,
  label,
  children,
  isActive,
  activeTileId,
  onOpen,
  isProfile = false,
  fullHeight = false,
}: TileProps) {
  const isDimmed = activeTileId !== null && !isActive;

  const interactiveProps = isProfile
    ? {}
    : {
      role: "button" as const,
      tabIndex: 0,
      onClick: onOpen,
      onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen?.();
        }
      },
      "aria-label": label,
    };

  const containerStyle: React.CSSProperties = {
    opacity: isDimmed ? 0.4 : 1,
    ...(fullHeight ? { height: "100%" } : {}),
  };

  return (
    <motion.div
      layoutId={`tile-${id}`}
      className="tile-shadow rounded-2xl bg-[color:var(--surface)] text-[color:var(--foreground)] outline-none w-full"
      style={containerStyle}
      whileHover={
        isProfile
          ? { scale: 1.02 }
          : {
            scale: 1.03,
            boxShadow: "0 20px 45px rgba(214, 51, 132, 0.28)",
          }
      }
      whileTap={isProfile ? { scale: 0.98 } : { scale: 0.99 }}
      transition={{ duration: 0.18 }}
      {...interactiveProps}
    >
      <div className="flex h-full w-full items-center justify-center rounded-2xl px-4 py-4">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          {label && (
            <span className="text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--text-secondary)]">
              {label}
            </span>
          )}
          {children}
        </div>
      </div>
    </motion.div>
  );
}
