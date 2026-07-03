import React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { primary, neutral } from "../../theme/tokens/colors";

/** Props for {@link NavArrowButton}. */
export interface NavArrowButtonProps {
  /** Arrow direction */
  direction: "left" | "right";
  /** Black (dark glass) or Yellow */
  color?: "black" | "yellow";
  /** Click handler fired on press and on Enter/Space. */
  onClick?: () => void;
  /** Pill height (default 87px per the DS carousel arrow) */
  height?: number;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Internal chevron glyph; the base SVG points left and is flipped 180deg for "right".
const Caret: React.FC<{ direction: "left" | "right"; color: string }> = ({
  direction,
  color,
}) => (
  <svg
    width="10"
    height="16"
    viewBox="0 0 10 16"
    fill="none"
    style={{ transform: direction === "right" ? "rotate(180deg)" : undefined }}
  >
    <path
      d="M8 1L2 8L8 15"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Carousel prev/next arrow — Figma "Checkboxes, Tooltips & Scrolls"
 * (403:13626). Tall pill, dark-glass or yellow, white caret + border.
 */
export const NavArrowButton: React.FC<NavArrowButtonProps> = ({
  direction,
  color = "black",
  onClick,
  height = 87,
  sx = {},
}) => {
  const isBlack = color === "black";
  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={direction === "left" ? "Previous" : "Next"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      sx={{
        width: 16,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "100px",
        cursor: "pointer",
        border: `1px solid ${neutral.white}`,
        backgroundColor: isBlack ? "rgba(27,28,30,0.7)" : primary.yellow.brand,
        backdropFilter: "blur(2px)",
        ...sx,
      }}
    >
      <Caret direction={direction} color={neutral.white} />
    </Box>
  );
};

export default NavArrowButton;
