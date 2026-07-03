/**
 * Flipspaces Design System token layer.
 *
 * Hand-authored mirror of the canonical Figma Design System
 * (file `adSPuBSUsaaSvaCUvLPMf1`). This is the single source of truth the MUI
 * theme (`src/theme/index.ts`), the exported `Colors` constant, and the
 * `dist/style.css` CSS variables are all derived from.
 *
 * Sources: Colors (72:3), Typography (72:5), Grids & Spacing (72:6),
 * Borders & Shadows (72:277).
 */
import { colors } from "./colors";
import { shadows } from "./shadows";
import { typography } from "./typography";
import { spacing, grid, breakpoints, baseUnit } from "./spacing";
import { radii } from "./radii";

export { colors, primary, neutral, semantic, misc, buttons } from "./colors";
export { shadows } from "./shadows";
export {
  typography,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} from "./typography";
export { spacing, grid, breakpoints, baseUnit } from "./spacing";
export { radii } from "./radii";

export const tokens = {
  color: colors,
  typography,
  spacing,
  grid,
  breakpoints,
  baseUnit,
  radii,
  shadow: shadows,
};

export default tokens;
