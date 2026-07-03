import React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { HEIGHTS, ComponentSize } from "../../constants";
import { semantic, neutral } from "../../theme/tokens/colors";

/** Semantic color scheme for the badge, mapped to theme tokens via {@link MAP}. */
export type IconBadgeColor =
  | "success"
  | "error"
  | "warning"
  | "interactive"
  | "grey";
/** Visual style: `filled` = circular solid, `tinted` = rounded pale surface. */
export type IconBadgeVariant = "filled" | "tinted";

/** Props for the {@link IconBadge} component. */
export interface IconBadgeProps {
  /** Icon node rendered centered inside the badge (sized to 60% of the badge). */
  icon: React.ReactNode;
  /** filled = circular solid (Reaction badge); tinted = rounded pale (Temperature badge) */
  variant?: IconBadgeVariant;
  /** Semantic color scheme; defaults to `"success"`. */
  color?: IconBadgeColor;
  /** Badge dimension preset (mapped through `HEIGHTS`); defaults to `"large"`. */
  size?: ComponentSize;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Per-color token lookup: `primary` = solid/icon color, `tint` = pale surface, `on` = icon color on a filled badge.
const MAP: Record<IconBadgeColor, { primary: string; tint: string; on: string }> =
  {
    success: {
      primary: semantic.success.primary,
      tint: semantic.success[200],
      on: neutral.white,
    },
    error: {
      primary: semantic.error.primary,
      tint: semantic.error[200],
      on: neutral.white,
    },
    warning: {
      primary: semantic.warning.primary,
      tint: semantic.warning[200],
      on: neutral.black,
    },
    interactive: {
      primary: semantic.interactive.primary,
      tint: semantic.interactive[200],
      on: neutral.white,
    },
    grey: {
      primary: neutral.grey[400],
      tint: neutral.grey[50],
      on: neutral.white,
    },
  };

/**
 * Icon badge — Figma "Tags & Badges" (442:14616). `filled` = circular solid
 * (Reaction: Like/Dislike/Love); `tinted` = rounded pale (Temperature:
 * Hot/Warm/Cold).
 */
export const IconBadge: React.FC<IconBadgeProps> = ({
  icon,
  variant = "filled",
  color = "success",
  size = "large",
  sx = {},
}) => {
  const c = MAP[color];
  const dim = `calc(${HEIGHTS[size]} * var(--scale, 1))`;
  const filled = variant === "filled";
  return (
    <Box
      sx={{
        width: dim,
        height: dim,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: filled ? "100px" : "8px",
        backgroundColor: filled ? c.primary : c.tint,
        color: filled ? c.on : c.primary,
        ...(filled && { boxShadow: "inset 0px 2px 4px rgba(47, 32, 18, 0.06)" }),
        "& svg": { width: "60%", height: "60%" },
        ...sx,
      }}
    >
      {icon}
    </Box>
  );
};

export default IconBadge;
