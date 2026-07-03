import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import { t, TOPBAR_H, SIDEBAR_W } from "../docTokens";
import { LINKS } from "../links";
import ThemeToggle from "./ThemeToggle";

interface Props {
  version: string;
  scrolled: boolean;
  onOpenSearch: () => void;
  onOpenMobileNav: () => void;
}

const IconLink: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  label: string;
}> = ({ children, onClick, href, label }) => (
  <Box
    component={href ? "a" : "button"}
    href={href}
    target={href ? "_blank" : undefined}
    rel={href ? "noreferrer" : undefined}
    onClick={onClick}
    aria-label={label}
    title={label}
    sx={{
      width: 36,
      height: 36,
      display: "grid",
      placeItems: "center",
      borderRadius: "8px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: t.textSubtle,
      transition: "color 150ms, background-color 150ms",
      "&:hover": { color: t.text, backgroundColor: t.sunken },
    }}
  >
    {children}
  </Box>
);

export const TopBar: React.FC<Props> = ({
  version,
  scrolled,
  onOpenSearch,
  onOpenMobileNav,
}) => {
  const compact = useMediaQuery("(max-width:900px)");

  return (
    <Box
      component="header"
      className="doc-chrome"
      data-scrolled={scrolled ? "true" : undefined}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: TOPBAR_H,
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        px: { xs: "16px", md: "24px" },
        backgroundColor: t.surface,
        borderBottom: `1px solid ${t.border}`,
        boxShadow: scrolled ? t.shadowSm : "none",
        transition: "box-shadow 200ms, border-color 200ms",
      }}
    >
      {/* left cluster */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px", width: { md: SIDEBAR_W - 24 }, flexShrink: 0 }}>
        {compact && (
          <IconLink label="Menu" onClick={onOpenMobileNav}>
            <MenuRoundedIcon />
          </IconLink>
        )}
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: "8px",
            backgroundColor: t.signal,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <Box sx={{ fontWeight: 800, fontSize: 13, color: "#1b1c1e", letterSpacing: "-0.03em" }}>fs</Box>
        </Box>
        <Box sx={{ fontWeight: 800, fontSize: 18, color: t.text, letterSpacing: "-0.02em" }}>fs-ui</Box>
        {!compact && (
          <Box
            className="doc-mono doc-tnum"
            sx={{
              fontSize: 11,
              fontWeight: 600,
              color: t.textSubtle,
              backgroundColor: t.sunken,
              border: `1px solid ${t.border}`,
              borderRadius: "100px",
              px: "8px",
              height: 22,
              display: "flex",
              alignItems: "center",
            }}
          >
            v{version}
          </Box>
        )}
      </Box>

      {/* center-right: search trigger */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: { xs: "flex-end", md: "flex-start" } }}>
        {compact ? (
          <IconLink label="Search" onClick={onOpenSearch}>
            <SearchRoundedIcon />
          </IconLink>
        ) : (
          <Box
            component="button"
            onClick={onOpenSearch}
            sx={{
              width: 340,
              height: 36,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              px: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: t.sunken,
              border: `1px solid ${t.border}`,
              color: t.textSubtle,
              transition: "border-color 150ms",
              "&:hover": { borderColor: t.borderStrong },
            }}
          >
            <SearchRoundedIcon sx={{ fontSize: 18 }} />
            <Box sx={{ flex: 1, textAlign: "left", fontSize: 14 }}>Search components…</Box>
            <Box
              className="doc-mono"
              sx={{ fontSize: 11, border: `1px solid ${t.border}`, borderRadius: "6px", px: "6px", py: "1px", color: t.textSubtle, backgroundColor: t.surface }}
            >
              ⌘K
            </Box>
          </Box>
        )}
      </Box>

      {/* right cluster */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
        <IconLink label="GitHub" href={LINKS.repo}>
          <GitHubIcon sx={{ fontSize: 20 }} />
        </IconLink>
        <ThemeToggle />
      </Box>
    </Box>
  );
};

export default TopBar;
