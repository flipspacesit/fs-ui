import React from "react";
import { Box, Stack, Typography, SxProps, Theme } from "@mui/material";
import { neutral, primary } from "../../theme/tokens/colors";
import { shadows } from "../../theme/tokens/shadows";
import { theme } from "../../theme";

/** Props for {@link ProductCard}. */
export interface ProductCardProps {
  /** Image URL for the 4:3 cover; omit to render an empty tinted placeholder. */
  image?: string;
  /** Primary card label; also used as the image `alt` text. */
  title: string;
  /** Optional secondary label rendered above the title in the accent color. */
  subtitle?: string;
  /** Fired when the download pill is activated; the pill is hidden when unset. */
  onDownload?: () => void;
  /** Icon rail on the right edge (e.g. AR / verified badges) */
  rail?: React.ReactNode;
  /** Card width in pixels; defaults to `240`. */
  width?: number;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Asset / product card — Figma "Cards & Image Resolution" (485:429). Elevated
 * card, 4:3 image with a download pill + optional right-edge icon rail.
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  subtitle,
  onDownload,
  rail,
  width = 240,
  sx = {},
}) => (
  <Box
    sx={{
      width,
      backgroundColor: neutral.white,
      boxShadow: shadows.elevation03,
      borderRadius: "8px",
      p: "8px",
      position: "relative",
      ...sx,
    }}
  >
    <Box
      sx={{
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        aspectRatio: "4 / 3",
        backgroundColor: neutral.softSteel[50],
      }}
    >
      {image && (
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      )}
      {onDownload && (
        <Box
          onClick={onDownload}
          role="button"
          tabIndex={0}
          aria-label="Download"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onDownload();
            }
          }}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 24,
            height: 24,
            borderRadius: "100px",
            backgroundColor: neutral.white,
            border: `0.5px solid ${neutral.softSteel[400]}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3v8m0 0l-3-3m3 3l3-3M3 13h10"
              stroke={neutral.ink}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
      )}
    </Box>
    {rail && (
      <Stack
        gap="6px"
        sx={{ position: "absolute", top: 20, right: -12, alignItems: "center" }}
      >
        {rail}
      </Stack>
    )}
    <Stack gap="2px" sx={{ mt: "8px" }}>
      {subtitle && (
        <Typography
          variant="b2"
          sx={{ fontWeight: theme.typography.fontWeight.medium, color: primary.blue.primary }}
        >
          {subtitle}
        </Typography>
      )}
      <Typography
        variant="b2"
        sx={{ fontWeight: theme.typography.fontWeight.medium, color: neutral.ink }}
      >
        {title}
      </Typography>
    </Stack>
  </Box>
);

export default ProductCard;
