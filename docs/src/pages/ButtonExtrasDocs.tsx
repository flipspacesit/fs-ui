import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import {
  IconButton,
  Switch,
  SegmentedToggle,
  Gear,
  Download,
  CheckIcon,
} from "../../../src";

const ButtonExtrasDocs: React.FC = () => {
  const [on, setOn] = useState(true);
  const [off, setOff] = useState(false);
  const [seg, setSeg] = useState("list");

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Button Extras
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        IconButton, Switch and SegmentedToggle — icon-only buttons, on/off
        toggles and segmented tab switches from the Figma "Buttons" page.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { IconButton, Switch, SegmentedToggle } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection
        title="IconButton"
        description="Icon-only button with four design-system colour families, round or rectangular shape, and button-matched sizes."
      >
        <ExampleBox>
          <Stack direction="row" gap={2} alignItems="center">
            <IconButton color="white" icon={<Gear />} />
            <IconButton color="yellow" icon={<Gear />} />
            <IconButton color="blue" icon={<Download />} />
            <IconButton color="green" icon={<CheckIcon />} />
          </Stack>
          <Stack direction="row" gap={2} alignItems="center">
            <IconButton color="blue" variant="rectangular" icon={<Download />} />
            <IconButton color="yellow" variant="rectangular" icon={<Gear />} />
            <IconButton color="yellow" size="small" icon={<Gear />} />
            <IconButton color="yellow" size="medium" icon={<Gear />} />
            <IconButton color="yellow" size="large" icon={<Gear />} />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`{/* Colours (round) */}
<IconButton color="white" icon={<Gear />} />
<IconButton color="yellow" icon={<Gear />} />
<IconButton color="blue" icon={<Download />} />
<IconButton color="green" icon={<CheckIcon />} />

{/* Rectangular shape + sizes */}
<IconButton color="blue" variant="rectangular" icon={<Download />} />
<IconButton color="yellow" variant="rectangular" icon={<Gear />} />
<IconButton color="yellow" size="small" icon={<Gear />} />
<IconButton color="yellow" size="medium" icon={<Gear />} />
<IconButton color="yellow" size="large" icon={<Gear />} />`}
        />
      </DocSection>

      <DocSection title="IconButton Props">
        <PropsTable
          props={[
            {
              name: "icon",
              type: "ReactNode",
              description: "Icon element (falls back to children)",
            },
            {
              name: "color",
              type: '"white" | "yellow" | "green" | "blue"',
              default: '"white"',
              description: "Design-system colour family",
            },
            {
              name: "size",
              type: '"extraSmall" | "small" | "medium" | "large" | "extraLarge"',
              default: '"medium"',
              description:
                "Square footprint size — matches button heights (24/28/32)",
            },
            {
              name: "variant",
              type: '"round" | "rectangular"',
              default: '"round"',
              description: "Shape — round (pill) or rectangular (radius-sm)",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              default: "{}",
              description: "MUI `sx` overrides, merged last.",
            },
            {
              name: "...props",
              type: 'Omit<IconButtonProps, "color" | "size">',
              description: "All other MUI IconButton props are supported",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="Switch"
        description="On/off toggle built on MUI Switch with an optional label. On uses the Interactive/Primary track, off uses Interactive/400."
      >
        <ExampleBox>
          <Stack direction="row" gap={4} alignItems="center">
            <Switch checked={on} onChange={(e) => setOn(e.target.checked)} />
            <Switch checked={off} onChange={(e) => setOff(e.target.checked)} />
            <Switch
              label="Notifications"
              checked={on}
              onChange={(e) => setOn(e.target.checked)}
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const [on, setOn] = useState(true);
const [off, setOff] = useState(false);

<Switch checked={on} onChange={(e) => setOn(e.target.checked)} />
<Switch checked={off} onChange={(e) => setOff(e.target.checked)} />
<Switch
  label="Notifications"
  checked={on}
  onChange={(e) => setOn(e.target.checked)}
/>`}
        />
      </DocSection>

      <DocSection title="Switch Props">
        <PropsTable
          props={[
            {
              name: "label",
              type: "ReactNode",
              description: "Optional label rendered beside the switch",
            },
            {
              name: "wrapperSx",
              type: "SxProps<Theme>",
              description: "Wrapper styles when a label is present",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "MUI `sx` overrides applied to the switch, merged last.",
            },
            {
              name: "...props",
              type: 'Omit<SwitchProps, "color">',
              description:
                "All other MUI Switch props (checked, onChange, disabled, …) are supported",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="SegmentedToggle"
        description="Segmented two/N-way toggle (Switch Tab). The active segment fills with the tertiary blue; inactive labels use SoftSteel."
      >
        <ExampleBox>
          <SegmentedToggle
            value={seg}
            onChange={setSeg}
            options={[
              { label: "List", value: "list" },
              { label: "Board", value: "board" },
              { label: "Calendar", value: "calendar" },
            ]}
          />
          <Typography variant="body2" color="text.secondary">
            Selected: {seg}
          </Typography>
        </ExampleBox>
        <CodeBlock
          code={`const [seg, setSeg] = useState("list");

<SegmentedToggle
  value={seg}
  onChange={setSeg}
  options={[
    { label: "List", value: "list" },
    { label: "Board", value: "board" },
    { label: "Calendar", value: "calendar" },
  ]}
/>`}
        />
      </DocSection>

      <DocSection title="SegmentedToggle Props">
        <PropsTable
          props={[
            {
              name: "options",
              type: "SegmentedToggleOption[]",
              description: "Segments",
            },
            {
              name: "value",
              type: "string",
              description: "Currently selected value",
            },
            {
              name: "onChange",
              type: "(value: string) => void",
              description: "Selection callback",
            },
            {
              name: "size",
              type: '"extraSmall" | "small" | "medium" | "large" | "extraLarge"',
              default: '"medium"',
              description: "Size — matches button heights",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description:
                "When `true`, dims the control and blocks pointer interaction.",
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

      <DocSection title="SegmentedToggleOption">
        <PropsTable
          props={[
            {
              name: "label",
              type: "string",
              description: "Visible segment label.",
            },
            {
              name: "value",
              type: "string",
              description: "Value emitted via `onChange` when this segment is selected.",
            },
            {
              name: "icon",
              type: "ReactNode",
              description: "Optional leading icon rendered before the label.",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default ButtonExtrasDocs;
