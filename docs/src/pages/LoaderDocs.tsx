import React, { useState } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { Loader } from "../../../src/components/Loader";
import { LoaderButton } from "../../../src/components/LoaderButton";
import { PageLoader } from "../../../src/components/PageLoader";

const LoaderDocs: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handlePageLoader = () => {
    setShowPageLoader(true);
    setTimeout(() => setShowPageLoader(false), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Loaders
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A collection of loading components for different use cases: inline
        loaders, button loaders, and full-page overlays.
      </Typography>

      <DocSection
        title="Loader"
        description="A centered loading spinner for content areas."
      >
        <ExampleBox>
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader style={{ minBlockSize: "auto" }} />
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`import { Loader } from '@flipspacesit/fs-ui';

// Basic usage
<Loader />

// Custom size and color
<Loader size={60} color="secondary" />

// With custom styles
<Loader style={{ minBlockSize: 'auto' }} />`}
        />
      </DocSection>

      <DocSection
        title="Loader Sizes"
        description="Customize the loader size."
      >
        <ExampleBox>
          <Stack direction="row" spacing={4} alignItems="center">
            <Stack alignItems="center" spacing={1}>
              <Loader size={20} style={{ minBlockSize: "auto" }} />
              <Typography variant="caption">Small (20)</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Loader size={40} style={{ minBlockSize: "auto" }} />
              <Typography variant="caption">Default (40)</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Loader size={60} style={{ minBlockSize: "auto" }} />
              <Typography variant="caption">Large (60)</Typography>
            </Stack>
          </Stack>
        </ExampleBox>
      </DocSection>

      <DocSection
        title="LoaderButton"
        description="A button that shows a loading state while an action is in progress."
      >
        <ExampleBox>
          <Stack direction="row" spacing={2}>
            <LoaderButton
              variant="contained"
              isLoading={isLoading}
              onClick={handleButtonClick}
            >
              Submit
            </LoaderButton>
            <LoaderButton variant="outlined" isLoading disabled>
              Disabled Loading
            </LoaderButton>
            <LoaderButton variant="contained" color="secondary">
              Normal State
            </LoaderButton>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`import { LoaderButton } from '@flipspacesit/fs-ui';

const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  await saveData();
  setIsLoading(false);
};

<LoaderButton
  variant="contained"
  isLoading={isLoading}
  onClick={handleSubmit}
>
  Submit
</LoaderButton>`}
        />
      </DocSection>

      <DocSection
        title="PageLoader"
        description="A full-page overlay loader for blocking operations."
      >
        <ExampleBox>
          <Button variant="contained" onClick={handlePageLoader}>
            Show Page Loader (3s)
          </Button>
          <PageLoader
            loading={showPageLoader}
            text="Loading, please wait..."
            bg="rgba(0, 0, 0, 0.5)"
          />
        </ExampleBox>
        <CodeBlock
          code={`import { PageLoader } from '@flipspacesit/fs-ui';

const [loading, setLoading] = useState(false);

<PageLoader
  loading={loading}
  text="Loading, please wait..."
  bg="rgba(0, 0, 0, 0.5)"
/>`}
        />
      </DocSection>

      <DocSection title="Loader Props">
        <PropsTable
          props={[
            {
              name: "style",
              type: "React.CSSProperties",
              default: "-",
              description: "Custom styles for the container",
            },
            {
              name: "size",
              type: "number",
              default: "40",
              description: "Size of the circular progress",
            },
            {
              name: "color",
              type: '"primary" | "secondary" | "inherit"',
              default: '"primary"',
              description: "Color of the loader",
            },
          ]}
        />
      </DocSection>

      <DocSection title="LoaderButton Props">
        <PropsTable
          props={[
            {
              name: "isLoading",
              type: "boolean",
              default: "false",
              description: "Whether the button is in loading state",
            },
            {
              name: "loaderSize",
              type: "number",
              default: "15",
              description: "Size of the loader spinner",
            },
            {
              name: "loaderColor",
              type: "string",
              default: '"#fff"',
              description: "Color of the loader spinner",
            },
            {
              name: "...ButtonProps",
              type: "MUI ButtonProps",
              default: "-",
              description: "All MUI Button props are supported",
            },
          ]}
        />
      </DocSection>

      <DocSection title="PageLoader Props">
        <PropsTable
          props={[
            {
              name: "loading",
              type: "boolean",
              default: "-",
              description: "Whether the loader is visible",
            },
            {
              name: "text",
              type: "string",
              default: '""',
              description: "Optional text to display below spinner",
            },
            {
              name: "bg",
              type: "string",
              default: '"rgba(0, 0, 0, 0.2)"',
              description: "Background color/opacity",
            },
            {
              name: "textColor",
              type: "string",
              default: '"#fff"',
              description: "Text color",
            },
            {
              name: "size",
              type: "number",
              default: "40",
              description: "Size of the spinner",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default LoaderDocs;
