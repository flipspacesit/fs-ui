import React from "react";
import { Box, Typography, Stack, Chip } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { toCamelCase, capitalizeWord } from "../../../src";

const examples = {
  toCamelCase: [
    { input: "hello world", output: toCamelCase("hello world") },
    { input: "user first name", output: toCamelCase("user first name") },
    { input: "background-color", output: toCamelCase("background-color") },
    { input: "Some_Mixed-input here", output: toCamelCase("Some_Mixed-input here") },
    { input: "", output: toCamelCase("") || '""' },
  ],
  capitalizeWord: [
    { input: "hello world", output: capitalizeWord("hello world") },
    { input: "john doe", output: capitalizeWord("john doe") },
    { input: "already Capitalized", output: capitalizeWord("already Capitalized") },
    { input: "single", output: capitalizeWord("single") },
    { input: "", output: capitalizeWord("") || '""' },
  ],
};

const UtilsDocs: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Utility Functions
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Lightweight string utility functions for common text transformations.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { toCamelCase, capitalizeWord } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection
        title="toCamelCase"
        description="Converts a string to camelCase by stripping special characters and capitalizing word boundaries."
      >
        <ExampleBox>
          <Stack spacing={1.5}>
            {examples.toCamelCase.map((ex) => (
              <Stack key={ex.input} direction="row" spacing={1} alignItems="center">
                <Chip
                  label={`"${ex.input}"`}
                  size="small"
                  variant="outlined"
                  sx={{ fontFamily: "monospace", minWidth: 200 }}
                />
                <Typography variant="body2" color="text.secondary">
                  →
                </Typography>
                <Chip
                  label={`"${ex.output}"`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontFamily: "monospace" }}
                />
              </Stack>
            ))}
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`toCamelCase("hello world")          // "helloWorld"
toCamelCase("user first name")      // "userFirstName"
toCamelCase("background-color")     // "backgroundColor"
toCamelCase("Some_Mixed-input here") // "someMixedInputHere"
toCamelCase("")                      // ""`}
        />
      </DocSection>

      <DocSection title="toCamelCase Signature">
        <PropsTable
          props={[
            {
              name: "value",
              type: "string",
              default: "-",
              description: "The string to convert to camelCase",
            },
          ]}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Returns: <code>string</code>
        </Typography>
      </DocSection>

      <DocSection
        title="capitalizeWord"
        description="Capitalizes the first letter of each word in a sentence."
      >
        <ExampleBox>
          <Stack spacing={1.5}>
            {examples.capitalizeWord.map((ex) => (
              <Stack key={ex.input} direction="row" spacing={1} alignItems="center">
                <Chip
                  label={`"${ex.input}"`}
                  size="small"
                  variant="outlined"
                  sx={{ fontFamily: "monospace", minWidth: 200 }}
                />
                <Typography variant="body2" color="text.secondary">
                  →
                </Typography>
                <Chip
                  label={`"${ex.output}"`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontFamily: "monospace" }}
                />
              </Stack>
            ))}
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`capitalizeWord("hello world")         // "Hello World"
capitalizeWord("john doe")            // "John Doe"
capitalizeWord("already Capitalized") // "Already Capitalized"
capitalizeWord("single")              // "Single"
capitalizeWord("")                    // ""`}
        />
      </DocSection>

      <DocSection title="capitalizeWord Signature">
        <PropsTable
          props={[
            {
              name: "sentence",
              type: "string",
              default: "-",
              description: "The sentence to capitalize each word of",
            },
          ]}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Returns: <code>string</code>
        </Typography>
      </DocSection>
    </Box>
  );
};

export default UtilsDocs;
