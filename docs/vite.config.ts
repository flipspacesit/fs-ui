import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: ".",
  base: "/fs-ui/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "@mui/material",
      "@emotion/react",
      "@emotion/styled",
      "@mui/x-date-pickers",
      "dayjs",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@mui/material",
      "@mui/material/Table",
      "@mui/material/TableBody",
      "@mui/material/TableCell",
      "@mui/material/TableContainer",
      "@mui/material/TableHead",
      "@mui/material/TableRow",
      "@mui/material/Paper",
      "@mui/material/Skeleton",
      "@emotion/react",
      "@emotion/styled",
      "@mui/x-date-pickers",
      "@mui/x-date-pickers/DatePicker",
      "@mui/x-date-pickers/AdapterDayjs",
      "@mui/x-date-pickers/LocalizationProvider",
      "dayjs",
    ],
  },
  build: {
    outDir: "dist",
  },
});
