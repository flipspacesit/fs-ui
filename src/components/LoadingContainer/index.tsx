import React from "react";
import { Box, CircularProgress, Typography, SxProps, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * Full-page loading container
 */
export const LoadingContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  gap: "16px",
});

/**
 * Inline loading container for sections
 */
export const InlineLoadingContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px",
  gap: "16px",
});

export interface LoadingSpinnerProps {
  /** Loading message to display */
  message?: string;
  /** Size of the spinner */
  size?: number;
  /** Color of the spinner */
  color?: "primary" | "secondary" | "inherit";
  /** Full page loading */
  fullPage?: boolean;
  /** Custom container styles */
  containerSx?: SxProps<Theme>;
}

/**
 * Loading spinner component with optional message
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  size = 40,
  color = "primary",
  fullPage = false,
  containerSx = {},
}) => {
  const Container = fullPage ? LoadingContainer : InlineLoadingContainer;

  return (
    <Container sx={containerSx}>
      <CircularProgress size={size} color={color} />
      {message && (
        <Typography
          variant="body1"
          sx={{
            color: "#6B7280",
            fontWeight: 400,
          }}
        >
          {message}
        </Typography>
      )}
    </Container>
  );
};

export interface OverlayLoadingProps {
  /** Whether loading is active */
  loading: boolean;
  /** Loading message */
  message?: string;
  /** Spinner size */
  size?: number;
  /** Children to render behind overlay */
  children: React.ReactNode;
}

/**
 * Overlay loading component that covers its children
 */
export const OverlayLoading: React.FC<OverlayLoadingProps> = ({
  loading,
  message,
  size = 40,
  children,
}) => {
  return (
    <Box sx={{ position: "relative" }}>
      {children}
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 10,
            gap: 2,
          }}
        >
          <CircularProgress size={size} />
          {message && (
            <Typography variant="body2" color="text.secondary">
              {message}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default LoadingContainer;
