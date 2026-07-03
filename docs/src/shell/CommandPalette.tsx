import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, Box } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { t } from "../docTokens";
import { menuItems, CATEGORIES, chapterNo, type MenuItem } from "./nav";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
}

const RECENT_KEY = "fsui-docs-recent";

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

  // Build the result list (flat, ordered by category) + group boundaries.
  const results = useMemo<MenuItem[]>(() => {
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
        .filter((m): m is MenuItem => !!m && !seen.has(m.id) && !!seen.add(m.id));
    }
    const scored = menuItems
      .filter(
        (m) =>
          m.label.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const ai = CATEGORIES.indexOf(a.category as (typeof CATEGORIES)[number]);
        const bi = CATEGORIES.indexOf(b.category as (typeof CATEGORIES)[number]);
        return ai - bi;
      });
    return scored;
    // `open` is a dep so the empty-query "recents" list re-reads localStorage each open.
  }, [query, open]);

  // Clamp the active index into range without an effect.
  const activeIdx = results.length ? Math.min(active, results.length - 1) : 0;

  const select = (item: MenuItem) => {
    try {
      const next = [item.id, ...getRecents().filter((r) => r !== item.id)].slice(0, 3);
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
          placeholder="Search components…"
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
        {results.map((item, i) => {
          const header = i === 0 || results[i - 1].category !== item.category;
          const isActive = i === activeIdx;
          return (
            <React.Fragment key={item.id}>
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
                    {chapterNo(item.category)}
                  </Box>
                  <Box sx={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: t.textSubtle }}>
                    {item.category}
                  </Box>
                </Box>
              )}
              <Box
                onMouseEnter={() => setActive(i)}
                onClick={() => select(item)}
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
                <Box sx={{ flex: 1, fontSize: 15, fontWeight: 500, color: t.text }}>
                  <Highlighted text={item.label} q={query.trim()} />
                </Box>
                <Box sx={{ fontSize: 12, color: t.textSubtle }}>{item.category}</Box>
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
