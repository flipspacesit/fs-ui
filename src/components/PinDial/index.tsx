import React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { primary, neutral } from "../../theme/tokens/colors";

/** Props for the {@link PinDial} radial pin action wheel. */
export interface PinDialProps {
  /** Highlighted quadrant: 0 top · 1 right · 2 bottom · 3 left */
  activeQuadrant?: 0 | 1 | 2 | 3 | null;
  /** Center badge (e.g. a PinMarker) */
  center?: React.ReactNode;
  /** Four quadrant icons [top, right, bottom, left] */
  icons?: [React.ReactNode, React.ReactNode, React.ReactNode, React.ReactNode];
  /** Fired with the selected quadrant index (0–3) on click or Enter/Space. */
  onSelect?: (quadrant: number) => void;
  /** Disc diameter in pixels. Defaults to 126. */
  size?: number;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Base disc color for inactive quadrants and the unlit portion of the arc.
const DARK = "#2f3238";

// Absolute-position offsets for the four quadrant slots, ordered [top, right, bottom, left].
const POSITIONS = [
  { top: 10, left: "50%", transform: "translateX(-50%)" },
  { right: 10, top: "50%", transform: "translateY(-50%)" },
  { bottom: 10, left: "50%", transform: "translateX(-50%)" },
  { left: 10, top: "50%", transform: "translateY(-50%)" },
];

/**
 * Radial pin action wheel — Figma "Pins" (909:7536). Dark disc with four
 * quadrant actions; the active quadrant lights with a yellow arc.
 */
export const PinDial: React.FC<PinDialProps> = ({
  activeQuadrant = null,
  center,
  icons,
  onSelect,
  size = 126,
  sx = {},
}) => {
  // Yellow 90° arc centered on the active quadrant (offset -45° to straddle it), else a flat dark disc.
  const background =
    activeQuadrant != null
      ? `conic-gradient(from ${
          activeQuadrant * 90 - 45
        }deg, ${primary.yellow.brand}55 0deg 90deg, ${DARK} 90deg 360deg)`
      : DARK;

  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        background,
        ...sx,
      }}
    >
      {POSITIONS.map((p, i) => (
        <Box
          key={i}
          onClick={() => onSelect?.(i)}
          role="button"
          tabIndex={0}
          aria-label={`Action ${i + 1}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect?.(i);
            }
          }}
          sx={{
            position: "absolute",
            ...p,
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: neutral.white,
            cursor: "pointer",
          }}
        >
          {icons?.[i]}
        </Box>
      ))}
      {center && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {center}
        </Box>
      )}
    </Box>
  );
};

export default PinDial;
