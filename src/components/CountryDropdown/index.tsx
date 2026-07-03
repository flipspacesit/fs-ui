import React from "react";
import { Stack, Box, Typography, SxProps, Theme } from "@mui/material";
import {
  HEIGHTS,
  FontSizeMap,
  ComponentSize,
  ComponentVariant,
} from "../../constants";
import { theme } from "../../theme";
import { ArrowDown } from "../../icons/ArrowDown";
import { ArrowUp } from "../../icons/ArrowUp";

/** Props for {@link CountryDropdown}. */
export interface CountryDropdownProps {
  /** Flag element (img / emoji) shown in the leading badge */
  flag?: React.ReactNode;
  /** Label, e.g. "+91" or "India" */
  label: string;
  /** Open state (controls the caret) */
  open?: boolean;
  /** Fired on trigger click; suppressed while `disabled`. */
  onClick?: () => void;
  /** Shape — round (pill) or rectangular (radius-sm) */
  variant?: ComponentVariant;
  /** Size */
  size?: ComponentSize;
  /** When true, dims the trigger and blocks `onClick`. */
  disabled?: boolean;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Country / flag dropdown trigger — Figma "Dropdowns & Accordians" (419:19).
 * Leading flag badge in the tertiary blue that hugs the left edge.
 */
export const CountryDropdown: React.FC<CountryDropdownProps> = ({
  flag,
  label,
  open = false,
  onClick,
  variant = "round",
  size = "medium",
  disabled = false,
  sx = {},
}) => {
  // Size-driven height scaled by the consumer-set `--scale` CSS variable.
  const height = `calc(${HEIGHTS[size]} * var(--scale, 1))`;
  // Pill corners for "round", small radius for "rectangular".
  const radius = variant === "round" ? "100px" : "8px";
  // Map the size token to the matching Typography variant.
  const textVariant = FontSizeMap[size] as "h4" | "b1" | "b2" | "c1";
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap="8px"
      onClick={disabled ? undefined : onClick}
      sx={{
        height,
        pl: "1px",
        pr: "8px",
        borderRadius: radius,
        border: `0.5px solid ${theme.palette.softSteel[400]}`,
        backgroundColor: theme.palette.white.main,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        width: "fit-content",
        ...sx,
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          px: "8px",
          borderRadius: radius,
          backgroundColor: theme.palette.tertiary.main,
        }}
      >
        {flag}
        <Typography
          variant={textVariant}
          sx={{
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.palette.black.main,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
      </Box>
      {open ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
    </Stack>
  );
};

export default CountryDropdown;
