import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { useNotification } from "../../../src";

const NotificationDocs: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo, closeAllNotifications } =
    useNotification();

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        useNotification
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A hook for showing toast notifications using notistack.
      </Typography>

      <DocSection title="Import">
        <CodeBlock code={`import { useNotification } from '@flipspacesit/fs-ui';`} />
      </DocSection>

      <DocSection title="Setup">
        <Typography variant="body2" sx={{ mb: 2 }}>
          First, wrap your app with notistack's SnackbarProvider:
        </Typography>
        <CodeBlock
          code={`import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <YourApp />
    </SnackbarProvider>
  );
}`}
        />
      </DocSection>

      <DocSection title="Basic Usage" description="Click the buttons to see notifications">
        <ExampleBox>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button
              variant="contained"
              color="success"
              onClick={() => showSuccess("Operation completed successfully!")}
            >
              Show Success
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => showError("Something went wrong!")}
            >
              Show Error
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => showWarning("Please check your input")}
            >
              Show Warning
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => showInfo("New update available")}
            >
              Show Info
            </Button>
            <Button variant="outlined" onClick={closeAllNotifications}>
              Close All
            </Button>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const { showSuccess, showError, showWarning, showInfo } = useNotification();

// Show notifications
showSuccess('Operation completed successfully!');
showError('Something went wrong!');
showWarning('Please check your input');
showInfo('New update available');`}
        />
      </DocSection>

      <DocSection title="With Custom Options">
        <ExampleBox>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() =>
                showSuccess("This stays for 5 seconds", { autoHideDuration: 5000 })
              }
            >
              Long Duration (5s)
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                showInfo("Bottom left notification", {
                  anchorOrigin: { vertical: "bottom", horizontal: "left" },
                })
              }
            >
              Bottom Left
            </Button>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`// Custom duration
showSuccess('Saved!', { autoHideDuration: 5000 });

// Custom position
showInfo('Message', {
  anchorOrigin: { vertical: 'bottom', horizontal: 'left' }
});`}
        />
      </DocSection>

      <DocSection title="In Async Operations">
        <CodeBlock
          code={`const { showSuccess, showError } = useNotification();

const handleSave = async () => {
  try {
    await saveData();
    showSuccess('Data saved successfully!');
  } catch (error) {
    showError('Failed to save data. Please try again.');
  }
};

const handleDelete = async () => {
  try {
    await deleteItem();
    showSuccess('Item deleted');
  } catch (error) {
    showError(error.message || 'Delete failed');
  }
};`}
        />
      </DocSection>

      <DocSection title="Hook Return Values">
        <PropsTable
          props={[
            {
              name: "showSuccess",
              type: "(message, options?) => SnackbarKey",
              description: "Show a success notification",
            },
            {
              name: "showError",
              type: "(message, options?) => SnackbarKey",
              description: "Show an error notification",
            },
            {
              name: "showWarning",
              type: "(message, options?) => SnackbarKey",
              description: "Show a warning notification",
            },
            {
              name: "showInfo",
              type: "(message, options?) => SnackbarKey",
              description: "Show an info notification",
            },
            {
              name: "showNotification",
              type: "(message, variant, options?) => SnackbarKey",
              description: "Show a notification with custom variant",
            },
            {
              name: "closeNotification",
              type: "(key?) => void",
              description: "Close a specific notification by key",
            },
            {
              name: "closeAllNotifications",
              type: "() => void",
              description: "Close all notifications",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Options">
        <PropsTable
          props={[
            {
              name: "autoHideDuration",
              type: "number",
              default: "3000",
              description: "Time in ms before auto-hiding",
            },
            {
              name: "anchorOrigin",
              type: "{ vertical, horizontal }",
              default: '{ vertical: "top", horizontal: "right" }',
              description: "Position of the notification",
            },
            {
              name: "...options",
              type: "OptionsObject",
              description: "All notistack options are supported",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default NotificationDocs;
