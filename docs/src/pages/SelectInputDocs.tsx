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

const vendorOptions = [
  { label: "Saigon Interior Solutions Co., Ltd", value: "saigon" },
  { label: "Hanoi FitOut JSC", value: "hanoi" },
];

// A small pill used to demonstrate `endAdornment` (e.g. a match indicator).
const MatchedChip = () => (
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      px: "8px",
      height: "20px",
      borderRadius: "999px",
      bgcolor: "#E6F4EA",
      border: "1px solid #9AD0A9",
    }}
  >
    <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#1E7B3C" }}>
      Matched
    </Typography>
  </Box>
);

const SelectInputDocs: React.FC = () => {
  const [status, setStatus] = useState("");
  const [city, setCity] = useState("");
  const [errorVal, setErrorVal] = useState("");
  const [vendor, setVendor] = useState("saigon");

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
          <Stack spacing={2} sx={{ width: "100%", maxWidth: 400 }}>
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
          <Stack spacing={2} sx={{ width: "100%", maxWidth: 400 }}>
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

      <DocSection title="With End Adornment">
        <ExampleBox>
          <Stack spacing={2} sx={{ width: "100%", maxWidth: 400 }}>
            <SelectInput
              label="Vendor Name"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              options={vendorOptions}
              endAdornment={<MatchedChip />}
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`// endAdornment renders just before the dropdown arrow — pass any node
// (a chip, badge, icon, spinner, etc.).
<SelectInput
  label="Vendor Name"
  value={vendor}
  onChange={(e) => setVendor(e.target.value)}
  options={vendorOptions}
  endAdornment={<MatchedChip />}
/>`}
        />
      </DocSection>

      <DocSection title="Without Selected Icon">
        <ExampleBox>
          <Stack spacing={2} sx={{ width: "100%", maxWidth: 400 }}>
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
          <Stack spacing={2} sx={{ width: "100%", maxWidth: 400 }}>
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

      <DocSection title="Disabled & Read-only">
        <ExampleBox>
          <Stack spacing={2} sx={{ width: "100%", maxWidth: 400 }}>
            <SelectInput
              label="Disabled"
              value="active"
              options={statusOptions}
              placeholder="Select status"
              disabled
            />
            <SelectInput
              label="Read-only"
              value="mumbai"
              options={cityOptions}
              placeholder="Choose a city"
              readOnly
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`{/* Greyed out, not focusable, dropdown can't open */}
<SelectInput label="Disabled" value="active" options={options} disabled />

{/* Focusable and readable, but the value can't be changed */}
<SelectInput label="Read-only" value="mumbai" options={options} readOnly />`}
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
              name: "disabled",
              type: "boolean",
              default: "false",
              description:
                "Disables the field: greyed out, not focusable, dropdown can't open",
            },
            {
              name: "readOnly",
              type: "boolean",
              default: "false",
              description:
                "Field is focusable and readable but the value can't be changed and the dropdown can't open",
            },
            {
              name: "startAdornment",
              type: "React.ReactNode",
              description: "Element displayed at the start of the select",
            },
            {
              name: "endAdornment",
              type: "React.ReactNode",
              description:
                "Element displayed at the end of the select, just before the dropdown arrow",
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
            {
              name: "data-id",
              type: "string",
              description:
                "Automation hook — `data-id` on the trigger `<input>`; option rows get `{id}-option-{value}`, the in-menu search box `{id}-search`. See Test IDs.",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default SelectInputDocs;
