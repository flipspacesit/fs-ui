import React from "react";
import { Stack, Box, Typography, SxProps, Theme } from "@mui/material";
import { primary, neutral } from "../../theme/tokens/colors";
import { theme } from "../../theme";

/** Props for the {@link Stepper} horizontal progress component. */
export interface StepperProps {
  /** Step labels */
  steps: string[];
  /** Index of the active/current step (steps at/below it are filled) */
  active: number;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Horizontal stepper — Figma "Badge & Stepper" (1720:270). Active/completed
 * steps use the blue circle; upcoming steps use SoftSteel; connectors flex.
 */
export const Stepper: React.FC<StepperProps> = ({ steps, active, sx = {} }) => (
  <Stack direction="row" alignItems="center" sx={{ width: "100%", ...sx }}>
    {steps.map((label, i) => {
      const done = i <= active;
      return (
        <React.Fragment key={i}>
          <Stack
            direction="row"
            alignItems="center"
            gap="12px"
            sx={{ flexShrink: 0 }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: done
                  ? primary.blue.primary
                  : neutral.softSteel[400],
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: theme.typography.fontWeight.bold,
                  color: neutral.white,
                }}
              >
                {i + 1}
              </Typography>
            </Box>
            <Typography
              variant="h4"
              sx={{
                whiteSpace: "nowrap",
                fontWeight: theme.typography.fontWeight.medium,
                color: done ? neutral.ink : neutral.grey[400],
              }}
            >
              {label}
            </Typography>
          </Stack>
          {i < steps.length - 1 && (
            <Box
              sx={{
                flex: 1,
                minWidth: 16,
                height: "1px",
                mx: "16px",
                backgroundColor: neutral.softSteel[400],
              }}
            />
          )}
        </React.Fragment>
      );
    })}
  </Stack>
);

export default Stepper;
