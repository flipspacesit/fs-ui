import React from "react";
import { Stack, Typography, SxProps, Theme } from "@mui/material";
import {
  FontSizeMap,
  HEIGHTS,
  ButtonBorderRadiusMap,
  ComponentSize,
  ComponentVariant,
} from "../../constants";

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
  /** Additional styles */
  sx?: SxProps<Theme>;
}

/**
 * Tag/Badge component for displaying labels with optional icons
 */
export const Tag: React.FC<TagProps> = ({
  label,
  color = "#1B1C1E",
  backgroundColor = "#F0F4FF",
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
        sx={{ fontWeight: 500 }}
      >
        {label}
      </Typography>
    </Stack>
  );
};

export interface StatusChipProps {
  /** Status label text */
  label: string;
  /** Status type for automatic coloring */
  status?: "success" | "warning" | "error" | "info" | "default";
  /** Override background color */
  backgroundColor?: string;
  /** Override text color */
  color?: string;
  /** Size of the chip */
  size?: ComponentSize;
  /** Additional styles */
  sx?: SxProps<Theme>;
}

const statusColors = {
  success: { bg: "#D1FAE5", color: "#065F46", border: "#10B981" },
  warning: { bg: "#FEF3C7", color: "#92400E", border: "#F59E0B" },
  error: { bg: "#FEE2E2", color: "#991B1B", border: "#EF4444" },
  info: { bg: "#DBEAFE", color: "#1E40AF", border: "#3B82F6" },
  default: { bg: "#F3F4F6", color: "#374151", border: "#9CA3AF" },
};

/**
 * Status Chip component for displaying status indicators
 */
export const StatusChip: React.FC<StatusChipProps> = ({
  label,
  status = "default",
  backgroundColor,
  color,
  size = "small",
  sx = {},
}) => {
  const statusStyle = statusColors[status];

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: backgroundColor || statusStyle.bg,
        color: color || statusStyle.color,
        borderRadius: "100px",
        padding: "4px 12px",
        height: `calc(${HEIGHTS[size]} * var(--scale, 1))`,
        border: `1px solid ${statusStyle.border}`,
        display: "inline-flex",
        width: "fit-content",
        ...sx,
      }}
    >
      <Typography
        variant={FontSizeMap[size] as "h1" | "h2" | "h3" | "h4" | "body1" | "body2"}
        sx={{ fontWeight: 500, whiteSpace: "nowrap" }}
      >
        {label}
      </Typography>
    </Stack>
  );
};

export default Tag;
