import React from "react";
import { Stack, Typography, SxProps, Theme } from "@mui/material";
import {
  FontSizeMap,
  HEIGHTS,
  ButtonBorderRadiusMap,
  ComponentSize,
  ComponentVariant,
} from "../../constants";
import { theme } from "../../theme";
import { semantic, neutral } from "../../theme/tokens/colors";

/** Props for the {@link Tag} component. */
export interface TagProps {
  /** Text label for the tag */
  label: string;
  /** Text color */
  color?: string;
  /** Background color */
  backgroundColor?: string;
  /** Border color */
  borderColor?: string;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Visual variant - rectangular or round */
  variant?: ComponentVariant;
  /** Size of the tag */
  size?: ComponentSize;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Tag/Badge component for displaying a label with an optional leading icon.
 * Colors, border, size (`ComponentSize` height) and shape (`rectangular` vs
 * `round` via `ComponentVariant`) are all configurable; defaults render a
 * light-blue rectangular tag. Height scales with the `--scale` CSS variable.
 */
export const Tag: React.FC<TagProps> = ({
  label,
  color = "#1B1C1E",
  backgroundColor = "#F1F7FF",
  borderColor = "#AEB6CE",
  icon,
  variant = "rectangular",
  size = "small",
  sx = {},
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={"8px"}
      sx={{
        backgroundColor,
        borderColor,
        color,
        borderRadius: ButtonBorderRadiusMap[variant][size],
        padding: "8px",
        height: `calc(${HEIGHTS[size]} * var(--scale, 1))`,
        width: "100%",
        border: `0.5px solid ${borderColor}`,
        ...sx,
      }}
    >
      {icon && (
        <Stack alignItems="center" justifyContent="center">
          {icon}
        </Stack>
      )}
      <Typography
        variant={FontSizeMap[size] as "h1" | "h2" | "h3" | "h4" | "body1" | "body2"}
        sx={{ fontWeight: theme.typography.fontWeight.medium }}
      >
        {label}
      </Typography>
    </Stack>
  );
};

/** Props for the {@link StatusChip} component. */
export interface StatusChipProps {
  /** Status label text */
  label: string;
  /** Status type for automatic coloring */
  status?: "success" | "warning" | "error" | "info" | "interactive" | "default";
  /** Outlined (tinted bg + border) or Filled (solid) */
  emphasis?: "outlined" | "filled";
  /** Round (pill) or rectangular */
  shape?: ComponentVariant;
  /** Override background color */
  backgroundColor?: string;
  /** Override text color */
  color?: string;
  /** Size of the chip */
  size?: ComponentSize;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/** Resolved color set for one status, covering both the outlined and filled emphases. */
interface StatusStyle {
  /** Outlined background (tinted). */
  bg: string;
  /** Outlined text color. */
  color: string;
  /** Outlined border color. */
  border: string;
  /** Filled (solid) background. */
  filledBg: string;
  /** Filled text color. */
  filledColor: string;
}

// Design-system semantic chip colors (Figma "Tags" 442:14616).
const statusColors: Record<string, StatusStyle> = {
  success: {
    bg: semantic.success[200],
    color: neutral.black,
    border: semantic.success[700],
    filledBg: semantic.success.primary,
    filledColor: neutral.white,
  },
  warning: {
    bg: semantic.warning[200],
    color: neutral.black,
    border: semantic.warning.primary,
    filledBg: semantic.warning.primary,
    filledColor: neutral.black,
  },
  error: {
    bg: semantic.error[200],
    color: neutral.black,
    border: semantic.error.primary,
    filledBg: semantic.error.primary,
    filledColor: neutral.white,
  },
  info: {
    bg: semantic.interactive[200],
    color: neutral.black,
    border: semantic.interactive.primary,
    filledBg: semantic.interactive.primary,
    filledColor: neutral.white,
  },
  interactive: {
    bg: semantic.interactive[200],
    color: neutral.black,
    border: semantic.interactive.primary,
    filledBg: semantic.interactive.primary,
    filledColor: neutral.white,
  },
  default: {
    bg: neutral.white,
    color: neutral.black,
    border: neutral.softSteel[400],
    filledBg: neutral.grey[400],
    filledColor: neutral.white,
  },
};

/**
 * Status Chip for status indicators, auto-colored per `status` from the
 * design-system palette (Figma "Tags" 442:14616). `emphasis` toggles
 * outlined (tinted bg + border) vs filled (solid); `shape` toggles pill vs
 * rectangular; `size` sets `--scale`-aware height. `backgroundColor`/`color`
 * override the derived colors.
 */
export const StatusChip: React.FC<StatusChipProps> = ({
  label,
  status = "default",
  emphasis = "outlined",
  shape = "round",
  backgroundColor,
  color,
  size = "small",
  sx = {},
}) => {
  const statusStyle = statusColors[status] ?? statusColors.default;
  const filled = emphasis === "filled";

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor:
          backgroundColor || (filled ? statusStyle.filledBg : statusStyle.bg),
        color: color || (filled ? statusStyle.filledColor : statusStyle.color),
        borderRadius: shape === "round" ? "100px" : "4px",
        padding: "4px 12px",
        height: `calc(${HEIGHTS[size]} * var(--scale, 1))`,
        border: filled ? "none" : `0.5px solid ${statusStyle.border}`,
        display: "inline-flex",
        width: "fit-content",
        ...sx,
      }}
    >
      <Typography
        variant={FontSizeMap[size] as "h1" | "h2" | "h3" | "h4" | "body1" | "body2"}
        sx={{
          fontWeight: theme.typography.fontWeight.medium,
          whiteSpace: "nowrap",
          color: "inherit",
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
};

/** Default export: the {@link Tag} component. */
export default Tag;
