import React, { useState } from "react";
import { Box, Typography, Stack, TextField, Chip } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { useSearchInput } from "../../../src";

const UseSearchInputDocs: React.FC = () => {
  const { value, debouncedValue, setValue, clear } = useSearchInput("", 500);
  const [customDelay] = useState(500);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        useSearchInput
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A hook for managing search input state with built-in debouncing. Useful
        for search fields where you want to avoid firing API calls on every
        keystroke.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { useSearchInput } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection
        title="Live Example"
        description={`Type in the field below. The debounced value updates after ${customDelay}ms of inactivity.`}
      >
        <ExampleBox>
          <Stack spacing={2}>
            <TextField
              label="Search"
              size="small"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ maxWidth: 400 }}
            />
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip label={`Instant: "${value}"`} variant="outlined" />
              <Chip
                label={`Debounced: "${debouncedValue}"`}
                color="primary"
                variant="outlined"
              />
            </Stack>
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                component="button"
                onClick={clear}
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  border: "none",
                  background: "none",
                  padding: 0,
                }}
              >
                Clear
              </Typography>
            </Box>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const { value, debouncedValue, setValue, clear } = useSearchInput("", 500);

            <TextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <p>Instant: {value}</p>
            <p>Debounced: {debouncedValue}</p>
            <button onClick={clear}>Clear</button>`}
        />
      </DocSection>

      <DocSection
        title="Basic Usage"
        description="Pass debouncedValue to your API calls or filter logic so they only trigger after the user stops typing."
      >
        <CodeBlock
          code={`import { useSearchInput, SearchInput } from '@flipspacesit/fs-ui';

          function UserList() {
            const { value, debouncedValue, setValue, clear } = useSearchInput("", 300);

            useEffect(() => {
              fetchUsers({ search: debouncedValue });
            }, [debouncedValue]);

            return (
              <SearchInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClear={clear}
                placeholder="Search users..."
              />
            );
          }`}
        />
      </DocSection>

      <DocSection title="Parameters">
        <PropsTable
          props={[
            {
              name: "initialValue",
              type: "string",
              default: '""',
              description: "Initial value for the search input",
            },
            {
              name: "debounceMs",
              type: "number",
              default: "300",
              description:
                "Debounce delay in milliseconds before debouncedValue updates",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Return Value">
        <PropsTable
          props={[
            {
              name: "value",
              type: "string",
              default: "-",
              description: "Current input value (updates immediately)",
            },
            {
              name: "debouncedValue",
              type: "string",
              default: "-",
              description:
                "Debounced value (updates after the specified delay)",
            },
            {
              name: "setValue",
              type: "(value: string) => void",
              default: "-",
              description: "Setter function for the input value",
            },
            {
              name: "clear",
              type: "() => void",
              default: "-",
              description: "Clears both value and debouncedValue immediately",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default UseSearchInputDocs;
