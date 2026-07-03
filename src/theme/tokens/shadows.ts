/**
 * Flipspaces Design System — elevation/shadow tokens.
 *
 * `e1…e6` is the elevation scale from the Figma "🔲 Borders & Shadows" canvas
 * (node 72:277). Only `e1` is a bound Figma variable (`Shadows/Grey/Elevation
 * 01`); `e2…e6` are raw effect styles read from the specimen.
 *
 * `elevation03` is a separate bound variable (`Shadows/Grey/Elevation 03`) used
 * across the Colors/Typography canvases for the subtle card/input-hover shadow;
 * it is kept because fs-ui components already use it. (The DS is internally
 * inconsistent between this variable and the e1–e6 specimen — documented here
 * rather than silently reconciled.)
 */
export const shadows = {
  elevation03: "0px 4px 12px 0px rgba(209, 209, 230, 0.6)",
  e1: "0px 4px 4px 0px #d1d1e6",
  e2: "0px 6.47px 32.33px 0px rgba(78, 87, 113, 0.15)",
  e3: "0px 6.47px 19.39px 0px rgba(209, 209, 230, 0.6)",
  e4: "0px 9.7px 48.49px 0px rgba(78, 87, 113, 0.2)",
  e5: "0px 12.93px 32.33px 0px #d1d1e6",
  e6: "0px 12.93px 48.49px 0px rgba(78, 87, 113, 0.3)",
};

export default shadows;
