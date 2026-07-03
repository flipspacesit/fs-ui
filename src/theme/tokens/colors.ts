/**
 * Flipspaces Design System — color tokens.
 *
 * Single source of truth for color, extracted from the canonical Figma
 * Design System (file `adSPuBSUsaaSvaCUvLPMf1`, "🎨 Colors" canvas).
 * Values are the exact hex from the Figma variables — keep names aligned with
 * Figma (`Primary/SlateBlue/500`, `Semantics/Warning/Primary`, …) and only edit
 * when re-syncing with the design system.
 */

/** Primary brand ramps. */
export const primary = {
  // Primary / Yellow — the Flipspaces brand color.
  yellow: {
    50: "#fffdf2",
    100: "#fffce6",
    200: "#fff5bf",
    300: "#ffee99",
    400: "#ffd84d",
    brand: "#ffc100",
    hover: "#ffa800",
    700: "#e69100",
    800: "#bf7000",
    900: "#733700",
    950: "#4a2000",
  },
  // Primary / SlateBlue — the primary neutral-accent.
  slateBlue: {
    50: "#f1f7ff",
    100: "#e2ebf7",
    200: "#d0ddee",
    300: "#a5bad5",
    400: "#6f84a8",
    primary: "#425281",
    primaryDark: "#344168",
    700: "#2a375e",
    800: "#1d284f",
    900: "#0a112e",
    950: "#04091f",
  },
  // Primary / Blue.
  blue: {
    50: "#f3f6ff",
    100: "#e9eeff",
    300: "#c3d0f5",
    400: "#9fb3ed",
    500: "#738bd2",
    primary: "#5970b7",
    700: "#40549c",
    800: "#293a7d",
    900: "#18255e",
    950: "#0a123d",
  },
  // Primary / Teal — only the Hover step is defined in the DS; used for the "green" ghost button.
  teal: {
    primary: "#01a596",
    hover: "#01a596",
  },
};

/** Neutral ramps + base neutrals. */
export const neutral = {
  // Neutral / SoftSteel — borders and subtle surfaces.
  softSteel: {
    50: "#edeff5",
    100: "#dadce6",
    200: "#cfd3df",
    300: "#bfc5d7",
    400: "#aeb6ce",
  },
  // Neutral / Grey.
  grey: {
    50: "#f0f0f0",
    100: "#d9d9d9",
    200: "#bfbfbf",
    300: "#919191",
    400: "#616161",
  },
  // Neutral / 900 — darkest neutral.
  black: "#212529",
  // Primary/Black & White/Black — the text ink used across the DS (distinct from Neutral/900).
  ink: "#1b1c1e",
  white: "#ffffff",
};

/** Semantic (status/action) ramps. `primary` is the default/"main" step. */
export const semantic = {
  success: {
    200: "#e5f5e8",
    300: "#c3e8ca",
    primary: "#469951",
    700: "#36763e",
    950: "#1a5e24",
  },
  error: {
    200: "#ffe4e0",
    300: "#fb9587",
    400: "#fb452b",
    primary: "#df2409",
    700: "#bf1b03",
    900: "#a21703",
  },
  warning: {
    200: "#fceec0",
    400: "#f7c352",
    primary: "#f59e0b",
    600: "#db8709",
    800: "#944b03",
  },
  interactive: {
    200: "#c5d2ff",
    400: "#8fa7fd",
    primary: "#3659db",
    600: "#374cab",
    800: "#233487",
  },
};

/** Decorative / Misc accents (base · light · superLight). */
export const misc = {
  cocoaBrown: { base: "#d26515", light: "#ffaa6d", superLight: "#ffcfac" },
  purplishPink: { base: "#cd5ea1", light: "#fca1d8" },
  sunriseOrange: { base: "#d97555", light: "#e8a38d", superLight: "#fce9e7" },
  lavenderIndigo: { base: "#8f5fe0", light: "#c39ffe", superLight: "#e1d0fc" },
  duskyPurple: { base: "#915384", light: "#ae78a2", superLight: "#cbb2c6" },
  lightSeaGreen: { base: "#41a3b9", light: "#61c5bc", superLight: "#bbe5e2" },
  moodyBlue: { base: "#7074c8", light: "#96aff5", superLight: "#becfff" },
};

/**
 * Component-level button tokens (Figma `Buttons/*` group). Layered over the
 * primitives — the tertiary/light-blue contained button uses these.
 */
export const buttons = {
  tertiary: "#dee7ff", // Buttons/Blue/Selected — tertiary contained fill
  tertiaryHover: "#c3d0f5", // Buttons/Blue/Hover
};

/** All color tokens grouped. */
export const colors = { primary, neutral, semantic, misc, buttons };

export default colors;
