import React from "react";
import { Button, CircularProgress, ButtonProps } from "@mui/material";

export interface LoaderButtonProps extends ButtonProps {
  /** Whether the button is in loading state */
  isLoading?: boolean;
  /** Size of the loader */
  loaderSize?: number;
  /** Color of the loader */
  loaderColor?: string;
  /** Children content */
  children?: React.ReactNode;
}

export const LoaderButton: React.FC<LoaderButtonProps> = ({
  isLoading = false,
  loaderSize = 15,
  loaderColor = "#fff",
  children,
  disabled,
  ...rest
}) => {
  return (
    <Button {...rest} disabled={disabled || isLoading}>
      {isLoading ? (
        <CircularProgress
          size={loaderSize}
          sx={{ color: loaderColor }}
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default LoaderButton;
