export interface MenuItem {
  id: string;
  label: string;
  category: string;
}

/** Category display order → drives the numbered chapter spine (01…05). */
export const CATEGORIES = [
  "Introduction",
  "Foundation",
  "Components",
  "Hooks",
  "Utilities",
] as const;

export const menuItems: MenuItem[] = [
  { id: "getting-started", label: "Getting Started", category: "Introduction" },
  { id: "installation", label: "Installation", category: "Introduction" },
  { id: "api-reference", label: "API Reference", category: "Introduction" },
  { id: "theme", label: "Theme (Colors)", category: "Foundation" },
  { id: "typography", label: "Typography", category: "Foundation" },
  { id: "spacing", label: "Spacing & Grid", category: "Foundation" },
  { id: "borders-shadows", label: "Borders & Shadows", category: "Foundation" },
  { id: "dropdown", label: "Dropdown", category: "Components" },
  { id: "button", label: "Button", category: "Components" },
  { id: "button-extras", label: "IconButton, Switch & Toggle", category: "Components" },
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
  { id: "text-input", label: "TextInput", category: "Components" },
  { id: "select-input", label: "SelectInput", category: "Components" },
  { id: "date-input", label: "DateInput", category: "Components" },
  { id: "input-extras", label: "Input Extras (TextArea, OTP, Stepper)", category: "Components" },
  { id: "calendar", label: "Calendar", category: "Components" },
  { id: "controls", label: "Checkbox, Radio, Tooltip…", category: "Components" },
  { id: "dropdown-extras", label: "CountryDropdown & SpaceCard", category: "Components" },
  { id: "tabs", label: "Tabs", category: "Components" },
  { id: "sidebar-nav", label: "SidebarNav", category: "Components" },
  { id: "badges", label: "IconBadge & PriorityBadge", category: "Components" },
  { id: "pins", label: "Pins", category: "Components" },
  { id: "feedback", label: "Alert, Snackbar, Breadcrumb", category: "Components" },
  { id: "toolbar", label: "ListToolbar", category: "Components" },
  { id: "filter-panel", label: "FilterPanel", category: "Components" },
  { id: "structure", label: "Badge, Stepper, Tree, SideModal", category: "Components" },
  { id: "cards", label: "Cards & Media", category: "Components" },
  { id: "file-upload", label: "FileUpload", category: "Components" },
  { id: "no-data-content", label: "NoDataContent", category: "Components" },
  { id: "notification", label: "useNotification", category: "Hooks" },
  { id: "use-search-input", label: "useSearchInput", category: "Hooks" },
  { id: "icons", label: "Icons", category: "Utilities" },
  { id: "constants", label: "Constants", category: "Utilities" },
  { id: "utils", label: "Utility Functions", category: "Utilities" },
];

/** Two-digit chapter numeral for a category. */
export const chapterNo = (category: string): string => {
  const i = CATEGORIES.indexOf(category as (typeof CATEGORIES)[number]);
  return String(i + 1).padStart(2, "0");
};

/** menuItems grouped in category order (computed once — pure of module data). */
export const GROUPED: { category: string; items: MenuItem[] }[] = CATEGORIES.map(
  (category) => ({
    category,
    items: menuItems.filter((m) => m.category === category),
  })
).filter((g) => g.items.length > 0);

export const findItem = (id: string) => menuItems.find((m) => m.id === id);
