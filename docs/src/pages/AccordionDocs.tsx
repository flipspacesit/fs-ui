import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { Accordion, AccordionGroup } from "../../../src";

const AccordionDocs: React.FC = () => {
  const [controlled, setControlled] = useState(false);

  const groupItems = [
    { title: "Section 1", content: "Content for section 1" },
    { title: "Section 2", content: "Content for section 2" },
    { title: "Section 3", content: "Content for section 3" },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Accordion
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Expandable/collapsible content sections with support for controlled and
        uncontrolled states.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { Accordion, AccordionGroup } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection title="Basic Usage" description="Single accordion with default behavior">
        <ExampleBox>
          <Accordion title="Click to expand">
            <Typography>
              This is the accordion content. It can contain any React elements.
            </Typography>
          </Accordion>
        </ExampleBox>
        <CodeBlock
          code={`<Accordion title="Click to expand">
  <Typography>
    This is the accordion content. It can contain any React elements.
  </Typography>
</Accordion>`}
        />
      </DocSection>

      <DocSection title="Controlled State" description="Control the open state externally">
        <ExampleBox>
          <Stack spacing={2}>
            <Accordion
              title="Controlled Accordion"
              open={controlled}
              handleChange={(isExpanded) => setControlled(isExpanded)}
            >
              <Typography>This accordion's state is controlled externally.</Typography>
            </Accordion>
            <Typography variant="body2">State: {controlled ? "Open" : "Closed"}</Typography>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const [open, setOpen] = useState(false);

<Accordion
  title="Controlled Accordion"
  open={open}
  handleChange={(isExpanded) => setOpen(isExpanded)}
>
  Content here
</Accordion>`}
        />
      </DocSection>

      <DocSection title="Default Expanded">
        <ExampleBox>
          <Accordion title="Expanded by default" defaultExpanded>
            <Typography>This accordion starts in an expanded state.</Typography>
          </Accordion>
        </ExampleBox>
        <CodeBlock
          code={`<Accordion title="Expanded by default" defaultExpanded>
  Content here
</Accordion>`}
        />
      </DocSection>

      <DocSection
        title="AccordionGroup"
        description="Group of accordions with single/multiple expand support"
      >
        <ExampleBox>
          <AccordionGroup items={groupItems} />
        </ExampleBox>
        <CodeBlock
          code={`const items = [
  { title: 'Section 1', content: 'Content for section 1' },
  { title: 'Section 2', content: 'Content for section 2' },
  { title: 'Section 3', content: 'Content for section 3' },
];

<AccordionGroup items={items} />`}
        />
      </DocSection>

      <DocSection title="Allow Multiple Open">
        <ExampleBox>
          <AccordionGroup items={groupItems} allowMultiple />
        </ExampleBox>
        <CodeBlock
          code={`<AccordionGroup items={items} allowMultiple />`}
        />
      </DocSection>

      <DocSection title="Accordion Props">
        <PropsTable
          props={[
            {
              name: "title",
              type: "string | ReactNode",
              description: "Title of the accordion",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Accordion content",
            },
            {
              name: "open",
              type: "boolean",
              description: "Controlled open state",
            },
            {
              name: "handleChange",
              type: "(isExpanded: boolean) => void",
              description: "Callback when accordion state changes",
            },
            {
              name: "defaultExpanded",
              type: "boolean",
              default: "false",
              description: "Default expanded state (uncontrolled)",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the accordion is disabled",
            },
            {
              name: "expandIconPosition",
              type: '"left" | "right"',
              default: '"right"',
              description: "Position of the expand icon",
            },
            {
              name: "hideExpandIcon",
              type: "boolean",
              default: "false",
              description: "Hide the expand icon",
            },
          ]}
        />
      </DocSection>

      <DocSection title="AccordionGroup Props">
        <PropsTable
          props={[
            {
              name: "items",
              type: "Array<{title, content}>",
              default: "[]",
              description: "Array of accordion items",
            },
            {
              name: "allowMultiple",
              type: "boolean",
              default: "false",
              description: "Allow multiple items to be open",
            },
            {
              name: "defaultExpanded",
              type: "number | Record<number, boolean>",
              description: "Index of default expanded item(s)",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disable all accordions",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default AccordionDocs;
