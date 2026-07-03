import React, { useState } from "react";
import { Box, Stack, Typography, Collapse, SxProps, Theme } from "@mui/material";
import { primary, neutral } from "../../theme/tokens/colors";
import { theme } from "../../theme";

/** A single node in the tree; nest via `children` to build the hierarchy. */
export interface TreeNode {
  /** Text shown for the row. */
  label: string;
  /** Stable identifier, unique across the tree; used as key, expand/select id. */
  value: string;
  /** Child nodes; presence makes this node a collapsible parent. */
  children?: TreeNode[];
}

/** Props for the {@link Tree} component. */
export interface TreeProps {
  /** Root nodes of the hierarchy to render. */
  nodes: TreeNode[];
  /** Initially expanded node values */
  defaultExpanded?: string[];
  /** Fired with a leaf node's `value` when it is clicked. */
  onSelect?: (value: string) => void;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Row bullet: yellow square with +/- glyph for parents, yellow dot for leaves.
const Marker: React.FC<{ parent: boolean; open: boolean }> = ({
  parent,
  open,
}) => {
  if (!parent) {
    return (
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: primary.yellow.brand,
          flexShrink: 0,
        }}
      />
    );
  }
  return (
    <Box
      sx={{
        width: 14,
        height: 14,
        borderRadius: "3px",
        backgroundColor: primary.yellow.brand,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
        <path
          d={open ? "M2 5h6" : "M2 5h6M5 2v6"}
          stroke={neutral.ink}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
};

// Recursive row renderer: one level per call, indenting + drawing connectors by depth.
const TreeRows: React.FC<{
  nodes: TreeNode[];
  depth: number;
  expanded: Record<string, boolean>;
  toggle: (v: string) => void;
  onSelect?: (v: string) => void;
}> = ({ nodes, depth, expanded, toggle, onSelect }) => (
  <Stack gap="4px">
    {nodes.map((node) => {
      const kids = node.children ?? [];
      const parent = kids.length > 0;
      const open = !!expanded[node.value];
      return (
        <Box key={node.value}>
          <Stack
            direction="row"
            alignItems="center"
            gap="8px"
            sx={{
              pl: `${depth * 20}px`,
              cursor: "pointer",
              borderLeft:
                depth > 0
                  ? `1px solid ${neutral.softSteel[200]}`
                  : "none",
            }}
            onClick={() => (parent ? toggle(node.value) : onSelect?.(node.value))}
          >
            <Marker parent={parent} open={open} />
            <Typography
              variant="b2"
              sx={{
                fontWeight: theme.typography.fontWeight.medium,
                color: neutral.ink,
              }}
            >
              {node.label}
            </Typography>
          </Stack>
          {parent && (
            <Collapse in={open}>
              <Box sx={{ mt: "4px" }}>
                <TreeRows
                  nodes={kids}
                  depth={depth + 1}
                  expanded={expanded}
                  toggle={toggle}
                  onSelect={onSelect}
                />
              </Box>
            </Collapse>
          )}
        </Box>
      );
    })}
  </Stack>
);

/**
 * Tree / hierarchy indicator — Figma "Milestones" (909:4536). Yellow square
 * parents (+/- glyph), yellow leaf dots, connector lines. Parents toggle
 * expansion on click; leaves fire `onSelect`. Expansion is self-managed,
 * seeded from `defaultExpanded`.
 */
export const Tree: React.FC<TreeProps> = ({
  nodes,
  defaultExpanded = [],
  onSelect,
  sx = {},
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(defaultExpanded.map((v) => [v, true]))
  );
  const toggle = (v: string) =>
    setExpanded((e) => ({ ...e, [v]: !e[v] }));

  return (
    <Box sx={{ ...sx }}>
      <TreeRows
        nodes={nodes}
        depth={0}
        expanded={expanded}
        toggle={toggle}
        onSelect={onSelect}
      />
    </Box>
  );
};

export default Tree;
