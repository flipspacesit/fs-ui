import React from "react";
import { alpha, Button as MUIButton, useTheme, ButtonProps } from "@mui/material";
import { ArrowDown } from "../../icons/ArrowDown";
import { ArrowUp } from "../../icons/ArrowUp";

export interface FsButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

/**
 * Basic Button wrapper around MUI Button
 */
export const Button: React.FC<FsButtonProps> = ({ children, ...props }) => {
  return <MUIButton {...props}>{children}</MUIButton>;
};

export interface OpenDropDownButtonProps extends ButtonProps {
  /** Whether the dropdown is currently open/selected */
  selected?: boolean;
  children?: React.ReactNode;
}

/**
 * Button for opening dropdowns with visual feedback for open/closed state
 */
export const OpenDropDownButton: React.FC<OpenDropDownButtonProps> = ({
  children,
  selected = false,
  ...props
}) => {
  const theme = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const palette = theme.palette as any;
  const blueMain = palette?.blue?.main || "#3361FF";
  const softSteelMain = palette?.softSteel?.main || "#AEB6CE";

  return (
    <MUIButton
      size="medium"
      variant="outlined"
      color="inherit"
      endIcon={selected ? <ArrowUp /> : <ArrowDown />}
      sx={{
        textTransform: "capitalize",
        borderWidth: "0.5px !important",
        borderRadius: "4px",
        fontSize: 13,
        fontWeight: 500,
        backgroundColor: selected ? alpha(blueMain, 0.45) : "inherit",
        borderStyle: "solid",
        borderColor: selected ? blueMain : softSteelMain,
      }}
      {...props}
    >
      {children}
    </MUIButton>
  );
};

export interface DropDownApplyButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

/**
 * Apply/Submit button for dropdown actions
 */
export const DropDownApplyButton: React.FC<DropDownApplyButtonProps> = ({
  children,
  sx,
  ...props
}) => {
  const theme = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const palette = theme.palette as any;
  const blue200 = palette?.blue?.[200] || "#DEE7FF";
  const blue300 = palette?.blue?.[300] || "#C3D0F5";

  return (
    <MUIButton
      fullWidth
      color="secondary"
      size="small"
      sx={{
        backgroundColor: blue200 + " !important",
        fontSize: "12px !important",
        padding: "4px 8px !important",
        borderRadius: "100px",
        "&:hover": {
          backgroundColor: blue300 + " !important",
          boxShadow: "none !important",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
