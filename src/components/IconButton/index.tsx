import React from "react";
import {
  IconButton as MUIIconButton,
  IconButtonProps,
  SxProps,
  Theme,
} from "@mui/material";
import { HEIGHTS, ComponentSize, ComponentVariant } from "../../constants";
import { theme } from "../../theme";

/** Design-system colour family for the button surface/icon. */
export type IconButtonColor = "white" | "yellow" | "green" | "blue";

/** Props for the icon-only {@link IconButton}. */
export interface FsIconButtonProps
  extends Omit<IconButtonProps, "color" | "size"> {
  /** Icon element (falls back to children) */
  icon?: React.ReactNode;
  /** Design-system colour family */
  color?: IconButtonColor;
  /** Square footprint size — matches button heights (20/24/28/32/48) */
  size?: ComponentSize;
  /** Shape — round (pill) or rectangular (radius-sm) */
  variant?: ComponentVariant;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Glyph (SVG) edge length in px per size, scaled by --scale at render time.
const iconGlyphPx: Record<ComponentSize, number> = {
  extraSmall: 14,
  small: 16,
  medium: 18,
  large: 20,
  extraLarge: 24,
};

// Maps a colour family to its background/icon/border/hover token set.
const colorStyles = (color: IconButtonColor) => {
  switch (color) {
    case "yellow":
      return {
        backgroundColor: theme.palette.yellow.main,
        iconColor: theme.palette.black.main,
        border: "none",
        hover: theme.palette.yellow.hover,
      };
    case "green":
      return {
        backgroundColor: theme.palette.success.main,
        iconColor: theme.palette.white.main,
        border: "none",
        hover: theme.palette.success[700],
      };
    case "blue":
      return {
        backgroundColor: theme.palette.primaryBlue.main,
        iconColor: theme.palette.white.main,
        border: "none",
        hover: theme.palette.primaryBlue[700],
      };
    case "white":
    default:
      return {
        backgroundColor: theme.palette.white.main,
        iconColor: theme.palette.black.main,
        border: `0.5px solid ${theme.palette.softSteel[400]}`,
        hover: theme.palette.softSteel[50],
      };
  }
};

/**
 * Icon-only button — Figma "Buttons" (257:2). Round or square, four colour
 * families, sized to match the text buttons.
 */
export const IconButton: React.FC<FsIconButtonProps> = ({
  icon,
  children,
  color = "white",
  size = "medium",
  variant = "round",
  sx = {},
  ...props
}) => {
  const dim = `calc(${HEIGHTS[size]} * var(--scale, 1))`;
  const radius = variant === "round" ? "100px" : "8px";
  const glyph = `calc(${iconGlyphPx[size]}px * var(--scale, 1))`;
  const c = colorStyles(color);
  return (
    <MUIIconButton
      disableRipple
      sx={{
        width: dim,
        height: dim,
        padding: 0,
        borderRadius: radius,
        backgroundColor: c.backgroundColor,
        color: c.iconColor,
        border: c.border,
        "&:hover": { backgroundColor: c.hover },
        "&.Mui-disabled": {
          backgroundColor: theme.palette.grey[50],
          color: theme.palette.grey[300],
          border: "none",
        },
        "& svg": { width: glyph, height: glyph },
        ...sx,
      }}
      {...props}
    >
      {icon ?? children}
    </MUIIconButton>
  );
};

export default IconButton;
