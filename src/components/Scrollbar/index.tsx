import React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { neutral } from "../../theme/tokens/colors";

/** Props for {@link Scrollbar}. */
export interface ScrollbarProps {
  /** Scrollable content rendered inside the overflow container. */
  children: React.ReactNode;
  /** Thumb width — Large 12px / Small 8px */
  size?: "large" | "small";
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Scrollable container with the DS custom scrollbar — Figma "Checkboxes,
 * Tooltips & Scrolls" (403:13626). Pill thumb, soft-steel fill + grey border.
 */
export const Scrollbar: React.FC<ScrollbarProps> = ({
  children,
  size = "large",
  sx = {},
}) => {
  // Thumb/track width in px, keyed off the size variant.
  const w = size === "large" ? 12 : 8;
  return (
    <Box
      sx={{
        overflow: "auto",
        "&::-webkit-scrollbar": { width: w, height: w },
        "&::-webkit-scrollbar-track": { background: "transparent" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(207,211,223,0.8)",
          border: `0.5px solid ${neutral.grey[400]}`,
          borderRadius: "100px",
          backgroundClip: "padding-box",
        },
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(207,211,223,0.8) transparent",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Scrollbar;
