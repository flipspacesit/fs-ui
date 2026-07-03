import React from "react";
import { Box, Typography, SxProps, Theme } from "@mui/material";
import { misc, neutral, semantic } from "../../theme/tokens/colors";
import { shadows } from "../../theme/tokens/shadows";
import { theme } from "../../theme";

/** One of the 8 collaboration colour families used to fill the marker. */
export type PinColor =
  | "moodyBlue"
  | "purplishPink"
  | "lightSeaGreen"
  | "cocoaBrown"
  | "sunriseOrange"
  | "lavenderIndigo"
  | "duskyPurple"
  | "grey";
/** Marker silhouette: `round` badge, `teardrop` map-pin, or `square` chip. */
export type PinShape = "round" | "teardrop" | "square";
/** Visual state: default, selected (colour halo), approved (green ring + check), or outline (hollow). */
export type PinState = "unselected" | "selected" | "approved" | "outline";

// Maps each colour family to its resolved fill token.
const PIN_FILL: Record<PinColor, string> = {
  moodyBlue: misc.moodyBlue.light,
  purplishPink: misc.purplishPink.light,
  lightSeaGreen: misc.lightSeaGreen.light,
  cocoaBrown: misc.cocoaBrown.light,
  sunriseOrange: misc.sunriseOrange.light,
  lavenderIndigo: misc.lavenderIndigo.light,
  duskyPurple: misc.duskyPurple.light,
  grey: neutral.grey[200],
};

/** Props for {@link PinMarker}. */
export interface PinMarkerProps {
  /** Number/label shown inside the marker */
  number?: number | string;
  /** Collaboration colour family (8) */
  color?: PinColor;
  /** round badge / teardrop map-pin / square chip */
  shape?: PinShape;
  /** unselected / selected (halo) / approved (green ring+check) / outline */
  state?: PinState;
  /** Marker width and height in pixels. */
  size?: number;
  /** Click handler; when set the marker shows a pointer cursor. */
  onClick?: () => void;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Numbered collaboration marker — Figma "Pins" (909:7536). 8 colour families ×
 * round/teardrop/square × unselected/selected/approved/outline.
 */
export const PinMarker: React.FC<PinMarkerProps> = ({
  number = 1,
  color = "moodyBlue",
  shape = "round",
  state = "unselected",
  size = 40,
  onClick,
  sx = {},
}) => {
  const fill = PIN_FILL[color];
  const outline = state === "outline";
  const teardrop = shape === "teardrop";
  const radius = shape === "square" ? "4px" : "50%";

  const ringSx =
    state === "selected"
      ? { boxShadow: `0 0 0 4px ${fill}66, ${shadows.e5}` }
      : state === "approved"
        ? { boxShadow: `0 0 0 3px ${semantic.success[700]}` }
        : {};

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "relative",
        width: size,
        height: size,
        cursor: onClick ? "pointer" : "default",
        ...sx,
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: teardrop ? "50% 50% 50% 0" : radius,
          transform: teardrop ? "rotate(-45deg)" : undefined,
          backgroundColor: outline ? neutral.white : fill,
          border: outline ? `1.5px solid ${fill}` : "none",
          ...ringSx,
        }}
      >
        <Typography
          variant="b2"
          sx={{
            transform: teardrop ? "rotate(45deg)" : undefined,
            fontWeight: theme.typography.fontWeight.medium,
            color: outline ? fill : neutral.black,
          }}
        >
          {number}
        </Typography>
      </Box>
      {state === "approved" && (
        <Box
          sx={{
            position: "absolute",
            top: -2,
            left: -2,
            width: 14,
            height: 14,
            borderRadius: "50%",
            backgroundColor: semantic.success[700],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.5L5 9L9.5 3.5"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
      )}
    </Box>
  );
};

export default PinMarker;
