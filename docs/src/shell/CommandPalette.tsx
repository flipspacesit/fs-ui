import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, Box } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { t } from "../docTokens";
import { menuItems, CATEGORIES, chapterNo, type MenuItem } from "./nav";
import { iconEntries, phosphorIconEntries, type IconEntry } from "../libStats";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  onSelectIcon: (name: string) => void;
}

const RECENT_KEY = "fsui-docs-recent";

// Every icon exported from the library — hand-authored glyphs + the full Phosphor
// set — deduped by name (hand-authored wins) so the palette can surface icons,
// not just pages.
const ICON_INDEX: IconEntry[] = (() => {
  const byName = new Map<string, IconEntry>();
  for (const e of phosphorIconEntries) byName.set(e.name, e);
  for (const e of iconEntries) byName.set(e.name, e);
  return Array.from(byName.values()).sort((a, b) => a.name.localeCompare(b.name));
})();
const ICON_RESULT_CAP = 24;

type Result =
  | { kind: "page"; item: MenuItem }
  | { kind: "icon"; name: string; Comp: IconEntry["Comp"] };

/** Group key used to draw the section headers. */
const groupOf = (r: Result): string =>
  r.kind === "page" ? r.item.category : "Icons";

const getRecents = (): string[] => {
  try {
    const v = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
};

const Kbd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    component="kbd"
    className="doc-mono"
    sx={{
      fontSize: 11,
      border: `1px solid ${t.border}`,
      borderRadius: "6px",
      px: "6px",
      py: "1px",
      color: t.textSubtle,
      backgroundColor: t.surface,
    }}
  >
    {children}
  </Box>
);

/** Highlight the matched substring of a label. */
const Highlighted: React.FC<{ text: string; q: string }> = ({ text, q }) => {
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <Box component="span" sx={{ backgroundColor: t.signalTint2, borderRadius: "3px" }}>
        {text.slice(i, i + q.length)}
      </Box>
      {text.slice(i + q.length)}
    </>
  );
};

export const CommandPalette: React.FC<Props> = ({ open, onClose, onSelect }) => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [prevOpen, setPrevOpen] = useState(open);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset when the palette opens (adjust state during render — no setState-in-effect).
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setQuery("");
      setActive(0);
    }
  }

  // Focus the input shortly after opening (side-effect only).
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(id);
  }, [open]);

  // Build the result list — pages first (ordered by category), then icon matches
  // under their own group + group boundaries.
  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      const recents = getRecents();
      const jump = [
        "getting-started",
        "theme",
        "typography",
        "spacing",
        "borders-shadows",
        ...recents,
      ];
      const seen = new Set<string>();
      return jump
        .map((id) => menuItems.find((m) => m.id === id))
        .filter((m): m is MenuItem => !!m && !seen.has(m.id) && !!seen.add(m.id))
        .map((item): Result => ({ kind: "page", item }));
    }
    const pages: Result[] = menuItems
      .filter(
        (m) =>
          m.label.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const ai = CATEGORIES.indexOf(a.category as (typeof CATEGORIES)[number]);
        const bi = CATEGORIES.indexOf(b.category as (typeof CATEGORIES)[number]);
        return ai - bi;
      })
      .map((item): Result => ({ kind: "page", item }));
    const icons: Result[] = ICON_INDEX.filter((e) =>
      e.name.toLowerCase().includes(q)
    )
      .slice(0, ICON_RESULT_CAP)
      .map((e): Result => ({ kind: "icon", name: e.name, Comp: e.Comp }));
    return [...pages, ...icons];
    // `open` is a dep so the empty-query "recents" list re-reads localStorage each open.
  }, [query, open]);

  // Clamp the active index into range without an effect.
  const activeIdx = results.length ? Math.min(active, results.length - 1) : 0;

  const select = (r: Result) => {
    if (r.kind === "icon") {
      onSelectIcon(r.name);
      onClose();
      return;
    }
    const { item } = r;
    try {
      const next = [item.id, ...getRecents().filter((x) => x !== item.id)].slice(0, 3);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    onSelect(item.id);
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((activeIdx + 1) % Math.max(1, results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((activeIdx - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIdx]) select(results[activeIdx]);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="doc-chrome"
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(10,17,46,0.45)", backdropFilter: "blur(2px)" },
        },
      }}
      PaperProps={{
        onKeyDown,
        sx: {
          position: "fixed",
          top: "15vh",
          m: 0,
          width: 560,
          maxWidth: "calc(100vw - 32px)",
          borderRadius: "16px",
          backgroundColor: t.surface,
          border: `1px solid ${t.borderStrong}`,
          boxShadow: t.shadowXl,
          overflow: "hidden",
        },
      }}
      sx={{ "& .MuiDialog-container": { alignItems: "flex-start" } }}
    >
      {/* input */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px", height: 56, px: "18px", borderBottom: `1px solid ${t.border}` }}>
        <SearchRoundedIcon sx={{ color: t.textSubtle, fontSize: 20 }} />
        <Box
          component="input"
          ref={inputRef}
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder="Search components & icons…"
          sx={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: 18,
            fontFamily: "inherit",
            color: t.text,
            "&::placeholder": { color: t.textSubtle },
          }}
        />
        <Kbd>Esc</Kbd>
      </Box>

      {/* results */}
      <Box sx={{ maxHeight: "50vh", overflowY: "auto", py: "8px" }}>
        {results.length === 0 && (
          <Box sx={{ p: "40px 20px", textAlign: "center" }}>
            <Box sx={{ fontSize: 15, color: t.text, fontWeight: 600 }}>
              No matches for “{query}”
            </Box>
            <Box sx={{ fontSize: 13, color: t.textMuted, mt: "6px" }}>
              Try a component name, or browse the sidebar.
            </Box>
          </Box>
        )}
        {results.map((r, i) => {
          const group = groupOf(r);
          const header = i === 0 || groupOf(results[i - 1]) !== group;
          const isActive = i === activeIdx;
          const key = r.kind === "page" ? `p:${r.item.id}` : `i:${r.name}`;
          const label = r.kind === "page" ? r.item.label : r.name;
          return (
            <React.Fragment key={key}>
              {header && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    px: "16px",
                    pt: "12px",
                    pb: "4px",
                  }}
                >
                  {r.kind === "page" && (
                    <Box
                      className="doc-mono"
                      sx={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: t.textSubtle,
                        backgroundColor: t.signalTint,
                        borderRadius: "5px",
                        px: "5px",
                      }}
                    >
                      {chapterNo(group)}
                    </Box>
                  )}
                  <Box sx={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: t.textSubtle }}>
                    {group}
                  </Box>
                </Box>
              )}
              <Box
                onMouseEnter={() => setActive(i)}
                onClick={() => select(r)}
                sx={{
                  position: "relative",
                  mx: "8px",
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  px: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: isActive ? t.accentTint : "transparent",
                }}
              >
                {isActive && (
                  <Box sx={{ position: "absolute", left: 0, top: 10, bottom: 10, width: 3, borderRadius: 3, backgroundColor: t.signal }} />
                )}
                {r.kind === "icon" && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      width: 20,
                      color: t.text,
                      "& svg": { width: 18, height: 18 },
                    }}
                  >
                    <r.Comp size={18} color="var(--doc-text)" fill="var(--doc-text)" />
                  </Box>
                )}
                <Box sx={{ flex: 1, fontSize: 15, fontWeight: 500, color: t.text }}>
                  <Highlighted text={label} q={query.trim()} />
                </Box>
                <Box sx={{ fontSize: 12, color: t.textSubtle }}>
                  {r.kind === "page" ? r.item.category : "Icon"}
                </Box>
              </Box>
            </React.Fragment>
          );
        })}
      </Box>

      {/* footer */}
      <Box sx={{ height: 40, display: "flex", alignItems: "center", justifyContent: "space-between", px: "16px", backgroundColor: t.sunken, borderTop: `1px solid ${t.border}` }}>
        <Box sx={{ display: "flex", gap: "12px", alignItems: "center", fontSize: 11, color: t.textSubtle }}>
          <span><Kbd>↑↓</Kbd> navigate</span>
          <span><Kbd>↵</Kbd> open</span>
          <span><Kbd>esc</Kbd> close</span>
        </Box>
        <Box className="doc-mono" sx={{ fontSize: 11, color: t.textSubtle }}>fs-ui docs</Box>
      </Box>
    </Dialog>
  );
};

export default CommandPalette;
