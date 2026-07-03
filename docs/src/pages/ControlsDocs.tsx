import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import {
  Checkbox,
  RadioButton,
  Tooltip,
  NavArrowButton,
  Scrollbar,
  Button,
  type CheckColor,
} from "../../../src";

const COLORS: CheckColor[] = ["slateBlue", "yellow", "blue", "grey", "black"];

const ControlsDocs: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Checkbox, Radio, Tooltip & Scroll
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Selection controls, tooltips and scroll affordances from the Figma
        "Checkboxes, Tooltips & Scrolls" set (403:13626): Checkbox, RadioButton,
        Tooltip, NavArrowButton and Scrollbar.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { Checkbox, RadioButton, Tooltip, NavArrowButton, Scrollbar } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection
        title="Checkbox"
        description="Six colour families with a hard (opaque fill) or soft (pale-tinted fill) variant, checked and unchecked."
      >
        <ExampleBox>
          <Stack direction="row" gap={1} alignItems="center">
            {COLORS.map((c) => (
              <Checkbox key={c} color={c} defaultChecked />
            ))}
            {COLORS.map((c) => (
              <Checkbox key={c + "-u"} color={c} />
            ))}
          </Stack>
          <Stack direction="row" gap={1} alignItems="center">
            {COLORS.map((c) => (
              <Checkbox key={c + "-soft"} color={c} variant="soft" defaultChecked />
            ))}
          </Stack>
          {/* The `white` family is for dark/coloured surfaces — shown on a dark
              tile so the sixth family is actually visible. */}
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            sx={{ p: 1, borderRadius: 2, bgcolor: "#1b1c1e", width: "fit-content" }}
          >
            <Checkbox color="white" defaultChecked />
            <RadioButton color="white" defaultChecked />
          </Stack>
          <Typography variant="caption" color="text.secondary">
            The <code>white</code> family is designed for dark or coloured
            surfaces.
          </Typography>
        </ExampleBox>
        <CodeBlock
          code={`{/* Hard variant (default) — checked and unchecked */}
<Checkbox color="slateBlue" defaultChecked />
<Checkbox color="yellow" defaultChecked />
<Checkbox color="blue" />

{/* Soft variant — pale-tinted fill */}
<Checkbox color="slateBlue" variant="soft" defaultChecked />
<Checkbox color="yellow" variant="soft" defaultChecked />`}
        />
      </DocSection>

      <DocSection title="Checkbox Props">
        <PropsTable
          props={[
            {
              name: "color",
              type: `"white" | "slateBlue" | "yellow" | "blue" | "grey" | "black"`,
              default: `"slateBlue"`,
              description: "DS colour family",
            },
            {
              name: "variant",
              type: `"hard" | "soft"`,
              default: `"hard"`,
              description: "Hard (opaque fill) or Soft (pale-tinted fill)",
            },
            {
              name: "...props",
              type: `Omit<CheckboxProps, "color">`,
              description:
                "All MUI Checkbox props are supported (except color, which is remapped to the DS family)",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="RadioButton"
        description="Circular single-select indicator in the six DS colour families (solid fill only)."
      >
        <ExampleBox>
          <Stack direction="row" gap={1} alignItems="center">
            {COLORS.map((c) => (
              <RadioButton key={c} color={c} defaultChecked />
            ))}
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<RadioButton color="slateBlue" defaultChecked />
<RadioButton color="yellow" defaultChecked />
<RadioButton color="blue" />`}
        />
      </DocSection>

      <DocSection title="RadioButton Props">
        <PropsTable
          props={[
            {
              name: "color",
              type: `"white" | "slateBlue" | "yellow" | "blue" | "grey" | "black"`,
              default: `"slateBlue"`,
              description: "DS colour family",
            },
            {
              name: "...props",
              type: `Omit<RadioProps, "color">`,
              description:
                "All MUI Radio props are supported (except color, which is remapped to the DS family)",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="Tooltip"
        description="Dark-glass or white surface tooltip with a 11px Caption label and an arrow."
      >
        <ExampleBox>
          <Stack direction="row" gap={3}>
            <Tooltip title="Dark tooltip" variant="black">
              <Button>Hover (black)</Button>
            </Tooltip>
            <Tooltip title="White tooltip" variant="white">
              <Button variant="outlined">Hover (white)</Button>
            </Tooltip>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<Tooltip title="Dark tooltip" variant="black">
  <Button>Hover (black)</Button>
</Tooltip>

<Tooltip title="White tooltip" variant="white">
  <Button variant="outlined">Hover (white)</Button>
</Tooltip>`}
        />
      </DocSection>

      <DocSection title="Tooltip Props">
        <PropsTable
          props={[
            {
              name: "variant",
              type: `"black" | "white"`,
              default: `"black"`,
              description: "Black (dark glass) or White surface",
            },
            {
              name: "...props",
              type: "TooltipProps",
              description:
                "All MUI Tooltip props are supported (title, placement, children, etc.)",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="NavArrowButton"
        description="Carousel prev/next arrow: tall pill, dark-glass or yellow, white caret and border."
      >
        <ExampleBox>
          <Box sx={{ p: 2, borderRadius: 1, backgroundColor: "#334155" }}>
            <Stack direction="row" gap={2} alignItems="center">
              <NavArrowButton direction="left" color="black" height={48} />
              <NavArrowButton direction="right" color="black" height={48} />
              <NavArrowButton direction="left" color="yellow" height={48} />
              <NavArrowButton direction="right" color="yellow" height={48} />
            </Stack>
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`<NavArrowButton direction="left" color="black" height={48} />
<NavArrowButton direction="right" color="black" height={48} />
<NavArrowButton direction="left" color="yellow" height={48} />
<NavArrowButton direction="right" color="yellow" height={48} />`}
        />
      </DocSection>

      <DocSection title="NavArrowButton Props">
        <PropsTable
          props={[
            {
              name: "direction",
              type: `"left" | "right"`,
              description: "Arrow direction",
            },
            {
              name: "color",
              type: `"black" | "yellow"`,
              default: `"black"`,
              description: "Black (dark glass) or Yellow",
            },
            {
              name: "onClick",
              type: "() => void",
              description: "Click handler fired on press and on Enter/Space",
            },
            {
              name: "height",
              type: "number",
              default: "87",
              description: "Pill height (default 87px per the DS carousel arrow)",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "MUI sx overrides, merged last",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="Scrollbar"
        description="Scrollable container with the DS custom scrollbar: pill thumb, soft-steel fill and grey border. Large (12px) or small (8px) thumb."
      >
        <ExampleBox>
          <Box
            sx={{
              maxWidth: 300,
              border: "1px solid #E5E7EB",
              borderRadius: 1,
            }}
          >
            <Scrollbar size="large" sx={{ maxHeight: 120, p: 2 }}>
              <Box sx={{ height: 400 }}>
                <Typography variant="body2">
                  Long content — scroll to see the DS scrollbar thumb.
                </Typography>
              </Box>
            </Scrollbar>
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`<Scrollbar size="large" sx={{ maxHeight: 120, p: 2 }}>
  <Box sx={{ height: 400 }}>
    Long content — scroll to see the DS scrollbar thumb.
  </Box>
</Scrollbar>`}
        />
      </DocSection>

      <DocSection title="Scrollbar Props">
        <PropsTable
          props={[
            {
              name: "children",
              type: "React.ReactNode",
              description: "Scrollable content rendered inside the overflow container",
            },
            {
              name: "size",
              type: `"large" | "small"`,
              default: `"large"`,
              description: "Thumb width — Large 12px / Small 8px",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "MUI sx overrides, merged last",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default ControlsDocs;
