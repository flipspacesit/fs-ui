import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { IconBadge, PriorityBadge, CheckIcon, Warning, Info } from "../../../src";

const BadgesDocs: React.FC = () => (
  <Box>
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
      IconBadge & PriorityBadge
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      IconBadge and PriorityBadge — small status/priority indicators from the DS
      "Tags & Badges" set (Figma 442:14616).
    </Typography>

    <DocSection title="Import">
      <CodeBlock
        code={`import { IconBadge, PriorityBadge } from '@flipspacesit/fs-ui';`}
      />
    </DocSection>

    <DocSection
      title="IconBadge"
      description="Icon-only badge. filled = circular solid (Reaction: Like/Dislike/Love); tinted = rounded pale surface (Temperature: Hot/Warm/Cold). Colors map to semantic theme tokens."
    >
      <ExampleBox>
        <Stack direction="row" gap={2} alignItems="center">
          <IconBadge icon={<CheckIcon />} color="success" variant="filled" />
          <IconBadge icon={<CheckIcon />} color="error" variant="filled" />
          <IconBadge icon={<CheckIcon />} color="grey" variant="filled" />
          <IconBadge icon={<Warning />} color="error" variant="tinted" />
          <IconBadge icon={<Warning />} color="warning" variant="tinted" />
          <IconBadge icon={<Info />} color="interactive" variant="tinted" />
        </Stack>
      </ExampleBox>
      <CodeBlock
        code={`{/* filled = circular solid */}
<IconBadge icon={<CheckIcon />} color="success" variant="filled" />
<IconBadge icon={<CheckIcon />} color="error" variant="filled" />
<IconBadge icon={<CheckIcon />} color="grey" variant="filled" />

{/* tinted = rounded pale surface */}
<IconBadge icon={<Warning />} color="error" variant="tinted" />
<IconBadge icon={<Warning />} color="warning" variant="tinted" />
<IconBadge icon={<Info />} color="interactive" variant="tinted" />`}
      />
    </DocSection>

    <DocSection title="IconBadge Props">
      <PropsTable
        props={[
          {
            name: "icon",
            type: "React.ReactNode",
            description:
              "Icon node rendered centered inside the badge (sized to 60% of the badge).",
          },
          {
            name: "variant",
            type: '"filled" | "tinted"',
            default: '"filled"',
            description:
              "filled = circular solid (Reaction badge); tinted = rounded pale (Temperature badge).",
          },
          {
            name: "color",
            type: '"success" | "error" | "warning" | "interactive" | "grey"',
            default: '"success"',
            description: "Semantic color scheme; defaults to \"success\".",
          },
          {
            name: "size",
            type: "ComponentSize",
            default: '"large"',
            description:
              "Badge dimension preset (mapped through HEIGHTS); defaults to \"large\".",
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
      title="PriorityBadge"
      description={
        "Priority tier indicator (P1 / P2 / P3). Each level gets its own Misc-palette hue; shape toggles square vs pill, and label overrides the default \"P{level}\" text."
      }
    >
      <ExampleBox>
        <Stack direction="row" gap={2}>
          <PriorityBadge level={1} />
          <PriorityBadge level={2} />
          <PriorityBadge level={3} />
          <PriorityBadge level={1} shape="pill" />
          <PriorityBadge level={2} shape="pill" />
          <PriorityBadge level={3} shape="pill" />
        </Stack>
      </ExampleBox>
      <CodeBlock
        code={`{/* square (default) */}
<PriorityBadge level={1} />
<PriorityBadge level={2} />
<PriorityBadge level={3} />

{/* pill */}
<PriorityBadge level={1} shape="pill" />
<PriorityBadge level={2} shape="pill" />
<PriorityBadge level={3} shape="pill" />`}
      />
    </DocSection>

    <DocSection title="PriorityBadge Props">
      <PropsTable
        props={[
          {
            name: "level",
            type: "1 | 2 | 3",
            description: "Priority level (P1 / P2 / P3).",
          },
          {
            name: "shape",
            type: '"square" | "pill"',
            default: '"square"',
            description: "square (radius-xxs) or pill (radius-pill-100).",
          },
          {
            name: "label",
            type: "string",
            default: '"P{level}"',
            description: 'Override label (defaults to "P{level}").',
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

export default BadgesDocs;
