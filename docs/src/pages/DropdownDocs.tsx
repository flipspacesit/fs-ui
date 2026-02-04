import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { Dropdown } from "../../../src";

const DropdownDocs: React.FC = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  const basicOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Dropdown
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A customizable dropdown component with support for search, icons, and
        custom popper content.
      </Typography>

      <DocSection title="Import">
        <CodeBlock code={`import { Dropdown } from '@flipspacesit/fs-ui';`} />
      </DocSection>

      <DocSection title="Basic Usage" description="Simple dropdown with options">
        <ExampleBox>
          <Stack direction="row" spacing={2} alignItems="center">
            <Dropdown
              options={basicOptions}
              value={value1}
              onChange={(opt) => setValue1(opt.value)}
              label="Select:"
            />
            <Typography variant="body2">Selected: {value1 || "None"}</Typography>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const [value, setValue] = useState('');

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

<Dropdown
  options={options}
  value={value}
  onChange={(opt) => setValue(opt.value)}
  label="Select:"
/>`}
        />
      </DocSection>

      <DocSection title="Sizes" description="Available size variants">
        <ExampleBox>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" sx={{ width: 100 }}>
                Extra Small:
              </Typography>
              <Dropdown options={basicOptions} size="extraSmall" label="Size:" />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" sx={{ width: 100 }}>
                Small:
              </Typography>
              <Dropdown options={basicOptions} size="small" label="Size:" />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" sx={{ width: 100 }}>
                Medium:
              </Typography>
              <Dropdown options={basicOptions} size="medium" label="Size:" />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" sx={{ width: 100 }}>
                Large:
              </Typography>
              <Dropdown options={basicOptions} size="large" label="Size:" />
            </Stack>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<Dropdown options={options} size="extraSmall" />
<Dropdown options={options} size="small" />
<Dropdown options={options} size="medium" />
<Dropdown options={options} size="large" />`}
        />
      </DocSection>

      <DocSection title="Variants" description="Round and rectangular variants">
        <ExampleBox>
          <Stack direction="row" spacing={2}>
            <Dropdown
              options={basicOptions}
              value={value2}
              onChange={(opt) => setValue2(opt.value)}
              variant="round"
              label="Round:"
            />
            <Dropdown
              options={basicOptions}
              value={value3}
              onChange={(opt) => setValue3(opt.value)}
              variant="rectangular"
              label="Rectangular:"
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<Dropdown options={options} variant="round" label="Round:" />
<Dropdown options={options} variant="rectangular" label="Rectangular:" />`}
        />
      </DocSection>

      <DocSection title="Disabled State">
        <ExampleBox>
          <Dropdown options={basicOptions} disabled label="Disabled:" />
        </ExampleBox>
        <CodeBlock code={`<Dropdown options={options} disabled label="Disabled:" />`} />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          props={[
            {
              name: "options",
              type: "DropdownOption[]",
              default: "[]",
              description: "Array of options with value, label, and optional icon",
            },
            {
              name: "value",
              type: "string",
              default: '""',
              description: "Currently selected value",
            },
            {
              name: "onChange",
              type: "(option, index) => void",
              description: "Callback when an option is selected",
            },
            {
              name: "label",
              type: "string",
              default: '""',
              description: "Label text shown before the selected value",
            },
            {
              name: "size",
              type: '"extraSmall" | "small" | "medium" | "large"',
              default: '"small"',
              description: "Size of the dropdown",
            },
            {
              name: "variant",
              type: '"round" | "rectangular"',
              default: '"round"',
              description: "Visual variant of the dropdown",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the dropdown is disabled",
            },
            {
              name: "showSelectedOptionIcon",
              type: "boolean",
              default: "false",
              description: "Show icon for the selected option",
            },
            {
              name: "customPopperComponent",
              type: "ReactNode",
              description: "Custom content to render in the dropdown instead of default menu",
            },
            {
              name: "boxSx",
              type: "SxProps",
              description: "Custom styles for the main container",
            },
            {
              name: "paperSx",
              type: "SxProps",
              description: "Custom styles for the dropdown paper",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default DropdownDocs;
