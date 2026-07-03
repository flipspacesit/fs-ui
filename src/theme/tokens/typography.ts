/**
 * Flipspaces Design System — typography tokens.
 *
 * Source: Figma "📖 Typography Variants" canvas (node 72:5). Single family
 * (Inter). Fixed size scale (no responsive sizing defined in Figma — the
 * responsive `@media` scaling in the MUI theme is an fs-ui addition). Specimen
 * glyphs render at normal leading; size markers use 1.25. No per-step
 * line-height or letter-spacing tokens are defined in the DS.
 */
export const fontFamily = '"Inter", sans-serif';

/** Font-size scale in px. Matches the DS Header/Body/Caption/Foot steps. */
export const fontSize = {
  h1: 24,
  h2: 20,
  h3: 16,
  h4: 14,
  b1: 13,
  b2: 12,
  c1: 11,
  f1: 10,
  f2: 9,
};

/**
 * Inter weight scale shown in the DS specimen.
 * NOTE: this is the design-accurate mapping. The MUI theme's legacy
 * `typography.fontWeight` object uses different (historical) names/values and
 * is kept unchanged for backward compatibility.
 */
export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

export const lineHeight = {
  normal: "normal",
  tight: 1.25,
};

export const letterSpacing = {
  normal: "0",
};

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
};

export default typography;
