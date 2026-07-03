import React, { useRef } from "react";
import { Stack, Box, styled, SxProps, Theme } from "@mui/material";
import { HEIGHTS, ComponentSize } from "../../constants";
import { theme } from "../../theme";
import { shadows } from "../../theme/tokens/shadows";

/** Props for the {@link PinInput} OTP / PIN entry component. */
export interface PinInputProps {
  /** Number of cells */
  length?: number;
  /** Current value */
  value: string;
  /** Change callback (full concatenated value) */
  onChange: (value: string) => void;
  /** Insert a divider after this many cells (e.g. 3 → 3-[dash]-3) */
  splitAfter?: number;
  /** Cell size */
  size?: ComponentSize;
  /** Disables all cells and blocks input. */
  disabled?: boolean;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Single-digit input cell: centered numeric glyph, focus/disabled styling from DS tokens.
const Cell = styled("input")({
  textAlign: "center",
  borderRadius: "4px",
  border: `0.5px solid ${theme.palette.softSteel[400]}`,
  backgroundColor: theme.palette.white.main,
  color: theme.palette.black.main,
  fontFamily: "inherit",
  fontWeight: 600,
  fontSize: 14,
  outline: "none",
  padding: 0,
  "&:focus": {
    borderColor: theme.palette.slateBlue[400],
    boxShadow: shadows.elevation03,
  },
  "&:disabled": {
    backgroundColor: theme.palette.grey[50],
    cursor: "not-allowed",
  },
});

/**
 * OTP / PIN input — Figma "Input Components" (313:386). One digit per cell,
 * auto-advancing focus, optional split divider.
 */
export const PinInput: React.FC<PinInputProps> = ({
  length = 6,
  value,
  onChange,
  splitAfter,
  size = "large",
  disabled = false,
  sx = {},
}) => {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const dim = `calc(${HEIGHTS[size]} * var(--scale, 1))`;

  const setChar = (i: number, ch: string) => {
    const chars = value.split("");
    chars[i] = ch;
    onChange(chars.join("").slice(0, length));
  };

  const handleChange = (i: number, raw: string) => {
    const ch = raw.replace(/\D/g, "").slice(-1);
    setChar(i, ch);
    if (ch && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  return (
    <Stack direction="row" alignItems="center" gap="8px" sx={sx}>
      {Array.from({ length }).map((_, i) => (
        <React.Fragment key={i}>
          {splitAfter && i === splitAfter && (
            <Box
              sx={{
                width: 12,
                height: "0.5px",
                backgroundColor: theme.palette.softSteel[400],
              }}
            />
          )}
          <Cell
            ref={(el: HTMLInputElement | null) => {
              refs.current[i] = el;
            }}
            inputMode="numeric"
            maxLength={1}
            disabled={disabled}
            value={value[i] ?? ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            sx={{ width: dim, height: dim }}
          />
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default PinInput;
