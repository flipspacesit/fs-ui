import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Documentation pages
import GettingStarted from "./pages/GettingStarted";
import ThemeDocs from "./pages/ThemeDocs";
import DropdownDocs from "./pages/DropdownDocs";
import ButtonDocs from "./pages/ButtonDocs";
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

const SIDEBAR_WIDTH = 260;

const menuItems = [
  { id: "getting-started", label: "Getting Started", category: "Introduction" },
  { id: "theme", label: "Theme", category: "Foundation" },
  { id: "dropdown", label: "Dropdown", category: "Components" },
  { id: "button", label: "Button", category: "Components" },
  { id: "accordion", label: "Accordion", category: "Components" },
  { id: "tag", label: "Tag & StatusChip", category: "Components" },
  { id: "chip-card", label: "ChipCard", category: "Components" },
  { id: "ellipsis-tooltip", label: "EllipsisTooltip", category: "Components" },
  { id: "split-menu", label: "SplitMenu", category: "Components" },
  { id: "modal-layout", label: "ModalLayout", category: "Components" },
  { id: "dialog", label: "Dialog", category: "Components" },
  { id: "search-input", label: "SearchInput", category: "Components" },
  { id: "autocomplete", label: "AutoComplete", category: "Components" },
  { id: "table", label: "Table", category: "Components" },
  { id: "table-skeleton", label: "TableSkeletonLoader", category: "Components" },
  { id: "loading", label: "LoadingSpinner", category: "Components" },
  { id: "loaders", label: "Loader & PageLoader", category: "Components" },
  { id: "image-fallback", label: "ImageWithFallback", category: "Components" },
  { id: "notification", label: "useNotification", category: "Hooks" },
  { id: "icons", label: "Icons", category: "Utilities" },
  { id: "constants", label: "Constants", category: "Utilities" },
];

const pageComponents: Record<string, React.FC> = {
  "getting-started": GettingStarted,
  theme: ThemeDocs,
  dropdown: DropdownDocs,
  button: ButtonDocs,
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
  notification: NotificationDocs,
  icons: IconsDocs,
  constants: ConstantsDocs,
};

function App() {
  const [activePage, setActivePage] = useState("getting-started");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderPage = () => {
    const PageComponent = pageComponents[activePage];
    return PageComponent ? <PageComponent /> : <GettingStarted />;
  };

  const groupedItems = menuItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof menuItems>
  );

  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#3361FF" }}
        >
          FS-UI
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Flipspaces Component Library
        </Typography>
      </Box>
      <Divider />
      {Object.entries(groupedItems).map(([category, items]) => (
        <Box key={category}>
          <Typography
            variant="overline"
            sx={{
              px: 2,
              pt: 2,
              pb: 1,
              display: "block",
              color: "text.secondary",
              fontWeight: 600,
            }}
          >
            {category}
          </Typography>
          <List dense>
            {items.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  selected={activePage === item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setMobileOpen(false);
                  }}
                  sx={{
                    mx: 1,
                    borderRadius: 1,
                    "&.Mui-selected": {
                      backgroundColor: "#DEE7FF",
                      "&:hover": {
                        backgroundColor: "#C3D0F5",
                      },
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          ml: { sm: `${SIDEBAR_WIDTH}px` },
          backgroundColor: "#fff",
          color: "#1B1C1E",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {menuItems.find((item) => item.id === activePage)?.label ||
              "Documentation"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: SIDEBAR_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: SIDEBAR_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: SIDEBAR_WIDTH,
              borderRight: "1px solid #E5E7EB",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          mt: 8,
          minHeight: "100vh",
        }}
      >
        {renderPage()}
      </Box>
    </Box>
  );
}

export default App;
