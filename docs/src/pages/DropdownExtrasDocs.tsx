import React, { useState } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { CountryDropdown, SpaceCard } from "../../../src";

const DropdownExtrasDocs: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        CountryDropdown & SpaceCard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Dropdown and accordion extras from the Figma "Dropdowns & Accordians"
        set (419:19): a country / flag dropdown trigger and an expandable space
        card.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { CountryDropdown, SpaceCard } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection
        title="CountryDropdown"
        description="Country / flag dropdown trigger with a leading flag badge in the tertiary blue. Supports round (pill) and rectangular shapes, and a controlled open state that flips the caret."
      >
        <ExampleBox>
          <Stack direction="row" gap={2} alignItems="center">
            <CountryDropdown
              flag={<span style={{ fontSize: 16 }}>🇮🇳</span>}
              label="+91"
              open={open}
              onClick={() => setOpen((o) => !o)}
            />
            <CountryDropdown
              flag={<span style={{ fontSize: 16 }}>🇺🇸</span>}
              label="+1"
              variant="rectangular"
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const [open, setOpen] = useState(false);

// Round (default), controlled open state toggles the caret
<CountryDropdown
  flag={<span style={{ fontSize: 16 }}>🇮🇳</span>}
  label="+91"
  open={open}
  onClick={() => setOpen((o) => !o)}
/>

// Rectangular variant
<CountryDropdown
  flag={<span style={{ fontSize: 16 }}>🇺🇸</span>}
  label="+1"
  variant="rectangular"
/>`}
        />
      </DocSection>

      <DocSection title="CountryDropdown Props">
        <PropsTable
          props={[
            {
              name: "flag",
              type: "ReactNode",
              description: "Flag element (img / emoji) shown in the leading badge",
            },
            {
              name: "label",
              type: "string",
              description: 'Label, e.g. "+91" or "India"',
            },
            {
              name: "open",
              type: "boolean",
              default: "false",
              description: "Open state (controls the caret)",
            },
            {
              name: "onClick",
              type: "() => void",
              description: "Fired on trigger click; suppressed while disabled.",
            },
            {
              name: "variant",
              type: '"round" | "rectangular"',
              default: '"round"',
              description: "Shape — round (pill) or rectangular (radius-sm)",
            },
            {
              name: "size",
              type: '"small" | "medium" | "large"',
              default: '"medium"',
              description: "Size",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "When true, dims the trigger and blocks onClick.",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "MUI sx overrides, merged last.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="SpaceCard"
        description="Expandable render / space card (Accordion Type 2/3). The border turns Blue/500 when expanded and a toggle link reveals the body. Works uncontrolled via defaultExpanded or controlled via expanded + onToggle."
      >
        <ExampleBox>
          <Box sx={{ maxWidth: 420 }}>
            <SpaceCard
              title="Living Room"
              meta={
                <Typography variant="b2" sx={{ color: "#616161" }}>
                  3 spaces · 360° view
                </Typography>
              }
              defaultExpanded
            >
              <Stack gap={1}>
                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  Space A — render
                </Paper>
                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  Space B — render
                </Paper>
              </Stack>
            </SpaceCard>
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`<SpaceCard
  title="Living Room"
  meta={
    <Typography variant="b2" sx={{ color: '#616161' }}>
      3 spaces · 360° view
    </Typography>
  }
  defaultExpanded
>
  <Stack gap={1}>
    <Paper variant="outlined" sx={{ p: 1.5 }}>
      Space A — render
    </Paper>
    <Paper variant="outlined" sx={{ p: 1.5 }}>
      Space B — render
    </Paper>
  </Stack>
</SpaceCard>`}
        />
      </DocSection>

      <DocSection title="SpaceCard Props">
        <PropsTable
          props={[
            {
              name: "title",
              type: "string",
              description: "Card title",
            },
            {
              name: "meta",
              type: "ReactNode",
              description: "Meta row under the title (grey)",
            },
            {
              name: "expanded",
              type: "boolean",
              description: "Controlled expanded state",
            },
            {
              name: "defaultExpanded",
              type: "boolean",
              default: "false",
              description: "Uncontrolled initial state",
            },
            {
              name: "onToggle",
              type: "(expanded: boolean) => void",
              description: "Toggle callback",
            },
            {
              name: "toggleLabel",
              type: "string",
              default: '"View spaces"',
              description: "Toggle CTA label",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Expanded body (inner space cards, etc.)",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "MUI sx overrides, merged last.",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default DropdownExtrasDocs;
