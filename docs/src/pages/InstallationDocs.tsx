import React from "react";
import { Box, Typography, Stack, Chip } from "@mui/material";
import { DocSection } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";

const InstallationDocs: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Installation
      </Typography>
      <Typography sx={{ fontSize: 18, lineHeight: 1.6, color: "var(--doc-text-muted)", mb: 4 }}>
        fs-ui is published to GitHub Packages under the <code>@flipspacesit</code>{" "}
        scope. Configure the registry, install, and wrap your app.
      </Typography>

      <DocSection title="Install" description="Point the `@flipspacesit` scope at GitHub Packages, then install.">
        <CodeBlock
          language="bash"
          code={`# .npmrc
@flipspacesit:registry=https://npm.pkg.github.com

# then
npm install @flipspacesit/fs-ui`}
        />
      </DocSection>

      <DocSection
        title="Peer dependencies"
        description="fs-ui builds on React and MUI v5–v7. Install the peers alongside it."
      >
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
          <Chip label="react ^18 || ^19" size="small" />
          <Chip label="react-dom ^18 || ^19" size="small" />
          <Chip label="@mui/material ^5 || ^6 || ^7" size="small" />
          <Chip label="@emotion/react ^11" size="small" />
          <Chip label="@emotion/styled ^11" size="small" />
          <Chip label="styled-components ^6" size="small" />
        </Stack>
        <CodeBlock
          language="bash"
          code={`npm install @mui/material @emotion/react @emotion/styled styled-components`}
        />
      </DocSection>

      <DocSection
        title="Basic setup"
        description="Wrap your app in the MUI `ThemeProvider` with the fs-ui theme and set the `--scale` variable used for responsive sizing."
      >
        <CodeBlock
          code={`// global.css
:root { --scale: 1; }

// App.tsx
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@flipspacesit/fs-ui";
import "@flipspacesit/fs-ui/styles";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* your app */}
    </ThemeProvider>
  );
}`}
        />
      </DocSection>

      <DocSection title="Using components" description="Import any component from the package root.">
        <CodeBlock
          code={`import { Button, Dropdown, Tabs, StatusChip } from "@flipspacesit/fs-ui";

function Example() {
  const [tab, setTab] = useState("overview");
  return (
    <Tabs
      items={[
        { label: "Overview", value: "overview" },
        { label: "Design", value: "design" },
      ]}
      value={tab}
      onChange={setTab}
    />
  );
}`}
        />
      </DocSection>

      <DocSection
        title="Notifications"
        description="The `useNotification` hook needs notistack's `SnackbarProvider` mounted once near the app root."
      >
        <CodeBlock
          code={`import { SnackbarProvider } from "notistack";
import { useNotification } from "@flipspacesit/fs-ui";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <YourApp />
    </SnackbarProvider>
  );
}`}
        />
      </DocSection>
    </Box>
  );
};

export default InstallationDocs;
