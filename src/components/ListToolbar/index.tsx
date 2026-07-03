import React from "react";
import { Stack, SxProps, Theme } from "@mui/material";
import { neutral } from "../../theme/tokens/colors";

/** Props for {@link ListToolbar}. */
export interface ListToolbarProps {
  /** Left-aligned content (search, tabs) */
  left?: React.ReactNode;
  /** Right-aligned content (filters, sort, action button) */
  right?: React.ReactNode;
  /** Bar height */
  size?: "large" | "medium" | "small";
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Pixel min-height per size variant.
const HEIGHT: Record<NonNullable<ListToolbarProps["size"]>, number> = {
  large: 76,
  medium: 68,
  small: 60,
};

/**
 * List / search toolbar — Figma "Grouped Components" (1143:12713). A white bar
 * (SoftSteel border, radius-sm, Blue/Elevation-02) with left + right slots —
 * compose SearchInput, Tabs, Dropdown, Button, etc. into it.
 */
export const ListToolbar: React.FC<ListToolbarProps> = ({
  left,
  right,
  size = "medium",
  sx = {},
}) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    gap="12px"
    sx={{
      minHeight: HEIGHT[size],
      width: "100%",
      boxSizing: "border-box",
      backgroundColor: neutral.white,
      border: `1px solid ${neutral.softSteel[400]}`,
      borderRadius: "8px",
      px: "12px",
      boxShadow: "0px 4px 4px 0px rgba(78, 87, 113, 0.05)",
      flexWrap: "wrap",
      ...sx,
    }}
  >
    <Stack direction="row" alignItems="center" gap="12px" flexWrap="wrap">
      {left}
    </Stack>
    <Stack direction="row" alignItems="center" gap="12px" flexWrap="wrap">
      {right}
    </Stack>
  </Stack>
);

export default ListToolbar;
