import React from "react";
import { Box } from "@mui/material";
import { t } from "../docTokens";
import { LINKS } from "../links";

interface FooterProps {
  onNavigate?: (id: string) => void;
}

/** Internal links carry a `page` (docs nav id); external links carry an `href`. */
type FooterLink =
  | { label: string; page: string }
  | { label: string; href: string };

const COLS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Docs",
    links: [
      { label: "Getting Started", page: "getting-started" },
      { label: "Installation", page: "installation" },
      { label: "Components", page: "dropdown" },
      { label: "API Reference", page: "api-reference" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: LINKS.repo },
      { label: "Changelog", href: LINKS.releases },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Flipspaces", href: LINKS.company },
      { label: "Careers", href: LINKS.careers },
    ],
  },
];

const linkSx = {
  display: "block",
  textAlign: "left" as const,
  border: "none",
  background: "transparent",
  p: 0,
  fontSize: 13,
  fontFamily: "inherit",
  color: t.textMuted,
  mb: "8px",
  cursor: "pointer",
  "&:hover": { color: t.text },
};

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => (
  <Box
    component="footer"
    className="doc-chrome"
    sx={{
      borderTop: `1px solid ${t.border}`,
      backgroundColor: t.bg,
      py: "48px",
      px: { xs: "20px", md: "56px" },
    }}
  >
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "48px", justifyContent: "space-between" }}>
      <Box sx={{ maxWidth: 280 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box sx={{ width: 24, height: 24, borderRadius: "7px", backgroundColor: t.signal, display: "grid", placeItems: "center" }}>
            <Box sx={{ fontWeight: 800, fontSize: 11, color: "#1b1c1e" }}>fs</Box>
          </Box>
          <Box sx={{ fontWeight: 800, fontSize: 15, color: t.text }}>fs-ui</Box>
        </Box>
        <Box sx={{ fontSize: 13, color: t.textMuted, mt: "12px", lineHeight: 1.6 }}>
          Built with fs-ui · © Flipspaces 2026
        </Box>
        <Box sx={{ fontSize: 12, color: t.textSubtle, mt: "8px", lineHeight: 1.6 }}>
          Designed and built with the components documented here.
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
        {COLS.map((c) => (
          <Box key={c.title}>
            <Box sx={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: t.textSubtle, mb: "12px" }}>
              {c.title}
            </Box>
            {c.links.map((l) =>
              "href" in l ? (
                <Box
                  key={l.label}
                  component="a"
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  sx={linkSx}
                >
                  {l.label}
                </Box>
              ) : (
                <Box
                  key={l.label}
                  component="button"
                  onClick={() => onNavigate?.(l.page)}
                  sx={linkSx}
                >
                  {l.label}
                </Box>
              )
            )}
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

export default Footer;
