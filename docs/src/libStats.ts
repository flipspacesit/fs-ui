import type React from "react";
import * as FsUi from "../../src";
import * as IconsNS from "../../src/icons";

/**
 * Single source of truth for facts derived from the fs-ui library itself:
 * the icon catalog and the classified value-export surface. Consumed by the
 * Icons page, the API Reference page, and the landing-page stats so none of
 * those hardcode counts that would drift as the library changes.
 */

export type ExportKind = "Component" | "Hook" | "Utility" | "Token" | "Constant";

const TOKEN_NAMES = new Set([
  "theme", "tokens", "colors", "primary", "neutral", "semantic", "misc", "buttons",
  "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", "typography",
  "spacing", "grid", "breakpoints", "baseUnit", "radii", "shadows",
]);

const isReactComponent = (v: unknown): boolean =>
  typeof v === "function" ||
  (typeof v === "object" && v !== null && "$$typeof" in (v as object));

export interface IconEntry {
  name: string;
  Comp: React.FC<Record<string, unknown>>;
}

/** Every icon component exported from the library, sorted by name. */
export const iconEntries: IconEntry[] = Object.entries(IconsNS)
  .filter(([, v]) => typeof v === "function")
  .map(([name, Comp]) => ({ name, Comp: Comp as React.FC<Record<string, unknown>> }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const iconCount = iconEntries.length;

/**
 * Country / territory / organisation flags (name ends in "Flag") — a subset of
 * {@link iconEntries}. Kept distinct so docs stats don't conflate the ~249
 * ported flags with the hand-authored design-system glyphs.
 */
export const flagCount = iconEntries.filter((e) => e.name.endsWith("Flag")).length;

/** Hand-authored design-system icons: {@link iconEntries} minus the flags. */
export const designIconCount = iconCount - flagCount;

/**
 * The Phosphor icons re-exported at the package root (`export * from
 * "@phosphor-icons/react"` in src/icons), as {name, Comp} for the docs gallery.
 * Phosphor v2 ships an `<Name>Icon` alias for every icon, so the bare names that
 * have a matching alias are exactly the catalog (1,512) — excluding the alias
 * duplicates and the helpers (IconContext / IconBase / SSR). Sorted by name.
 */
export const phosphorIconEntries: IconEntry[] = Object.keys(IconsNS)
  .filter((name) => !name.endsWith("Icon") && `${name}Icon` in IconsNS)
  .sort((a, b) => a.localeCompare(b))
  .map((name) => ({
    name,
    Comp: (IconsNS as Record<string, unknown>)[name] as React.FC<Record<string, unknown>>,
  }));

/** Count of distinct Phosphor icons reachable from the root (see {@link phosphorIconEntries}). */
export const phosphorIconCount = phosphorIconEntries.length;

export interface LibExport {
  name: string;
  kind: ExportKind;
}

// A barrel export is an icon (and excluded from the classification below) only
// when its binding IS the ./icons binding — so the hand-authored glyphs and the
// ~3,000 Phosphor forwardRef exports drop out, while real components whose name
// also exists in Phosphor (Table, Tag, Tabs, Tree, Calendar, RadioButton) are
// KEPT (their barrel binding is the component, not the same-named icon).
const iconExports = IconsNS as Record<string, unknown>;

/** Every non-icon value export from the barrel, classified by kind. */
export const libExports: LibExport[] = Object.entries(FsUi)
  .filter(([name, val]) => iconExports[name] !== val)
  .map(([name, val]): LibExport => {
    let kind: ExportKind;
    if (typeof val === "function" && /^use[A-Z]/.test(name)) kind = "Hook";
    else if (/^[A-Z]/.test(name) && isReactComponent(val)) kind = "Component";
    else if (typeof val === "function" && /^[a-z]/.test(name)) kind = "Utility";
    else if (TOKEN_NAMES.has(name)) kind = "Token";
    else kind = "Constant";
    return { name, kind };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export const counts: Record<ExportKind, number> = libExports.reduce(
  (c, e) => {
    c[e.kind]++;
    return c;
  },
  { Component: 0, Hook: 0, Utility: 0, Token: 0, Constant: 0 } as Record<ExportKind, number>
);
