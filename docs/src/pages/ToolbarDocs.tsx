import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { ListToolbar, SearchInput, Tabs, Dropdown, Button } from "../../../src";

const ToolbarDocs: React.FC = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        ListToolbar
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        List / search toolbar composite — Figma "Grouped Components"
        (1143:12713). A white bar with left + right slots — compose SearchInput,
        Tabs, Dropdown, Button, etc. into it.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { ListToolbar } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection
        title="ListToolbar"
        description="A white bar (SoftSteel border, radius-sm, Blue/Elevation-02) with a left slot (search, tabs) and a right slot (filters, sort, action button)."
      >
        <ExampleBox>
          <ListToolbar
            left={
              <>
                <SearchInput
                  value={search}
                  onChange={setSearch}
                  shape="rectangular"
                  containerSx={{ width: 220 }}
                />
                <Tabs
                  variant="segmented"
                  color="blue"
                  value={tab}
                  onChange={setTab}
                  items={[
                    { label: "Menu 1", value: "all" },
                    { label: "Menu 2", value: "mine" },
                  ]}
                />
              </>
            }
            right={
              <>
                <Dropdown
                  variant="rectangular"
                  label="Filter"
                  options={[
                    { value: "a", label: "Option A" },
                    { value: "b", label: "Option B" },
                  ]}
                />
                <Dropdown
                  variant="rectangular"
                  label="Sort"
                  options={[
                    { value: "new", label: "Newest" },
                    { value: "old", label: "Oldest" },
                  ]}
                />
                <Button variant="contained" color="primary" shape="rectangular">
                  + Add
                </Button>
              </>
            }
          />
        </ExampleBox>
        <CodeBlock
          code={`const [search, setSearch] = useState("");
const [tab, setTab] = useState("all");

<ListToolbar
  left={
    <>
      <SearchInput
        value={search}
        onChange={setSearch}
        shape="rectangular"
        containerSx={{ width: 220 }}
      />
      <Tabs
        variant="segmented"
        color="blue"
        value={tab}
        onChange={setTab}
        items={[
          { label: "Menu 1", value: "all" },
          { label: "Menu 2", value: "mine" },
        ]}
      />
    </>
  }
  right={
    <>
      <Dropdown
        variant="rectangular"
        label="Filter"
        options={[
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
        ]}
      />
      <Dropdown
        variant="rectangular"
        label="Sort"
        options={[
          { value: "new", label: "Newest" },
          { value: "old", label: "Oldest" },
        ]}
      />
      <Button variant="contained" color="primary" shape="rectangular">
        + Add
      </Button>
    </>
  }
/>`}
        />
      </DocSection>

      <DocSection
        title="Size variants"
        description="Control the bar height with the size prop."
      >
        <ExampleBox>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ListToolbar
              size="large"
              left={<Typography variant="body2">large (76px)</Typography>}
              right={
                <Button variant="contained" color="primary" shape="rectangular">
                  + Add
                </Button>
              }
            />
            <ListToolbar
              size="medium"
              left={<Typography variant="body2">medium (68px)</Typography>}
              right={
                <Button variant="contained" color="primary" shape="rectangular">
                  + Add
                </Button>
              }
            />
            <ListToolbar
              size="small"
              left={<Typography variant="body2">small (60px)</Typography>}
              right={
                <Button variant="contained" color="primary" shape="rectangular">
                  + Add
                </Button>
              }
            />
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`<ListToolbar size="large" left={...} right={...} />
<ListToolbar size="medium" left={...} right={...} />
<ListToolbar size="small" left={...} right={...} />`}
        />
      </DocSection>

      <DocSection title="ListToolbar Props">
        <PropsTable
          props={[
            {
              name: "left",
              type: "ReactNode",
              description: "Left-aligned content (search, tabs)",
            },
            {
              name: "right",
              type: "ReactNode",
              description: "Right-aligned content (filters, sort, action button)",
            },
            {
              name: "size",
              type: '"large" | "medium" | "small"',
              default: '"medium"',
              description: "Bar height",
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
    </Box>
  );
};

export default ToolbarDocs;
