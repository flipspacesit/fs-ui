# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@flipspacesit/fs-ui` — the Flipspaces shared React component library (MUI-based), published to GitHub Packages and consumed by every Flipspaces web frontend. The repo holds two things:

- `src/` — the library. Everything public goes through the barrel `src/index.ts`.
- `docs/` — a separate Vite app (own `package.json` and `node_modules`) that is the documentation site **and the only dev playground**. Deployed to GitHub Pages.

## Commands

```bash
npm install            # npm. package-lock.json is gitignored; CI runs `npm install` on Node 20
npm run build          # tsc (typecheck only) && vite build → dist/: ESM + CJS + .d.ts + style.css
npx tsc                # typecheck alone — there is no typecheck script
npm run lint           # eslint . — covers docs/ as well as src/
npm run docs:install   # once, installs docs/ dependencies
npm run docs:dev       # docs site → http://localhost:5173/fs-ui/
npm run docs:build
```

- **There are no tests and no test runner.** "Verified" here means `npm run lint` + `npm run build` (exactly what the PR check runs) plus looking at the component in the docs site.
- `npm run dev` / `npm run preview` at the root serve nothing — there is no root `index.html`. Use `docs:dev`.
- Lint passes with warnings (a few `no-explicit-any` and `react-refresh` ones); only errors fail CI.
- **Docs pages are not type-checked by anything.** The docs build is `vite build` alone and the root `tsc` includes only `src`. Running `npx tsc -p docs/tsconfig.json` by hand is not a usable gate either: it reports false errors because the root and `docs/node_modules` each carry their own `@types/react`.

## Releasing

1. Bump `version` in `package.json` in the same PR as the change (that is how the history does it).
2. Merge to `master`. CI on the PR is lint + build only.
3. Create a GitHub Release `vX.Y.Z`. `publish.yml` fires on release creation and runs `npm publish` (`prepublishOnly` builds). **Without a release nothing is published**, whatever `package.json` says.

A push to `master` touching `src/**`, `docs/**` or `package.json` redeploys the docs site; its top bar reads the version from the root `package.json`.

Consumers resolve the published package at whatever range they pin — never this checkout — so a change reaches an app only after a release and a bump on the consumer's side.

**Every export is a compatibility contract.** The peer range spans React 18–19 and MUI 5–7, and real consumers sit at both ends (VizDom-frontend is React 18 / MUI 5), but this repo builds and type-checks against React 19 / MUI 7 only. Nothing here catches an API that exists only in newer MUI. Deprecate rather than remove: the legacy palette keys and the `Colors` constant are kept and marked `@deprecated` for that reason.

## Architecture

### The barrel

`src/index.ts` is hand-maintained. A component that is not exported there does not ship. Each component is a single file, `src/components/<Name>/index.tsx`, exporting the component and its prop types; `Table/` is the only multi-file component. Prop types live in the component file and are exported from the barrel — there is no `src/types/` here.

### Tokens → theme → CSS

- `src/theme/tokens/` is the source of truth: a hand-authored mirror of the Figma Design System (file `adSPuBSUsaaSvaCUvLPMf1`).
- `src/theme/index.ts` builds the single, light-only MUI `theme` from those tokens. It also augments MUI's types — design-system palette groups (`slateBlue`, `softSteel`, `primaryBlue`, …), typography variants `t1 b1 b2 c1 f1 f2`, extra `Button` colours and `shape`, extra `TextField` sizes — and carries the component overrides for `MuiButton`, `MuiTextField`, `MuiSelect`, the table parts and the date pickers. No hex values in this file; take them from the tokens.
- `src/styles/tokens.css` is a **second, hand-maintained** mirror of the same tokens as `--fs-*` CSS variables, shipped as `dist/style.css` (`@flipspacesit/fs-ui/styles`). Changing a token means editing the TS and the CSS.

Many components import the `theme` singleton directly (`import theme from "../../theme"`) instead of reading it from context, so their token colours render without a provider and ignore a consumer's theme. The `Mui*` overrides and the custom typography variants, by contrast, apply only when the consumer wraps the app in `<ThemeProvider theme={theme}>`.

Styling is MUI `styled` + `sx` (Emotion). `styled-components` appears in exactly two files (`Dropdown`, `Table/dataTableStyles.ts`) and is a peer dependency only because of them.

### `--scale`

Sizes are written `calc(Npx * var(--scale))` so the consuming app can scale the UI. The theme overrides and a few components (`FileUpload`, `SelectInput`) use the variable with no fallback, so a consumer that does not define `--scale` gets invalid sizes; the docs site sets it to `1`. Most component code uses `var(--scale, 1)` — use that form.

### What gets bundled

`rollupOptions.external` in `vite.config.ts` decides what stays out of `dist`. Entries are exact specifiers:

- A new third-party runtime import must be added there, and to `dependencies` or `peerDependencies`, or it is inlined into the bundle.
- `@mui/material` and `@mui/material/styles` are external; a deep import such as `@mui/material/Table` is not, and gets inlined. Import from the `@mui/material` root.
- `@mui/x-date-pickers` and `dayjs` are not in the list, so they are bundled into `dist` even though they are listed under `dependencies`.

`tsc` never emits (`noEmit`); the `.d.ts` files come from `vite-plugin-dts`. TSDoc on props therefore reaches consumers' IntelliSense, and the docs site's `PropsTable`s are hand-written copies of it — update both.

### Icons

`src/icons/index.ts` has three layers:

1. Hand-authored glyphs — explicit named exports, `{ size, color }` props.
2. `flags/` — about 250 `*Flag` components, re-exported with `export *`.
3. `export * from "@phosphor-icons/react"` — the whole Phosphor set, externalized so consumers tree-shake it.

Explicit exports shadow same-named Phosphor icons, and so do component names in `src/index.ts` (`Table`, `Tag`, `Tabs`, `Tree`, `Calendar`, `RadioButton`). To add an icon, create `src/icons/<Name>.tsx` and add an explicit export to `src/icons/index.ts`; the explicit icon list in `src/index.ts` is legacy and needs no new entry. **Check the name against Phosphor first** — a new explicit export silently replaces the Phosphor icon of that name, glyph and prop API both, for consumers already importing it.

### DataTable (`src/components/Table/`)

`index.tsx` holds the styled MUI table primitives (`Styled*`). `DataTable.tsx` is the assembled data-driven table, virtualized with `react-virtuoso`'s `TableVirtuoso`. State (sort, filters, hidden and frozen columns) lives in `useDataTableState`, with `useColumnResize` (column widths) and `useDataTableInfiniteScroll` beside it; pure logic is in `dataTableUtils.ts`, types in `dataTableTypes.ts`, row and header parts in `components/`. The barrel exports the assembled component **and** the hooks, style primitives and utils it is built from, so all of them are public API.

### Test IDs

The workspace-level `CLAUDE.md` owns the id formats. What is specific to this library:

- Input controls take a `data-testid` prop (`DataTestIdProps` in `src/constants`) and render it verbatim on **exactly one** element — the `<input>` for single-input controls, the root for composites. Composites add suffixed ids on their interactive children (`{id}-increment`, `{id}-option-{value}`, `{id}-close`, …). The README table lists every suffix, and each one is a public contract that Playwright suites in other repos select on.
- Component prop interfaces are closed, and TypeScript does not check hyphenated JSX attributes, so an id passed to a component that does not declare the prop compiles and renders nothing. Declare the prop and thread it explicitly, using `withDataTestId` (for `inputProps`) or `withDataTestIdSlot` (for `slotProps.input`: Checkbox, RadioButton, Switch).
- Legacy APIs that build the value instead of using it verbatim: `Dropdown`'s `testid` (emits `dropdown-<testid>` on the trigger and `option-<testid>-<label or value>` per option) and `SplitMenu`'s `dataTestIds`. `Dialog` and `ModalLayout` emit the literals `button-closeModal` and `icon-backArrow` when no id is passed. Do not change any of these.

### Docs site (`docs/`)

- Pages import the library **source** by relative path (`../../../src`), not `dist` and not the published package, so the site always shows the working tree.
- There is no router: `App.tsx` switches pages on an `activePage` state. Adding a page touches three places — `docs/src/pages/<Name>Docs.tsx` (built from `DocSection` / `ExampleBox` / `PropsTable` and `CodeBlock`), the `pageComponents` map in `docs/src/App.tsx`, and `menuItems` in `docs/src/shell/nav.ts`.
- `docs/src/libStats.ts` introspects the barrel for the API Reference page, the icon gallery, the landing-page counts and the ⌘K palette. Do not hardcode counts or export lists in pages.
- Docs chrome is themed with `--doc-*` CSS variables (light and dark). Live examples always render light, because the library ships one theme. `docs/DESIGN_BRIEF.md` is the locked spec for the chrome; it predates the move of `menuItems` into `shell/nav.ts`.

## Other docs

- `README.md` — consumer-facing usage. Its component list is partial; the docs site is the fuller reference. It does hold the authoritative table of test-id suffixes.
- `DESIGN_SYSTEM_PARITY.md` — the finished work log of bringing the library to parity with the Figma Design System. Useful for mapping a component to its Figma page and node id.

## Conventions

- No Prettier and no pre-commit hook. Quote and semicolon style differ from file to file — match the file you are editing.
- ESLint: unused variables are an error unless prefixed `_` (`tsconfig` also sets `noUnusedLocals` / `noUnusedParameters`); `no-explicit-any` is a warning; `react-hooks/exhaustive-deps` is off.
- The `@/` alias maps to `src/`, but most files use relative imports.
