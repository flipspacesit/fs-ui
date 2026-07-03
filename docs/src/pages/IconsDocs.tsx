import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DocSection, Example, PropsTable, DocSearchField } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { t } from "../docTokens";
// The icon catalog is derived from the library exports (see libStats) so this
// gallery can never drift from what ships.
import { iconEntries, phosphorIconCount, phosphorIconEntries } from "../libStats";
import { Download, CheckCircle, Warning, Info } from "../../../src";
// Heart drives the weight demo below; the searchable Phosphor gallery renders
// from phosphorIconEntries (the full re-exported set), not hand-picked imports.
import { Heart } from "../../../src";

type Category =
  | "Navigation"
  | "Status"
  | "Actions"
  | "Finance"
  | "Documents"
  | "Misc";

interface Meta {
  category: Category;
  description?: string;
}

/**
 * Optional curation (category + description) for known icons. Any icon exported
 * by fs-ui that is NOT listed here still shows up automatically under "Misc" —
 * so newly added icons appear without touching this file.
 */
const META: Record<string, Meta> = {
  // Navigation
  ArrowDown: { category: "Navigation", description: "Downward arrow" },
  ArrowDown2: { category: "Navigation", description: "Downward chevron" },
  ArrowLeft: { category: "Navigation", description: "Left arrow" },
  ArrowLeft2: { category: "Navigation", description: "Left arrow with line" },
  ArrowLineDown: { category: "Navigation", description: "Arrow to baseline" },
  ArrowRight: { category: "Navigation", description: "Right arrow" },
  ArrowUp: { category: "Navigation", description: "Upward arrow" },
  FullScreen: { category: "Navigation", description: "Enter fullscreen" },
  MinimizeFullScreen: { category: "Navigation", description: "Exit fullscreen" },
  KeyboardArrowDown: { category: "Navigation", description: "Chevron down" },
  // Status
  CheckIcon: { category: "Status", description: "Checkmark" },
  CheckCircle: { category: "Status", description: "Success check in circle" },
  CheckCircle2: { category: "Status", description: "Check in circle (outline)" },
  CheckRectangle: { category: "Status", description: "Check in rectangle" },
  CheckSquareOffset: { category: "Status", description: "Check with square offset" },
  CloseIcon: { category: "Status", description: "Close / X" },
  ErrorIcon: { category: "Status", description: "Error" },
  EqualtoCircle: { category: "Status", description: "Equals in circle" },
  Info: { category: "Status", description: "Information" },
  FillInfo: { category: "Status", description: "Information (filled)" },
  FloorInfo: { category: "Status", description: "Floor / layered info" },
  QuestionMark: { category: "Status", description: "Help in circle" },
  OutlineQuestionMark: { category: "Status", description: "Help (outline)" },
  Success: { category: "Status", description: "Double checkmark" },
  Warning: { category: "Status", description: "Warning badge" },
  Warning2: { category: "Status", description: "Warning triangle" },
  MinusCircle: { category: "Status", description: "Minus in circle" },
  PlusCircle: { category: "Status", description: "Plus in circle" },
  SealCheck: { category: "Status", description: "Verified seal" },
  ShieldCheck: { category: "Status", description: "Shield with check" },
  Certificate: { category: "Status", description: "Certificate" },
  // Actions
  Add: { category: "Actions", description: "Plus / add" },
  AddFloor: { category: "Actions", description: "Add floor" },
  Minus: { category: "Actions", description: "Minus / subtract" },
  Download: { category: "Actions", description: "Download" },
  UploadSimple: { category: "Actions", description: "Upload" },
  TrayArrowUp: { category: "Actions", description: "Tray upload" },
  MagnifyingGlass: { category: "Actions", description: "Search" },
  Pencil: { category: "Actions", description: "Edit / pencil" },
  PencilSimpleLine: { category: "Actions", description: "Edit (line)" },
  FloppyDisk: { category: "Actions", description: "Save" },
  Repeat: { category: "Actions", description: "Repeat" },
  Refresh: { category: "Actions", description: "Reload" },
  PaperPlaneTilt: { category: "Actions", description: "Send" },
  Trash: { category: "Actions", description: "Delete" },
  Trash2: { category: "Actions", description: "Delete (large)" },
  ShoppingCart: { category: "Actions", description: "Cart" },
  Funnel: { category: "Actions", description: "Filter" },
  ListChecks: { category: "Actions", description: "Checklist" },
  UserPlus: { category: "Actions", description: "Add user" },
  Logout: { category: "Actions", description: "Sign out" },
  FillThumbsUp: { category: "Actions", description: "Thumbs up (filled)" },
  FillThumbsDown: { category: "Actions", description: "Thumbs down (filled)" },
  OutlineThumbsUp: { category: "Actions", description: "Thumbs up (outline)" },
  OutlineThumbsDown: { category: "Actions", description: "Thumbs down (outline)" },
  AirplaneTilt: { category: "Actions", description: "Airplane" },
  // Finance
  Bank: { category: "Finance", description: "Bank" },
  CreditCard: { category: "Finance", description: "Credit card" },
  Cardholder: { category: "Finance", description: "Card holder" },
  CurrencyInr: { category: "Finance", description: "Indian Rupee" },
  CurrencyInr2: { category: "Finance", description: "Indian Rupee (alt)" },
  Building: { category: "Finance", description: "Office building" },
  InvoiceUS: { category: "Finance", description: "Invoice (US)" },
  Receipt: { category: "Finance", description: "Receipt" },
  RequestPayment: { category: "Finance", description: "Request payment" },
  Percentage: { category: "Finance", description: "Percentage" },
  // Documents
  FileText: { category: "Documents", description: "File with text" },
  FillFileText: { category: "Documents", description: "File with text (filled)" },
  PdfFile: { category: "Documents", description: "PDF document" },
  Scroll: { category: "Documents", description: "Scroll" },
  Scroll2: { category: "Documents", description: "Scroll (alt)" },
  IdentificationCard: { category: "Documents", description: "ID card" },
  Subtitles: { category: "Documents", description: "Subtitles" },
  Folder: { category: "Documents", description: "Folder" },
  ClipboardText: { category: "Documents", description: "Clipboard" },
  Ticket: { category: "Documents", description: "Ticket" },
  // Misc
  Gear: { category: "Misc", description: "Settings" },
  CalendarBlank: { category: "Misc", description: "Calendar" },
  MapPin: { category: "Misc", description: "Location" },
  Phone: { category: "Misc", description: "Phone" },
  Email: { category: "Misc", description: "Email" },
  Storefront: { category: "Misc", description: "Store" },
  UserCircle: { category: "Misc", description: "User avatar" },
  Users: { category: "Misc", description: "Multiple users" },
  VendorIcon: { category: "Misc", description: "Vendor logo" },
  Vizdom: { category: "Misc", description: "Vizdom logo" },
  IndianFlag: { category: "Misc", description: "India flag" },
  NoDataIcon: { category: "Misc", description: "No data placeholder" },
  FillBulb: { category: "Misc", description: "Idea (filled)" },
  OutlineBulb: { category: "Misc", description: "Idea (outline)" },
};

const CATEGORY_ORDER: Category[] = [
  "Navigation",
  "Status",
  "Actions",
  "Finance",
  "Documents",
  "Misc",
];

interface IconEntry {
  name: string;
  Comp: React.FC<Record<string, unknown>>;
  category: Category;
  description: string;
}

// Layer curation (category/description) onto the derived icon catalog.
const ALL_ICONS: IconEntry[] = iconEntries.map(({ name, Comp }) => ({
  name,
  Comp,
  category: META[name]?.category ?? "Misc",
  description: META[name]?.description ?? name.replace(/([a-z])([A-Z])/g, "$1 $2"),
}));

const PHOSPHOR_WEIGHTS = [
  "thin",
  "light",
  "regular",
  "bold",
  "fill",
  "duotone",
] as const;

const IconTile: React.FC<{ entry: IconEntry }> = ({ entry }) => (
  <Box
    className="doc-chrome"
    title={entry.description}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      p: "16px 8px",
      borderRadius: "10px",
      border: `1px solid ${t.border}`,
      backgroundColor: t.surface,
      cursor: "default",
      transition: "border-color 150ms, background-color 150ms",
      "&:hover": { borderColor: t.accent, backgroundColor: t.accentTint },
    }}
  >
    <Box
      sx={{
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: t.text,
        // Constrain every icon to 24px regardless of its own size/width/height
        // props (some icons ignore `size`), and tint via both fill & color
        // since the icon set is split across the two APIs.
        "& svg": { width: 24, height: 24 },
      }}
    >
      <entry.Comp size={24} fill="var(--doc-text)" color="var(--doc-text)" />
    </Box>
    <Box
      className="doc-mono"
      sx={{ fontSize: 11, color: t.textMuted, textAlign: "center", wordBreak: "break-word", lineHeight: 1.3 }}
    >
      {entry.name}
    </Box>
  </Box>
);

const IconsDocs: React.FC<{ iconQuery?: { term: string; nonce: number } }> = ({
  iconQuery,
}) => {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ALL_ICONS;
    return ALL_ICONS.filter(
      (i) => i.name.toLowerCase().includes(s) || i.description.toLowerCase().includes(s) || i.category.toLowerCase().includes(s)
    );
  }, [q]);

  const groups = useMemo(
    () =>
      CATEGORY_ORDER.map((c) => ({
        category: c,
        items: filtered.filter((i) => i.category === c),
      })).filter((g) => g.items.length > 0),
    [filtered]
  );

  // Searchable Phosphor gallery — filter the full re-exported set by name.
  const [pq, setPq] = useState("");
  const phosphorMatches = useMemo(() => {
    const s = pq.trim().toLowerCase();
    return s
      ? phosphorIconEntries.filter((i) => i.name.toLowerCase().includes(s))
      : phosphorIconEntries;
  }, [pq]);
  const phosphorShown = phosphorMatches.slice(0, pq.trim() ? 150 : 60);

  // Seed the filter from a ⌘K palette icon selection. Done during render (the
  // "adjust state during render" pattern, as CommandPalette does) rather than in
  // an effect, so it doesn't trip react-hooks/set-state-in-effect. Hand-authored
  // icons live in the Gallery (q); Phosphor icons in the Phosphor section (pq).
  const [appliedIconNonce, setAppliedIconNonce] = useState<number | undefined>(
    undefined
  );
  if (iconQuery && iconQuery.nonce !== appliedIconNonce) {
    setAppliedIconNonce(iconQuery.nonce);
    const term = iconQuery.term.trim();
    if (term) {
      if (ALL_ICONS.some((i) => i.name.toLowerCase() === term.toLowerCase()))
        setQ(term);
      else setPq(term);
    }
  }

  // Scroll the matching section into view after the filter applies (DOM
  // side-effect only — no setState here).
  useEffect(() => {
    const term = iconQuery?.term?.trim();
    if (!term) return;
    const inGallery = ALL_ICONS.some(
      (i) => i.name.toLowerCase() === term.toLowerCase()
    );
    const handle = window.setTimeout(() => {
      document
        .getElementById(inGallery ? "gallery" : "phosphor-icons")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => window.clearTimeout(handle);
  }, [iconQuery?.nonce]);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Icons
      </Typography>
      <Typography sx={{ fontSize: 18, lineHeight: 1.6, color: t.textMuted, mb: 4 }}>
        {ALL_ICONS.length} hand-crafted design-system icons — plus the complete{" "}
        {phosphorIconCount}-icon Phosphor set — all exported from the package
        root. The gallery below is generated directly from the library's icon
        exports, so it always matches what ships. Design-system icons accept{" "}
        <code>size</code> and <code>fill</code> / <code>color</code>; Phosphor
        icons accept <code>size</code>, <code>weight</code> and <code>color</code>.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Some glyphs ship in closely-related variants — e.g.{" "}
        <code>CheckCircle</code> / <code>CheckCircle2</code>,{" "}
        <code>ArrowDown</code> / <code>ArrowDown2</code>. Use the per-icon
        descriptions below (and the search) to pick the exact one you want.
      </Typography>

      <DocSection title="Import" description="Import any icon by name from the package root.">
        <CodeBlock
          code={`import { ArrowRight, MagnifyingGlass, CheckCircle, Download } from '@flipspacesit/fs-ui';

// A few icons also export aliases: Check → CheckIcon, Close → CloseIcon, Error → ErrorIcon`}
        />
      </DocSection>

      <DocSection
        title="Phosphor Icons"
        description={`Beyond the ${ALL_ICONS.length} hand-crafted design-system glyphs below, fs-ui re-exports the complete Phosphor Icons set — ${phosphorIconCount} icons, each in six weights. Import any of them by name from the package root; they're tree-shaken, so only the icons you actually use are bundled.`}
      >
        <CodeBlock
          code={`import { Heart, Rocket, GameController, IconContext } from '@flipspacesit/fs-ui'

// Phosphor icons take \`size\`, \`weight\` and \`color\`:
<Rocket size={24} weight="duotone" color="#425281" />

// Set defaults for a whole subtree with Phosphor's IconContext:
<IconContext.Provider value={{ size: 20, weight: 'bold', color: '#425281' }}>
  <Heart /> <Rocket /> <GameController />
</IconContext.Provider>`}
        />
        <DocSearchField
          value={pq}
          onChange={setPq}
          placeholder={`Search all ${phosphorIconCount} Phosphor icons…`}
          sx={{ mt: "24px", mb: "16px" }}
        />
        {phosphorMatches.length === 0 ? (
          <Box sx={{ fontSize: 14, color: t.textMuted, py: "16px" }}>
            No Phosphor icon matches “{pq}”.
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(104px, 1fr))",
                gap: "12px",
              }}
            >
              {phosphorShown.map((entry) => (
                <IconTile
                  key={entry.name}
                  entry={{ ...entry, category: "Misc", description: entry.name }}
                />
              ))}
            </Box>
            <Typography sx={{ fontSize: 13, color: t.textMuted, mt: "16px" }}>
              Showing {phosphorShown.length} of {phosphorMatches.length}
              {pq.trim() ? " matches" : " icons"} — every one is importable by name
              from <code>@flipspacesit/fs-ui</code>. Full reference at{" "}
              <a
                href="https://phosphoricons.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: t.accent, textDecoration: "underline" }}
              >
                phosphoricons.com
              </a>
              .
            </Typography>
          </>
        )}
      </DocSection>

      <DocSection
        title="Phosphor weights"
        description="Every Phosphor icon supports six weights via the `weight` prop."
      >
        <Example
          code={`<Heart weight="thin" />
<Heart weight="light" />
<Heart weight="regular" />
<Heart weight="bold" />
<Heart weight="fill" />
<Heart weight="duotone" />`}
          preview={
            <Box sx={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap", color: "#1b1c1e" }}>
              {PHOSPHOR_WEIGHTS.map((w) => (
                <Box key={w} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Heart size={32} weight={w} color="#df2409" />
                  <Box sx={{ fontSize: 11, color: "#616161" }}>{w}</Box>
                </Box>
              ))}
            </Box>
          }
        />
      </DocSection>

      <DocSection
        title="Gallery"
        description={`All ${ALL_ICONS.length} icons, grouped by category. Type to filter by name, description or category.`}
      >
        <DocSearchField value={q} onChange={setQ} placeholder="Search icons…" sx={{ mb: "24px" }} />

        {groups.length === 0 && (
          <Box sx={{ fontSize: 14, color: t.textMuted, py: "24px" }}>No icons match “{q}”.</Box>
        )}

        {groups.map((g) => (
          <Box key={g.category} sx={{ mb: "28px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px", mb: "12px" }}>
              <Box sx={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: t.textSubtle }}>
                {g.category}
              </Box>
              <Box className="doc-tnum" sx={{ fontSize: 11, color: t.textSubtle }}>
                {g.items.length}
              </Box>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(116px, 1fr))", gap: "12px" }}>
              {g.items.map((entry) => (
                <IconTile key={entry.name} entry={entry} />
              ))}
            </Box>
          </Box>
        ))}
      </DocSection>

      <DocSection title="Sizing" description="Pass `size` (px) to scale any icon.">
        <Example
          code={`<Download size={16} />
<Download size={24} />
<Download size={32} />
<Download size={48} />`}
          preview={
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 32, color: "#1b1c1e" }}>
              {[16, 24, 32, 48].map((s) => (
                <Box key={s} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Download size={s} />
                  <Box sx={{ fontSize: 11, color: "#616161" }}>{s}px</Box>
                </Box>
              ))}
            </Box>
          }
        />
      </DocSection>

      <DocSection
        title="Color"
        description="Most icons accept a `fill` prop. Some status icons default to white (for dark/colored surfaces) — pass a `fill` when placing them on light backgrounds."
      >
        <Example
          code={`<CheckCircle size={28} fill="#469951" />  // success
<Warning    size={28} fill="#f59e0b" />  // warning
<Info       size={28} fill="#5970b7" />  // info`}
          preview={
            <Box sx={{ display: "flex", gap: 24, alignItems: "center" }}>
              <CheckCircle size={28} fill="#469951" />
              <Warning size={28} fill="#f59e0b" />
              <Info size={28} fill="#5970b7" />
            </Box>
          }
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          props={[
            { name: "size", type: "number | string", default: "14–24 (varies)", description: "Icon size in pixels." },
            { name: "fill", type: "string", default: "varies by icon", description: "Fill color (CSS value). A few icons default to white for dark surfaces." },
            { name: "color", type: "string", description: "Some icons expose `color` instead of `fill`." },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default IconsDocs;
