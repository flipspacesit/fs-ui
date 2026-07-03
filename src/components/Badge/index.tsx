import React from "react";
import { Box, Typography, SxProps, Theme } from "@mui/material";
import { semantic, neutral } from "../../theme/tokens/colors";
import { theme } from "../../theme";

/** Props for the {@link Badge} notification badge. */
export interface BadgeProps {
  /** Host element the badge overlays */
  children: React.ReactNode;
  /** Numbered count */
  count?: number;
  /** Dot mode (no number) */
  dot?: boolean;
  /** Cap the count (e.g. 99+) */
  max?: number;
  /** Show even when count is 0 */
  showZero?: boolean;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Notification badge — Figma "Badge & Stepper" (1720:270). Red count pill or
 * dot, anchored top-right of the host.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  count,
  dot = false,
  max = 99,
  showZero = false,
  sx = {},
}) => {
  // Render the badge in dot mode, or when there is a positive count (or zero if showZero).
  const show = dot || (count !== undefined && (count > 0 || showZero));
  // Clamp the displayed count to `max`, rendering "{max}+" once exceeded.
  const label =
    count !== undefined && count > max ? `${max}+` : count;

  return (
    <Box sx={{ position: "relative", display: "inline-flex", ...sx }}>
      {children}
      {show && (
        <Box
          sx={{
            position: "absolute",
            top: dot ? -2 : -6,
            right: dot ? -2 : -6,
            minWidth: dot ? 12 : 16,
            height: dot ? 12 : 16,
            px: dot ? 0 : "4px",
            borderRadius: "100px",
            backgroundColor: semantic.error.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          {!dot && (
            <Typography
              variant="c1"
              sx={{
                fontWeight: theme.typography.fontWeight.medium,
                color: neutral.white,
                lineHeight: 1,
              }}
            >
              {label}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Badge;
