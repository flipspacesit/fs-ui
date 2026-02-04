// Size type definitions
export type ComponentSize =
  | "extraSmall"
  | "small"
  | "medium"
  | "large"
  | "extraLarge";

export type ComponentVariant = "round" | "rectangular";

// Height constants for different component sizes
export const HEIGHTS: Record<ComponentSize, string> = {
  extraSmall: "20px",
  small: "24px",
  medium: "28px",
  large: "32px",
  extraLarge: "48px",
};

// Font size mapping to MUI Typography variants
export const FontSizeMap: Record<ComponentSize, string> = {
  extraSmall: "b2",
  small: "b2",
  medium: "h4",
  large: "h3",
  extraLarge: "h4",
};

// Border radius mapping for buttons/components
export const ButtonBorderRadiusMap: Record<
  ComponentVariant,
  Record<ComponentSize, string>
> = {
  rectangular: {
    extraSmall: "4px",
    small: "4px",
    medium: "6px",
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

// Common color tokens (can be extended based on theme)
export const Colors = {
  // Primary colors
  primary: {
    main: "#3361FF",
    light: "#DEE7FF",
    dark: "#1B1C1E",
  },
  // Border colors
  border: {
    light: "#AEB6CE",
    medium: "#C3D0F5",
    dark: "#1B1C1E",
  },
  // Background colors
  background: {
    white: "#FFFFFF",
    selected: "#DEE7FF",
    hover: "#DEE7FF",
  },
  // Text colors
  text: {
    primary: "#1B1C1E",
    secondary: "#6B7280",
    disabled: "#9CA3AF",
  },
  // Status colors
  status: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
};
