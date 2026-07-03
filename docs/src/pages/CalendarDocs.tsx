import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import {
  Calendar,
  DateInput,
  DateRangePicker,
  MonthYearPicker,
  type DateRange,
} from "../../../src";
import dayjs, { Dayjs } from "dayjs";

const CalendarDocs: React.FC = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [fieldDate, setFieldDate] = useState<Dayjs | null>(dayjs());
  const [range, setRange] = useState<DateRange>({
    start: dayjs().date(8),
    end: dayjs().date(16),
  });
  const [period, setPeriod] = useState<string | null>(
    `${dayjs().format("MMM")} ${dayjs().year()}`
  );
  const [quarter, setQuarter] = useState<string | null>(
    `Q1 ${dayjs().year()}`
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Calendar
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Inline day-grid calendar, date-range picker and Month/Quarter/Year
        selector — from the Figma "Calendar Components" canvas. All three share
        the DS picker styling: white panel, Blue/500 border, yellow selection.
        The DS Blue is a muted slate-blue (Blue/500 #738bd2, Blue/Primary
        #5970b7), so the headers and thin border read subtle against white.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { Calendar, DateRangePicker, MonthYearPicker } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection
        title="Calendar"
        description="Inline day-grid calendar. White panel with a Blue/500 border + elevation, yellow selected day, blue weekday headers (all driven by the DS picker theme overrides). Extends MUI DateCalendar props except value/onChange."
      >
        <ExampleBox>
          <Calendar value={date} onChange={setDate} />
        </ExampleBox>
        <CodeBlock
          code={`const [date, setDate] = useState<Dayjs | null>(dayjs());

<Calendar value={date} onChange={setDate} />`}
        />
      </DocSection>

      <DocSection title="Calendar Props">
        <PropsTable
          props={[
            {
              name: "value",
              type: "Dayjs | null",
              description: "Selected date",
            },
            {
              name: "onChange",
              type: "(value: Dayjs | null) => void",
              description: "Change callback",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              default: "{}",
              description: "MUI `sx` overrides, merged last.",
            },
            {
              name: "...props",
              type: "Omit<DateCalendarProps, 'value' | 'onChange'>",
              description:
                "All MUI DateCalendar props are supported, except value/onChange which this component controls.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="DateRangePicker"
        description="Date range picker. @mui/x-date-pickers has no range picker, so this builds range selection on DateCalendar: yellow endpoints + a yellow-200 in-range band. Click a start day, then an end day; picking again starts a new range."
      >
        <ExampleBox>
          <DateRangePicker value={range} onChange={setRange} />
        </ExampleBox>
        <CodeBlock
          code={`const [range, setRange] = useState<DateRange>({
  start: dayjs().date(8),
  end: dayjs().date(16),
});

<DateRangePicker value={range} onChange={setRange} />`}
        />
      </DocSection>

      <DocSection title="DateRangePicker Props">
        <PropsTable
          props={[
            {
              name: "value",
              type: "DateRange",
              description: "Selected range",
            },
            {
              name: "onChange",
              type: "(range: DateRange) => void",
              description: "Change callback",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              default: "{}",
              description: "MUI `sx` overrides, merged last.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="DateRange">
        <PropsTable
          props={[
            {
              name: "start",
              type: "Dayjs | null",
              description: "Range start day, or `null` when unset.",
            },
            {
              name: "end",
              type: "Dayjs | null",
              description:
                "Range end day, or `null` when only the start is picked.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="MonthYearPicker"
        description="Month / Quarter / Year selector. Tab bar in the tertiary blue; selected period fills brand yellow. The onChange value is the selected period key (e.g. 'Jan 2024', 'Q1 2024', '2024-25')."
      >
        <ExampleBox>
          <MonthYearPicker value={period} onChange={setPeriod} />
        </ExampleBox>
        <CodeBlock
          code={`const [period, setPeriod] = useState<string | null>(
  \`\${dayjs().format('MMM')} \${dayjs().year()}\`
);

<MonthYearPicker value={period} onChange={setPeriod} />`}
        />
      </DocSection>

      <DocSection
        title="MonthYearPicker — default to the Quarter tab"
        description="Open on a specific granularity with defaultMode."
      >
        <ExampleBox>
          <MonthYearPicker
            defaultMode="quarter"
            value={quarter}
            onChange={setQuarter}
          />
        </ExampleBox>
        <CodeBlock
          code={`<MonthYearPicker
  defaultMode="quarter"
  value={quarter}
  onChange={setQuarter}
/>`}
        />
      </DocSection>

      <DocSection title="MonthYearPicker Props">
        <PropsTable
          props={[
            {
              name: "defaultMode",
              type: '"month" | "quarter" | "year"',
              default: '"month"',
              description: "Which tab is shown initially",
            },
            {
              name: "value",
              type: "string | null",
              description:
                'Selected period key (e.g. "Jan 2024", "Q1 2024", "2024-25")',
            },
            {
              name: "onChange",
              type: "(value: string) => void",
              description: "Change callback with the selected period key",
            },
            {
              name: "year",
              type: "number",
              default: "new Date().getFullYear()",
              description: "Base year for the Month grid + Quarter labels",
            },
            {
              name: "yearRange",
              type: "number",
              default: "6",
              description: "Number of fiscal years shown on the Year tab",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              default: "{}",
              description: "MUI `sx` overrides, merged last.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="DatePicker field"
        description="For a compact input-with-popup, the DateInput field opens a popup that uses the same DS calendar styling."
      >
        <ExampleBox>
          <Box sx={{ maxWidth: 320 }}>
            <DateInput label="Date" value={fieldDate} onChange={setFieldDate} />
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`const [fieldDate, setFieldDate] = useState<Dayjs | null>(dayjs());

<DateInput label="Date" value={fieldDate} onChange={setFieldDate} />`}
        />
      </DocSection>
    </Box>
  );
};

export default CalendarDocs;
