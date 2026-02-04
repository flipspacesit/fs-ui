import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { ModalLayout } from "../../../src";

const ModalLayoutDocs: React.FC = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        ModalLayout
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A reusable modal/dialog layout component with customizable header,
        content, and footer sections.
      </Typography>

      <DocSection title="Import">
        <CodeBlock code={`import { ModalLayout } from '@flipspacesit/fs-ui';`} />
      </DocSection>

      <DocSection title="Basic Usage">
        <ExampleBox>
          <Button variant="contained" onClick={() => setOpen1(true)}>
            Open Modal
          </Button>
          <ModalLayout
            open={open1}
            onClose={() => setOpen1(false)}
            title="Modal Title"
            size="sm"
            paperstyle={{ width: "500px", height: "auto" }}
          >
            <Typography>
              This is the modal content. You can put any content here.
            </Typography>
          </ModalLayout>
        </ExampleBox>
        <CodeBlock
          code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>

<ModalLayout
  open={open}
  onClose={() => setOpen(false)}
  title="Modal Title"
>
  <Typography>Modal content here</Typography>
</ModalLayout>`}
        />
      </DocSection>

      <DocSection title="With Footer">
        <ExampleBox>
          <Button variant="contained" onClick={() => setOpen2(true)}>
            Open Modal with Footer
          </Button>
          <ModalLayout
            open={open2}
            onClose={() => setOpen2(false)}
            title="Confirm Action"
            size="sm"
            paperstyle={{ width: "500px", height: "auto" }}
            footer={
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={() => setOpen2(false)}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => setOpen2(false)}>
                  Confirm
                </Button>
              </Stack>
            }
          >
            <Typography>
              Are you sure you want to proceed with this action?
            </Typography>
          </ModalLayout>
        </ExampleBox>
        <CodeBlock
          code={`<ModalLayout
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
  footer={
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button variant="contained" onClick={() => setOpen(false)}>
        Confirm
      </Button>
    </Stack>
  }
>
  <Typography>Are you sure?</Typography>
</ModalLayout>`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <Typography variant="body2" sx={{ mb: 2 }}>
          Control the max width with the <code>size</code> prop: xs, sm, md, lg, xl
        </Typography>
        <CodeBlock
          code={`<ModalLayout size="sm" ...>Small modal</ModalLayout>
<ModalLayout size="md" ...>Medium modal</ModalLayout>
<ModalLayout size="lg" ...>Large modal</ModalLayout>`}
        />
      </DocSection>

      <DocSection title="Without Title">
        <CodeBlock
          code={`<ModalLayout
  open={open}
  onClose={handleClose}
  isTitleNull
>
  <Typography>Modal without title bar</Typography>
</ModalLayout>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          props={[
            {
              name: "open",
              type: "boolean",
              description: "Whether the modal is open",
            },
            {
              name: "onClose",
              type: "() => void",
              description: "Callback when modal is closed",
            },
            {
              name: "title",
              type: "string | ReactNode",
              description: "Modal title",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Modal content",
            },
            {
              name: "footer",
              type: "ReactNode",
              description: "Footer content (typically buttons)",
            },
            {
              name: "size",
              type: '"xs" | "sm" | "md" | "lg" | "xl" | false',
              description: "Max width of the modal",
            },
            {
              name: "isTitleNull",
              type: "boolean",
              default: "false",
              description: "Hide the title bar",
            },
            {
              name: "hideOverflow",
              type: "boolean",
              default: "false",
              description: "Hide content overflow",
            },
            {
              name: "contentStyles",
              type: "SxProps",
              description: "Custom content area styles",
            },
            {
              name: "paperstyle",
              type: "CSSProperties",
              description: "Custom paper/dialog styles",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default ModalLayoutDocs;
