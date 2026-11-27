import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import fsTestid from "./eslint-plugin-fs-testid/index.cjs";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "eslint-plugin-fs-testid"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-hooks/exhaustive-deps": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    // Test IDs (see AGENTS.md → Test IDs). Warnings here; the PR's "Test IDs"
    // status is what goes red. The rules live in eslint-plugin-fs-testid/, a
    // folder shared by every Flipspaces web repo: tune the options below,
    // never the rule files. Only the library source is checked: the docs site
    // under docs/ is a showcase.
    files: ["src/**/*.{ts,tsx}"],
    ignores: [
      "**/*.{test,spec,stories}.{ts,tsx}",
      "**/*.d.ts",
      "**/__tests__/**",
      "**/__mocks__/**",
    ],
    plugins: { "fs-testid": fsTestid },
    rules: {
      "fs-testid/require-test-id": [
        "warn",
        {
          // A control the rule cannot recognise by name: the column drag
          // handle, which only has onMouseDown.
          components: ["ColumnResizer"],
          // Never need an id of their own here. SidebarRow only passes onClick
          // down to its own root. The MUI Autocomplete and DateCalendar are
          // each used once, inside a component that already puts the
          // consumer's id on the input or on the surrounding paper.
          ignore: ["SidebarRow", "Autocomplete", "DateCalendar"],
          // The defaults, plus PaperProps: the modals put the consumer's id on
          // their paper (README → Test IDs).
          nestedProps: [
            "inputProps",
            "InputProps",
            "slotProps",
            "componentsProps",
            "SelectProps",
            "PaperProps",
          ],
        },
      ],
      "fs-testid/test-id-format": "warn",
    },
  }
);
