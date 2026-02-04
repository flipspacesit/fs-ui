import React from "react";
import { Box, Typography, Alert, Chip, Stack } from "@mui/material";
import { DocSection, ExampleBox } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";

const GettingStarted: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Getting Started
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        FS-UI is the official Flipspaces component library built with React,
        TypeScript, and Material-UI. It provides a set of reusable UI components
        for building consistent user interfaces across Flipspaces applications.
      </Typography>

      <DocSection title="Installation">
        <Typography variant="body2" sx={{ mb: 2 }}>
          Install the package from GitHub Packages:
        </Typography>
        <CodeBlock
          code={`# First, configure npm to use GitHub Packages for @flipspacesit scope
# Create or update .npmrc file:
@flipspacesit:registry=https://npm.pkg.github.com

# Then install
npm install @flipspacesit/fs-ui`}
        />
      </DocSection>

      <DocSection title="Peer Dependencies">
        <Typography variant="body2" sx={{ mb: 2 }}>
          FS-UI requires the following peer dependencies:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
          <Chip label="react ^18.0.0 || ^19.0.0" size="small" />
          <Chip label="react-dom ^18.0.0 || ^19.0.0" size="small" />
          <Chip label="@mui/material ^5.0.0 || ^6.0.0 || ^7.0.0" size="small" />
          <Chip label="@emotion/react ^11.0.0" size="small" />
          <Chip label="@emotion/styled ^11.0.0" size="small" />
          <Chip label="styled-components ^6.0.0" size="small" />
        </Stack>
        <CodeBlock
          code={`npm install @mui/material @emotion/react @emotion/styled styled-components`}
        />
      </DocSection>

      <DocSection title="Basic Setup">
        <Typography variant="body2" sx={{ mb: 2 }}>
          Wrap your app with MUI ThemeProvider and set up the CSS variable for
          scaling:
        </Typography>
        <CodeBlock
          code={`// index.css or global styles
:root {
  --scale: 1;
}

// App.tsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: { main: '#3361FF' },
    // Add custom colors if needed
    blue: {
      main: '#3361FF',
      50: '#F0F4FF',
      200: '#DEE7FF',
      300: '#C3D0F5',
    },
    softSteel: {
      main: '#AEB6CE',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your app */}
    </ThemeProvider>
  );
}`}
        />
      </DocSection>

      <DocSection title="Using Components">
        <Typography variant="body2" sx={{ mb: 2 }}>
          Import and use components from the library:
        </Typography>
        <CodeBlock
          code={`import { 
  Dropdown, 
  Button, 
  Accordion, 
  Tag,
  SearchInput,
  ModalLayout,
  useNotification 
} from '@flipspacesit/fs-ui';

function MyComponent() {
  const [value, setValue] = useState('');
  
  return (
    <Dropdown
      options={[
        { value: 'opt1', label: 'Option 1' },
        { value: 'opt2', label: 'Option 2' },
      ]}
      value={value}
      onChange={(opt) => setValue(opt.value)}
      label="Select:"
    />
  );
}`}
        />
      </DocSection>

      <DocSection title="Using Icons">
        <Typography variant="body2" sx={{ mb: 2 }}>
          Import and use icons from the library. Icons accept size and fill/color props:
        </Typography>
        <CodeBlock
          code={`import { 
  ArrowDown, 
  ArrowRight,
  CheckCircle, 
  Download,
  MagnifyingGlass,
  Warning,
  ErrorIcon,
  Info,
} from '@flipspacesit/fs-ui';

// Basic usage
<ArrowDown />
<CheckCircle />

// Custom size
<Download size={24} />
<MagnifyingGlass size={18} />

// Custom colors
<CheckCircle fill="#10B981" />  // Success green
<Warning fill="#F59E0B" />      // Warning amber
<ErrorIcon fill="#EF4444" />    // Error red
<Info fill="#3361FF" />         // Info blue

// In buttons
<Button startIcon={<Download />}>Download</Button>
<Button endIcon={<ArrowRight />}>Next</Button>

// Note: Some icons (ErrorIcon, Success, Warning, Repeat, PaperPlaneTilt) 
// have white as default fill - designed for dark/colored backgrounds.
// Pass a fill color when using on light backgrounds.`}
        />
      </DocSection>

      <DocSection title="For Notifications">
        <Alert severity="info" sx={{ mb: 2 }}>
          The useNotification hook requires the notistack SnackbarProvider to be
          set up in your app.
        </Alert>
        <CodeBlock
          code={`import { SnackbarProvider } from 'notistack';
import { useNotification } from '@flipspacesit/fs-ui';

// Wrap your app
function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <YourApp />
    </SnackbarProvider>
  );
}

// Use in components
function MyComponent() {
  const { showSuccess, showError } = useNotification();
  
  const handleSave = async () => {
    try {
      await saveData();
      showSuccess('Saved successfully!');
    } catch (error) {
      showError('Failed to save');
    }
  };
}`}
        />
      </DocSection>

      <DocSection title="Available Exports">
        <ExampleBox>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Components
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            <Chip label="Dropdown" variant="outlined" size="small" />
            <Chip label="Button" variant="outlined" size="small" />
            <Chip label="OpenDropDownButton" variant="outlined" size="small" />
            <Chip label="DropDownApplyButton" variant="outlined" size="small" />
            <Chip label="Accordion" variant="outlined" size="small" />
            <Chip label="AccordionGroup" variant="outlined" size="small" />
            <Chip label="Tag" variant="outlined" size="small" />
            <Chip label="StatusChip" variant="outlined" size="small" />
            <Chip label="ChipCard" variant="outlined" size="small" />
            <Chip label="ChipCardWrapper" variant="outlined" size="small" />
            <Chip label="EllipsisTooltip" variant="outlined" size="small" />
            <Chip label="SplitMenu" variant="outlined" size="small" />
            <Chip label="ModalLayout" variant="outlined" size="small" />
            <Chip label="Dialog" variant="outlined" size="small" />
            <Chip label="SearchInput" variant="outlined" size="small" />
            <Chip label="AutoComplete" variant="outlined" size="small" />
            <Chip label="LoadingSpinner" variant="outlined" size="small" />
            <Chip label="OverlayLoading" variant="outlined" size="small" />
            <Chip label="Loader" variant="outlined" size="small" />
            <Chip label="LoaderButton" variant="outlined" size="small" />
            <Chip label="PageLoader" variant="outlined" size="small" />
            <Chip label="ImageWithFallback" variant="outlined" size="small" />
            <Chip label="ImageWithFallbackComponent" variant="outlined" size="small" />
            <Chip label="TableSkeletonLoader" variant="outlined" size="small" />
          </Stack>

          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
            Hooks
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            <Chip label="useNotification" variant="outlined" size="small" />
            <Chip label="useSearchInput" variant="outlined" size="small" />
          </Stack>

          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
            Icons (32 icons)
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {/* Navigation */}
            <Chip label="ArrowDown" variant="outlined" size="small" />
            <Chip label="ArrowRight" variant="outlined" size="small" />
            <Chip label="ArrowUp" variant="outlined" size="small" />
            {/* Status */}
            <Chip label="CheckIcon" variant="outlined" size="small" />
            <Chip label="CheckCircle" variant="outlined" size="small" />
            <Chip label="CloseIcon" variant="outlined" size="small" />
            <Chip label="ErrorIcon" variant="outlined" size="small" />
            <Chip label="Info" variant="outlined" size="small" />
            <Chip label="Success" variant="outlined" size="small" />
            <Chip label="Warning" variant="outlined" size="small" />
            {/* Actions */}
            <Chip label="Download" variant="outlined" size="small" />
            <Chip label="UploadSimple" variant="outlined" size="small" />
            <Chip label="MagnifyingGlass" variant="outlined" size="small" />
            <Chip label="PencilSimpleLine" variant="outlined" size="small" />
            <Chip label="FloppyDisk" variant="outlined" size="small" />
            <Chip label="Repeat" variant="outlined" size="small" />
            <Chip label="PaperPlaneTilt" variant="outlined" size="small" />
            {/* Finance */}
            <Chip label="Bank" variant="outlined" size="small" />
            <Chip label="CreditCard" variant="outlined" size="small" />
            <Chip label="Cardholder" variant="outlined" size="small" />
            <Chip label="CurrencyInr" variant="outlined" size="small" />
            {/* Documents */}
            <Chip label="FileText" variant="outlined" size="small" />
            <Chip label="PdfFile" variant="outlined" size="small" />
            <Chip label="Scroll" variant="outlined" size="small" />
            <Chip label="IdentificationCard" variant="outlined" size="small" />
            <Chip label="Subtitles" variant="outlined" size="small" />
            {/* Misc */}
            <Chip label="CalendarBlank" variant="outlined" size="small" />
            <Chip label="MapPin" variant="outlined" size="small" />
            <Chip label="Phone" variant="outlined" size="small" />
            <Chip label="Storefront" variant="outlined" size="small" />
            <Chip label="UserCircle" variant="outlined" size="small" />
            <Chip label="VendorIcon" variant="outlined" size="small" />
          </Stack>

          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
            Constants
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            <Chip label="HEIGHTS" variant="outlined" size="small" />
            <Chip label="FontSizeMap" variant="outlined" size="small" />
            <Chip label="ButtonBorderRadiusMap" variant="outlined" size="small" />
            <Chip label="Colors" variant="outlined" size="small" />
          </Stack>
        </ExampleBox>
      </DocSection>
    </Box>
  );
};

export default GettingStarted;
