import React from "react";
import { Box, Typography, SxProps, Theme } from "@mui/material";
import { misc } from "../../theme/tokens/colors";
import { theme } from "../../theme";

/** Priority tier the badge represents: 1 = P1 (highest), 2 = P2, 3 = P3 (lowest). */
export type PriorityLevel = 1 | 2 | 3;

/** Props for {@link PriorityBadge}. */
export interface PriorityBadgeProps {
  /** Priority level (P1 / P2 / P3) */
  level: PriorityLevel;
  /** square (radius-xxs) or pill (radius-pill-100) */
  shape?: "square" | "pill";
  /** Override label (defaults to "P{level}") */
  label?: string;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Each priority = its own Misc-palette hue (light tint bg + deep text).
const LEVELS: Record<PriorityLevel, { bg: string; text: string }> = {
  1: { bg: misc.cocoaBrown.superLight, text: misc.cocoaBrown.base },
  2: { bg: misc.lightSeaGreen.superLight, text: misc.lightSeaGreen.base },
  3: { bg: misc.duskyPurple.superLight, text: misc.duskyPurple.base },
};

/**
 * Priority badge (P1 / P2 / P3) — Figma "Tags & Badges" (442:14616).
 * Each level gets its own Misc-palette hue; `shape` toggles square vs pill,
 * and `label` overrides the default "P{level}" text.
 */
export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  level,
  shape = "square",
  label,
  sx = {},
}) => {
  const c = LEVELS[level];
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: shape === "pill" ? 48 : 36,
        height: 28,
        px: "12px",
        borderRadius: shape === "pill" ? "100px" : "4px",
        backgroundColor: c.bg,
        ...sx,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: theme.typography.fontWeight.medium,
          color: c.text,
          whiteSpace: "nowrap",
        }}
      >
        {label ?? `P${level}`}
      </Typography>
    </Box>
  );
};

export default PriorityBadge;
