import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { ChipCard, ChipCardWrapper } from "../../../src/components/ChipCard";

const ChipCardDocs: React.FC = () => {
  const tags = ["Design", "Development", "Testing", "Deployment", "Maintenance"];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        ChipCard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Colored chip/tag cards with automatic color cycling. Useful for
        displaying categories, tags, or labels with visual distinction.
      </Typography>

      <DocSection
        title="Basic Usage"
        description="Simple chip cards with automatic color cycling."
      >
        <ExampleBox>
          <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
            <ChipCard label="Category 1" index={0} />
            <ChipCard label="Category 2" index={1} />
            <ChipCard label="Category 3" index={2} />
            <ChipCard label="Category 4" index={3} />
            <ChipCard label="Category 5" index={4} />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`import { ChipCard } from '@flipspacesit/fs-ui';

<ChipCard label="Category 1" index={0} />
<ChipCard label="Category 2" index={1} />
<ChipCard label="Category 3" index={2} />
// Colors cycle through 5 predefined colors (index % 5)`}
        />
      </DocSection>

      <DocSection
        title="ChipCardWrapper"
        description="Automatically handle multiple chips with overflow tooltip."
      >
        <ExampleBox>
          <Stack spacing={3}>
            <Box>
              <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
                Shows first 2 chips + overflow:
              </Typography>
              <ChipCardWrapper list={tags} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
                Custom max visible (3):
              </Typography>
              <ChipCardWrapper list={tags} maxVisible={3} />
            </Box>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`import { ChipCardWrapper } from '@flipspacesit/fs-ui';

const tags = ['Design', 'Development', 'Testing', 'Deployment', 'Maintenance'];

// Shows first 2 + "+3" overflow chip with tooltip
<ChipCardWrapper list={tags} />

// Custom max visible
<ChipCardWrapper list={tags} maxVisible={3} />`}
        />
      </DocSection>

      <DocSection
        title="Custom Colors"
        description="Override the automatic coloring with custom colors."
      >
        <ExampleBox>
          <Stack direction="row" spacing={2}>
            <ChipCard label="Success" color="#10B981" bgColor="#D1FAE5" />
            <ChipCard label="Warning" color="#F59E0B" bgColor="#FEF3C7" />
            <ChipCard label="Error" color="#EF4444" bgColor="#FEE2E2" />
            <ChipCard label="Info" color="#3B82F6" bgColor="#DBEAFE" />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<ChipCard label="Success" color="#10B981" bgColor="#D1FAE5" />
<ChipCard label="Warning" color="#F59E0B" bgColor="#FEF3C7" />
<ChipCard label="Error" color="#EF4444" bgColor="#FEE2E2" />
<ChipCard label="Info" color="#3B82F6" bgColor="#DBEAFE" />`}
        />
      </DocSection>

      <DocSection
        title="Long Text Handling"
        description="Chips automatically truncate long text with ellipsis."
      >
        <ExampleBox>
          <Stack direction="row" spacing={2} alignItems="center">
            <ChipCard
              label="This is a very long label that will be truncated"
              index={0}
            />
            <ChipCard
              label="This is a very long label that won't be truncated"
              index={1}
              isEllipsis={false}
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`// With ellipsis (default)
<ChipCard label="Very long label..." index={0} />

// Without ellipsis
<ChipCard label="Very long label..." index={0} isEllipsis={false} />`}
        />
      </DocSection>

      <DocSection
        title="Custom Padding"
        description="Adjust padding for different sizes."
      >
        <ExampleBox>
          <Stack direction="row" spacing={2} alignItems="center">
            <ChipCard label="Small" index={0} padding="2px 6px" />
            <ChipCard label="Default" index={1} />
            <ChipCard label="Large" index={2} padding="10px 16px" />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<ChipCard label="Small" padding="2px 6px" />
<ChipCard label="Default" />
<ChipCard label="Large" padding="10px 16px" />`}
        />
      </DocSection>

      <DocSection title="Color Palette">
        <ExampleBox>
          <Typography variant="body2" sx={{ mb: 2 }}>
            The 5 preset colors that cycle with index:
          </Typography>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <ChipCard label="Index 0" index={0} />
              <Typography variant="caption">#149b8b / #e2f8f6</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <ChipCard label="Index 1" index={1} />
              <Typography variant="caption">#5C7ED6 / #F6F7FC</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <ChipCard label="Index 2" index={2} />
              <Typography variant="caption">#FE9D26 / #FFF1E1</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <ChipCard label="Index 3" index={3} />
              <Typography variant="caption">#F65E4F / #FFF3F2</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <ChipCard label="Index 4" index={4} />
              <Typography variant="caption">#425281 / #F6F7FC</Typography>
            </Stack>
          </Stack>
        </ExampleBox>
      </DocSection>

      <DocSection title="ChipCard Props">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              default: "-",
              description: "The text to display",
            },
            {
              name: "index",
              type: "number | null",
              default: "null",
              description: "Index for auto-coloring (cycles through 5 colors)",
            },
            {
              name: "padding",
              type: "string",
              default: '"6px 10px"',
              description: "Custom padding",
            },
            {
              name: "isEllipsis",
              type: "boolean",
              default: "true",
              description: "Enable text truncation with ellipsis",
            },
            {
              name: "color",
              type: "string",
              default: "-",
              description: "Custom text/border color",
            },
            {
              name: "bgColor",
              type: "string",
              default: "-",
              description: "Custom background color",
            },
          ]}
        />
      </DocSection>

      <DocSection title="ChipCardWrapper Props">
        <PropsTable
          props={[
            {
              name: "list",
              type: "string[]",
              default: "-",
              description: "List of labels to display as chips",
            },
            {
              name: "maxVisible",
              type: "number",
              default: "2",
              description: "Maximum chips to show before collapsing",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default ChipCardDocs;
