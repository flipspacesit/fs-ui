import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import {
  SidebarNav,
  type SidebarNavItem,
  Gear,
  MapPin,
  FileText,
  UserCircle,
  Bank,
} from "../../../src";

const ITEMS: SidebarNavItem[] = [
  { label: "Dashboard", value: "dashboard", icon: <Bank /> },
  {
    label: "Projects",
    value: "projects",
    icon: <FileText />,
    children: [
      { label: "Active", value: "active" },
      { label: "Archived", value: "archived" },
    ],
  },
  { label: "Locations", value: "locations", icon: <MapPin /> },
  { label: "Team", value: "team", icon: <UserCircle /> },
  { label: "Settings", value: "settings", icon: <Gear /> },
];

const SidebarNavDocs: React.FC = () => {
  const [v, setV] = useState("active");

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        SidebarNav
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Application left navigation rail — Figma "Navigation Menu" (1555:16799).
        The active item is highlighted in slate-blue; expandable parents reveal
        indented children with a connector, and an icon-only collapsed state is
        supported.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { SidebarNav } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection
        title="SidebarNav"
        description="Expanded navigation rail with a controlled active value. Parents with children expand/collapse in place; leaves fire onChange with their value."
      >
        <ExampleBox>
          <SidebarNav items={ITEMS} value={v} onChange={setV} />
        </ExampleBox>
        <CodeBlock
          code={`const [value, setValue] = useState("active");

const items = [
  { label: "Dashboard", value: "dashboard", icon: <Bank /> },
  {
    label: "Projects",
    value: "projects",
    icon: <FileText />,
    children: [
      { label: "Active", value: "active" },
      { label: "Archived", value: "archived" },
    ],
  },
  { label: "Locations", value: "locations", icon: <MapPin /> },
  { label: "Team", value: "team", icon: <UserCircle /> },
  { label: "Settings", value: "settings", icon: <Gear /> },
];

<SidebarNav items={items} value={value} onChange={setValue} />`}
        />
      </DocSection>

      <DocSection
        title="Collapsed"
        description="Icon-only rail. Labels and child rows are hidden; set the collapsed prop to switch to the narrow 64px width."
      >
        <ExampleBox>
          <Stack direction="row" gap={4} alignItems="flex-start">
            <SidebarNav items={ITEMS} value={v} onChange={setV} />
            <SidebarNav items={ITEMS} value={v} onChange={setV} collapsed />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<SidebarNav items={items} value={value} onChange={setValue} collapsed />`}
        />
      </DocSection>

      <DocSection title="SidebarNav Props">
        <PropsTable
          props={[
            {
              name: "items",
              type: "SidebarNavItem[]",
              description:
                "Top-level navigation entries, optionally nesting one level of children.",
            },
            {
              name: "value",
              type: "string",
              description: "Active leaf value.",
            },
            {
              name: "onChange",
              type: "(value: string) => void",
              description:
                "Fired with the selected leaf's value when a non-parent row is clicked.",
            },
            {
              name: "collapsed",
              type: "boolean",
              default: "false",
              description: "Icon-only collapsed rail.",
            },
            {
              name: "width",
              type: "number",
              default: "240",
              description: "Expanded width.",
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
        title="SidebarNavItem"
        description="A single navigation entry — a leaf or an expandable parent with children."
      >
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Visible row label.",
            },
            {
              name: "value",
              type: "string",
              description: "Unique identifier matched against the active value.",
            },
            {
              name: "icon",
              type: "React.ReactNode",
              description: "Optional leading icon node.",
            },
            {
              name: "children",
              type: "SidebarNavItem[]",
              description:
                "Expandable parent — sub-items rendered indented.",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default SidebarNavDocs;
