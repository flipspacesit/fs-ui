import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import {
  Alert,
  Snackbar,
  Breadcrumb,
  Info,
  CheckCircle,
  Warning,
  ErrorIcon,
} from "../../../src";

const FeedbackDocs: React.FC = () => (
  <Box>
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
      Feedback & Navigation
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Alert, Snackbar and Breadcrumb components — feedback banners, transient
      notifications, and a navigation trail. Figma "Snackbar & Breadcrumb"
      (477:938).
    </Typography>

    <DocSection title="Import">
      <CodeBlock
        code={`import { Alert, Snackbar, Breadcrumb } from '@flipspacesit/fs-ui';`}
      />
    </DocSection>

    <DocSection
      title="Alert"
      description="Feedback banner with a colour family (error/info/success/warning/black/white) and three emphasis levels: dark (solid fill), light (tinted fill), and stroke (outlined)."
    >
      <ExampleBox>
        <Stack gap={1.5} alignItems="flex-start">
          <Alert
            color="info"
            emphasis="light"
            title="Heads up"
            message="This is an informational alert."
            icon={<Info />}
          />
          <Alert
            color="success"
            emphasis="stroke"
            title="Saved"
            message="Your changes were saved."
            icon={<CheckCircle />}
          />
          <Alert
            color="warning"
            emphasis="light"
            title="Careful"
            message="Double-check the inputs."
            icon={<Warning />}
          />
          <Alert
            color="error"
            emphasis="dark"
            title="Error"
            message="Something went wrong."
            icon={<ErrorIcon />}
          />
        </Stack>
      </ExampleBox>
      <CodeBlock
        code={`<Alert
  color="info"
  emphasis="light"
  title="Heads up"
  message="This is an informational alert."
  icon={<Info />}
/>
<Alert
  color="success"
  emphasis="stroke"
  title="Saved"
  message="Your changes were saved."
  icon={<CheckCircle />}
/>
<Alert
  color="warning"
  emphasis="light"
  title="Careful"
  message="Double-check the inputs."
  icon={<Warning />}
/>
<Alert
  color="error"
  emphasis="dark"
  title="Error"
  message="Something went wrong."
  icon={<ErrorIcon />}
/>`}
      />
    </DocSection>

    <DocSection title="Alert Props">
      <PropsTable
        props={[
          {
            name: "title",
            type: "string",
            description: "Bold heading line rendered above the message.",
          },
          {
            name: "message",
            type: "string",
            description: "Secondary body text.",
          },
          {
            name: "color",
            type: `"error" | "info" | "success" | "warning" | "black" | "white"`,
            default: `"info"`,
            description:
              "Colour family (drives background, accent and text colours).",
          },
          {
            name: "emphasis",
            type: `"dark" | "light" | "stroke"`,
            default: `"light"`,
            description:
              "Visual weight: dark (solid fill), light (tinted fill), stroke (outlined).",
          },
          {
            name: "icon",
            type: "ReactNode",
            description: "Leading status icon.",
          },
          {
            name: "showClose",
            type: "boolean",
            default: "true",
            description: "Show the trailing divider + close button.",
          },
          {
            name: "onClose",
            type: "() => void",
            description: "Invoked when the close button is clicked.",
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
      title="Snackbar"
      description="Transient notification on a white or black surface, with an optional action link and close button."
    >
      <ExampleBox>
        <Stack gap={1.5} alignItems="flex-start">
          <Snackbar
            message="Item added to your list."
            surface="white"
            actionLabel="Learn more"
          />
          <Snackbar
            message="Changes saved offline."
            surface="black"
            actionLabel="Learn more"
            showClose
          />
        </Stack>
      </ExampleBox>
      <CodeBlock
        code={`<Snackbar
  message="Item added to your list."
  surface="white"
  actionLabel="Learn more"
/>
<Snackbar
  message="Changes saved offline."
  surface="black"
  actionLabel="Learn more"
  showClose
/>`}
      />
    </DocSection>

    <DocSection title="Snackbar Props">
      <PropsTable
        props={[
          {
            name: "message",
            type: "string",
            description: "Snackbar body text.",
          },
          {
            name: "surface",
            type: `"white" | "black"`,
            default: `"white"`,
            description: "White or black surface.",
          },
          {
            name: "actionLabel",
            type: "string",
            description: `Optional "Learn more"-style action link.`,
          },
          {
            name: "onAction",
            type: "() => void",
            description: "Invoked when the action link is clicked.",
          },
          {
            name: "showClose",
            type: "boolean",
            default: "false",
            description: "When true, renders the trailing close (X) button.",
          },
          {
            name: "onClose",
            type: "() => void",
            description: "Invoked when the close (X) button is clicked.",
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
      title="Breadcrumb"
      description="Navigation trail. Completed steps render in medium black, the current (last) step in bold blue, separated by a configurable glyph."
    >
      <ExampleBox>
        <Breadcrumb
          items={[
            { label: "Projects", onClick: () => alert("Projects") },
            { label: "Design", onClick: () => alert("Design") },
            { label: "Estimate" },
          ]}
        />
      </ExampleBox>
      <CodeBlock
        code={`<Breadcrumb
  items={[
    { label: "Projects", onClick: () => navigate("/projects") },
    { label: "Design", onClick: () => navigate("/projects/design") },
    { label: "Estimate" },
  ]}
/>`}
      />
    </DocSection>

    <DocSection title="Breadcrumb Props">
      <PropsTable
        props={[
          {
            name: "items",
            type: "BreadcrumbItem[]",
            description: "Ordered items — the last is the active/current step.",
          },
          {
            name: "separator",
            type: "string",
            default: `"/"`,
            description: "Separator glyph placed between items.",
          },
          {
            name: "sx",
            type: "SxProps<Theme>",
            description: "MUI sx overrides, merged last.",
          },
        ]}
      />
    </DocSection>

    <DocSection title="BreadcrumbItem">
      <PropsTable
        props={[
          {
            name: "label",
            type: "string",
            description: "Text shown for this step (rendered capitalized).",
          },
          {
            name: "onClick",
            type: "() => void",
            description:
              "Click handler; when set the step is rendered as a pointer/clickable link.",
          },
        ]}
      />
    </DocSection>
  </Box>
);

export default FeedbackDocs;
