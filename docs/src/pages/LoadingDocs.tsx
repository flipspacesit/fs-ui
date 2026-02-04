import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import {
  LoadingSpinner,
  OverlayLoading,
  LoadingContainer,
  InlineLoadingContainer,
} from "../../../src";

const LoadingDocs: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Loading Components
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Components for displaying loading states in various contexts.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import {
  LoadingSpinner,
  OverlayLoading,
  LoadingContainer,
  InlineLoadingContainer,
} from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection title="LoadingSpinner" description="Simple loading indicator with optional message">
        <ExampleBox>
          <Stack direction="row" spacing={4}>
            <LoadingSpinner />
            <LoadingSpinner message="Loading data..." />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`// Basic spinner
<LoadingSpinner />

// With message
<LoadingSpinner message="Loading data..." />`}
        />
      </DocSection>

      <DocSection title="Spinner Sizes">
        <ExampleBox>
          <Stack direction="row" spacing={4} alignItems="center">
            <LoadingSpinner size={20} />
            <LoadingSpinner size={40} />
            <LoadingSpinner size={60} />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<LoadingSpinner size={20} />
<LoadingSpinner size={40} />
<LoadingSpinner size={60} />`}
        />
      </DocSection>

      <DocSection
        title="OverlayLoading"
        description="Covers content with a loading overlay"
      >
        <ExampleBox>
          <Stack spacing={2}>
            <Button variant="contained" onClick={handleToggle}>
              Trigger Loading (2s)
            </Button>
            <OverlayLoading loading={loading} message="Saving changes...">
              <Box
                sx={{
                  p: 3,
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                  minHeight: 150,
                }}
              >
                <Typography variant="h6">Content Area</Typography>
                <Typography variant="body2">
                  This content will be covered by a loading overlay when the
                  loading state is active.
                </Typography>
              </Box>
            </OverlayLoading>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const [loading, setLoading] = useState(false);

<OverlayLoading loading={loading} message="Saving changes...">
  <Box>
    <Typography>Your content here</Typography>
  </Box>
</OverlayLoading>`}
        />
      </DocSection>

      <DocSection title="Styled Containers">
        <Typography variant="body2" sx={{ mb: 2 }}>
          Pre-styled containers for common loading layouts:
        </Typography>
        <CodeBlock
          code={`// Full-page loading container (min-height: 100vh)
import { LoadingContainer } from '@flipspacesit/fs-ui';

<LoadingContainer>
  <CircularProgress />
  <Typography>Loading...</Typography>
</LoadingContainer>

// Inline loading container (for sections)
import { InlineLoadingContainer } from '@flipspacesit/fs-ui';

<InlineLoadingContainer>
  <CircularProgress />
  <Typography>Loading...</Typography>
</InlineLoadingContainer>`}
        />
      </DocSection>

      <DocSection title="LoadingSpinner Props">
        <PropsTable
          props={[
            {
              name: "message",
              type: "string",
              description: "Loading message to display below the spinner",
            },
            {
              name: "size",
              type: "number",
              default: "40",
              description: "Size of the spinner in pixels",
            },
            {
              name: "color",
              type: '"primary" | "secondary" | "inherit"',
              default: '"primary"',
              description: "Color of the spinner",
            },
            {
              name: "fullPage",
              type: "boolean",
              default: "false",
              description: "Use full-page layout (min-height: 100vh)",
            },
            {
              name: "containerSx",
              type: "SxProps",
              description: "Custom container styles",
            },
          ]}
        />
      </DocSection>

      <DocSection title="OverlayLoading Props">
        <PropsTable
          props={[
            {
              name: "loading",
              type: "boolean",
              description: "Whether the loading overlay is active",
            },
            {
              name: "message",
              type: "string",
              description: "Loading message",
            },
            {
              name: "size",
              type: "number",
              default: "40",
              description: "Spinner size",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Content to render behind the overlay",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default LoadingDocs;
