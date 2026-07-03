import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { FilterPanel } from "../../../src";

const FilterDocs: React.FC = () => {
  const [sel, setSel] = useState<string[]>(["active"]);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        FilterPanel
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Faceted checkbox filter panel — Figma "Tables & Filter" (479:125).
        Slate-blue tint container with per-group slate headers and checkbox
        option rows.
      </Typography>

      <DocSection title="Import">
        <CodeBlock code={`import { FilterPanel } from '@flipspacesit/fs-ui';`} />
      </DocSection>

      <DocSection
        title="FilterPanel"
        description="A controlled, faceted checkbox filter. Pass grouped options, track the selected values in state, and update via onChange. Providing onClearAll renders a 'Clear all' action in the header."
      >
        <ExampleBox>
          <FilterPanel
            title="Filters"
            selected={sel}
            onChange={setSel}
            onClearAll={() => setSel([])}
            groups={[
              {
                label: "Status",
                options: [
                  { label: "Active", value: "active" },
                  { label: "Archived", value: "archived" },
                  { label: "Draft", value: "draft" },
                ],
              },
              {
                label: "Type",
                options: [
                  { label: "Project", value: "project" },
                  { label: "Named List", value: "list" },
                ],
              },
            ]}
          />
        </ExampleBox>
        <CodeBlock
          code={`const [sel, setSel] = useState<string[]>(["active"]);

<FilterPanel
  title="Filters"
  selected={sel}
  onChange={setSel}
  onClearAll={() => setSel([])}
  groups={[
    {
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Archived", value: "archived" },
        { label: "Draft", value: "draft" },
      ],
    },
    {
      label: "Type",
      options: [
        { label: "Project", value: "project" },
        { label: "Named List", value: "list" },
      ],
    },
  ]}
/>`}
        />
      </DocSection>

      <DocSection
        title="Without Clear all"
        description="Omit onClearAll to hide the header action — useful when the filter has no reset affordance."
      >
        <ExampleBox>
          <FilterPanel
            title="Priority"
            selected={sel}
            onChange={setSel}
            groups={[
              {
                label: "Level",
                options: [
                  { label: "High", value: "high" },
                  { label: "Medium", value: "medium" },
                  { label: "Low", value: "low" },
                ],
              },
            ]}
          />
        </ExampleBox>
        <CodeBlock
          code={`<FilterPanel
  title="Priority"
  selected={sel}
  onChange={setSel}
  groups={[
    {
      label: "Level",
      options: [
        { label: "High", value: "high" },
        { label: "Medium", value: "medium" },
        { label: "Low", value: "low" },
      ],
    },
  ]}
/>`}
        />
      </DocSection>

      <DocSection title="FilterPanel Props">
        <PropsTable
          props={[
            {
              name: "title",
              type: "string",
              default: '"Filters"',
              description: "Panel heading; defaults to \"Filters\".",
            },
            {
              name: "groups",
              type: "FilterGroup[]",
              description: "Ordered groups of checkbox options to render.",
            },
            {
              name: "selected",
              type: "string[]",
              description: "Selected option values.",
            },
            {
              name: "onChange",
              type: "(selected: string[]) => void",
              description:
                "Called with the next `selected` array whenever an option is toggled.",
            },
            {
              name: "onClearAll",
              type: "() => void",
              description:
                'Optional handler; when set, renders a "Clear all" action in the header.',
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              default: "{}",
              description: "MUI `sx` overrides, merged last.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="FilterGroup">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description:
                "Group heading shown in the slate header bar; also the React key.",
            },
            {
              name: "options",
              type: "FilterOption[]",
              description: "Checkbox rows belonging to this group.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="FilterOption">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Human-readable text shown next to the checkbox.",
            },
            {
              name: "value",
              type: "string",
              description:
                "Stable value tracked in the `selected` array and toggled on change.",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default FilterDocs;
