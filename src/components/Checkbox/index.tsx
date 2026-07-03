import React from "react";
import {
  Checkbox as MUICheckbox,
  CheckboxProps,
  Radio as MUIRadio,
  RadioProps,
  Box,
} from "@mui/material";
import { primary, neutral } from "../../theme/tokens/colors";

/** DS colour family for the Checkbox / RadioButton indicator. */
export type CheckColor =
  | "white"
  | "slateBlue"
  | "yellow"
  | "blue"
  | "grey"
  | "black";

// Per-colour hue table: `solid` = hard fill/border, `soft` = pale soft fill, `onSolid` = glyph colour on a solid fill.
const HUES: Record<
  CheckColor,
  { solid: string; soft: string; onSolid: string }
> = {
  white: { solid: "#ffffff", soft: "#ffffff", onSolid: neutral.black },
  slateBlue: {
    solid: primary.slateBlue.primary,
    soft: primary.slateBlue[100],
    onSolid: neutral.white,
  },
  yellow: {
    solid: primary.yellow.brand,
    soft: primary.yellow[50],
    onSolid: neutral.black,
  },
  blue: {
    solid: primary.blue[500],
    soft: primary.blue[50],
    onSolid: neutral.white,
  },
  grey: {
    solid: neutral.grey[400],
    soft: neutral.grey[50],
    onSolid: neutral.white,
  },
  black: { solid: neutral.black, soft: neutral.grey[50], onSolid: neutral.white },
};

// Internal checkmark tick rendered inside the checked box, stroked in the given colour.
const CheckGlyph: React.FC<{ color: string }> = ({ color }) => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path
      d="M2.5 6.5L5 9L9.5 3.5"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Shared 16×16 rounded-square indicator geometry for both the empty and checked icons.
const boxBase = {
  width: 16,
  height: 16,
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box" as const,
};

/** Props for {@link Checkbox}; extends MUI `CheckboxProps` (minus `color`, which is remapped to the DS family). */
export interface FsCheckboxProps extends Omit<CheckboxProps, "color"> {
  /** DS colour family */
  color?: CheckColor;
  /** Hard (opaque fill) or Soft (pale-tinted fill) */
  variant?: "hard" | "soft";
}

/**
 * Checkbox — Figma "Checkboxes, Tooltips & Scrolls" (403:13626). Six colour
 * families × hard/soft fill.
 */
export const Checkbox: React.FC<FsCheckboxProps> = ({
  color = "slateBlue",
  variant = "hard",
  ...props
}) => {
  const h = HUES[color];
  const checkColor =
    variant === "soft"
      ? color === "white"
        ? neutral.black
        : h.solid
      : h.onSolid;
  return (
    <MUICheckbox
      disableRipple
      icon={
        <Box
          sx={{
            ...boxBase,
            border: `1px solid ${h.solid}`,
            backgroundColor: "transparent",
          }}
        />
      }
      checkedIcon={
        <Box
          sx={{
            ...boxBase,
            border: `1px solid ${h.solid}`,
            backgroundColor: variant === "soft" ? h.soft : h.solid,
          }}
        >
          <CheckGlyph color={checkColor} />
        </Box>
      }
      {...props}
    />
  );
};

/** Props for {@link RadioButton}; extends MUI `RadioProps` (minus `color`, which is remapped to the DS family). */
export interface FsRadioProps extends Omit<RadioProps, "color"> {
  /** DS colour family */
  color?: CheckColor;
}

// Circular variant of `boxBase` for the radio indicator.
const circleBase = { ...boxBase, borderRadius: "50%" };

/**
 * Radio button — Figma "Checkboxes, Tooltips & Scrolls" (403:13626). Circular
 * single-select indicator in the six DS colour families (solid fill only).
 */
export const RadioButton: React.FC<FsRadioProps> = ({
  color = "slateBlue",
  ...props
}) => {
  const h = HUES[color];
  return (
    <MUIRadio
      disableRipple
      icon={<Box sx={{ ...circleBase, border: `1px solid ${h.solid}` }} />}
      checkedIcon={
        <Box sx={{ ...circleBase, border: `1px solid ${h.solid}` }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: h.solid,
            }}
          />
        </Box>
      }
      {...props}
    />
  );
};

export default Checkbox;
