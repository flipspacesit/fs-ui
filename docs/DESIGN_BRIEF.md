# fs-ui Docs Redesign — LOCKED Design Brief (source of truth)

Base direction: **Editorial Systematic**, grafted with **Direction A's yellow-signal discipline + motion spec** and **Direction B's slate-tinted warm elevation**. This document is final; build from it without re-deciding.

## 0. Grounded facts (verified in-repo, do not relitigate)

- `docs/src/main.tsx` wraps the app in a single `<ThemeProvider theme={theme}>` where `theme` is the **one hardcoded light** MUI theme from `../../src/theme` (no `palette.mode`, no `colorSchemes`). Live fs-ui examples are **light-only**.
- Shared doc components today: `docs/src/components/DocSection.tsx` exports **`DocSection`, `ExampleBox`, `PropsTable`** (three exports, one file). `docs/src/components/CodeBlock.tsx` is the default export `CodeBlock`.
- Import surface across ~45 pages: `import { DocSection, ExampleBox, PropsTable } from "../components/DocSection"` (39 pages) / `import { DocSection, ExampleBox } from ...` (3) and `import CodeBlock from "../components/CodeBlock"` (42). **These import paths and names MUST keep working.**
- `PropsTable` data shape is fixed: `Array<{ name: string; type: string; default?: string; description: string }>`. We ADD an optional `required?: boolean` (default false) — back-compat.
- 45 pages, categories: **Introduction (1) / Foundation (4) / Components (35) / Hooks (2) / Utilities (3)**. Navigation is `menuItems` in `docs/src/App.tsx`, switched via `activePage`/`setActivePage` (no router).
- Real fs-ui tokens exist at `src/theme/tokens/{colors,shadows,radii,typography}.ts` and mirrored as CSS vars in `src/styles/tokens.css` (prefix `--fs-*`). Fonts and prism are **NOT** installed yet.

## 1. npm packages to add (exact)

```
@fontsource-variable/inter
@fontsource-variable/jetbrains-mono
prism-react-renderer
```

No other runtime deps. No CDN, no external fetches. Import the two font CSS entrypoints once in `docs/src/main.tsx`:
```ts
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
```

## 2. Dark-mode MECHANISM (locked)

**CSS-custom-property swap on `<html data-theme>`. NO MUI theme rebuild on toggle.**

- Define all docs-chrome tokens as `--doc-*` variables in `docs/src/index.css`: light values under `:root`, dark values under `[data-theme="dark"]`.
- The MUI `<ThemeProvider theme={theme}>` in `main.tsx` stays **exactly as is** (single light fs-ui theme). Do not swap it, do not add `palette.mode`.
- **Live fs-ui examples always render light**, inside a dark "bezel" when docs are in dark mode. Every Example/preview surface shows a small caption **"Light preview"** (11px, `--doc-text-subtle`) so the intent is explicit. This is correct and intentional — fs-ui ships one theme; the preview is a truthful specimen (how Radix/MUI show light components on a dark page).
- All chrome reads `var(--doc-*)` (via `sx` or CSS) so a theme flip is instant, zero React re-render.
- **State + persistence:** `theme` = `"light" | "dark" | "system"`, default `"system"`. Store user choice in `localStorage["fsui-docs-theme"]`. Resolve `system` against `matchMedia("(prefers-color-scheme: dark)")` and re-derive live on its `change` event. On any change write `data-theme="light|dark"` (resolved value) to `document.documentElement`.
- **No-FOUC inline script** in `docs/index.html` `<head>`, before the module script:
```html
<script>
  (function () {
    try {
      var s = localStorage.getItem("fsui-docs-theme") || "system";
      var d = s === "dark" || (s === "system" &&
        matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.setAttribute("data-theme", d ? "dark" : "light");
    } catch (e) {}
  })();
</script>
```
- Add a global 120ms `cubic-bezier(.2,.8,.2,1)` transition on `background-color, border-color, color` scoped to chrome elements — **exclude code blocks and preview surfaces** (avoid laggy repaint / avoid animating the light examples). Wrap all motion in `@media (prefers-reduced-motion: reduce) { *{transition:none!important; animation:none!important} }`.

## 3. Exact palette — every role → hex

Author these as `--doc-*` CSS vars. Right column = source token where it maps 1:1 to a real fs-ui token (prefer these; only the few marked "derived" are new).

### 3.1 LIGHT (`:root`)

| Role | Var | Hex | Source |
|---|---|---|---|
| Canvas / app bg (page + gutters + sidebar) | `--doc-bg` | `#f1f7ff` | slateBlue-50 |
| Surface / card / content column | `--doc-surface` | `#ffffff` | white |
| Sunken (code well soft, preview artboard, table header, inline code) | `--doc-sunken` | `#edeff5` | softSteel-50 |
| Border hairline (dividers) | `--doc-border` | `#dadce6` | softSteel-100 |
| Border strong (card/table/input outline, hover) | `--doc-border-strong` | `#cfd3df` | softSteel-200 |
| Text primary (headings + body) | `--doc-text` | `#1b1c1e` | ink |
| Text muted (secondary copy, descriptions) | `--doc-text-muted` | `#616161` | grey-400 |
| Text subtle (labels, captions, TOC idle, breadcrumb) | `--doc-text-subtle` | `#919191` | grey-300 |
| **Accent (interactive/links/active)** | `--doc-accent` | `#425281` | slateBlue-primary |
| Accent hover | `--doc-accent-hover` | `#344168` | slateBlue-primaryDark |
| Accent tint (active-nav fill, ⌘K selected row, row hover) | `--doc-accent-tint` | `#e2ebf7` | slateBlue-100 |
| Accent wash (subtle hover fill) | `--doc-accent-wash` | `#f1f7ff` | slateBlue-50 |
| **Signal (yellow) — see §8** | `--doc-signal` | `#ffc100` | yellow-brand |
| Signal hover | `--doc-signal-hover` | `#ffa800` | yellow-hover |
| Signal tint (chapter-numeral chip, default-value chip, search hit) | `--doc-signal-tint` | `#fffce6` | yellow-100 |
| Signal tint-2 (search-match underlay) | `--doc-signal-tint-2` | `#fff5bf` | yellow-200 |
| Focus ring | `--doc-focus` | `#5970b7` | blue-primary |
| Type-pill text (props table) | `--doc-pill-text` | `#425281` | slateBlue-primary |
| Info callout text / bg | `--doc-info` / `--doc-info-bg` | `#425281` / `#e2ebf7` | slateBlue |
| Success text / bg | `--doc-success` / `--doc-success-bg` | `#469951` / `#e5f5e8` | success |
| Warning text / bg | `--doc-warning` / `--doc-warning-bg` | `#944b03` / `#fceec0` | warning-800 / warning-200 |
| Error text / bg | `--doc-error` / `--doc-error-bg` | `#df2409` / `#ffe4e0` | error |
| Shadow sm | `--doc-shadow-sm` | `0 1px 2px rgba(66,82,129,.06)` | derived (slate-tinted) |
| Shadow md (card, popover base) | `--doc-shadow-md` | `0px 4px 12px 0px rgba(209,209,230,.6)` | shadows.elevation03 |
| Shadow lg (hover lift) | `--doc-shadow-lg` | `0px 6.47px 19.39px 0px rgba(209,209,230,.6)` | shadows.e3 |
| Shadow xl (⌘K palette) | `--doc-shadow-xl` | `0px 12.93px 32.33px 0px #d1d1e6` | shadows.e5 |

### 3.2 DARK (`[data-theme="dark"]`)

| Role | Var | Hex | Source |
|---|---|---|---|
| Canvas / app bg (page + sidebar) | `--doc-bg` | `#04091f` | slateBlue-950 |
| Surface / card / content column | `--doc-surface` | `#0a112e` | slateBlue-900 |
| Sunken (table header, inline code, soft well) | `--doc-sunken` | `#04091f` | slateBlue-950 |
| Border hairline | `--doc-border` | `#1d284f` | slateBlue-800 |
| Border strong | `--doc-border-strong` | `#2a375e` | slateBlue-700 |
| Card top-highlight (etched edge) | `--doc-edge-highlight` | `rgba(255,255,255,.04)` | derived |
| Text primary | `--doc-text` | `#f1f7ff` | slateBlue-50 |
| Text muted | `--doc-text-muted` | `#a5bad5` | slateBlue-300 |
| Text subtle | `--doc-text-subtle` | `#6f84a8` | slateBlue-400 |
| **Accent (links/active)** | `--doc-accent` | `#a5bad5` | slateBlue-300 |
| Accent hover | `--doc-accent-hover` | `#c9d6e8` | derived (300→lighter) |
| Accent tint (active-nav fill, ⌘K selected, hover) | `--doc-accent-tint` | `#1d284f` | slateBlue-800 |
| Accent wash | `--doc-accent-wash` | `rgba(255,255,255,.05)` | derived |
| **Signal (yellow)** | `--doc-signal` | `#ffc100` | yellow-brand (unchanged) |
| Signal hover | `--doc-signal-hover` | `#ffa800` | yellow-hover |
| Signal tint (chapter chip, default chip) | `--doc-signal-tint` | `rgba(255,193,0,.10)` | derived |
| Signal tint-2 (search underlay) | `--doc-signal-tint-2` | `rgba(255,193,0,.18)` | derived |
| Focus ring | `--doc-focus` | `#96aff5` | moodyBlue-light |
| Type-pill text | `--doc-pill-text` | `#a5bad5` | slateBlue-300 |
| Info text / bg | `#a5bad5` / `#1d284f` | slateBlue-300 / -800 |
| Success text / bg | `#c3e8ca` / `rgba(70,153,81,.12)` | success-300 / tint |
| Warning text / bg | `#f7c352` / `rgba(245,158,11,.12)` | warning-400 / tint |
| Error text / bg | `#fb9587` / `rgba(223,36,9,.12)` | error-300 / tint |
| Shadow md | `--doc-shadow-md` | `0px 8px 24px 0px rgba(4,9,31,.5)` | derived |
| Shadow lg | `--doc-shadow-lg` | `0px 12.93px 32.33px 0px rgba(4,9,31,.6)` | derived |
| Shadow xl | `--doc-shadow-xl` | `0px 12.93px 48.49px 0px rgba(4,9,31,.7)` | derived |

## 4. Type scale (locked)

Family: **Inter Variable** for all chrome; **JetBrains Mono Variable** for code/mono. Global on the docs root: `font-family:"Inter Variable",sans-serif; font-feature-settings:"cv05","cv08","ss03"; letter-spacing:-0.011em; -webkit-font-smoothing:antialiased`. Numeric UI (version chip, counts, table) uses `font-variant-numeric:tabular-nums`.

Scale is deliberately editorial (larger than fs-ui's dense 24/20/16 product scale) but body is pulled toward the DS steps to keep the dogfood honest.

| Token | Font / size / line-height / weight / tracking | Color |
|---|---|---|
| Hero H1 (landing only) | Inter 800, 52px / 1.06 / -0.03em | `--doc-text` |
| Page H1 (per page) | Inter 700, 32px / 1.12 / -0.02em | `--doc-text` |
| Lead paragraph (under H1) | Inter 400, 18px / 1.6 | `--doc-text-muted` |
| H2 (DocSection title) | Inter 600, 21px / 1.3 / -0.015em | `--doc-text` |
| H3 (sub-example) | Inter 600, 16px / 1.4 | `--doc-text` |
| Body / prose | Inter 400, 15px / 1.7 / -0.006em | `--doc-text-muted` (lead sentences `--doc-text`) |
| Nav item | Inter 500, 14px / 1 (active 600) | idle `--doc-text-muted`, active `--doc-text` |
| Chapter / group label | Inter 700, 11px / 1 / 0.08em UPPERCASE | `--doc-text-subtle` |
| Eyebrow / kicker | Inter 700, 12px / 1 / 0.06em UPPERCASE | `--doc-accent` |
| TOC link | Inter 450→500, 13px / 1.5 (active 600) | idle muted, active `--doc-text` |
| Breadcrumb | Inter 500, 13px | `--doc-text-subtle` (last crumb `--doc-text`) |
| Table header | Inter 700, 12px / 0.04em UPPERCASE | `--doc-text-subtle` |
| Table cell | Inter 450, 14px | `--doc-text` |
| Code block | JetBrains Mono 13.5px / 1.65, ligatures off | per prism theme |
| Inline code | JetBrains Mono 13px | `--doc-accent` |
| Type pill / default chip | JetBrains Mono 12px | see §7 |
| Version chip / kbd | JetBrains Mono 600, 11px | `--doc-text-subtle` |
| Code header lang label | JetBrains Mono 700, 11px / 0.06em UPPERCASE | `#96aff5` |

Anchored headings (H2): show a muted `#` at 15px on hover; click copies the deep link and fires a notistack toast "Link copied".

## 5. App shell — dimensions & behavior

Replace the current `AppBar` + single `Drawer` in `App.tsx` with a three-column frame. Outer max frame **1440px**, centered; `--doc-bg` visible in gutters beyond it.

### 5.1 Topbar
- Fixed, **height 64px**, full width, `z-index 1100`, bg `--doc-surface`, 1px `--doc-border` bottom.
- **Scroll behavior:** listen to content scroll; when scrollY > 8 set `data-scrolled` on the topbar → bottom border morphs into `--doc-shadow-sm` (200ms). Toggle only, no jitter.
- **Left cluster** (reserve 288px to align with sidebar): 28px rounded-8 tile filled `--doc-signal` `#ffc100` with ink "fs" glyph → wordmark **"fs-ui"** Inter 800 18px `--doc-text` → **version chip** (pill, 22px tall, `--doc-sunken` bg, `--doc-border` ring, `--doc-text-subtle`, `v` + version, mono 11px). Read version from the library `package.json`.
- **Center-right:** search trigger — see §9. 340px pill on desktop; icon-only 36px below 900px.
- **Right cluster:** GitHub icon-link (36px, `--doc-text-subtle`→`--doc-text` hover, links to `https://github.com/flipspacesit/fs-ui`), a 1px divider, then the theme toggle (§2 — 36px segmented sun/system/moon, active segment gets `--doc-surface` fill + `--doc-shadow-sm`, 200ms icon crossfade, `aria-pressed`). All icon buttons 36px, radius-8, 8px apart, hover fill `--doc-sunken`.
- **< 900px:** left = logo + hamburger opening the sidebar as a temporary MUI `Drawer` restyled to match; search collapses to icon.

### 5.2 Left sidebar
- Permanent ≥900px, **width 288px**, sticky `top:64px`, `height:calc(100vh-64px)`, own `overflow-y:auto` with `scrollbar-gutter:stable`, bg **`--doc-bg`** (part of the page spine, NOT a card), 1px `--doc-border` right edge, 20px horizontal padding.
- Grouped by `category` in menu order: **01 Introduction · 02 Foundation · 03 Components · 04 Hooks · 05 Utilities**.
- **Chapter header (the signature):** sticky mini-row = a mono two-digit numeral in a `--doc-signal-tint` rounded-6 chip (`01`…`05`) + UPPERCASE category label (§4 chapter label) + a right-aligned count pill (f1 10px/700 `--doc-text-subtle`, e.g. `35`). 20px top / 8px bottom padding.
- **Nav item:** 36px tall, radius-8, `8px 10px` pad, 12px inset from chapter. Idle: `--doc-text-muted` 14px/500. Hover: bg `--doc-sunken`, text `--doc-text`, no position shift. **Active:** bg `--doc-accent-tint`, text `--doc-text` 600, **+ a 3px × 16px rounded `--doc-signal` yellow bar** pinned to the left edge (absolutely positioned, `height` animates 200ms). **Exactly one yellow bar on screen at a time.** Long labels ellipsize with a `title` attr.
- Pinned bottom mini-card: radius-12 `--doc-sunken`, "Built with fs-ui" dogfood tell.

### 5.3 Content column
- Flex-1, `min-width:0`, centered between sidebar and right rail. Prose measure **max-width 760px**; cards/tables/examples break out to the full column width. Padding `48px 56px 96px` desktop / `24px 20px 72px` mobile. Top clears the 64px topbar.
- Order per page: **breadcrumb row** (`Category ▸ Page`, chevrons `--doc-text-subtle`) → **H1** → **lead paragraph** → DocSections. **48px** vertical rhythm between DocSections; 24px title→body.
- Above the footer: **prev/next pager** — two 50/50 radius-12 outlined cards ("← Previous: <label>" / "Next: <label> →") walking the flattened `menuItems` order; hover lifts to `--doc-shadow-lg` + border→`--doc-accent`. Plus a hairline "Edit this page on GitHub ↗" link.

### 5.4 Right rail — "On this page"
- Permanent ≥1200px, **width 224px**, sticky `top:64px`, hidden below 1200px, bg `--doc-bg`.
- Auto-built from DocSection titles via a shared **DocPage context**: each `DocSection` registers `{id, label}` (id = slugified title) and renders `id` on its H2; the rail lists them.
- 11px/700 UPPERCASE "ON THIS PAGE" label, then rows: 13px, 6px height, 12px left pad against a 2px `--doc-border` track. **Active** (IntersectionObserver scroll-spy): `--doc-text` + 600 + a 2px `--doc-signal` segment on the track (slides between items). "Back to top ↑" at bottom, `--doc-text-subtle`, appears after 400px scroll.

### 5.5 Footer
- Spans content + right-rail columns (not the sidebar). 1px `--doc-border` top, 48px vertical pad, bg `--doc-bg`.
- Left: logo lockup + "Built with fs-ui · © Flipspaces 2026". Right: three link columns (Docs / Resources / Company) at 13px. One muted line: "Designed and built with the components documented here."

## 6. Landing / home page (rebuild `GettingStarted.tsx`)

Split into two logical pages: a new marketing **Home** shown at `getting-started`, and the existing install/setup content moved to a restyled **"Installation"** page one level down (kept, using the new CodeBlock). Home renders **without the 760px clamp** — full-width canvas up to **1080px**, centered.

Sections top→bottom:

1. **Hero** (padding 96px 0 72px). Background: `--doc-bg` + a faint dot-grid (radial-gradient dots, 24px pitch, `--doc-border` color at ~6%, masked to fade at edges). Eyebrow pill "FLIPSPACES DESIGN SYSTEM · v1.0.0" (mono, bordered). **H1 (52px display):** "Build Flipspaces interfaces, faster." — the word **"faster."** carries the **one decorative yellow** (a `--doc-signal` underline swash OR the period as a yellow dot; pick one, use once). Sub (18px muted, max 620px): "A React + MUI component library with 45 components, tokens, and hooks — the same primitives these docs are built with." CTA row: primary = live fs-ui `<Button variant="contained">` "Get started →" + outlined "Browse components" (scrolls to gallery) + an inline copy-pill `npm i @flipspacesit/fs-ui` (mono, bordered, radius-8, click-to-copy → toast). Desktop right side: a "specimen collage" of 3 real fs-ui components (a StatusChip, a Button, a small Dropdown) on white cards at slight rotations with `--doc-shadow-lg`.
2. **Install band:** a single **always-dark** code card (dark palette regardless of docs mode, Stripe-style) showing `.npmrc` + install, using the new CodeBlock. Full width, radius-12, pulled up −32px to overlap the hero for depth.
3. **Feature highlights:** 3-col grid (1-col mobile) of bordered cards (radius-12, `--doc-surface`, 1px `--doc-border`, 24px pad; hover → `--doc-shadow-lg` + border→`--doc-border-strong`, 160ms). Each: 40px `--doc-signal-tint` rounded-8 icon tile with a real fs-ui icon, 16px/600 title, 15px muted body. Cards: "Token-driven", "45+ components & hooks", "Themed light & dark", "TypeScript-first", "Composable on MUI v7", "Accessible & ARIA". Below: a stat strip "45 components · 2 hooks · 32+ icons · Inter" in tabular numerals.
4. **Component gallery** (the money shot). H2 "Explore the library" → responsive grid `repeat(auto-fill,minmax(220px,1fr))`, 16px gap, of specimen cards derived from the Components category of `menuItems`. Each card: radius-12 `--doc-surface`, 1px border, a **live miniature render** of a real fs-ui component on a 96px-tall `--doc-sunken` checker-dot artboard + component name (14px/600) + category chip. Hover lifts to `--doc-shadow-lg` and reveals "View docs →"; click → `setActivePage`.
5. **Foundations strip:** 4 wide token-specimen cards → Color (yellow-brand + slateBlue + blue + semantics swatches) / Type ("Aa" in 4 weights) / Spacing (4/8/16/24 bars) / Shadows (e1→e6 tiles). Each links to its Foundation page.
6. **CTA band** before the footer: "Ready to build? — Read the Installation guide." with a primary button.

## 7. CodeBlock, Example (Preview/Code), PropsTable

### 7.1 CodeBlock (rewrite `CodeBlock.tsx`; same `{code, language?}` props)
- **prism-react-renderer**, self-contained, hand-mapped theme per surface. Add optional props `showLineNumbers?: boolean` (default false) and `forceDark?: boolean` (default false; the landing install card sets true).
- Outer: radius-12, 1px `--doc-border`, `overflow:hidden`, `my:20px`. The code **well is always dark** (`#0a112e` slateBlue-900 bg, `#f1f7ff` text) in both modes — the familiar docs convention.
- **Header bar:** 38px, bg `rgba(255,255,255,.04)` over the well, 1px bottom hairline `rgba(255,255,255,.08)`, 12px pad. Left = language label chip derived from `language` (`TSX`/`BASH`/`CSS`…, defaults `tsx`) — mono 11px/700 UPPERCASE `#96aff5` on `rgba(255,255,255,.06)` pill. Right = **copy button**: text+icon ghost "Copy" (12px `--doc-text-subtle`-on-dark) → swaps to "Copied ✓" in `--doc-signal` yellow for 2s, then reverts. (No 3-dot traffic-light ornament — too skeuomorphic for this tone.)
- **Body:** JetBrains Mono 13.5px/1.65, `16px 20px` pad, `overflow-x:auto` with a thin styled scrollbar and a fading right-edge mask. Optional `--doc-text-subtle` line-number gutter. Blocks >18 lines collapse to 18 with a gradient-masked "Expand code" button.
- **Prism token colors (dark well):** plain `#f1f7ff`; comments `#6f84a8` italic; keywords/imports `#96aff5`; strings `#ffd84d`; functions/components `#c3e8ca`; JSX tags `#a5bad5`; attrs/props `#dee7ff`; numbers `#f7c352`; punctuation `#a5bad5`.

### 7.2 Example unit (new `<Example>`; keep `ExampleBox` working)
- **Back-compat:** `ExampleBox` stays exported from `DocSection.tsx` and becomes the Preview-only shell (bordered artboard). New richer form: `<Example preview={<.../>} code={"..."} defaultTab? layout? />`.
- Outer: radius-12, 1px `--doc-border-strong`, `--doc-surface`, `overflow:hidden`, `--doc-shadow-sm`.
- **Tab strip header** (40px, bg `--doc-sunken`, bottom hairline): two tabs **"Preview" | "Code"** (13px/500; active = `--doc-text` + a 2px `--doc-signal` underline segment; inactive muted). Right side: a "Light preview" caption + a copy-code icon. Default tab = **Preview**.
- **Preview pane:** `--doc-surface` bg, min-height 160px, `display:grid; place-items:center`, 32px pad, faint checker-dot artboard backdrop (`--doc-border` dot every 16px at ~8%). In dark docs the frame is dark but this inner preview **stays light** (light examples). Optional `layout="split"` (Preview left / Code right 55/45) for short samples.
- **Code pane:** the new CodeBlock mounted chrome-less (no double border/radius) inside the container.

### 7.3 PropsTable (rewrite; same data shape + new optional `required?`)
- Wrapper: radius-12, 1px `--doc-border-strong`, `overflow:hidden`, `--doc-surface`, `--doc-shadow-sm`; `borderCollapse:separate; border-spacing:0`. Wrap in an `overflow-x:auto` container so it never causes page horizontal scroll.
- **Header row:** bg `--doc-sunken`, sticky within a max-height scroll, labels "Prop / Type / Default / Description" (§4 table header).
- **Body rows:** `12px 16px` pad, 14px, top-aligned, hairline `--doc-border` bottoms only (no verticals). Zebra: even rows `--doc-sunken` @ ~40% (light) / `rgba(255,255,255,.02)` (dark). Row hover: `--doc-accent-tint` wash + a 2px `--doc-signal` left rule that animates in (120ms).
- **Prop cell:** JetBrains Mono 13px/600 `--doc-text`. `required===true` → superscript `*` in `--doc-error` + a 10px/700 "required" pill (error-200 bg / error-700 text) + a faint 2px error left cell accent. Optional props render at 500.
- **Type cell:** each type = a **type pill** — mono 12px, 1px `--doc-border`, radius-6, `2px 8px`, `--doc-sunken` bg, `--doc-pill-text`. Split union types on `" | "` into multiple pills. Function/object types stay a single scrollable pill.
- **Default cell:** mono 12px in a `--doc-signal-tint` rounded-6 chip; empty → em-dash **"—"** in `--doc-text-subtle` (never "-").
- **Description cell:** 14px/1.6 `--doc-text-muted`; inline `` `code` `` gets the shared inline-code style (13px mono, `--doc-sunken` bg, 1px `--doc-border`, radius-6, `2px 6px`, `--doc-accent` text).
- **Responsive < 720px:** collapse to stacked cards — each prop a radius-8 `--doc-sunken` card with Type/Default/Description label:value rows. No horizontal scroll on mobile.

## 8. THE YELLOW SIGNAL SYSTEM (single most important rule)

`--doc-signal` (`#ffc100`) carries **one semantic: "current position / focus / brand mark."** It appears ONLY as:
1. The **3px rounded active bar** — identical in the **sidebar active item**, the **⌘K active result row**, and (as a 2px segment) the **TOC active track** and the **Example tab underline**.
2. The **focus ring accent** (paired with `--doc-focus` blue for the ring, yellow reserved for the position bar).
3. The **logo tile**, the **chapter-numeral chips**, and the **props-table default-value chip** (the "brand punctuation" set).
4. Exactly **one hero decorative flourish** on the landing page ("faster.").
5. The **copy-button "Copied ✓"** confirmation.

Everything else interactive uses **`--doc-accent` (slateBlue)**. Never use yellow for body links, large fills, or as a general theme color. This discipline is the identity — it makes the slate field read as intentional (Radix/Geist-restrained), not brand-splashed.

## 9. Search — ⌘K command palette + topbar trigger

Client-side over the `menuItems` array (label + category, no backend).

- **Topbar trigger:** 340px "button-as-input" (36px tall, `--doc-sunken` bg, 1px `--doc-border`, radius-8, `--doc-text-subtle`): search glyph + "Search components…" + right-aligned kbd cap "⌘K" (mono 11px, `--doc-border` ring, radius-6). Hover → border `--doc-border-strong`. Collapses to a 36px icon below 900px.
- **Open triggers:** global keydown `⌘K` / `Ctrl-K` and `/`; also trigger click. `Esc` closes; focus restores to trigger.
- **Palette:** MUI Dialog / fixed overlay, `z-index 1400`, scrim `rgba(10,17,46,.45)` + `backdrop-filter:blur(2px)`. Panel: **560px** wide, `margin-top:15vh`, bg `--doc-surface`, 1px `--doc-border-strong`, radius-16, `--doc-shadow-xl`.
- **Input row:** 56px, borderless, 18px text, leading search icon, trailing "Esc" kbd cap; live case-insensitive subsequence/fuzzy filter on label + category.
- **Results:** grouped by the same numbered chapters as the sidebar (`01 Introduction` … `05 Utilities`), group headers §4 chapter label. Each row 44px: an fs-ui icon glyph in a `--doc-sunken` rounded-8 tile + label (15px/500) + right-aligned category breadcrumb (12px muted); matched substring highlighted with `--doc-signal-tint-2` underlay. **Active row** (↑/↓ navigable, wraps): `--doc-accent-tint` fill + **3px `--doc-signal` left bar** (echoes the sidebar). `Enter` → `setActivePage` + close.
- **Empty state:** an fs-ui NoDataContent-style block "No matches for '…'" + "Browse all components" fallback (dogfood).
- **Empty query:** show a "Jump to" list = Getting Started + the 4 Foundation pages + last 3 visited (from `localStorage`).
- **Footer bar:** 40px `--doc-sunken`, kbd legend "↑↓ navigate · ↵ open · esc close" (11px) + a right-side "fs-ui docs" mark.
- Fully keyboard-operable, focus-trapped, `role="dialog"`, `aria-activedescendant` on the active row.

## 10. Signature details & motion

1. **One yellow semantic** (§8) — the through-line across sidebar, ⌘K, TOC, tabs, and the copy check.
2. **Numbered chapter spine** — mono `01…05` yellow-tint chips prefixing every nav group in the sidebar AND the ⌘K results, so the whole site reads as one "manual assembled from the design system."
3. **Live specimen everywhere** — homepage gallery + hero collage + Example artboards render REAL fs-ui components on checker-dot artboards. The docs are wallpapered with the library.
4. **Dot-grid + etched-hairline depth** — masked 24px dot-grid behind the hero (and optional Example backdrops); 1px hairlines that in dark carry a `--doc-edge-highlight` top edge so cards read as etched glass; hover lifts use the real slate-tinted `--doc-shadow-lg`.
5. **Micro-interactions, 150–200ms, `cubic-bezier(.2,.8,.2,1)`, transform/opacity only:** sidebar active-bar height-animates between items; TOC segment slides; theme toggle sun/moon crossfade+rotate; copy label→check swap; topbar border→shadow morph on scroll; page-enter fade+8px-rise (180ms) on `activePage` change. All disabled to instant under `prefers-reduced-motion`.

## 11. Back-compat contract (must not break)

- Keep exports `DocSection`, `ExampleBox`, `PropsTable` from `docs/src/components/DocSection.tsx` and default `CodeBlock` from `docs/src/components/CodeBlock.tsx` at their current import paths.
- Keep `PropsTable` prop data shape; only ADD optional `required?: boolean`.
- Keep `CodeBlock` `{code, language?}`; only ADD optional `showLineNumbers?`, `forceDark?`.
- `DocSection` keeps `{title, description?, children}`; internally it now registers its section id/label into the DocPage context and renders an anchored H2.
- All ~45 existing pages must render unchanged without edits; richer forms (`<Example>`, `required`) are opt-in per page.
