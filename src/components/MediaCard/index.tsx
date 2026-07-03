import React from "react";
import { Box, Stack, Typography, SxProps, Theme } from "@mui/material";
import { neutral } from "../../theme/tokens/colors";
import { theme } from "../../theme";

/** Props for {@link MediaCard}. */
export interface MediaCardProps {
  /** Image URL rendered as the card's cover; the placeholder shows when omitted. */
  image?: string;
  /** Card title shown in the footer; also used as the image `alt` text. */
  title: string;
  /** Footer content rendered below the title — e.g. location or dimensions. */
  meta?: React.ReactNode;
  /** Overlay chip (top-left) — e.g. a StatusChip */
  statusChip?: React.ReactNode;
  /** Price tag (bottom-right) */
  price?: string;
  /** Card width in pixels. Defaults to `240`. */
  width?: number;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Space / media card — Figma "Cards & Image Resolution" (485:429). Image with
 * status-chip + price-tag overlays, title + meta footer.
 */
export const MediaCard: React.FC<MediaCardProps> = ({
  image,
  title,
  meta,
  statusChip,
  price,
  width = 240,
  sx = {},
}) => (
  <Box
    sx={{
      width,
      backgroundColor: neutral.white,
      border: `0.5px solid ${neutral.softSteel[400]}`,
      borderRadius: "8px",
      p: "8px",
      ...sx,
    }}
  >
    <Box
      sx={{
        position: "relative",
        borderRadius: "4px",
        overflow: "hidden",
        aspectRatio: "16 / 10",
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
      {statusChip && (
        <Box sx={{ position: "absolute", top: 8, left: 8 }}>{statusChip}</Box>
      )}
      {price && (
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            backgroundColor: "rgba(97, 97, 97, 0.9)",
            border: `0.5px solid ${neutral.white}`,
            borderRadius: "4px",
            px: "6px",
            height: 20,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="c1"
            sx={{ fontWeight: theme.typography.fontWeight.medium, color: neutral.white }}
          >
            {price}
          </Typography>
        </Box>
      )}
    </Box>
    <Stack gap="4px" sx={{ mt: "8px" }}>
      <Typography
        variant="b2"
        sx={{ fontWeight: theme.typography.fontWeight.medium, color: neutral.ink }}
      >
        {title}
      </Typography>
      {meta && <Box>{meta}</Box>}
    </Stack>
  </Box>
);

export default MediaCard;
