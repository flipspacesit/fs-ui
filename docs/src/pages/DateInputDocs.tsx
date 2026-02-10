import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { DateInput } from "../../../src";
import type { Dayjs } from "dayjs";

const DateInputDocs: React.FC = () => {
  const [basicDate, setBasicDate] = useState<Dayjs | null>(null);
  const [errorDate, setErrorDate] = useState<Dayjs | null>(null);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        DateInput
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A styled date picker component with label, error state, and helper text.
        Wraps the MUI DatePicker with consistent styling and a CalendarBlank
        icon.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { DateInput } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection title="Basic Usage">
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <DateInput
              label="Date of Birth"
              value={basicDate}
              onChange={(val) => setBasicDate(val)}
            />
            <Typography variant="body2">
              Selected: {basicDate ? basicDate.format("DD/MM/YYYY") : "None"}
            </Typography>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`import type { Dayjs } from 'dayjs';

const [date, setDate] = useState<Dayjs | null>(null);

<DateInput
  label="Date of Birth"
  value={date}
  onChange={(val) => setDate(val)}
/>`}
        />
      </DocSection>

      <DocSection title="Custom Format & Placeholder">
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <DateInput
              label="Invoice Date"
              value={basicDate}
              onChange={(val) => setBasicDate(val)}
              format="MM/DD/YYYY"
              placeholder="MM/DD/YYYY"
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<DateInput
  label="Invoice Date"
  value={date}
  onChange={(val) => setDate(val)}
  format="MM/DD/YYYY"
  placeholder="MM/DD/YYYY"
/>`}
        />
      </DocSection>

      <DocSection title="Required & Error State">
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <DateInput
              label="Start Date"
              required
              value={errorDate}
              onChange={(val) => setErrorDate(val)}
              error={!errorDate}
              helperText={!errorDate ? "Start date is required" : undefined}
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<DateInput
  label="Start Date"
  required
  value={date}
  onChange={(val) => setDate(val)}
  error={!date}
  helperText={!date ? "Start date is required" : undefined}
/>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Label text displayed above the date picker",
            },
            {
              name: "value",
              type: "Dayjs | null",
              description: "The selected date value (controlled)",
            },
            {
              name: "onChange",
              type: "(value: Dayjs | null) => void",
              description: "Callback when the date changes",
            },
            {
              name: "error",
              type: "boolean",
              default: "false",
              description: "Shows error styling on the input",
            },
            {
              name: "helperText",
              type: "string",
              description: "Helper or error message below the input",
            },
            {
              name: "required",
              type: "boolean",
              default: "false",
              description: "Marks the field as required with an asterisk",
            },
            {
              name: "fullWidth",
              type: "boolean",
              default: "true",
              description: "Whether the input takes the full width",
            },
            {
              name: "format",
              type: "string",
              default: '"DD/MM/YYYY"',
              description: "Date display format string",
            },
            {
              name: "placeholder",
              type: "string",
              description:
                "Placeholder text (defaults to the format string)",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "Custom styles for the FormControl wrapper",
            },
            {
              name: "labelSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the label",
            },
            {
              name: "helperTextSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the helper text",
            },
            {
              name: "datePickerSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the DatePicker TextField",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default DateInputDocs;
