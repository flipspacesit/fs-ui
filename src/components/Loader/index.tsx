import React from "react";
import { CircularProgress, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const LoaderContainer = styled(Box)({
  display: "grid",
  placeItems: "center",
  minBlockSize: "300px",
  height: "100%",
});

export interface LoaderProps {
  /** Custom styles */
  style?: React.CSSProperties;
  /** Size of the circular progress */
  size?: number;
  /** Color of the loader */
  color?: "primary" | "secondary" | "inherit";
}

export const Loader: React.FC<LoaderProps> = ({
  style,
  size = 40,
  color = "primary",
}) => {
  return (
    <LoaderContainer style={style}>
      <CircularProgress
        disableShrink
        size={size}
        color={color}
        data-testid="icon-loader"
      />
    </LoaderContainer>
  );
};

export default Loader;
