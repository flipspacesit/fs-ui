import React from "react";
import { Stack, Box, Typography, SxProps, Theme } from "@mui/material";
import { semantic, primary, neutral } from "../../theme/tokens/colors";
import { theme } from "../../theme";

/** Colour family for completed/current dots — Success (green) or Brand (yellow). */
export type MilestoneColor = "green" | "yellow";
/** Per-step lifecycle: completed, in-progress, or not-yet-started. */
export type MilestoneState = "done" | "current" | "pending";

/** A single milestone row: optional label plus its lifecycle state. */
export interface MilestoneStep {
  /** Text shown beside the dot; row renders dot-only when omitted. */
  label?: string;
  /** Lifecycle state driving the dot's fill, ring, and connector styling. */
  state: MilestoneState;
}

/** Props for {@link MilestoneStepper}. */
export interface MilestoneStepperProps {
  /** Ordered milestones rendered top-to-bottom. */
  steps: MilestoneStep[];
  /** Colour family for completed dots */
  color?: MilestoneColor;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Inline check-mark glyph stamped inside "done" dots; color is theme-driven.
const Check: React.FC<{ color: string }> = ({ color }) => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path
      d="M2.5 6.5L5 9L9.5 3.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Vertical milestone stepper — Figma "Milestones" (909:4536). Green (Success)
 * or Yellow (Brand) family; done dots carry a check, current is ringed,
 * pending is a SoftSteel outline.
 */
export const MilestoneStepper: React.FC<MilestoneStepperProps> = ({
  steps,
  color = "green",
  sx = {},
}) => {
  // Fill / border / check-mark colors for the selected family (done + current dots).
  const done =
    color === "green"
      ? { fill: semantic.success.primary, border: semantic.success[700], check: neutral.white }
      : { fill: primary.yellow.brand, border: primary.yellow.brand, check: neutral.ink };

  return (
    <Stack sx={{ ...sx }}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const filled = step.state === "done";
        const current = step.state === "current";
        return (
          <Stack key={i} direction="row" gap="12px">
            <Stack alignItems="center">
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: filled
                    ? done.fill
                    : neutral.white,
                  border: `1.5px solid ${
                    filled || current ? done.border : neutral.softSteel[400]
                  }`,
                }}
              >
                {filled && <Check color={done.check} />}
                {current && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: done.fill,
                    }}
                  />
                )}
              </Box>
              {!isLast && (
                <Box
                  sx={{
                    width: "1.5px",
                    flex: 1,
                    minHeight: 24,
                    backgroundColor: filled
                      ? done.fill
                      : neutral.softSteel[200],
                  }}
                />
              )}
            </Stack>
            {step.label && (
              <Typography
                variant="b2"
                sx={{
                  pb: isLast ? 0 : "16px",
                  fontWeight: theme.typography.fontWeight.medium,
                  color: step.state === "pending" ? neutral.grey[400] : neutral.ink,
                }}
              >
                {step.label}
              </Typography>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default MilestoneStepper;
