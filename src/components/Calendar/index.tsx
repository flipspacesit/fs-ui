import React from "react";
import { Paper, SxProps, Theme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import type { Dayjs } from "dayjs";
import { theme } from "../../theme";
import { shadows } from "../../theme/tokens/shadows";

// Pass-through props from MUI `DateCalendar`, minus the ones this component controls (`value`/`onChange`).
type DateCalendarExtraProps = Omit<
  React.ComponentProps<typeof DateCalendar>,
  "value" | "onChange"
>;

/** Props for {@link Calendar}; extends MUI `DateCalendar` props (except `value`/`onChange`). */
export interface CalendarProps extends DateCalendarExtraProps {
  /** Selected date */
  value: Dayjs | null;
  /** Change callback */
  onChange: (value: Dayjs | null) => void;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Inline day-grid calendar — Figma "Calender Components" (902:7306).
 * White panel with a Blue/500 border + elevation, yellow selected day, blue
 * weekday headers (all driven by the DS picker theme overrides).
 */
export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  sx = {},
  ...props
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Paper
      elevation={0}
      sx={{
        display: "inline-block",
        border: `0.5px solid ${theme.palette.primaryBlue[500]}`,
        borderRadius: "12px",
        boxShadow: shadows.elevation03,
        p: 1,
        ...sx,
      }}
    >
      <DateCalendar value={value} onChange={onChange} {...props} />
    </Paper>
  </LocalizationProvider>
);

export default Calendar;
