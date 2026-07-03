/** Shared size scale for fs-ui controls (buttons, inputs, icon buttons, …). */
export type ComponentSize =
  | "extraSmall"
  | "small"
  | "medium"
  | "large"
  | "extraLarge";

/** Shape variant shared by buttons/controls — `round` = pill, `rectangular` = radius-sm. */
export type ComponentVariant = "round" | "rectangular";

/** Control heights per {@link ComponentSize} (px, before `--scale`). */
export const HEIGHTS: Record<ComponentSize, string> = {
  extraSmall: "20px",
  small: "24px",
  medium: "28px",
  large: "32px",
  extraLarge: "48px",
};

/**
 * Maps a {@link ComponentSize} to the MUI Typography variant used for its label.
 * Aligned to the DS component type scale: small 24px→12(b2), medium 28px→13(b1),
 * large 32px→14(h4). (Figma "Buttons" 257:2.)
 */
export const FontSizeMap: Record<ComponentSize, string> = {
  extraSmall: "c1", // 11px
  small: "b2", // 12px
  medium: "b1", // 13px
  large: "h4", // 14px
  extraLarge: "h4", // 14px
};

/** Corner radius per shape × size — `round` is always pill (100px), `rectangular` is radius-sm (8px, 4px at extraSmall). */
export const ButtonBorderRadiusMap: Record<
  ComponentVariant,
  Record<ComponentSize, string>
> = {
  rectangular: {
    extraSmall: "4px",
    small: "8px",
    medium: "8px",
    large: "8px",
    extraLarge: "8px",
  },
  round: {
    extraSmall: "100px",
    small: "100px",
    medium: "100px",
    large: "100px",
    extraLarge: "100px",
  },
};

import { primary, neutral, semantic } from "../theme/tokens/colors";

/**
 * Common color tokens.
 *
 * @deprecated Prefer the MUI theme palette (`theme.palette.*`) or the token
 * layer (`src/theme/tokens`) directly. These values are now derived from the
 * design-system tokens and kept only for backward compatibility.
 */
export const Colors = {
  // Primary / action colors
  primary: {
    main: semantic.interactive.primary,
    light: semantic.interactive[200],
    dark: primary.slateBlue.primaryDark,
  },
  // Border colors
  border: {
    light: neutral.softSteel[400],
    medium: primary.slateBlue[300],
    dark: neutral.black,
  },
  // Background colors
  background: {
    white: neutral.white,
    selected: primary.slateBlue[100],
    hover: primary.slateBlue[50],
  },
  // Text colors
  text: {
    primary: "#1B1C1E",
    secondary: neutral.grey[400],
    disabled: neutral.grey[300],
  },
  // Status colors
  status: {
    success: semantic.success.primary,
    warning: semantic.warning.primary,
    error: semantic.error.primary,
    info: semantic.interactive.primary,
  },
};
