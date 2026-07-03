import React from "react";
import { Box, Stack, Typography, SxProps, Theme } from "@mui/material";
import { neutral, semantic } from "../../theme/tokens/colors";
import { theme } from "../../theme";

/** Props for the {@link Snackbar} component. */
export interface SnackbarProps {
  /** Snackbar body text. */
  message: string;
  /** White or Black surface */
  surface?: "white" | "black";
  /** Optional "Learn more"-style action link */
  actionLabel?: string;
  /** Invoked when the action link is clicked. */
  onAction?: () => void;
  /** When `true`, renders the trailing close (X) button. */
  showClose?: boolean;
  /** Invoked when the close (X) button is clicked. */
  onClose?: () => void;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Snackbar — Figma "Snackbar & Breadcrumb" (477:938). White/Black surface with
 * an optional action link and close.
 */
export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  surface = "white",
  actionLabel,
  onAction,
  showClose = false,
  onClose,
  sx = {},
}) => {
  // Dark surface swaps to a translucent charcoal bg with white text; light keeps white bg / black text.
  const black = surface === "black";
  const bg = black ? "rgba(27, 28, 30, 0.9)" : neutral.white;
  const text = black ? neutral.white : neutral.black;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap="12px"
      sx={{
        backgroundColor: bg,
        border: `0.5px solid ${neutral.softSteel[400]}`,
        borderRadius: "4px",
        p: "8px",
        width: 303,
        ...sx,
      }}
    >
      <Typography
        variant="b2"
        sx={{ fontWeight: theme.typography.fontWeight.medium, color: text }}
      >
        {message}
      </Typography>
      <Stack direction="row" alignItems="center" gap="12px">
        {actionLabel && (
          <Typography
            variant="b2"
            onClick={onAction}
            sx={{
              cursor: "pointer",
              whiteSpace: "nowrap",
              color: semantic.interactive.primary,
              textDecoration: "underline",
              fontWeight: theme.typography.fontWeight.regular,
            }}
          >
            {actionLabel}
          </Typography>
        )}
        {showClose && (
          <Box
            onClick={onClose}
            sx={{ display: "flex", cursor: "pointer", color: text }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default Snackbar;
