import React from "react";
import { Stack, Typography, SxProps, Theme } from "@mui/material";
import { HEIGHTS, FontSizeMap, ComponentSize } from "../../constants";
import { theme } from "../../theme";

/** One selectable segment of a {@link SegmentedToggle}. */
export interface SegmentedToggleOption {
  /** Visible segment label. */
  label: string;
  /** Value emitted via `onChange` when this segment is selected. */
  value: string;
  /** Optional leading icon rendered before the label. */
  icon?: React.ReactNode;
}

/** Props for {@link SegmentedToggle}. */
export interface SegmentedToggleProps {
  /** Segments */
  options: SegmentedToggleOption[];
  /** Currently selected value */
  value: string;
  /** Selection callback */
  onChange: (value: string) => void;
  /** Size — matches button heights */
  size?: ComponentSize;
  /** When `true`, dims the control and blocks pointer interaction. */
  disabled?: boolean;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Segmented two/N-way toggle (Switch Tab) — Figma "Buttons" (257:2). White
 * container; the active segment fills with the tertiary blue, inactive text
 * uses SoftSteel.
 */
export const SegmentedToggle: React.FC<SegmentedToggleProps> = ({
  options,
  value,
  onChange,
  size = "medium",
  disabled = false,
  sx = {},
}) => {
  // Scale the button-matched height by the app-provided `--scale` CSS var.
  const height = `calc(${HEIGHTS[size]} * var(--scale, 1))`;
  // Map the component size to its label Typography variant.
  const textVariant = FontSizeMap[size] as "h4" | "b1" | "b2" | "c1";
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        height,
        p: "2px",
        gap: "2px",
        borderRadius: "8px",
        border: `0.5px solid ${theme.palette.softSteel[400]}`,
        backgroundColor: theme.palette.white.main,
        width: "fit-content",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
        ...sx,
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Stack
            key={opt.value}
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap="6px"
            onClick={() => onChange(opt.value)}
            sx={{
              height: "100%",
              px: "12px",
              borderRadius: "6px",
              cursor: "pointer",
              backgroundColor: active
                ? theme.palette.tertiary.main
                : "transparent",
            }}
          >
            {opt.icon}
            <Typography
              variant={textVariant}
              sx={{
                fontWeight: active
                  ? theme.typography.fontWeight.bold
                  : theme.typography.fontWeight.medium,
                color: active
                  ? theme.palette.black.main
                  : theme.palette.softSteel[400],
                whiteSpace: "nowrap",
              }}
            >
              {opt.label}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default SegmentedToggle;
