import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { t } from "../docTokens";
import { useDocPage } from "../DocPage";

export const TocRail: React.FC = () => {
  const { sections } = useDocPage();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    // Coalesce the layout-reading spy to one run per animation frame.
    const run = () => {
      ticking = false;
      setShowTop(window.scrollY > 400);
      let current: string | null = sections[0]?.id ?? null;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) current = s.id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (sections.length === 0) return null;

  return (
    <Box component="nav" aria-label="On this page" sx={{ pt: "48px", pr: "24px" }}>
      <Box sx={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: t.textSubtle, mb: "12px" }}>
        On this page
      </Box>
      <Box sx={{ position: "relative", borderLeft: `2px solid ${t.border}` }}>
        {sections.map((s) => {
          const active = s.id === activeId;
          return (
            <Box
              key={s.id}
              component="button"
              onClick={() => go(s.id)}
              sx={{
                position: "relative",
                display: "block",
                width: "100%",
                textAlign: "left",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                pl: "12px",
                py: "5px",
                fontSize: 13,
                lineHeight: 1.4,
                fontWeight: active ? 600 : 450,
                color: active ? t.text : t.textMuted,
                transition: "color 150ms",
                "&:hover": { color: t.text },
              }}
            >
              {active && (
                <Box sx={{ position: "absolute", left: -2, top: 4, bottom: 4, width: 2, backgroundColor: t.signal }} />
              )}
              {s.label}
            </Box>
          );
        })}
      </Box>
      {showTop && (
        <Box
          component="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{
            mt: "16px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: 13,
            color: t.textSubtle,
            "&:hover": { color: t.text },
          }}
        >
          ↑ Back to top
        </Box>
      )}
    </Box>
  );
};

export default TocRail;
