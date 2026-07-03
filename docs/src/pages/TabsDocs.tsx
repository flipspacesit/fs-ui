import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { Tabs, type TabsVariant, type TabsColor } from "../../../src";

const ITEMS = [
  { label: "Overview", value: "overview" },
  { label: "Design", value: "design" },
  { label: "Estimate", value: "estimate" },
];

const Demo: React.FC<{ variant: TabsVariant; color: TabsColor }> = ({
  variant,
  color,
}) => {
  const [v, setV] = useState("overview");
  return (
    <Tabs
      items={ITEMS}
      value={v}
      onChange={setV}
      variant={variant}
      color={color}
    />
  );
};

const COLORS: TabsColor[] = ["slateBlue", "blue", "yellow"];

const TabsDocs: React.FC = () => {
  const [value, setValue] = useState("overview");

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Tabs
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A single Tabs component covering the segmented, pill, underline
        (film-strip) and folder styles, each available in three colour families
        (slateBlue / blue / yellow). Selection is controlled via the{" "}
        <code>value</code> / <code>onChange</code> pair. Figma "Tabs" (424:169).
      </Typography>

      <DocSection title="Import">
        <CodeBlock code={`import { Tabs } from '@flipspacesit/fs-ui';`} />
      </DocSection>

      <DocSection
        title="Basic usage"
        description="Tabs is controlled: pass the selected tab's value and update it in the onChange callback."
      >
        <ExampleBox>
          <Tabs items={ITEMS} value={value} onChange={setValue} />
        </ExampleBox>
        <CodeBlock
          code={`const ITEMS = [
  { label: 'Overview', value: 'overview' },
  { label: 'Design', value: 'design' },
  { label: 'Estimate', value: 'estimate' },
]

const [value, setValue] = useState('overview')

<Tabs items={ITEMS} value={value} onChange={setValue} />`}
        />
      </DocSection>

      <DocSection
        title="Segmented variant"
        description="Boxed segments (the default variant), shown across all three colour families."
      >
        <ExampleBox>
          <Paper
            variant="outlined"
            sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}
          >
            {COLORS.map((color) => (
              <Demo key={color} variant="segmented" color={color} />
            ))}
          </Paper>
        </ExampleBox>
        <CodeBlock
          code={`<Tabs items={ITEMS} value={value} onChange={setValue} variant="segmented" color="slateBlue" />
<Tabs items={ITEMS} value={value} onChange={setValue} variant="segmented" color="blue" />
<Tabs items={ITEMS} value={value} onChange={setValue} variant="segmented" color="yellow" />`}
        />
      </DocSection>

      <DocSection
        title="Pill variant"
        description="Rounded pills inside a single rounded container, shown across all three colour families."
      >
        <ExampleBox>
          <Paper
            variant="outlined"
            sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}
          >
            {COLORS.map((color) => (
              <Demo key={color} variant="pill" color={color} />
            ))}
          </Paper>
        </ExampleBox>
        <CodeBlock
          code={`<Tabs items={ITEMS} value={value} onChange={setValue} variant="pill" color="slateBlue" />
<Tabs items={ITEMS} value={value} onChange={setValue} variant="pill" color="blue" />
<Tabs items={ITEMS} value={value} onChange={setValue} variant="pill" color="yellow" />`}
        />
      </DocSection>

      <DocSection
        title="Underline variant"
        description="A film-strip bar with an underline marking the selected tab. The colour prop does not change the yellow underline accent for this variant."
      >
        <ExampleBox>
          <Paper
            variant="outlined"
            sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}
          >
            {COLORS.map((color) => (
              <Demo key={color} variant="underline" color={color} />
            ))}
          </Paper>
        </ExampleBox>
        <CodeBlock
          code={`<Tabs items={ITEMS} value={value} onChange={setValue} variant="underline" color="slateBlue" />
<Tabs items={ITEMS} value={value} onChange={setValue} variant="underline" color="blue" />
<Tabs items={ITEMS} value={value} onChange={setValue} variant="underline" color="yellow" />`}
        />
      </DocSection>

      <DocSection
        title="Folder variant"
        description="Stacked folder tabs where the selected tab lifts above the strip, shown across all three colour families."
      >
        <ExampleBox>
          <Paper
            variant="outlined"
            sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}
          >
            {COLORS.map((color) => (
              <Demo key={color} variant="folder" color={color} />
            ))}
          </Paper>
        </ExampleBox>
        <CodeBlock
          code={`<Tabs items={ITEMS} value={value} onChange={setValue} variant="folder" color="slateBlue" />
<Tabs items={ITEMS} value={value} onChange={setValue} variant="folder" color="blue" />
<Tabs items={ITEMS} value={value} onChange={setValue} variant="folder" color="yellow" />`}
        />
      </DocSection>

      <DocSection
        title="With icons"
        description="Each tab item may carry an optional leading icon node rendered before its label."
      >
        <ExampleBox>
          <Tabs
            items={[
              { label: "Overview", value: "overview", icon: <span>📋</span> },
              { label: "Design", value: "design", icon: <span>🎨</span> },
              { label: "Estimate", value: "estimate", icon: <span>💰</span> },
            ]}
            value={value}
            onChange={setValue}
            variant="pill"
            color="blue"
          />
        </ExampleBox>
        <CodeBlock
          code={`<Tabs
  items={[
    { label: 'Overview', value: 'overview', icon: <ListIcon /> },
    { label: 'Design', value: 'design', icon: <PaletteIcon /> },
    { label: 'Estimate', value: 'estimate', icon: <MoneyIcon /> },
  ]}
  value={value}
  onChange={setValue}
  variant="pill"
  color="blue"
/>`}
        />
      </DocSection>

      <DocSection title="Tabs Props">
        <PropsTable
          props={[
            {
              name: "items",
              type: "TabItem[]",
              description: "Ordered list of tabs to render.",
            },
            {
              name: "value",
              type: "string",
              description: "value of the currently selected tab.",
            },
            {
              name: "onChange",
              type: "(value: string) => void",
              description:
                "Fires with the selected tab's value when a tab is clicked.",
            },
            {
              name: "variant",
              type: `"segmented" | "pill" | "underline" | "folder"`,
              default: `"segmented"`,
              description: "Visual style.",
            },
            {
              name: "color",
              type: `"slateBlue" | "blue" | "yellow"`,
              default: `"slateBlue"`,
              description: "Colour family for the selected fill.",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              default: "{}",
              description: "MUI sx overrides, merged last.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="TabItem"
        description="Shape of a single entry in the items array."
      >
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Text shown on the tab.",
            },
            {
              name: "value",
              type: "string",
              description:
                "Unique identifier compared against TabsProps.value to determine selection.",
            },
            {
              name: "icon",
              type: "React.ReactNode",
              description:
                "Optional leading icon node rendered before the label.",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default TabsDocs;
