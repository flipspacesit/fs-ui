import React, { useState } from "react";
import { Box, Stack, Typography, Collapse, SxProps, Theme } from "@mui/material";
import { theme } from "../../theme";
import { ArrowDown } from "../../icons/ArrowDown";
import { ArrowUp } from "../../icons/ArrowUp";

/** A single navigation entry — a leaf or an expandable parent with children. */
export interface SidebarNavItem {
  /** Visible row label. */
  label: string;
  /** Unique identifier matched against the active `value`. */
  value: string;
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  /** Expandable parent — sub-items rendered indented */
  children?: SidebarNavItem[];
}

/** Props for {@link SidebarNav}. */
export interface SidebarNavProps {
  /** Top-level navigation entries, optionally nesting one level of children. */
  items: SidebarNavItem[];
  /** Active leaf value */
  value: string;
  /** Fired with the selected leaf's `value` when a non-parent row is clicked. */
  onChange: (value: string) => void;
  /** Icon-only collapsed rail */
  collapsed?: boolean;
  /** Expanded width */
  width?: number;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Row color when active/highlighted vs. idle.
const ACTIVE_COLOR = theme.palette.slateBlue.primary;
const INACTIVE_COLOR = theme.palette.grey[400];

interface RowProps {
  item: SidebarNavItem;
  collapsed: boolean;
  hasChildren: boolean;
  open: boolean;
  active: boolean;
  highlight: boolean;
  onClick: () => void;
}

// Module-level so React keeps a stable component identity across renders
// (avoids remounting the row subtree / dropping focus on every state change).
const SidebarRow: React.FC<RowProps> = ({
  item,
  collapsed,
  hasChildren,
  open,
  active,
  highlight,
  onClick,
}) => {
  const color = highlight ? ACTIVE_COLOR : INACTIVE_COLOR;
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap="8px"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      sx={{
        cursor: "pointer",
        px: "12px",
        height: 36,
        borderRadius: "8px",
        outline: "none",
        justifyContent: collapsed ? "center" : "flex-start",
        backgroundColor: active ? theme.palette.slateBlue[50] : "transparent",
        "&:hover, &:focus-visible": {
          backgroundColor: theme.palette.slateBlue[50],
        },
      }}
    >
      {item.icon && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
            color,
          }}
        >
          {item.icon}
        </Box>
      )}
      {!collapsed && (
        <Typography
          variant="b1"
          sx={{
            flex: 1,
            whiteSpace: "nowrap",
            color,
            fontWeight: highlight
              ? theme.typography.fontWeight.medium
              : theme.typography.fontWeight.light,
          }}
        >
          {item.label}
        </Typography>
      )}
      {!collapsed && hasChildren && (
        <Box sx={{ display: "flex", color }}>
          {open ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        </Box>
      )}
    </Stack>
  );
};

/**
 * Application left navigation rail — Figma "Navigation Menu" (1555:16799).
 * Active item in slate-blue; expandable parents reveal indented children with a
 * connector; supports an icon-only collapsed state.
 */
export const SidebarNav: React.FC<SidebarNavProps> = ({
  items,
  value,
  onChange,
  collapsed = false,
  width = 240,
  sx = {},
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const isActive = (v: string) => v === value;
  const anyChildActive = (item: SidebarNavItem) =>
    item.children?.some((c) => isActive(c.value)) ?? false;

  return (
    <Box
      sx={{
        width: collapsed ? 64 : width,
        backgroundColor: theme.palette.white.main,
        border: `0.5px solid ${theme.palette.softSteel[400]}`,
        borderRadius: "12px",
        p: "8px",
        ...sx,
      }}
    >
      <Stack gap="4px">
        {items.map((item) => {
          const kids = item.children ?? [];
          const hasChildren = kids.length > 0;
          const open = expanded[item.value] ?? anyChildActive(item);
          return (
            <Box key={item.value}>
              <SidebarRow
                item={item}
                collapsed={collapsed}
                hasChildren={hasChildren}
                open={open}
                active={isActive(item.value)}
                highlight={
                  isActive(item.value) || (hasChildren && anyChildActive(item))
                }
                onClick={() =>
                  hasChildren
                    ? setExpanded((e) => ({ ...e, [item.value]: !open }))
                    : onChange(item.value)
                }
              />
              {hasChildren && !collapsed && (
                <Collapse in={open}>
                  <Stack
                    gap="4px"
                    sx={{
                      mt: "4px",
                      ml: "20px",
                      pl: "12px",
                      borderLeft: `1px solid ${theme.palette.softSteel[200]}`,
                    }}
                  >
                    {kids.map((child) => (
                      <SidebarRow
                        key={child.value}
                        item={child}
                        collapsed={collapsed}
                        hasChildren={false}
                        open={false}
                        active={isActive(child.value)}
                        highlight={isActive(child.value)}
                        onClick={() => onChange(child.value)}
                      />
                    ))}
                  </Stack>
                </Collapse>
              )}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default SidebarNav;
