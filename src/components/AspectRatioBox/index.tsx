import React from "react";
import { Box, Stack, Typography, SxProps, Theme } from "@mui/material";
import { primary, neutral } from "../../theme/tokens/colors";

/** Props for {@link AspectRatioBox}. */
export interface AspectRatioBoxProps {
  /** Aspect ratio, e.g. "1/1", "4/3", "16/9" */
  ratio?: string;
  /** Image URL to render; when omitted, the blue placeholder glyph is shown. */
  src?: string;
  /** Caption shown under the placeholder glyph; also used as the image `alt` text. */
  label?: string;
  /** Box width; number is treated as px, string passes through as a CSS length. */
  width?: number | string;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Aspect-ratio image placeholder — Figma "Cards & Image Resolution" (485:429).
 * Blue-100 placeholder with an image glyph; shows the image when `src` is set.
 */
export const AspectRatioBox: React.FC<AspectRatioBoxProps> = ({
  ratio = "16/9",
  src,
  label,
  width = 240,
  sx = {},
}) => (
  <Box
    sx={{
      width,
      borderRadius: "8px",
      overflow: "hidden",
      aspectRatio: ratio.replace("/", " / "),
      backgroundColor: primary.blue[100],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...sx,
    }}
  >
    {src ? (
      <Box
        component="img"
        src={src}
        alt={label || "image"}
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ) : (
      <Stack alignItems="center" gap="4px">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect
            x="6"
            y="8"
            width="36"
            height="32"
            rx="4"
            stroke={primary.blue[300]}
            strokeWidth="2"
          />
          <circle cx="17" cy="19" r="3.5" stroke={primary.blue[300]} strokeWidth="2" />
          <path
            d="M8 34l10-9 7 6 8-7 7 6"
            stroke={primary.blue[300]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {label && (
          <Typography variant="c1" sx={{ color: neutral.grey[300] }}>
            {label}
          </Typography>
        )}
      </Stack>
    )}
  </Box>
);

export default AspectRatioBox;
