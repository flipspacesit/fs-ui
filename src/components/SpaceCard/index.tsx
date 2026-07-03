import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Collapse,
  SxProps,
  Theme,
} from "@mui/material";
import { theme } from "../../theme";
import { shadows } from "../../theme/tokens/shadows";
import { ArrowDown } from "../../icons/ArrowDown";
import { ArrowUp } from "../../icons/ArrowUp";

/** Props for {@link SpaceCard}. */
export interface SpaceCardProps {
  /** Card title */
  title: string;
  /** Meta row under the title (grey) */
  meta?: React.ReactNode;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Uncontrolled initial state */
  defaultExpanded?: boolean;
  /** Toggle callback */
  onToggle?: (expanded: boolean) => void;
  /** Toggle CTA label */
  toggleLabel?: string;
  /** Expanded body (inner space cards, etc.) */
  children?: React.ReactNode;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Expandable render / space card — Figma "Dropdowns & Accordians" (419:19),
 * Accordion Type 2/3. Border turns Blue/500 when expanded; a "View spaces"
 * link toggles the body.
 */
export const SpaceCard: React.FC<SpaceCardProps> = ({
  title,
  meta,
  expanded,
  defaultExpanded = false,
  onToggle,
  toggleLabel = "View spaces",
  children,
  sx = {},
}) => {
  const [internal, setInternal] = useState(defaultExpanded);
  const isControlled = expanded !== undefined;
  const isOpen = isControlled ? expanded : internal;

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternal(next);
    onToggle?.(next);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white.main,
        border: `0.5px solid ${
          isOpen
            ? theme.palette.primaryBlue[500]
            : theme.palette.softSteel[400]
        }`,
        borderRadius: "8px",
        boxShadow: shadows.elevation03,
        overflow: "hidden",
        ...sx,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: "12px", cursor: "pointer" }}
        onClick={toggle}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.palette.black.main,
            }}
          >
            {title}
          </Typography>
          {meta && <Box sx={{ mt: "2px" }}>{meta}</Box>}
        </Box>
        <Stack direction="row" alignItems="center" gap="6px">
          <Typography
            variant="b2"
            sx={{
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.palette.primaryBlue.primary,
              textDecoration: "underline",
              whiteSpace: "nowrap",
            }}
          >
            {toggleLabel}
          </Typography>
          {isOpen ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        </Stack>
      </Stack>
      <Collapse in={isOpen}>
        <Box sx={{ p: "12px", pt: 0 }}>{children}</Box>
      </Collapse>
    </Box>
  );
};

export default SpaceCard;
