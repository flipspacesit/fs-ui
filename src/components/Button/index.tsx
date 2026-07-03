import React from "react";
import { Button as MUIButton, useTheme, ButtonProps } from "@mui/material";
import { ArrowDown } from "../../icons/ArrowDown";
import { ArrowUp } from "../../icons/ArrowUp";

/** Props for {@link Button} — extends MUI `ButtonProps` verbatim. */
export interface FsButtonProps extends ButtonProps {
  /** Button label/content. */
  children?: React.ReactNode;
}

/**
 * Basic Button wrapper around MUI Button.
 * Passes all MUI `ButtonProps` straight through (variant/color/size/sx).
 */
export const Button: React.FC<FsButtonProps> = ({ children, ...props }) => {
  return <MUIButton {...props}>{children}</MUIButton>;
};

/** Props for {@link OpenDropDownButton} — extends MUI `ButtonProps`. */
export interface OpenDropDownButtonProps extends ButtonProps {
  /** Whether the dropdown is currently open/selected */
  selected?: boolean;
  /** Button label/content. */
  children?: React.ReactNode;
}

/**
 * Button for opening dropdowns with visual feedback for open/closed state.
 * Outlined, capitalized; swaps an up/down chevron end-icon and tints its
 * border/background when `selected` toggles between open and closed.
 */
export const OpenDropDownButton: React.FC<OpenDropDownButtonProps> = ({
  children,
  selected = false,
  sx,
  ...props
}) => {
  const theme = useTheme();

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
        color: theme.palette.black.main,
        backgroundColor: selected
          ? theme.palette.tertiary.main
          : theme.palette.white.main,
        borderStyle: "solid",
        borderColor: selected
          ? theme.palette.primaryBlue[500]
          : theme.palette.softSteel[400],
        ...sx,
      }}
      {...props}
    >
      {children}
    </MUIButton>
  );
};

/** Props for {@link DropDownApplyButton} — extends MUI `ButtonProps`. */
export interface DropDownApplyButtonProps extends ButtonProps {
  /** Button label/content. */
  children?: React.ReactNode;
}

/**
 * Apply/Submit button for dropdown actions.
 * Full-width, small, pill-shaped tertiary button with a darkened hover state.
 * The pale fill is the DS `Buttons/Blue/Selected` (tertiary) token — an
 * intentionally low-saturation "selected" affordance, not a disabled state; the
 * dark ink label keeps it well above AA contrast (~13.8:1).
 */
export const DropDownApplyButton: React.FC<DropDownApplyButtonProps> = ({
  children,
  sx,
  ...props
}) => {
  const theme = useTheme();

  return (
    <MUIButton
      fullWidth
      color="secondary"
      size="small"
      sx={{
        backgroundColor: theme.palette.tertiary.main + " !important",
        color: theme.palette.black.main + " !important",
        fontSize: "12px !important",
        padding: "4px 8px !important",
        borderRadius: "100px",
        "&:hover": {
          backgroundColor: theme.palette.tertiary.dark + " !important",
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
