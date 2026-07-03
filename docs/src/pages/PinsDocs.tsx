import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import {
  PinMarker,
  PinCommentBox,
  PinCommentInput,
  PinDial,
  type PinColor,
} from "../../../src";

const COLORS: PinColor[] = [
  "moodyBlue",
  "purplishPink",
  "lightSeaGreen",
  "cocoaBrown",
  "sunriseOrange",
  "lavenderIndigo",
  "duskyPurple",
  "grey",
];

const PinsDocs: React.FC = () => {
  const [comment, setComment] = useState("");
  const [quad, setQuad] = useState<0 | 1 | 2 | 3 | null>(1);
  const dialIcon = (t: string) => (
    <span style={{ fontSize: 11, fontWeight: 700 }}>{t}</span>
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Pins
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Collaboration markers and comment surfaces — Figma "Pins" (909:7536). A
        numbered marker, a dark comment bubble with edit/move/delete actions, an
        add-a-comment input, and a radial action dial.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { PinMarker, PinCommentBox, PinCommentInput, PinDial } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection
        title="PinMarker — colours"
        description="Numbered collaboration marker across the 8 colour families (round shape)."
      >
        <ExampleBox>
          <Stack direction="row" gap={1.5} flexWrap="wrap">
            {COLORS.map((c, i) => (
              <PinMarker key={c} number={i + 1} color={c} />
            ))}
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const COLORS = [
  "moodyBlue",
  "purplishPink",
  "lightSeaGreen",
  "cocoaBrown",
  "sunriseOrange",
  "lavenderIndigo",
  "duskyPurple",
  "grey",
];

<Stack direction="row" gap={1.5} flexWrap="wrap">
  {COLORS.map((c, i) => (
    <PinMarker key={c} number={i + 1} color={c} />
  ))}
</Stack>`}
        />
      </DocSection>

      <DocSection
        title="PinMarker — states & shapes"
        description="unselected / selected (halo) / approved (green ring + check) / outline, plus the round / teardrop / square silhouettes."
      >
        <ExampleBox>
          <Stack direction="row" gap={3} alignItems="center">
            <PinMarker number={1} state="unselected" />
            <PinMarker number={2} state="selected" />
            <PinMarker number={3} state="approved" />
            <PinMarker number={4} state="outline" />
            <PinMarker number={5} shape="teardrop" color="cocoaBrown" />
            <PinMarker number={6} shape="square" color="lightSeaGreen" />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<PinMarker number={1} state="unselected" />
<PinMarker number={2} state="selected" />
<PinMarker number={3} state="approved" />
<PinMarker number={4} state="outline" />
<PinMarker number={5} shape="teardrop" color="cocoaBrown" />
<PinMarker number={6} shape="square" color="lightSeaGreen" />`}
        />
      </DocSection>

      <DocSection title="PinMarker Props">
        <PropsTable
          props={[
            {
              name: "number",
              type: "number | string",
              default: "1",
              description: "Number/label shown inside the marker",
            },
            {
              name: "color",
              type: '"moodyBlue" | "purplishPink" | "lightSeaGreen" | "cocoaBrown" | "sunriseOrange" | "lavenderIndigo" | "duskyPurple" | "grey"',
              default: '"moodyBlue"',
              description: "Collaboration colour family (8)",
            },
            {
              name: "shape",
              type: '"round" | "teardrop" | "square"',
              default: '"round"',
              description: "round badge / teardrop map-pin / square chip",
            },
            {
              name: "state",
              type: '"unselected" | "selected" | "approved" | "outline"',
              default: '"unselected"',
              description:
                "unselected / selected (halo) / approved (green ring+check) / outline",
            },
            {
              name: "size",
              type: "number",
              default: "40",
              description: "Marker width and height in pixels.",
            },
            {
              name: "onClick",
              type: "() => void",
              description:
                "Click handler; when set the marker shows a pointer cursor.",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "MUI `sx` overrides, merged last.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="PinCommentBox"
        description="Dark comment bubble with edit / move / delete actions. The active action is colour-filled (edit=yellow, move=blue, delete=red)."
      >
        <ExampleBox>
          <Stack direction="row" gap={2} flexWrap="wrap">
            <PinCommentBox activeAction="edit">
              Add render lighting to this corner.
            </PinCommentBox>
            <PinCommentBox activeAction="delete">
              Remove this fixture from the layout.
            </PinCommentBox>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<PinCommentBox
  activeAction="edit"
  onEdit={handleEdit}
  onMove={handleMove}
  onDelete={handleDelete}
>
  Add render lighting to this corner.
</PinCommentBox>

<PinCommentBox activeAction="delete">
  Remove this fixture from the layout.
</PinCommentBox>`}
        />
      </DocSection>

      <DocSection title="PinCommentBox Props">
        <PropsTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: "Comment body",
            },
            {
              name: "activeAction",
              type: '"edit" | "move" | "delete" | null',
              default: "null",
              description:
                "Which action is currently active (colours its button)",
            },
            {
              name: "onEdit",
              type: "() => void",
              description: "Called when the edit action button is clicked.",
            },
            {
              name: "onMove",
              type: "() => void",
              description: "Called when the move action button is clicked.",
            },
            {
              name: "onDelete",
              type: "() => void",
              description: "Called when the delete action button is clicked.",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "MUI `sx` overrides, merged last.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="PinCommentInput"
        description="Add-a-Comment field. The send button turns brand yellow once text is entered; Enter with non-empty text also sends."
      >
        <ExampleBox>
          <PinCommentInput
            value={comment}
            onChange={setComment}
            onSend={() => setComment("")}
          />
        </ExampleBox>
        <CodeBlock
          code={`const [comment, setComment] = useState("");

<PinCommentInput
  value={comment}
  onChange={setComment}
  onSend={() => setComment("")}
/>`}
        />
      </DocSection>

      <DocSection title="PinCommentInput Props">
        <PropsTable
          props={[
            {
              name: "value",
              type: "string",
              description: "Current comment text (controlled).",
            },
            {
              name: "onChange",
              type: "(value: string) => void",
              description: "Fired with the new text on every keystroke.",
            },
            {
              name: "onSend",
              type: "() => void",
              description:
                "Fired when the send button is clicked or Enter is pressed with non-empty text.",
            },
            {
              name: "placeholder",
              type: "string",
              default: '"Add a Comment"',
              description: "Placeholder shown when the field is empty.",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "MUI `sx` overrides, merged last.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="PinDial"
        description="Radial pin action wheel. A dark disc with four quadrant actions; the active quadrant lights with a yellow arc. Click a quadrant (or press Enter/Space) to select it."
      >
        <ExampleBox>
          <PinDial
            activeQuadrant={quad}
            onSelect={(q) => setQuad(q as 0 | 1 | 2 | 3)}
            center={
              <PinMarker
                number={1}
                shape="teardrop"
                color="moodyBlue"
                state="outline"
                size={32}
              />
            }
            icons={[
              dialIcon("V"),
              dialIcon("E"),
              dialIcon("F"),
              dialIcon("D"),
            ]}
          />
        </ExampleBox>
        <CodeBlock
          code={`const [quad, setQuad] = useState<0 | 1 | 2 | 3 | null>(1);
const dialIcon = (t: string) => (
  <span style={{ fontSize: 11, fontWeight: 700 }}>{t}</span>
);

<PinDial
  activeQuadrant={quad}
  onSelect={(q) => setQuad(q as 0 | 1 | 2 | 3)}
  center={
    <PinMarker
      number={1}
      shape="teardrop"
      color="moodyBlue"
      state="outline"
      size={32}
    />
  }
  icons={[dialIcon("V"), dialIcon("E"), dialIcon("F"), dialIcon("D")]}
/>`}
        />
      </DocSection>

      <DocSection title="PinDial Props">
        <PropsTable
          props={[
            {
              name: "activeQuadrant",
              type: "0 | 1 | 2 | 3 | null",
              default: "null",
              description: "Highlighted quadrant: 0 top · 1 right · 2 bottom · 3 left",
            },
            {
              name: "center",
              type: "ReactNode",
              description: "Center badge (e.g. a PinMarker)",
            },
            {
              name: "icons",
              type: "[ReactNode, ReactNode, ReactNode, ReactNode]",
              description: "Four quadrant icons [top, right, bottom, left]",
            },
            {
              name: "onSelect",
              type: "(quadrant: number) => void",
              description:
                "Fired with the selected quadrant index (0–3) on click or Enter/Space.",
            },
            {
              name: "size",
              type: "number",
              default: "126",
              description: "Disc diameter in pixels.",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "MUI `sx` overrides, merged last.",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default PinsDocs;
