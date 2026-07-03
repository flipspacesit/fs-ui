import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { TextArea, PinInput, NumberStepper } from "../../../src";

const InputExtrasDocs: React.FC = () => {
  const [pin, setPin] = useState("244676");
  const [qty, setQty] = useState(2);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Input Extras
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Additional input components from the Figma "Input Components" set: a
        multiline TextArea, an OTP-style PinInput, and a NumberStepper for
        quantity selection.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { TextArea, PinInput, NumberStepper } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection
        title="TextArea"
        description="Multiline text area (Text Box / Notes) built on MUI TextField with radius-xxs, SoftSteel border and an italic placeholder. multiline is always on; use minRows / maxRows to bound its height."
      >
        <ExampleBox>
          <Box sx={{ maxWidth: 360 }}>
            <TextArea placeholder="Add Note" fullWidth />
          </Box>
          <Box sx={{ maxWidth: 360 }}>
            <TextArea
              placeholder="Grows between 2 and 6 rows"
              minRows={2}
              maxRows={6}
              fullWidth
            />
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`<TextArea placeholder="Add Note" fullWidth />

<TextArea
  placeholder="Grows between 2 and 6 rows"
  minRows={2}
  maxRows={6}
  fullWidth
/>`}
        />
      </DocSection>

      <DocSection title="TextArea Props">
        <PropsTable
          props={[
            {
              name: "minRows",
              type: "number",
              default: "4",
              description:
                "Minimum number of visible text rows before the field grows.",
            },
            {
              name: "maxRows",
              type: "number",
              description:
                "Maximum number of visible text rows; beyond this the field scrolls. Unbounded if omitted.",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "MUI sx overrides, merged last.",
            },
            {
              name: "...props",
              type: "Omit<TextFieldProps, 'multiline'>",
              description:
                "All MUI TextField props except multiline (always on) are supported.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="PinInput"
        description="OTP / PIN input with one digit per cell, auto-advancing focus and an optional split divider. Fully controlled via value / onChange."
      >
        <ExampleBox>
          <PinInput length={6} splitAfter={3} value={pin} onChange={setPin} />
          <Typography variant="body2" color="text.secondary">
            Value: {pin || "(empty)"}
          </Typography>
        </ExampleBox>
        <CodeBlock
          code={`const [pin, setPin] = useState("244676");

<PinInput length={6} splitAfter={3} value={pin} onChange={setPin} />`}
        />
      </DocSection>

      <DocSection title="PinInput Props">
        <PropsTable
          props={[
            {
              name: "length",
              type: "number",
              default: "6",
              description: "Number of cells.",
            },
            {
              name: "value",
              type: "string",
              description: "Current value.",
            },
            {
              name: "onChange",
              type: "(value: string) => void",
              description: "Change callback (full concatenated value).",
            },
            {
              name: "splitAfter",
              type: "number",
              description:
                "Insert a divider after this many cells (e.g. 3 → 3-[dash]-3).",
            },
            {
              name: "size",
              type: "ComponentSize",
              default: '"large"',
              description: "Cell size.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables all cells and blocks input.",
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
        title="NumberStepper"
        description="Quantity stepper with a tertiary-blue minus button, a brand-yellow plus button and the value in the centre. Values are clamped to the [min, max] bounds."
      >
        <ExampleBox>
          <NumberStepper value={qty} onChange={setQty} />
          <NumberStepper value={qty} onChange={setQty} min={0} max={10} step={2} />
          <NumberStepper value={qty} onChange={setQty} disabled />
        </ExampleBox>
        <CodeBlock
          code={`const [qty, setQty] = useState(2);

<NumberStepper value={qty} onChange={setQty} />

<NumberStepper value={qty} onChange={setQty} min={0} max={10} step={2} />

<NumberStepper value={qty} onChange={setQty} disabled />`}
        />
      </DocSection>

      <DocSection title="NumberStepper Props">
        <PropsTable
          props={[
            {
              name: "value",
              type: "number",
              description: "Current value.",
            },
            {
              name: "onChange",
              type: "(value: number) => void",
              description: "Change callback.",
            },
            {
              name: "min",
              type: "number",
              default: "0",
              description: "Lower bound; values are clamped to this minimum.",
            },
            {
              name: "max",
              type: "number",
              default: "Infinity",
              description: "Upper bound; values are clamped to this maximum.",
            },
            {
              name: "step",
              type: "number",
              default: "1",
              description: "Amount added/subtracted per button press.",
            },
            {
              name: "size",
              type: "ComponentSize",
              default: '"medium"',
              description: "Control size (matches button heights).",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description:
                "When true, dims the control and blocks increment/decrement.",
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

export default InputExtrasDocs;
