import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

// Self-hosted variable fonts
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";

import App from "./App";
import "./index.css";
import { ThemeModeProvider } from "./ThemeMode";

// The single light fs-ui theme powers the LIVE component examples (unchanged).
import { theme } from "../../src/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          // useNotification pins toasts top-right; offset the whole CONTAINER
          // below the fixed 64px TopBar. (Offsetting via `style` would apply the
          // margin to every toast and compound the gaps between stacked ones.)
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          classes={{ containerRoot: "docs-snackbar-offset" }}
        >
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </ThemeModeProvider>
  </React.StrictMode>
);
