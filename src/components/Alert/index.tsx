import React from "react";
import { Box, Stack, Typography, SxProps, Theme } from "@mui/material";
import { semantic, neutral } from "../../theme/tokens/colors";
import { theme } from "../../theme";

/** Semantic colour family for the alert (drives background, accent + text colours). */
export type AlertColor =
  | "error"
  | "info"
  | "success"
  | "warning"
  | "black"
  | "white";
/** Visual weight: `dark` (solid fill), `light` (tinted fill), `stroke` (outlined). */
export type AlertEmphasis = "dark" | "light" | "stroke";

// Per-family palette lookup: `primary` (solid bg / stroke), `tint` (light bg), `deep` (text/accent).
const COLORS: Record<AlertColor, { primary: string; tint: string; deep: string }> =
  {
    error: {
      primary: semantic.error.primary,
      tint: semantic.error[200],
      deep: semantic.error[700],
    },
    info: {
      primary: semantic.interactive.primary,
      tint: semantic.interactive[200],
      deep: semantic.interactive[600],
    },
    success: {
      primary: semantic.success.primary,
      tint: semantic.success[200],
      deep: semantic.success[700],
    },
    warning: {
      primary: semantic.warning.primary,
      tint: semantic.warning[200],
      deep: semantic.warning[800],
    },
    black: { primary: neutral.black, tint: neutral.grey[50], deep: neutral.black },
    white: { primary: neutral.white, tint: neutral.white, deep: neutral.black },
  };

/** Props for {@link Alert}. */
export interface AlertProps {
  /** Bold heading line rendered above the message. */
  title?: string;
  /** Secondary body text. */
  message?: string;
  /** Colour family */
  color?: AlertColor;
  /** Dark (solid) / Light (tinted) / Stroke (outlined) */
  emphasis?: AlertEmphasis;
  /** Leading status icon */
  icon?: React.ReactNode;
  /** Show the trailing divider + close button. */
  showClose?: boolean;
  /** Invoked when the close button is clicked. */
  onClose?: () => void;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Inline 14px dismiss glyph; inherits `currentColor` so it picks up the alert accent.
const CloseX: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path
      d="M12 4L4 12M4 4l8 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Alert / Snackbar-primary — Figma "Snackbar & Breadcrumb" (477:938). Colour
 * family × Dark/Light/Stroke emphasis, with leading icon + close.
 */
export const Alert: React.FC<AlertProps> = ({
  title,
  message,
  color = "info",
  emphasis = "light",
  icon,
  showClose = true,
  onClose,
  sx = {},
}) => {
  const c = COLORS[color];
  const dark = emphasis === "dark";
  const stroke = emphasis === "stroke";
  const bg = dark ? c.primary : stroke ? neutral.white : c.tint;
  const titleColor = dark ? neutral.white : c.deep;
  const msgColor = dark ? neutral.white : neutral.black;
  const accent = dark ? neutral.white : c.deep;
  const border = dark
    ? `0.5px solid ${neutral.white}`
    : stroke
      ? `0.5px solid ${color === "white" ? neutral.softSteel[400] : c.primary}`
      : "none";

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap="12px"
      sx={{
        backgroundColor: bg,
        border,
        borderRadius: "8px",
        p: "8px",
        width: "fit-content",
        ...sx,
      }}
    >
      {icon && (
        <Box sx={{ display: "flex", color: accent, width: 16, height: 16 }}>
          {icon}
        </Box>
      )}
      <Stack gap="4px" sx={{ flex: 1 }}>
        {title && (
          <Typography
            variant="b1"
            sx={{ fontWeight: theme.typography.fontWeight.light, color: titleColor }}
          >
            {title}
          </Typography>
        )}
        {message && (
          <Typography
            variant="b2"
            sx={{ fontWeight: theme.typography.fontWeight.medium, color: msgColor }}
          >
            {message}
          </Typography>
        )}
      </Stack>
      {showClose && (
        <>
          <Box
            sx={{
              width: "0.5px",
              alignSelf: "stretch",
              backgroundColor: accent,
              opacity: dark ? 0.4 : 0.6,
            }}
          />
          <Box
            onClick={onClose}
            sx={{ display: "flex", cursor: "pointer", color: accent }}
          >
            <CloseX />
          </Box>
        </>
      )}
    </Stack>
  );
};

export default Alert;
