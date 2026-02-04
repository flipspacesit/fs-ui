import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["src"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "FsUI",
      formats: ["es", "cjs"],
      fileName: (format) => `fs-ui.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@mui/material",
        "@mui/material/styles",
        "@emotion/react",
        "@emotion/styled",
        "styled-components",
        "notistack",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "@mui/material": "MuiMaterial",
          "@emotion/react": "emotionReact",
          "@emotion/styled": "emotionStyled",
          "styled-components": "styled",
          notistack: "notistack",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
