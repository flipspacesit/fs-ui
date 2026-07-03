/**
 * Convenience references to the --doc-* CSS variables (defined in index.css).
 * Use in MUI `sx` so a theme flip is instant (no JS recompute).
 */
export const t = {
  bg: "var(--doc-bg)",
  surface: "var(--doc-surface)",
  sunken: "var(--doc-sunken)",
  border: "var(--doc-border)",
  borderStrong: "var(--doc-border-strong)",
  edgeHighlight: "var(--doc-edge-highlight)",

  text: "var(--doc-text)",
  textMuted: "var(--doc-text-muted)",
  textSubtle: "var(--doc-text-subtle)",

  accent: "var(--doc-accent)",
  accentHover: "var(--doc-accent-hover)",
  accentTint: "var(--doc-accent-tint)",
  accentWash: "var(--doc-accent-wash)",

  signal: "var(--doc-signal)",
  signalHover: "var(--doc-signal-hover)",
  signalTint: "var(--doc-signal-tint)",
  signalTint2: "var(--doc-signal-tint-2)",

  focus: "var(--doc-focus)",
  pillText: "var(--doc-pill-text)",

  info: "var(--doc-info)",
  infoBg: "var(--doc-info-bg)",
  success: "var(--doc-success)",
  successBg: "var(--doc-success-bg)",
  warning: "var(--doc-warning)",
  warningBg: "var(--doc-warning-bg)",
  error: "var(--doc-error)",
  errorBg: "var(--doc-error-bg)",

  shadowSm: "var(--doc-shadow-sm)",
  shadowMd: "var(--doc-shadow-md)",
  shadowLg: "var(--doc-shadow-lg)",
  shadowXl: "var(--doc-shadow-xl)",

  codeBg: "var(--doc-code-bg)",
  codeText: "var(--doc-code-text)",
} as const;

export const SANS =
  '"Inter Variable", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
export const MONO =
  '"JetBrains Mono Variable", "JetBrains Mono", "Fira Code", Consolas, monospace';

export const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

/** Shell layout dimensions (px) — single source for the sticky offsets. */
export const TOPBAR_H = 64;
export const SIDEBAR_W = 288;
export const TOC_W = 224;
