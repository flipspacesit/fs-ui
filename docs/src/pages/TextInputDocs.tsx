import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { TextInput, MagnifyingGlass, CurrencyInr } from "../../../src";

const TextInputDocs: React.FC = () => {
  const [basicValue, setBasicValue] = useState("");
  const [errorValue, setErrorValue] = useState("");

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        TextInput
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A styled text input component with label, helper text, error state, and
        support for start/end adornments. Extends all MUI TextField props.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { TextInput } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection title="Basic Usage">
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <TextInput
              label="Full Name"
              placeholder="Enter your name"
              value={basicValue}
              onChange={(e) => setBasicValue(e.target.value)}
            />
            <Typography variant="body2">Value: "{basicValue}"</Typography>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const [value, setValue] = useState('');

<TextInput
  label="Full Name"
  placeholder="Enter your name"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`}
        />
      </DocSection>

      <DocSection title="With Adornments">
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <TextInput
              label="Search"
              placeholder="Search..."
              startAdornment={<MagnifyingGlass size={16} fill="#6B7280" />}
            />
            <TextInput
              label="Amount"
              placeholder="0.00"
              startAdornment={<CurrencyInr size={16} fill="#6B7280" />}
              endAdornment={
                <Typography variant="caption" color="text.secondary">
                  INR
                </Typography>
              }
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`import { MagnifyingGlass, CurrencyInr } from '@flipspacesit/fs-ui';

<TextInput
  label="Search"
  placeholder="Search..."
  startAdornment={<MagnifyingGlass size={16} fill="#6B7280" />}
/>

<TextInput
  label="Amount"
  placeholder="0.00"
  startAdornment={<CurrencyInr size={16} fill="#6B7280" />}
  endAdornment={<Typography variant="caption">INR</Typography>}
/>`}
        />
      </DocSection>

      <DocSection title="Required & Error State">
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <TextInput
              label="Email"
              required
              placeholder="Enter email"
              value={errorValue}
              onChange={(e) => setErrorValue(e.target.value)}
              error={errorValue !== "" && !errorValue.includes("@")}
              helperText={
                errorValue !== "" && !errorValue.includes("@")
                  ? "Please enter a valid email address"
                  : undefined
              }
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<TextInput
  label="Email"
  required
  placeholder="Enter email"
  error={!isValid}
  helperText={!isValid ? "Please enter a valid email address" : undefined}
/>`}
        />
      </DocSection>

      <DocSection title="Read Only">
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <TextInput
              label="Company"
              value="Flipspaces"
              readOnly
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<TextInput
  label="Company"
  value="Flipspaces"
  readOnly
/>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Label text displayed above the input",
            },
            {
              name: "startAdornment",
              type: "React.ReactNode",
              description:
                "Element displayed at the start of the input (e.g. icon)",
            },
            {
              name: "endAdornment",
              type: "React.ReactNode",
              description:
                "Element displayed at the end of the input (e.g. icon or text)",
            },
            {
              name: "readOnly",
              type: "boolean",
              default: "false",
              description: "Makes the input read-only",
            },
            {
              name: "error",
              type: "boolean",
              default: "false",
              description: "Shows error styling on the input and helper text",
            },
            {
              name: "helperText",
              type: "string",
              description:
                "Helper or error message displayed below the input",
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
              name: "labelSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the label",
            },
            {
              name: "inputSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the TextField",
            },
            {
              name: "helperTextSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the helper text",
            },
            {
              name: "...props",
              type: "TextFieldProps",
              description: "All MUI TextField props are supported",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default TextInputDocs;
