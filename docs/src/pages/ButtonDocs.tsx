import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { Button, OpenDropDownButton, DropDownApplyButton } from "../../../src";

const ButtonDocs: React.FC = () => {
  const [selected, setSelected] = useState(false);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Button Components
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Button components built on top of MUI Button with additional styling for
        dropdown interactions.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { Button, OpenDropDownButton, DropDownApplyButton } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection title="Basic Button" description="Wrapper around MUI Button">
        <ExampleBox>
          <Stack direction="row" spacing={2}>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>`}
        />
      </DocSection>

      <DocSection
        title="OpenDropDownButton"
        description="Button for opening dropdowns with visual feedback for open/closed state"
      >
        <ExampleBox>
          <Stack direction="row" spacing={2} alignItems="center">
            <OpenDropDownButton
              selected={selected}
              onClick={() => setSelected(!selected)}
            >
              Filter
            </OpenDropDownButton>
            <Typography variant="body2">
              State: {selected ? "Open" : "Closed"}
            </Typography>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const [selected, setSelected] = useState(false);

<OpenDropDownButton
  selected={selected}
  onClick={() => setSelected(!selected)}
>
  Filter
</OpenDropDownButton>`}
        />
      </DocSection>

      <DocSection
        title="DropDownApplyButton"
        description="Apply/submit button for dropdown actions"
      >
        <ExampleBox>
          <Box sx={{ width: 200 }}>
            <DropDownApplyButton onClick={() => alert("Applied!")}>
              Apply Filters
            </DropDownApplyButton>
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`<DropDownApplyButton onClick={handleApply}>
  Apply Filters
</DropDownApplyButton>`}
        />
      </DocSection>

      <DocSection title="OpenDropDownButton Props">
        <PropsTable
          props={[
            {
              name: "selected",
              type: "boolean",
              default: "false",
              description: "Whether the dropdown is currently open/selected",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Button content",
            },
            {
              name: "...props",
              type: "ButtonProps",
              description: "All MUI Button props are supported",
            },
          ]}
        />
      </DocSection>

      <DocSection title="DropDownApplyButton Props">
        <PropsTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: "Button content",
            },
            {
              name: "sx",
              type: "SxProps",
              description: "Custom styles",
            },
            {
              name: "...props",
              type: "ButtonProps",
              description: "All MUI Button props are supported",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default ButtonDocs;
