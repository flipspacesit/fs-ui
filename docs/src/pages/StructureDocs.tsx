import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import {
  Badge,
  Stepper,
  MilestoneStepper,
  Tree,
  SideModal,
  ProjectRowEditor,
  Button,
  IconButton,
  Gear,
} from "../../../src";

const StructureDocs: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("o");

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Structure Components
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Structural and progress components — notification badges, horizontal and
        vertical steppers, hierarchical trees, right-docked side modals, and the
        inline project row editor.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { Badge, Stepper, MilestoneStepper, Tree, SideModal, ProjectRowEditor } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection
        title="Badge"
        description="Notification badge — a red count pill or dot anchored to the top-right of a host element."
      >
        <ExampleBox>
          <Stack direction="row" gap={3} alignItems="center">
            <Badge count={3}>
              <IconButton icon={<Gear />} color="white" />
            </Badge>
            <Badge count={128} max={99}>
              <IconButton icon={<Gear />} color="white" />
            </Badge>
            <Badge dot>
              <IconButton icon={<Gear />} color="white" />
            </Badge>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<Badge count={3}>
  <IconButton icon={<Gear />} color="white" />
</Badge>

<Badge count={128} max={99}>
  <IconButton icon={<Gear />} color="white" />
</Badge>

<Badge dot>
  <IconButton icon={<Gear />} color="white" />
</Badge>`}
        />
      </DocSection>

      <DocSection title="Badge Props">
        <PropsTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: "Host element the badge overlays",
            },
            {
              name: "count",
              type: "number",
              description: "Numbered count",
            },
            {
              name: "dot",
              type: "boolean",
              default: "false",
              description: "Dot mode (no number)",
            },
            {
              name: "max",
              type: "number",
              default: "99",
              description: "Cap the count (e.g. 99+)",
            },
            {
              name: "showZero",
              type: "boolean",
              default: "false",
              description: "Show even when count is 0",
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
        title="Stepper"
        description="Horizontal stepper — steps at or below the active index are filled with the blue circle; upcoming steps stay grey."
      >
        <ExampleBox>
          <Stepper
            steps={["Details", "Design", "Estimate", "Review"]}
            active={1}
          />
        </ExampleBox>
        <CodeBlock
          code={`<Stepper
  steps={["Details", "Design", "Estimate", "Review"]}
  active={1}
/>`}
        />
      </DocSection>

      <DocSection title="Stepper Props">
        <PropsTable
          props={[
            {
              name: "steps",
              type: "string[]",
              description: "Step labels",
            },
            {
              name: "active",
              type: "number",
              description:
                "Index of the active/current step (steps at/below it are filled)",
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
        title="MilestoneStepper"
        description="Vertical milestone stepper — a green (Success) or yellow (Brand) family. Done dots carry a check, current is ringed, pending is a soft outline."
      >
        <ExampleBox>
          <Stack direction="row" gap={6}>
            <MilestoneStepper
              color="green"
              steps={[
                { label: "Kickoff", state: "done" },
                { label: "Design", state: "done" },
                { label: "Build", state: "current" },
                { label: "Launch", state: "pending" },
              ]}
            />
            <MilestoneStepper
              color="yellow"
              steps={[
                { label: "Kickoff", state: "done" },
                { label: "Design", state: "current" },
                { label: "Build", state: "pending" },
              ]}
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<MilestoneStepper
  color="green"
  steps={[
    { label: "Kickoff", state: "done" },
    { label: "Design", state: "done" },
    { label: "Build", state: "current" },
    { label: "Launch", state: "pending" },
  ]}
/>

<MilestoneStepper
  color="yellow"
  steps={[
    { label: "Kickoff", state: "done" },
    { label: "Design", state: "current" },
    { label: "Build", state: "pending" },
  ]}
/>`}
        />
      </DocSection>

      <DocSection title="MilestoneStepper Props">
        <PropsTable
          props={[
            {
              name: "steps",
              type: "MilestoneStep[]",
              description: "Ordered milestones rendered top-to-bottom.",
            },
            {
              name: "color",
              type: '"green" | "yellow"',
              default: '"green"',
              description: "Colour family for completed dots",
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
        title="MilestoneStep"
        description="A single milestone row: optional label plus its lifecycle state."
      >
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description:
                "Text shown beside the dot; row renders dot-only when omitted.",
            },
            {
              name: "state",
              type: '"done" | "current" | "pending"',
              description:
                "Lifecycle state driving the dot's fill, ring, and connector styling.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="Tree"
        description="Tree / hierarchy indicator — yellow square parents with a +/- glyph, yellow leaf dots, and connector lines. Parents toggle expansion on click; leaves fire onSelect. Expansion is self-managed, seeded from defaultExpanded."
      >
        <ExampleBox>
          <Tree
            defaultExpanded={["proj", "est"]}
            nodes={[
              {
                label: "Project",
                value: "proj",
                children: [
                  { label: "Design", value: "d" },
                  {
                    label: "Estimate",
                    value: "est",
                    children: [{ label: "BOQ", value: "boq" }],
                  },
                ],
              },
            ]}
          />
        </ExampleBox>
        <CodeBlock
          code={`<Tree
  defaultExpanded={["proj", "est"]}
  onSelect={(value) => console.log(value)}
  nodes={[
    {
      label: "Project",
      value: "proj",
      children: [
        { label: "Design", value: "d" },
        {
          label: "Estimate",
          value: "est",
          children: [{ label: "BOQ", value: "boq" }],
        },
      ],
    },
  ]}
/>`}
        />
      </DocSection>

      <DocSection title="Tree Props">
        <PropsTable
          props={[
            {
              name: "nodes",
              type: "TreeNode[]",
              description: "Root nodes of the hierarchy to render.",
            },
            {
              name: "defaultExpanded",
              type: "string[]",
              default: "[]",
              description: "Initially expanded node values",
            },
            {
              name: "onSelect",
              type: "(value: string) => void",
              description: "Fired with a leaf node's value when it is clicked.",
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
        title="TreeNode"
        description="A single node in the tree; nest via children to build the hierarchy."
      >
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Text shown for the row.",
            },
            {
              name: "value",
              type: "string",
              description:
                "Stable identifier, unique across the tree; used as key, expand/select id.",
            },
            {
              name: "children",
              type: "TreeNode[]",
              description:
                "Child nodes; presence makes this node a collapsible parent.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="SideModal"
        description="Right-docked side modal / drawer — a header with an optional tabbed row, a scrollable body, and right-aligned footer actions."
      >
        <ExampleBox>
          <Box>
            <Button onClick={() => setOpen(true)}>Open side modal</Button>
            <SideModal
              open={open}
              onClose={() => setOpen(false)}
              title="Details"
              tabs={[
                { label: "Overview", value: "o" },
                { label: "Files", value: "f" },
              ]}
              activeTab={tab}
              onTabChange={setTab}
              footer={<Button onClick={() => setOpen(false)}>Save</Button>}
            >
              <Typography variant="b1">Side sheet body content.</Typography>
            </SideModal>
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`const [open, setOpen] = useState(false);
const [tab, setTab] = useState("o");

<Button onClick={() => setOpen(true)}>Open side modal</Button>

<SideModal
  open={open}
  onClose={() => setOpen(false)}
  title="Details"
  tabs={[
    { label: "Overview", value: "o" },
    { label: "Files", value: "f" },
  ]}
  activeTab={tab}
  onTabChange={setTab}
  footer={<Button onClick={() => setOpen(false)}>Save</Button>}
>
  <Typography variant="b1">Side sheet body content.</Typography>
</SideModal>`}
        />
      </DocSection>

      <DocSection title="SideModal Props">
        <PropsTable
          props={[
            {
              name: "open",
              type: "boolean",
              description: "Whether the drawer is open.",
            },
            {
              name: "onClose",
              type: "() => void",
              description:
                "Called when the drawer requests to close (backdrop click, Esc, or the close button).",
            },
            {
              name: "title",
              type: "string",
              description: "Header title text.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Body content",
            },
            {
              name: "footer",
              type: "ReactNode",
              description: "Footer actions (right-aligned)",
            },
            {
              name: "tabs",
              type: "SideModalTab[]",
              description: "Optional tabbed header (Type 3)",
            },
            {
              name: "activeTab",
              type: "string",
              description: "value of the currently active tab.",
            },
            {
              name: "onTabChange",
              type: "(value: string) => void",
              description:
                "Called with the selected tab's value when a tab is clicked.",
            },
            {
              name: "width",
              type: "number",
              default: "420",
              description: "Drawer width in pixels (capped at 100vw).",
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
        title="SideModalTab"
        description="A single tab in the SideModal tabbed header (Type 3)."
      >
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Visible tab label.",
            },
            {
              name: "value",
              type: "string",
              description: "Unique tab identifier, matched against activeTab.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="ProjectRowEditor"
        description="Inline project row-editor panel — a slate-blue title bar, a white field grid, and a blue close rail. Field values are slots — drop Dropdown/SelectInput/inputs in."
      >
        <ExampleBox>
          <ProjectRowEditor
            title="Edit Project Row"
            onClose={() => {}}
            fields={[
              { label: "Project", value: "Andheri Office" },
              { label: "Stage", value: "Design" },
              { label: "Area (sq ft)", value: "4,200" },
              { label: "Owner", value: "R. Mehta" },
            ]}
          />
        </ExampleBox>
        <CodeBlock
          code={`<ProjectRowEditor
  title="Edit Project Row"
  columns={2}
  onClose={() => setEditing(false)}
  fields={[
    { label: "Project", value: "Andheri Office" },
    { label: "Stage", value: "Design" },
    { label: "Area (sq ft)", value: "4,200" },
    { label: "Owner", value: "R. Mehta" },
  ]}
/>`}
        />
      </DocSection>

      <DocSection title="ProjectRowEditor Props">
        <PropsTable
          props={[
            {
              name: "title",
              type: "string",
              description: "Text shown in the title bar.",
            },
            {
              name: "fields",
              type: "RowEditorField[]",
              description: "Ordered fields rendered in the grid body.",
            },
            {
              name: "columns",
              type: "number",
              default: "2",
              description: "Columns in the field grid",
            },
            {
              name: "onClose",
              type: "() => void",
              description:
                "Invoked when the close rail is clicked/keyed; the rail hides when omitted.",
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
        title="RowEditorField"
        description="One field row in the editor grid: a label plus its value/control slot."
      >
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Field label shown above the value.",
            },
            {
              name: "value",
              type: "ReactNode",
              description:
                "Value display or an editable control (Dropdown/SelectInput/input)",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default StructureDocs;
