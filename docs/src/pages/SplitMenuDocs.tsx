import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { SplitMenu, CheckIcon } from "../../../src";

const SplitMenuDocs: React.FC = () => {
  const handleClick = (value: string) => {
    alert(`Selected: ${value}`);
  };

  const basicOptions = [
    { label: "Edit", value: "edit" },
    { label: "Duplicate", value: "duplicate" },
    { label: "Delete", value: "delete" },
  ];

  const optionsWithIcons = [
    { label: "Approve", value: "approve", icon: <CheckIcon size={14} color="#10B981" /> },
    { label: "Reject", value: "reject", icon: <CheckIcon size={14} color="#EF4444" /> },
    { label: "Pending", value: "pending", icon: <CheckIcon size={14} color="#F59E0B" /> },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        SplitMenu
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A split button component with a dropdown menu for additional actions.
      </Typography>

      <DocSection title="Import">
        <CodeBlock code={`import { SplitMenu } from '@flipspacesit/fs-ui';`} />
      </DocSection>

      <DocSection title="Basic Usage">
        <ExampleBox>
          <Box sx={{ width: 200 }}>
            <SplitMenu
              btnText="Actions"
              options={basicOptions}
              handleClick={handleClick}
            />
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`const options = [
  { label: 'Edit', value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Delete', value: 'delete' },
];

<SplitMenu
  btnText="Actions"
  options={options}
  handleClick={(value) => console.log(value)}
/>`}
        />
      </DocSection>

      <DocSection title="With Icons">
        <ExampleBox>
          <Box sx={{ width: 200 }}>
            <SplitMenu
              btnText="Status"
              options={optionsWithIcons}
              handleClick={handleClick}
            />
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`const options = [
  { label: 'Approve', value: 'approve', icon: <CheckIcon color="#10B981" /> },
  { label: 'Reject', value: 'reject', icon: <CloseIcon color="#EF4444" /> },
];

<SplitMenu
  btnText="Status"
  options={options}
  handleClick={handleClick}
/>`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <ExampleBox>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ width: 100 }}>Small:</Typography>
              <Box sx={{ width: 150 }}>
                <SplitMenu
                  btnText="Small"
                  options={basicOptions}
                  handleClick={handleClick}
                  size="small"
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ width: 100 }}>Medium:</Typography>
              <Box sx={{ width: 150 }}>
                <SplitMenu
                  btnText="Medium"
                  options={basicOptions}
                  handleClick={handleClick}
                  size="medium"
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ width: 100 }}>Large:</Typography>
              <Box sx={{ width: 150 }}>
                <SplitMenu
                  btnText="Large"
                  options={basicOptions}
                  handleClick={handleClick}
                  size="large"
                />
              </Box>
            </Stack>
          </Stack>
        </ExampleBox>
      </DocSection>

      <DocSection title="Disabled State">
        <ExampleBox>
          <Box sx={{ width: 200 }}>
            <SplitMenu
              btnText="Disabled"
              options={basicOptions}
              handleClick={handleClick}
              disabled
            />
          </Box>
        </ExampleBox>
        <CodeBlock code={`<SplitMenu btnText="Disabled" options={options} disabled />`} />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          props={[
            {
              name: "btnText",
              type: "string",
              default: '"More"',
              description: "Button text",
            },
            {
              name: "options",
              type: "SplitMenuOption[]",
              description: "Array of menu options with label, value, and optional icon",
            },
            {
              name: "handleClick",
              type: "(value: string, event) => void",
              description: "Callback when an option is clicked",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disable the split menu",
            },
            {
              name: "size",
              type: '"extraSmall" | "small" | "medium" | "large"',
              default: '"medium"',
              description: "Size variant",
            },
            {
              name: "variant",
              type: '"rectangular" | "round"',
              default: '"rectangular"',
              description: "Shape variant",
            },
            {
              name: "btnStyles",
              type: "SxProps",
              description: "Custom button styles",
            },
            {
              name: "openIcon",
              type: "ReactNode",
              description: "Custom icon when menu is open",
            },
            {
              name: "closeIcon",
              type: "ReactNode",
              description: "Custom icon when menu is closed",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default SplitMenuDocs;
