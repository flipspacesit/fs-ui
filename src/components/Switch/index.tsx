import React from "react";
import {
  Switch as MUISwitch,
  SwitchProps,
  FormControlLabel,
  SxProps,
  Theme,
} from "@mui/material";
import { theme } from "../../theme";
import { shadows } from "../../theme/tokens/shadows";

/** Props for {@link Switch}; extends MUI `SwitchProps` (minus `color`) with an optional label. */
export interface FsSwitchProps extends Omit<SwitchProps, "color"> {
  /** Optional label rendered beside the switch */
  label?: React.ReactNode;
  /** Wrapper styles when a label is present */
  wrapperSx?: SxProps<Theme>;
}

/**
 * On/off toggle — Figma "Buttons" (257:2). On = Interactive/Primary track,
 * off = Interactive/400, white thumb with elevation.
 */
export const Switch: React.FC<FsSwitchProps> = ({
  label,
  wrapperSx,
  sx,
  ...props
}) => {
  const control = (
    <MUISwitch
      disableRipple
      sx={{
        "& .MuiSwitch-switchBase.Mui-checked": {
          color: theme.palette.white.main,
        },
        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
          backgroundColor: theme.palette.interactive.main,
          opacity: 1,
        },
        "& .MuiSwitch-track": {
          backgroundColor: theme.palette.interactive[400],
          opacity: 1,
        },
        "& .MuiSwitch-thumb": {
          color: theme.palette.white.main,
          boxShadow: shadows.e1,
        },
        ...sx,
      }}
      {...props}
    />
  );

  if (!label) return control;

  return (
    <FormControlLabel
      control={control}
      label={label}
      sx={{
        "& .MuiFormControlLabel-label": {
          fontSize: 12,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.palette.black.main,
        },
        ...wrapperSx,
      }}
    />
  );
};

export default Switch;
