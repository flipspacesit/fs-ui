import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { SelectInput, Bank } from "../../../src";

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
];

const cityOptions = [
  { label: "Mumbai", value: "mumbai" },
  { label: "Delhi", value: "delhi" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Hyderabad", value: "hyderabad" },
];

const SelectInputDocs: React.FC = () => {
  const [status, setStatus] = useState("");
  const [city, setCity] = useState("");
  const [errorVal, setErrorVal] = useState("");

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        SelectInput
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A styled select dropdown component with options, placeholder support,
        and a selected-item check icon. Extends all MUI Select props.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { SelectInput } from '@flipspacesit/fs-ui';
import type { Option } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection title="Basic Usage">
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <SelectInput
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={statusOptions}
              placeholder="Select status"
            />
            <Typography variant="body2">Selected: "{status}"</Typography>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const options = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
];

const [status, setStatus] = useState('');

<SelectInput
  label="Status"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  options={options}
  placeholder="Select status"
/>`}
        />
      </DocSection>

      <DocSection title="With Start Adornment">
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <SelectInput
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              options={cityOptions}
              placeholder="Choose a city"
              startAdornment={<Bank size={16} fill="#6B7280" />}
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`import { Bank } from '@flipspacesit/fs-ui';

<SelectInput
  label="City"
  value={city}
  onChange={(e) => setCity(e.target.value)}
  options={cityOptions}
  placeholder="Choose a city"
  startAdornment={<Bank size={16} fill="#6B7280" />}
/>`}
        />
      </DocSection>

      <DocSection title="Without Selected Icon">
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <SelectInput
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              options={cityOptions}
              placeholder="Choose a city"
              showSelectedIcon={false}
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<SelectInput
  label="City"
  value={city}
  onChange={(e) => setCity(e.target.value)}
  options={cityOptions}
  showSelectedIcon={false}
/>`}
        />
      </DocSection>

      <DocSection title="Required & Error State">
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <SelectInput
              label="Category"
              required
              value={errorVal}
              onChange={(e) => setErrorVal(e.target.value)}
              options={statusOptions}
              placeholder="Select category"
              error={errorVal === ""}
              helperText={errorVal === "" ? "Category is required" : undefined}
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<SelectInput
  label="Category"
  required
  error={!value}
  helperText={!value ? "Category is required" : undefined}
  options={options}
  placeholder="Select category"
/>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Label text displayed above the select",
            },
            {
              name: "options",
              type: "Option[]",
              description:
                'Array of { label: string; value: string | number } objects for the dropdown items',
            },
            {
              name: "placeholder",
              type: "string",
              description:
                "Placeholder text shown when no value is selected",
            },
            {
              name: "showSelectedIcon",
              type: "boolean",
              default: "true",
              description:
                "Show a checkmark icon next to the currently selected option",
            },
            {
              name: "helperText",
              type: "React.ReactNode",
              description: "Helper or error message below the select",
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
              description: "Whether the select takes the full width",
            },
            {
              name: "error",
              type: "boolean",
              description: "Shows error styling",
            },
            {
              name: "startAdornment",
              type: "React.ReactNode",
              description: "Element displayed at the start of the select",
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
              name: "menuPaperSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the dropdown menu paper",
            },
            {
              name: "placeholderSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the placeholder text",
            },
            {
              name: "...props",
              type: "SelectProps",
              description: "All MUI Select props are supported",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default SelectInputDocs;
