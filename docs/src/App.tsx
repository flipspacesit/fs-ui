import React, { useCallback, useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";
import { version } from "../../package.json";
import { t, EASE, TOPBAR_H, SIDEBAR_W, TOC_W } from "./docTokens";
import { DocPageProvider } from "./DocPage";
import { menuItems, findItem } from "./shell/nav";
import TopBar from "./shell/TopBar";
import SidebarContent from "./shell/Sidebar";
import TocRail from "./shell/TocRail";
import Footer from "./shell/Footer";
import CommandPalette from "./shell/CommandPalette";

// Documentation pages
import GettingStarted from "./pages/GettingStarted";
import InstallationDocs from "./pages/InstallationDocs";
import ApiReferenceDocs from "./pages/ApiReferenceDocs";
import ThemeDocs from "./pages/ThemeDocs";
import TypographyDocs from "./pages/TypographyDocs";
import SpacingDocs from "./pages/SpacingDocs";
import BordersShadowsDocs from "./pages/BordersShadowsDocs";
import DropdownDocs from "./pages/DropdownDocs";
import ButtonDocs from "./pages/ButtonDocs";
import ButtonExtrasDocs from "./pages/ButtonExtrasDocs";
import InputExtrasDocs from "./pages/InputExtrasDocs";
import CalendarDocs from "./pages/CalendarDocs";
import ControlsDocs from "./pages/ControlsDocs";
import DropdownExtrasDocs from "./pages/DropdownExtrasDocs";
import TabsDocs from "./pages/TabsDocs";
import SidebarNavDocs from "./pages/SidebarNavDocs";
import BadgesDocs from "./pages/BadgesDocs";
import PinsDocs from "./pages/PinsDocs";
import FeedbackDocs from "./pages/FeedbackDocs";
import ToolbarDocs from "./pages/ToolbarDocs";
import FilterDocs from "./pages/FilterDocs";
import StructureDocs from "./pages/StructureDocs";
import CardsDocs from "./pages/CardsDocs";
import AccordionDocs from "./pages/AccordionDocs";
import TagDocs from "./pages/TagDocs";
import EllipsisTooltipDocs from "./pages/EllipsisTooltipDocs";
import SplitMenuDocs from "./pages/SplitMenuDocs";
import ModalLayoutDocs from "./pages/ModalLayoutDocs";
import SearchInputDocs from "./pages/SearchInputDocs";
import TableDocs from "./pages/TableDocs";
import LoadingDocs from "./pages/LoadingDocs";
import NotificationDocs from "./pages/NotificationDocs";
import IconsDocs from "./pages/IconsDocs";
import ConstantsDocs from "./pages/ConstantsDocs";
import DialogDocs from "./pages/DialogDocs";
import LoaderDocs from "./pages/LoaderDocs";
import AutoCompleteDocs from "./pages/AutoCompleteDocs";
import ChipCardDocs from "./pages/ChipCardDocs";
import ImageWithFallbackDocs from "./pages/ImageWithFallbackDocs";
import TableSkeletonDocs from "./pages/TableSkeletonDocs";
import TextInputDocs from "./pages/TextInputDocs";
import SelectInputDocs from "./pages/SelectInputDocs";
import DateInputDocs from "./pages/DateInputDocs";
import FileUploadDocs from "./pages/FileUploadDocs";
import NoDataContentDocs from "./pages/NoDataContentDocs";
import UseSearchInputDocs from "./pages/UseSearchInputDocs";
import UtilsDocs from "./pages/UtilsDocs";

const pageComponents: Record<
  string,
  React.FC<{
    onNavigate?: (id: string) => void;
    iconQuery?: { term: string; nonce: number };
  }>
> = {
  "getting-started": GettingStarted,
  installation: InstallationDocs,
  "api-reference": ApiReferenceDocs,
  theme: ThemeDocs,
  typography: TypographyDocs,
  spacing: SpacingDocs,
  "borders-shadows": BordersShadowsDocs,
  dropdown: DropdownDocs,
  button: ButtonDocs,
  "button-extras": ButtonExtrasDocs,
  accordion: AccordionDocs,
  tag: TagDocs,
  "chip-card": ChipCardDocs,
  "ellipsis-tooltip": EllipsisTooltipDocs,
  "split-menu": SplitMenuDocs,
  "modal-layout": ModalLayoutDocs,
  dialog: DialogDocs,
  "search-input": SearchInputDocs,
  autocomplete: AutoCompleteDocs,
  table: TableDocs,
  "table-skeleton": TableSkeletonDocs,
  loading: LoadingDocs,
  loaders: LoaderDocs,
  "image-fallback": ImageWithFallbackDocs,
  "text-input": TextInputDocs,
  "select-input": SelectInputDocs,
  "date-input": DateInputDocs,
  "input-extras": InputExtrasDocs,
  calendar: CalendarDocs,
  controls: ControlsDocs,
  "dropdown-extras": DropdownExtrasDocs,
  tabs: TabsDocs,
  "sidebar-nav": SidebarNavDocs,
  badges: BadgesDocs,
  pins: PinsDocs,
  feedback: FeedbackDocs,
  toolbar: ToolbarDocs,
  "filter-panel": FilterDocs,
  structure: StructureDocs,
  cards: CardsDocs,
  "file-upload": FileUploadDocs,
  "no-data-content": NoDataContentDocs,
  notification: NotificationDocs,
  "use-search-input": UseSearchInputDocs,
  icons: IconsDocs,
  constants: ConstantsDocs,
  utils: UtilsDocs,
};

const PagerCard: React.FC<{
  dir: "prev" | "next";
  label: string;
  onClick: () => void;
}> = ({ dir, label, onClick }) => (
  <Box
    component="button"
    onClick={onClick}
    className="doc-chrome"
    sx={{
      flex: 1,
      minWidth: 0,
      textAlign: dir === "next" ? "right" : "left",
      border: `1px solid ${t.border}`,
      borderRadius: "12px",
      backgroundColor: t.surface,
      cursor: "pointer",
      p: "16px 20px",
      transition: `box-shadow 160ms ${EASE}, border-color 160ms ${EASE}, transform 160ms ${EASE}`,
      "&:hover": { boxShadow: t.shadowLg, borderColor: t.accent, transform: "translateY(-1px)" },
    }}
  >
    <Box sx={{ fontSize: 12, color: t.textSubtle, mb: "4px" }}>
      {dir === "prev" ? "← Previous" : "Next →"}
    </Box>
    <Box sx={{ fontSize: 15, fontWeight: 600, color: t.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
      {label}
    </Box>
  </Box>
);

function App() {
  const [activePage, setActivePage] = useState("getting-started");
  const [mobileNav, setMobileNav] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useCallback((id: string) => {
    setActivePage(id);
    setMobileNav(false);
    window.scrollTo({ top: 0 });
  }, []);

  // The ⌘K palette can select an icon → jump to the Icons page pre-filtered to
  // it. The nonce makes IconsDocs re-apply the filter even when it's already open.
  const [iconQuery, setIconQuery] = useState<{ term: string; nonce: number }>({
    term: "",
    nonce: 0,
  });
  const requestIconSearch = useCallback(
    (term: string) => {
      setIconQuery((prev) => ({ term, nonce: prev.nonce + 1 }));
      navigate("icons");
    },
    [navigate]
  );

  // topbar scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ⌘K / Ctrl-K / "/" open search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Page = pageComponents[activePage] || GettingStarted;
  const item = findItem(activePage);
  const isHome = activePage === "getting-started";

  const idx = menuItems.findIndex((m) => m.id === activePage);
  const prev = idx > 0 ? menuItems[idx - 1] : null;
  const next = idx >= 0 && idx < menuItems.length - 1 ? menuItems[idx + 1] : null;

  return (
    <Box className="doc-chrome" sx={{ minHeight: "100vh", backgroundColor: t.bg }}>
      <TopBar
        version={version}
        scrolled={scrolled}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenMobileNav={() => setMobileNav(true)}
      />

      {/* mobile drawer */}
      <Drawer
        open={mobileNav}
        onClose={() => setMobileNav(false)}
        sx={{ display: { md: "none" }, "& .MuiDrawer-paper": { width: SIDEBAR_W, backgroundColor: t.bg, backgroundImage: "none", top: TOPBAR_H, height: `calc(100% - ${TOPBAR_H}px)` } }}
      >
        <SidebarContent activePage={activePage} onNavigate={navigate} />
      </Drawer>

      {/* frame */}
      <Box sx={{ maxWidth: 1440, mx: "auto", pt: `${TOPBAR_H}px`, display: "flex", alignItems: "flex-start" }}>
        {/* sidebar (desktop) */}
        <Box
          component="nav"
          sx={{
            display: { xs: "none", md: "block" },
            width: SIDEBAR_W,
            flexShrink: 0,
            position: "sticky",
            top: TOPBAR_H,
            alignSelf: "flex-start",
            height: `calc(100vh - ${TOPBAR_H}px)`,
            overflowY: "auto",
            borderRight: `1px solid ${t.border}`,
            scrollbarGutter: "stable",
          }}
        >
          <SidebarContent activePage={activePage} onNavigate={navigate} />
        </Box>

        <DocPageProvider key={activePage}>
          {/* content */}
          <Box component="main" className="doc-content" sx={{ flex: 1, minWidth: 0 }}>
            <Box
              key={activePage}
              className="doc-page-enter"
              sx={{
                maxWidth: isHome ? 1080 : "100%",
                mx: isHome ? "auto" : 0,
                px: isHome ? { xs: "20px", md: "32px" } : { xs: "20px", md: "56px" },
                pt: isHome ? 0 : "48px",
                pb: "24px",
              }}
            >
              {!isHome && (
                <>
                  {/* breadcrumb */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: "6px", fontSize: 13, fontWeight: 500, color: t.textSubtle, mb: "16px" }}>
                    <span>{item?.category}</span>
                    <span>›</span>
                    <span style={{ color: "var(--doc-text)" }}>{item?.label}</span>
                  </Box>
                </>
              )}

              <Box sx={{ maxWidth: isHome ? "100%" : 760 }}>
                <Page onNavigate={navigate} iconQuery={iconQuery} />
              </Box>

              {!isHome && (prev || next) && (
                <Box sx={{ display: "flex", gap: "16px", mt: "48px", flexWrap: "wrap" }}>
                  {prev ? <PagerCard dir="prev" label={prev.label} onClick={() => navigate(prev.id)} /> : <Box sx={{ flex: 1 }} />}
                  {next ? <PagerCard dir="next" label={next.label} onClick={() => navigate(next.id)} /> : <Box sx={{ flex: 1 }} />}
                </Box>
              )}
            </Box>
            <Footer onNavigate={navigate} />
          </Box>

          {/* right rail TOC */}
          {!isHome && (
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                width: TOC_W,
                flexShrink: 0,
                position: "sticky",
                top: TOPBAR_H,
                alignSelf: "flex-start",
                height: `calc(100vh - ${TOPBAR_H}px)`,
                overflowY: "auto",
              }}
            >
              <TocRail />
            </Box>
          )}
        </DocPageProvider>
      </Box>

      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={navigate}
        onSelectIcon={requestIconSearch}
      />
    </Box>
  );
}

export default App;
