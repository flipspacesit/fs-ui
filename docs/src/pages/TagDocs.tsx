import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { Tag, StatusChip } from "../../../src";

const TagDocs: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Tag & StatusChip
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Components for displaying labels, badges, and status indicators.
      </Typography>

      <DocSection title="Import">
        <CodeBlock code={`import { Tag, StatusChip } from '@flipspacesit/fs-ui';`} />
      </DocSection>

      <DocSection title="Basic Tag" description="Display labels with custom colors">
        <ExampleBox>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Box sx={{ width: 150 }}>
              <Tag
                label="Category"
                backgroundColor="#DEE7FF"
                color="#3361FF"
                borderColor="#3361FF"
              />
            </Box>
            <Box sx={{ width: 150 }}>
              <Tag
                label="Featured"
                backgroundColor="#D1FAE5"
                color="#065F46"
                borderColor="#10B981"
              />
            </Box>
            <Box sx={{ width: 150 }}>
              <Tag
                label="Warning"
                backgroundColor="#FEF3C7"
                color="#92400E"
                borderColor="#F59E0B"
              />
            </Box>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<Tag
  label="Category"
  backgroundColor="#DEE7FF"
  color="#3361FF"
  borderColor="#3361FF"
/>

<Tag
  label="Featured"
  backgroundColor="#D1FAE5"
  color="#065F46"
  borderColor="#10B981"
/>`}
        />
      </DocSection>

      <DocSection title="Tag Sizes">
        <ExampleBox>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ width: 100 }}>Extra Small:</Typography>
              <Box sx={{ width: 120 }}>
                <Tag label="Extra Small" size="extraSmall" backgroundColor="#F0F4FF" borderColor="#AEB6CE" />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ width: 100 }}>Small:</Typography>
              <Box sx={{ width: 120 }}>
                <Tag label="Small" size="small" backgroundColor="#F0F4FF" borderColor="#AEB6CE" />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ width: 100 }}>Medium:</Typography>
              <Box sx={{ width: 120 }}>
                <Tag label="Medium" size="medium" backgroundColor="#F0F4FF" borderColor="#AEB6CE" />
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ width: 100 }}>Large:</Typography>
              <Box sx={{ width: 120 }}>
                <Tag label="Large" size="large" backgroundColor="#F0F4FF" borderColor="#AEB6CE" />
              </Box>
            </Stack>
          </Stack>
        </ExampleBox>
      </DocSection>

      <DocSection
        title="StatusChip"
        description="Pre-styled chips for common status indicators"
      >
        <ExampleBox>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <StatusChip label="Success" status="success" />
            <StatusChip label="Warning" status="warning" />
            <StatusChip label="Error" status="error" />
            <StatusChip label="Info" status="info" />
            <StatusChip label="Default" status="default" />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<StatusChip label="Success" status="success" />
<StatusChip label="Warning" status="warning" />
<StatusChip label="Error" status="error" />
<StatusChip label="Info" status="info" />
<StatusChip label="Default" status="default" />`}
        />
      </DocSection>

      <DocSection title="Tag Props">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Text label for the tag",
            },
            {
              name: "color",
              type: "string",
              default: '"#1B1C1E"',
              description: "Text color",
            },
            {
              name: "backgroundColor",
              type: "string",
              default: '"#F0F4FF"',
              description: "Background color",
            },
            {
              name: "borderColor",
              type: "string",
              default: '"#AEB6CE"',
              description: "Border color",
            },
            {
              name: "icon",
              type: "ReactNode",
              description: "Optional icon to display",
            },
            {
              name: "variant",
              type: '"rectangular" | "round"',
              default: '"rectangular"',
              description: "Visual variant",
            },
            {
              name: "size",
              type: '"extraSmall" | "small" | "medium" | "large"',
              default: '"small"',
              description: "Size of the tag",
            },
          ]}
        />
      </DocSection>

      <DocSection title="StatusChip Props">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Status label text",
            },
            {
              name: "status",
              type: '"success" | "warning" | "error" | "info" | "default"',
              default: '"default"',
              description: "Status type for automatic coloring",
            },
            {
              name: "backgroundColor",
              type: "string",
              description: "Override background color",
            },
            {
              name: "color",
              type: "string",
              description: "Override text color",
            },
            {
              name: "size",
              type: '"extraSmall" | "small" | "medium" | "large"',
              default: '"small"',
              description: "Size of the chip",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default TagDocs;
