import React from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const LoaderContainer = styled(Box)<{ bgcolor?: string }>(({ bgcolor }) => ({
  position: "fixed",
  width: "100%",
  height: "100%",
  background: bgcolor || "rgba(0, 0, 0, 0.2)",
  display: "flex",
  alignItems: "center",
  top: 0,
  left: 0,
  border: 0,
  right: 0,
  justifyContent: "center",
  zIndex: 10001,
}));

export interface PageLoaderProps {
  /** Whether the loader is visible */
  loading: boolean;
  /** Optional text to display below the spinner */
  text?: string;
  /** Background color/opacity */
  bg?: string;
  /** Text color */
  textColor?: string;
  /** Size of the circular progress */
  size?: number;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  loading,
  text = "",
  bg = "rgba(0, 0, 0, 0.2)",
  textColor = "#fff",
  size = 40,
}) => {
  if (!loading) return null;

  return (
    <LoaderContainer bgcolor={bg}>
      <Stack alignItems="center" spacing={2}>
        <CircularProgress disableShrink size={size} data-testid="icon-loading" />
        {text && (
          <Typography variant="h6" sx={{ color: textColor }}>
            {text}
          </Typography>
        )}
      </Stack>
    </LoaderContainer>
  );
};

export default PageLoader;
