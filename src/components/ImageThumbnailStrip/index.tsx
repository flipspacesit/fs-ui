import React from "react";
import { Stack, Box, SxProps, Theme } from "@mui/material";
import { neutral } from "../../theme/tokens/colors";

/** A single selectable thumbnail: image source plus its selection value. */
export interface ThumbItem {
  /** Image URL rendered as the thumbnail. */
  src: string;
  /** Value emitted via `onChange` and matched against `value` for active state. */
  value: string;
}

/** Props for {@link ImageThumbnailStrip}. */
export interface ImageThumbnailStripProps {
  /** Thumbnails to render, in order. */
  items: ThumbItem[];
  /** Currently selected `ThumbItem.value`; the matching tile shows the active border. */
  value: string;
  /** Fired with the clicked tile's value when selection changes. */
  onChange: (value: string) => void;
  /** Light (white glass) or dark (black glass) group */
  variant?: "light" | "dark";
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Selectable image thumbnail strip — Figma "Custom UI Elements" (1150:279).
 * Glassy group; the active tile gets a 2px border.
 */
export const ImageThumbnailStrip: React.FC<ImageThumbnailStripProps> = ({
  items,
  value,
  onChange,
  variant = "light",
  sx = {},
}) => {
  const dark = variant === "dark";
  return (
    <Stack
      direction="row"
      gap="8px"
      sx={{
        p: "4px",
        borderRadius: "8px",
        backgroundColor: dark ? "rgba(27,28,30,0.6)" : "rgba(255,255,255,0.6)",
        backdropFilter: "blur(5px)",
        width: "fit-content",
        ...sx,
      }}
    >
      {items.map((it) => {
        const active = it.value === value;
        return (
          <Box
            key={it.value}
            onClick={() => onChange(it.value)}
            role="button"
            tabIndex={0}
            aria-label={`Select ${it.value}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onChange(it.value);
              }
            }}
            sx={{
              width: 51,
              height: 38,
              borderRadius: "4px",
              overflow: "hidden",
              cursor: "pointer",
              border: active
                ? `2px solid ${dark ? neutral.ink : neutral.white}`
                : "2px solid transparent",
            }}
          >
            <Box
              component="img"
              src={it.src}
              alt={it.value}
              sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </Box>
        );
      })}
    </Stack>
  );
};

export default ImageThumbnailStrip;
