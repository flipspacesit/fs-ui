import React, { useState } from "react";
import { Paper, Stack, Box, Typography, SxProps, Theme } from "@mui/material";
import { theme } from "../../theme";
import { shadows } from "../../theme/tokens/shadows";

/** Selection granularity tab: month grid, quarter grid, or fiscal-year grid. */
export type MonthYearMode = "month" | "quarter" | "year";

/** Props for {@link MonthYearPicker}. */
export interface MonthYearPickerProps {
  /** Which tab is shown initially */
  defaultMode?: MonthYearMode;
  /** Selected period key (e.g. "Jan 2024", "Q1 2024", "2024-25") */
  value: string | null;
  /** Change callback with the selected period key */
  onChange: (value: string) => void;
  /** Base year for the Month grid + Quarter labels */
  year?: number;
  /** Number of fiscal years shown on the Year tab */
  yearRange?: number;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Short month labels used to build the Month-tab period keys.
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
// Tab order rendered in the mode switcher.
const MODES: MonthYearMode[] = ["month", "quarter", "year"];

/**
 * Month / Quarter / Year selector — Figma "Calender Components" (902:7306).
 * Tab bar in the tertiary blue; selected period fills brand yellow.
 */
export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  defaultMode = "month",
  value,
  onChange,
  year = new Date().getFullYear(),
  yearRange = 6,
  sx = {},
}) => {
  const [mode, setMode] = useState<MonthYearMode>(defaultMode);

  const periods: string[] =
    mode === "month"
      ? MONTHS.map((m) => `${m} ${year}`)
      : mode === "quarter"
        ? ["Q1", "Q2", "Q3", "Q4"].map((q) => `${q} ${year}`)
        : Array.from({ length: yearRange }, (_, i) => {
            const s = year - Math.floor(yearRange / 2) + i;
            return `${s}-${String(s + 1).slice(-2)}`;
          });

  const cols = mode === "year" ? 3 : 4;

  return (
    <Paper
      elevation={0}
      sx={{
        display: "inline-block",
        width: 280,
        border: `0.5px solid ${theme.palette.primaryBlue[500]}`,
        borderRadius: "8px",
        boxShadow: shadows.elevation03,
        p: 1,
        ...sx,
      }}
    >
      <Stack
        direction="row"
        sx={{
          backgroundColor: theme.palette.tertiary.main,
          borderRadius: "4px",
          p: "2px",
          mb: 1,
        }}
      >
        {MODES.map((m) => (
          <Box
            key={m}
            onClick={() => setMode(m)}
            sx={{ flex: 1, textAlign: "center", py: "4px", cursor: "pointer" }}
          >
            <Typography
              variant="b2"
              sx={{
                textTransform: "capitalize",
                color: theme.palette.black.main,
                fontWeight:
                  mode === m
                    ? theme.typography.fontWeight.bold
                    : theme.typography.fontWeight.light,
              }}
            >
              {m}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "4px",
        }}
      >
        {periods.map((p) => {
          const selected = p === value;
          return (
            <Box
              key={p}
              onClick={() => onChange(p)}
              sx={{
                py: "6px",
                textAlign: "center",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: selected
                  ? theme.palette.yellow.main
                  : "transparent",
              }}
            >
              <Typography
                variant="b2"
                sx={{
                  whiteSpace: "nowrap",
                  fontWeight: selected
                    ? theme.typography.fontWeight.medium
                    : theme.typography.fontWeight.light,
                  color: selected
                    ? theme.palette.black.main
                    : theme.palette.grey[400],
                }}
              >
                {p}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default MonthYearPicker;
