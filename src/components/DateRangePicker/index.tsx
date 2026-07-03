import React from "react";
import { Paper, SxProps, Theme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import type { Dayjs } from "dayjs";
import { theme } from "../../theme";
import { shadows } from "../../theme/tokens/shadows";
import { primary } from "../../theme/tokens/colors";

/** A selected date range; either endpoint may be `null` while picking. */
export interface DateRange {
  /** Range start day, or `null` when unset. */
  start: Dayjs | null;
  /** Range end day, or `null` when only the start is picked. */
  end: Dayjs | null;
}

/** Props for {@link DateRangePicker}. */
export interface DateRangePickerProps {
  /** Selected range */
  value: DateRange;
  /** Change callback */
  onChange: (range: DateRange) => void;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Date range picker — Figma "Calender Components" (902:7306). The free
 * @mui/x-date-pickers has no range picker, so this builds range selection on
 * DateCalendar: yellow endpoints + a yellow-200 in-range band.
 */
export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  sx = {},
}) => {
  const { start, end } = value;

  const handlePick = (day: Dayjs | null) => {
    if (!day) return;
    if (!start || (start && end)) {
      onChange({ start: day, end: null });
    } else if (day.isBefore(start, "day")) {
      onChange({ start: day, end: start });
    } else {
      onChange({ start, end: day });
    }
  };

  // Custom day cell: paints start/end endpoints yellow and the in-between band yellow-200.
  const RangeDay = React.useCallback(
    (props: PickersDayProps) => {
    const { day } = props;
    const isStart = !!start && day.isSame(start, "day");
    const isEnd = !!end && day.isSame(end, "day");
    const inRange =
      !!start &&
      !!end &&
      day.isAfter(start, "day") &&
      day.isBefore(end, "day");

    return (
      <PickersDay
        {...props}
        sx={{
          ...(inRange && {
            backgroundColor: primary.yellow[200],
            borderRadius: 0,
            margin: 0,
          }),
          ...((isStart || isEnd) && {
            backgroundColor: `${primary.yellow.brand} !important`,
            color: `${theme.palette.black.main} !important`,
            fontWeight: 600,
          }),
        }}
      />
    );
    },
    [start, end]
  );

  return (
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
        <DateCalendar
          value={end ?? start}
          onChange={handlePick}
          slots={{ day: RangeDay }}
        />
      </Paper>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
