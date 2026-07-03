/**
 * Flipspaces Design System — spacing & grid tokens.
 *
 * Source: Figma "📏 Grids and Column Setup" canvas (node 72:6). The whole
 * system is built on a 4px base unit. `spacing[n]` = n × 4px.
 *
 * NOTE: MUI's `theme.spacing` factor is intentionally left at its default (8)
 * for backward compatibility — consume this 4px scale via `tokens.spacing` or
 * the `--fs-space-*` CSS variables rather than `theme.spacing()`.
 */
export const baseUnit = 4;

/** 4px step scale (space-1 … space-8 in Figma). */
export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
};

/** 12-column responsive grid. Columns are always 12; gutter/margin vary by breakpoint. */
export const grid = {
  columns: 12,
  gutter: 16, // default
  margin: 24, // default (14" base)
  responsive: {
    // breakpoint px -> { gutter, margin }
    1280: { gutter: 16, margin: 40 },
    1366: { gutter: 16, margin: 24 }, // ✅ design base (14")
    1536: { gutter: 16, margin: 32 },
    1920: { gutter: 24, margin: 40 },
    2560: { gutter: 32, margin: 64 },
  },
};

/** Reference viewport widths from the DS "Screen Sizes & Viewport" guide. */
export const breakpoints = {
  smallLaptop: 1280,
  base: 1366, // most common (14")
  midRange: 1536,
  desktopHD: 1920,
  wide: 2560,
};

export default { baseUnit, spacing, grid, breakpoints };
