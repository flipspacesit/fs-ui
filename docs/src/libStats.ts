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

// Names re-exported through ./icons: the hand-authored glyphs above PLUS the
// full @phosphor-icons/react set (bare names + `<Name>Icon` aliases) and its
// helpers (IconContext, IconBase, SSR). Excluded wholesale from the non-icon
// classification below so the ~3,000 Phosphor forwardRef exports are never
// miscounted as fs-ui Components.
const iconNsNames = new Set(Object.keys(IconsNS));

/**
 * Distinct Phosphor icons reachable from the package root. Phosphor v2 ships an
 * `<Name>Icon` alias for every icon, so counting bare names that have a matching
 * alias yields the catalog size (1,512) while excluding the alias duplicates and
 * helpers (IconContext / IconBase / SSR). Derived, so it can't drift.
 */
export const phosphorIconCount = Object.keys(IconsNS).filter(
  (name) => !name.endsWith("Icon") && `${name}Icon` in IconsNS
).length;

export interface LibExport {
  name: string;
  kind: ExportKind;
}

/** Every non-icon value export from the barrel, classified by kind. */
export const libExports: LibExport[] = Object.entries(FsUi)
  .filter(([name]) => !iconNsNames.has(name))
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
