import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { SearchInput } from "../../../src";
import { useSearchInput } from "../../../src/hooks/useSearchInput";

const SearchInputDocs: React.FC = () => {
  const [controlled, setControlled] = useState("");
  const { value, debouncedValue, setValue } = useSearchInput("", 500);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        SearchInput
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A search input component with optional debouncing and clear
        functionality.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { SearchInput, useSearchInput } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection title="Basic Usage">
        <ExampleBox>
          <Stack spacing={2}>
            <SearchInput
              value={controlled}
              onChange={setControlled}
              placeholder="Search..."
            />
            <Typography variant="body2">Value: "{controlled}"</Typography>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const [value, setValue] = useState('');

<SearchInput
  value={value}
  onChange={setValue}
  placeholder="Search..."
/>`}
        />
      </DocSection>

      <DocSection
        title="With Debouncing"
        description="Delays the onChange callback by the specified milliseconds"
      >
        <ExampleBox>
          <Stack spacing={2}>
            <SearchInput
              value={value}
              onChange={setValue}
              placeholder="Type to search (500ms debounce)..."
              debounceMs={500}
            />
            <Typography variant="body2">
              Immediate value: "{value}"
            </Typography>
            <Typography variant="body2">
              Debounced value: "{debouncedValue}"
            </Typography>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<SearchInput
  value={value}
  onChange={handleSearch}
  placeholder="Search..."
  debounceMs={500}
/>`}
        />
      </DocSection>

      <DocSection title="Without Clear Button">
        <ExampleBox>
          <SearchInput placeholder="No clear button" showClear={false} />
        </ExampleBox>
        <CodeBlock
          code={`<SearchInput placeholder="No clear button" showClear={false} />`}
        />
      </DocSection>

      <DocSection title="useSearchInput Hook">
        <Typography variant="body2" sx={{ mb: 2 }}>
          A hook for managing search input state with built-in debouncing.
        </Typography>
        <CodeBlock
          code={`import { useSearchInput } from '@flipspacesit/fs-ui';

function MyComponent() {
  const { 
    value,          // Current input value
    debouncedValue, // Debounced value (use this for API calls)
    setValue,       // Function to update value
    clear           // Function to clear the search
  } = useSearchInput('', 300); // initial value, debounce ms

  // Use debouncedValue for API calls
  useEffect(() => {
    if (debouncedValue) {
      fetchSearchResults(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <SearchInput
      value={value}
      onChange={setValue}
      placeholder="Search..."
    />
  );
}`}
        />
      </DocSection>

      <DocSection title="SearchInput Props">
        <PropsTable
          props={[
            {
              name: "value",
              type: "string",
              description: "Current search value (controlled)",
            },
            {
              name: "onChange",
              type: "(value: string) => void",
              description: "Callback when search value changes",
            },
            {
              name: "placeholder",
              type: "string",
              default: '"Search..."',
              description: "Placeholder text",
            },
            {
              name: "debounceMs",
              type: "number",
              default: "300",
              description: "Debounce delay in milliseconds",
            },
            {
              name: "showClear",
              type: "boolean",
              default: "true",
              description: "Show the clear button",
            },
            {
              name: "containerSx",
              type: "SxProps",
              description: "Custom container styles",
            },
            {
              name: "...props",
              type: "TextFieldProps",
              description: "All MUI TextField props are supported",
            },
          ]}
        />
      </DocSection>

      <DocSection title="useSearchInput Return Values">
        <PropsTable
          props={[
            {
              name: "value",
              type: "string",
              description: "Current input value",
            },
            {
              name: "debouncedValue",
              type: "string",
              description: "Debounced value (use this for API calls)",
            },
            {
              name: "setValue",
              type: "(value: string) => void",
              description: "Function to update the value",
            },
            {
              name: "clear",
              type: "() => void",
              description: "Function to clear both value and debouncedValue",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default SearchInputDocs;
