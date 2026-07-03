import React, { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DocSection, DocSearchField } from "../components/DocSection";
import { t } from "../docTokens";
import { libExports, counts, iconCount, type ExportKind } from "../libStats";

interface Props {
  onNavigate?: (id: string) => void;
}

type Kind = ExportKind;

/** Value-export → docs page id. Presence is derived from the barrel; this map
 *  only adds deep links (unmapped exports still appear, just without a link). */
const PAGE_FOR: Record<string, string> = {
  Dropdown: "dropdown", SortByContainer: "dropdown",
  Button: "button", OpenDropDownButton: "button", DropDownApplyButton: "button",
  IconButton: "button-extras", Switch: "button-extras", SegmentedToggle: "button-extras",
  Accordion: "accordion", AccordionGroup: "accordion", StyledAccordion: "accordion",
  StyledAccordionSummary: "accordion", StyledAccordionDetails: "accordion",
  Tag: "tag", StatusChip: "tag",
  ChipCard: "chip-card", ChipCardWrapper: "chip-card",
  EllipsisTooltip: "ellipsis-tooltip",
  SplitMenu: "split-menu",
  ModalLayout: "modal-layout",
  Dialog: "dialog",
  SearchInput: "search-input", useSearchInput: "use-search-input",
  AutoComplete: "autocomplete",
  Table: "table", TableHead: "table", TableBody: "table", TableRow: "table",
  TableCell: "table", TableContainer: "table",
  StyledTable: "table", StyledTableContainer: "table", StyledTableHead: "table",
  StyledTableBody: "table", StyledHeaderCell: "table", StyledTableRow: "table",
  StyledTableCell: "table", StyledSpacerRow: "table", StyledSpacerCell: "table",
  StyledTableWrapper: "table",
  TableSkeletonLoader: "table-skeleton",
  LoadingSpinner: "loading", OverlayLoading: "loading", LoadingContainer: "loading",
  InlineLoadingContainer: "loading",
  Loader: "loaders", LoaderButton: "loaders", PageLoader: "loaders",
  ImageWithFallback: "image-fallback", ImageWithFallbackComponent: "image-fallback",
  TextInput: "text-input", SelectInput: "select-input", DateInput: "date-input",
  TextArea: "input-extras", PinInput: "input-extras", NumberStepper: "input-extras",
  Calendar: "calendar", DateRangePicker: "calendar", MonthYearPicker: "calendar",
  Checkbox: "controls", RadioButton: "controls", Tooltip: "controls",
  NavArrowButton: "controls", Scrollbar: "controls",
  CountryDropdown: "dropdown-extras", SpaceCard: "dropdown-extras",
  Tabs: "tabs", SidebarNav: "sidebar-nav",
  IconBadge: "badges", PriorityBadge: "badges",
  PinMarker: "pins", PinCommentBox: "pins", PinCommentInput: "pins", PinDial: "pins",
  Alert: "feedback", Snackbar: "feedback", Breadcrumb: "feedback",
  ListToolbar: "toolbar", FilterPanel: "filter-panel",
  Badge: "structure", Stepper: "structure", MilestoneStepper: "structure",
  Tree: "structure", SideModal: "structure", ProjectRowEditor: "structure",
  MediaCard: "cards", ProductCard: "cards", AspectRatioBox: "cards",
  ImageThumbnailStrip: "cards",
  FileUpload: "file-upload", NoDataContent: "no-data-content",
  useNotification: "notification",
  Colors: "constants", HEIGHTS: "constants", FontSizeMap: "constants",
  ButtonBorderRadiusMap: "constants",
  toCamelCase: "utils", capitalizeWord: "utils",
  theme: "theme", tokens: "theme", colors: "theme", primary: "theme",
  neutral: "theme", semantic: "theme", misc: "theme", buttons: "theme",
  fontFamily: "typography", fontSize: "typography", fontWeight: "typography",
  lineHeight: "typography", letterSpacing: "typography", typography: "typography",
  spacing: "spacing", grid: "spacing", breakpoints: "spacing", baseUnit: "spacing",
  radii: "borders-shadows", shadows: "borders-shadows",
};

interface ExportEntry {
  name: string;
  kind: Kind;
  page?: string;
}

// Classification comes from libStats; this page only adds the deep-link page.
const ALL_EXPORTS: ExportEntry[] = libExports.map((e) => ({
  ...e,
  page: PAGE_FOR[e.name],
}));

const SECTIONS: { kind: Kind; title: string; blurb: string }[] = [
  { kind: "Component", title: "Components", blurb: "React components, including styled sub-parts." },
  { kind: "Hook", title: "Hooks", blurb: "Reusable stateful logic." },
  { kind: "Utility", title: "Utilities", blurb: "Helper functions." },
  { kind: "Token", title: "Theme & Tokens", blurb: "The MUI theme plus the design-token objects." },
  { kind: "Constant", title: "Constants", blurb: "Shared sizing / color maps." },
];

const StatChip: React.FC<{ n: number; label: string }> = ({ n, label }) => (
  <Box
    className="doc-chrome"
    sx={{
      flex: "1 1 130px",
      borderRadius: "12px",
      border: `1px solid ${t.border}`,
      backgroundColor: t.surface,
      p: "16px 18px",
    }}
  >
    <Box className="doc-tnum" sx={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", color: t.text }}>
      {n}
    </Box>
    <Box sx={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: t.textSubtle, mt: "2px" }}>
      {label}
    </Box>
  </Box>
);

const ExportChip: React.FC<{ entry: ExportEntry; onNavigate?: (id: string) => void }> = ({
  entry,
  onNavigate,
}) => {
  const clickable = !!entry.page && !!onNavigate;
  return (
    <Box
      onClick={clickable ? () => onNavigate!(entry.page!) : undefined}
      className="doc-chrome"
      role={clickable ? "button" : undefined}
      title={clickable ? `View ${entry.name} docs` : entry.name}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
        px: "12px",
        height: 40,
        borderRadius: "8px",
        border: `1px solid ${t.border}`,
        backgroundColor: t.surface,
        cursor: clickable ? "pointer" : "default",
        transition: "border-color 150ms, background-color 150ms",
        "&:hover": clickable
          ? { borderColor: t.accent, backgroundColor: t.accentTint, "& .arrow": { opacity: 1 } }
          : {},
      }}
    >
      <Box className="doc-mono" sx={{ fontSize: 13, color: t.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {entry.name}
      </Box>
      {clickable && (
        <Box className="arrow" sx={{ fontSize: 13, color: t.accent, opacity: 0, transition: "opacity 150ms", flexShrink: 0 }}>
          →
        </Box>
      )}
    </Box>
  );
};

const ApiReferenceDocs: React.FC<Props> = ({ onNavigate }) => {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? ALL_EXPORTS.filter((e) => e.name.toLowerCase().includes(s)) : ALL_EXPORTS;
  }, [q]);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        API Reference
      </Typography>
      <Typography sx={{ fontSize: 18, lineHeight: 1.6, color: t.textMuted, mb: 4 }}>
        Every value exported from <code>@flipspacesit/fs-ui</code>, generated
        directly from the package's exports — so this list always matches what
        ships. Click any component to open its documentation.
      </Typography>

      {/* summary */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px", mb: "16px" }}>
        <StatChip n={counts.Component} label="Components" />
        <StatChip n={counts.Hook} label="Hooks" />
        <StatChip n={counts.Utility} label="Utilities" />
        <StatChip n={counts.Token + counts.Constant} label="Tokens & Consts" />
        <StatChip n={iconCount} label="Icons" />
      </Box>

      <DocSearchField value={q} onChange={setQ} placeholder="Filter exports…" sx={{ mb: "8px" }} />

      {SECTIONS.map(({ kind, title, blurb }) => {
        const items = filtered.filter((e) => e.kind === kind);
        if (items.length === 0) return null;
        return (
          <DocSection key={kind} title={title} description={blurb}>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
              {items.map((e) => (
                <ExportChip key={e.name} entry={e} onNavigate={onNavigate} />
              ))}
            </Box>
          </DocSection>
        );
      })}

      <DocSection title="Icons" description={`${iconCount} SVG icons ship from the package root.`}>
        <Box
          onClick={() => onNavigate?.("icons")}
          className="doc-chrome"
          role="button"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: "18px 20px",
            borderRadius: "12px",
            border: `1px solid ${t.border}`,
            backgroundColor: t.surface,
            cursor: "pointer",
            transition: "box-shadow 160ms, border-color 160ms",
            "&:hover": { boxShadow: t.shadowLg, borderColor: t.accent },
          }}
        >
          <Box>
            <Box sx={{ fontSize: 15, fontWeight: 600, color: t.text }}>{iconCount} icons</Box>
            <Box sx={{ fontSize: 13, color: t.textMuted, mt: "2px" }}>
              Browse the full searchable gallery on the Icons page.
            </Box>
          </Box>
          <Box sx={{ fontSize: 14, color: t.accent, fontWeight: 600 }}>View all →</Box>
        </Box>
      </DocSection>

      <Box sx={{ fontSize: 13, color: t.textSubtle, mt: "8px" }}>
        Note: TypeScript type exports (e.g. <code>DropdownProps</code>) are erased at
        runtime, so they aren't listed here — see each component's Props table.
      </Box>
    </Box>
  );
};

export default ApiReferenceDocs;
