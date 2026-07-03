import React from "react";
import { Stack, Box, Typography, SxProps, Theme } from "@mui/material";
import { HEIGHTS, ComponentSize } from "../../constants";
import { theme } from "../../theme";

/** Props for {@link NumberStepper}. */
export interface NumberStepperProps {
  /** Current value */
  value: number;
  /** Change callback */
  onChange: (value: number) => void;
  /** Lower bound; values are clamped to this minimum. Defaults to `0`. */
  min?: number;
  /** Upper bound; values are clamped to this maximum. Defaults to `Infinity`. */
  max?: number;
  /** Amount added/subtracted per button press. Defaults to `1`. */
  step?: number;
  /** Control size (matches button heights) */
  size?: ComponentSize;
  /** When `true`, dims the control and blocks increment/decrement. Defaults to `false`. */
  disabled?: boolean;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Quantity stepper — Figma "Input Components" (313:386). Minus button in the
 * tertiary blue, plus button in brand yellow, value in the centre.
 */
export const NumberStepper: React.FC<NumberStepperProps> = ({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  size = "medium",
  disabled = false,
  sx = {},
}) => {
  // Square button/value cell edge: size-driven height scaled by the app's `--scale` CSS var.
  const dim = `calc(${HEIGHTS[size]} * var(--scale, 1))`;
  // Constrain a candidate value to the [min, max] bounds.
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const dec = () => !disabled && onChange(clamp(value - step));
  const inc = () => !disabled && onChange(clamp(value + step));

  const btnBase = {
    width: dim,
    height: dim,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 1,
    color: theme.palette.black.main,
    userSelect: "none" as const,
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        opacity: disabled ? 0.6 : 1,
        borderRadius: "4px",
        overflow: "hidden",
        border: `0.5px solid ${theme.palette.softSteel[400]}`,
        width: "fit-content",
        ...sx,
      }}
    >
      <Box
        onClick={dec}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Decrease"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            dec();
          }
        }}
        sx={{ ...btnBase, backgroundColor: theme.palette.tertiary.main }}
      >
        −
      </Box>
      <Box
        sx={{
          minWidth: dim,
          height: dim,
          px: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.white.main,
        }}
      >
        <Typography
          sx={{ fontWeight: 600, fontSize: 14, color: theme.palette.black.main }}
        >
          {value}
        </Typography>
      </Box>
      <Box
        onClick={inc}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Increase"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inc();
          }
        }}
        sx={{ ...btnBase, backgroundColor: theme.palette.yellow.main }}
      >
        +
      </Box>
    </Stack>
  );
};

export default NumberStepper;
