import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { AutoComplete } from "../../../src/components/AutoComplete";

const AutoCompleteDocs: React.FC = () => {
  const [value, setValue] = useState("");
  const [customValue, setCustomValue] = useState("");

  const options = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
  ];

  const colorOptions = ["Red", "Green", "Blue", "Yellow", "Purple"];
  const colorsMap: Record<string, [string]> = {
    Red: ["#EF4444"],
    Green: ["#10B981"],
    Blue: ["#3B82F6"],
    Yellow: ["#F59E0B"],
    Purple: ["#8B5CF6"],
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        AutoComplete
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        An autocomplete input component with filtering, custom styling, and
        keyboard navigation support.
      </Typography>

      <DocSection
        title="Basic Usage"
        description="A simple autocomplete with filtering."
      >
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 300 }}>
            <Typography variant="body2">Select a fruit:</Typography>
            <AutoComplete
              value={value}
              options={options}
              onInputChange={(val) => setValue(val)}
              onOptionClick={(option) => setValue(option)}
              placeholder="Type to search..."
            />
            <Typography variant="caption" color="text.secondary">
              Selected: {value || "None"}
            </Typography>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`import { AutoComplete } from '@flipspacesit/fs-ui';

const [value, setValue] = useState('');
const options = ['Apple', 'Banana', 'Cherry', 'Date'];

<AutoComplete
  value={value}
  options={options}
  onInputChange={(val) => setValue(val)}
  onOptionClick={(option) => setValue(option)}
  placeholder="Type to search..."
/>`}
        />
      </DocSection>

      <DocSection
        title="Allow Custom Values"
        description="Allow users to enter values not in the options list."
      >
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 300 }}>
            <Typography variant="body2">Enter any value:</Typography>
            <AutoComplete
              value={customValue}
              options={options}
              onInputChange={(val) => setCustomValue(val)}
              onOptionClick={(option) => setCustomValue(option)}
              allowCustomValue
              placeholder="Type anything..."
            />
            <Typography variant="caption" color="text.secondary">
              Value: {customValue || "None"}
            </Typography>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<AutoComplete
  value={value}
  options={options}
  onInputChange={(val) => setValue(val)}
  onOptionClick={(option) => setValue(option)}
  allowCustomValue
  placeholder="Type anything..."
/>`}
        />
      </DocSection>

      <DocSection
        title="With Colors"
        description="Display options with custom colors."
      >
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 300 }}>
            <Typography variant="body2">Select a color:</Typography>
            <AutoComplete
              options={colorOptions}
              onInputChange={() => { }}
              onOptionClick={(option) => alert(`Selected: ${option}`)}
              colorsMap={colorsMap}
              placeholder="Select color..."
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const colorOptions = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];
const colorsMap = {
  Red: ['#EF4444'],
  Green: ['#10B981'],
  Blue: ['#3B82F6'],
  Yellow: ['#F59E0B'],
  Purple: ['#8B5CF6'],
};

<AutoComplete
  options={colorOptions}
  onOptionClick={(option) => handleSelect(option)}
  colorsMap={colorsMap}
  placeholder="Select color..."
/>`}
        />
      </DocSection>

      <DocSection
        title="Without Filtering"
        description="Disable automatic filtering to show all options."
      >
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 300 }}>
            <Typography variant="body2">Shows all options:</Typography>
            <AutoComplete
              options={options}
              onInputChange={() => { }}
              onOptionClick={(option) => alert(`Selected: ${option}`)}
              filterOptions={false}
              placeholder="Click to see all..."
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<AutoComplete
  options={options}
  filterOptions={false}
  placeholder="Click to see all..."
/>`}
        />
      </DocSection>

      <DocSection
        title="With Error"
        description="Display validation errors."
      >
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 300 }}>
            <AutoComplete
              options={options}
              onInputChange={() => { }}
              errors={{ message: "This field is required" }}
              placeholder="Select a fruit..."
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<AutoComplete
  options={options}
  errors={{ message: 'This field is required' }}
  placeholder="Select a fruit..."
/>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          props={[
            {
              name: "value",
              type: "string",
              default: '""',
              description: "Current selected value",
            },
            {
              name: "options",
              type: "string[]",
              default: "[]",
              description: "List of available options",
            },
            {
              name: "onInputChange",
              type: "(value: string) => void",
              default: "-",
              description: "Callback when input value changes",
            },
            {
              name: "onOptionClick",
              type: "(option: string, index: number) => void",
              default: "-",
              description: "Callback when an option is selected",
            },
            {
              name: "filterOptions",
              type: "boolean",
              default: "true",
              description: "Filter options based on input",
            },
            {
              name: "isFetchingOptions",
              type: "boolean",
              default: "false",
              description: "Show loading state for async options",
            },
            {
              name: "errors",
              type: "{ message?: string }",
              default: "-",
              description: "Error object with message",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disable the input",
            },
            {
              name: "allowCustomValue",
              type: "boolean",
              default: "false",
              description: "Allow values not in options",
            },
            {
              name: "placeholder",
              type: "string",
              default: '"Select"',
              description: "Placeholder text",
            },
            {
              name: "inputStyles",
              type: "React.CSSProperties",
              default: "{}",
              description: "Custom input styles",
            },
            {
              name: "dropDownContainerStyles",
              type: "React.CSSProperties",
              default: "{}",
              description: "Custom dropdown container styles",
            },
            {
              name: "dropDownItemStyles",
              type: "React.CSSProperties",
              default: "{}",
              description: "Custom dropdown item styles",
            },
            {
              name: "colorsMap",
              type: "Record<string, [string]>",
              default: "-",
              description: "Color mapping for options",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default AutoCompleteDocs;
