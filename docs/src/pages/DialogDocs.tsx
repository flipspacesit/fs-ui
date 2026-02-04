import React, { useState } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { Dialog } from "../../../src/components/Dialog";

const DialogDocs: React.FC = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [sideModalOpen, setSideModalOpen] = useState(false);
  const [backArrowOpen, setBackArrowOpen] = useState(false);
  const [headerActionOpen, setHeaderActionOpen] = useState(false);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Dialog
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A flexible dialog component built on MUI Dialog with slide-up animation,
        title bar, optional back arrow, header actions, and footer support.
      </Typography>

      <DocSection
        title="Basic Usage"
        description="A simple dialog with title, content, and footer."
      >
        <ExampleBox>
          <Button variant="contained" onClick={() => setBasicOpen(true)}>
            Open Dialog
          </Button>
          <Dialog
            open={basicOpen}
            onClose={() => setBasicOpen(false)}
            title="Basic Dialog"
            footer={
              <Stack direction="row" spacing={1}>
                <Button onClick={() => setBasicOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={() => setBasicOpen(false)}>
                  Confirm
                </Button>
              </Stack>
            }
          >
            <Typography>
              This is the dialog content. You can put any content here including
              forms, lists, or other components.
            </Typography>
          </Dialog>
        </ExampleBox>
        <CodeBlock
          code={`import { Dialog } from '@flipspacesit/fs-ui';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Dialog</Button>

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Basic Dialog"
  footer={
    <Stack direction="row" spacing={1}>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="contained" onClick={() => setOpen(false)}>
        Confirm
      </Button>
    </Stack>
  }
>
  <Typography>Dialog content goes here.</Typography>
</Dialog>`}
        />
      </DocSection>

      <DocSection
        title="Side Modal"
        description="Display the dialog as a side panel sliding from the right."
      >
        <ExampleBox>
          <Button variant="contained" onClick={() => setSideModalOpen(true)}>
            Open Side Modal
          </Button>
          <Dialog
            open={sideModalOpen}
            onClose={() => setSideModalOpen(false)}
            title="Side Modal"
            showAsSideModal
            maxWidth="sm"
            fullWidth
          >
            <Typography>
              This dialog appears as a side panel from the right edge of the
              screen. It's useful for forms, details panels, or settings.
            </Typography>
          </Dialog>
        </ExampleBox>
        <CodeBlock
          code={`<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Side Modal"
  showAsSideModal
  maxWidth="sm"
  fullWidth
>
  <Typography>Side panel content</Typography>
</Dialog>`}
        />
      </DocSection>

      <DocSection
        title="With Back Arrow"
        description="Show a back arrow instead of (or alongside) the close button for multi-step dialogs."
      >
        <ExampleBox>
          <Button variant="contained" onClick={() => setBackArrowOpen(true)}>
            Open with Back Arrow
          </Button>
          <Dialog
            open={backArrowOpen}
            onClose={() => setBackArrowOpen(false)}
            title="Step 2 of 3"
            backArrow
            backArrowCb={() => setBackArrowOpen(false)}
          >
            <Typography>
              The back arrow allows users to go back to a previous step in
              multi-step flows.
            </Typography>
          </Dialog>
        </ExampleBox>
        <CodeBlock
          code={`<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Step 2 of 3"
  backArrow
  backArrowCb={() => handleGoBack()}
>
  <Typography>Content for step 2</Typography>
</Dialog>`}
        />
      </DocSection>

      <DocSection
        title="With Header Action"
        description="Add custom actions in the dialog header."
      >
        <ExampleBox>
          <Button variant="contained" onClick={() => setHeaderActionOpen(true)}>
            Open with Header Action
          </Button>
          <Dialog
            open={headerActionOpen}
            onClose={() => setHeaderActionOpen(false)}
            title="Document Editor"
            headerAction={
              <Button size="small" variant="outlined">
                Save Draft
              </Button>
            }
            maxWidth="md"
            fullWidth
          >
            <Typography>
              Header actions are useful for secondary actions like "Save Draft",
              "Settings", or other contextual operations.
            </Typography>
          </Dialog>
        </ExampleBox>
        <CodeBlock
          code={`<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Document Editor"
  headerAction={
    <Button size="small" variant="outlined">
      Save Draft
    </Button>
  }
  maxWidth="md"
  fullWidth
>
  <Typography>Dialog content</Typography>
</Dialog>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          props={[
            {
              name: "open",
              type: "boolean",
              default: "false",
              description: "Whether the dialog is open",
            },
            {
              name: "title",
              type: "string",
              default: '""',
              description: "Dialog title text",
            },
            {
              name: "onClose",
              type: "() => void",
              default: "-",
              description: "Callback when dialog is closed",
            },
            {
              name: "children",
              type: "React.ReactNode",
              default: "-",
              description: "Dialog content",
            },
            {
              name: "footer",
              type: "React.ReactNode",
              default: "-",
              description: "Footer content (usually buttons)",
            },
            {
              name: "backArrow",
              type: "boolean",
              default: "false",
              description: "Show back arrow in header",
            },
            {
              name: "backArrowCb",
              type: "() => void",
              default: "null",
              description: "Callback for back arrow click",
            },
            {
              name: "showAsSideModal",
              type: "boolean",
              default: "false",
              description: "Display as side panel from right",
            },
            {
              name: "headerAction",
              type: "React.ReactNode",
              default: "null",
              description: "Custom action component in header",
            },
            {
              name: "isTitleBarReq",
              type: "boolean",
              default: "true",
              description: "Show/hide the title bar",
            },
            {
              name: "showDivider",
              type: "boolean",
              default: "true",
              description: "Show divider before close button",
            },
            {
              name: "disableContentGutters",
              type: "boolean",
              default: "false",
              description: "Remove content padding",
            },
            {
              name: "enableBackdropClick",
              type: "boolean",
              default: "false",
              description: "Allow closing on backdrop click",
            },
            {
              name: "maxWidth",
              type: '"xs" | "sm" | "md" | "lg" | "xl" | false',
              default: '"sm"',
              description: "Max width preset",
            },
            {
              name: "fullWidth",
              type: "boolean",
              default: "false",
              description: "Expand to full maxWidth",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default DialogDocs;
