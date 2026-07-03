import React from "react";
import { Box, Stack, Typography, SxProps, Theme } from "@mui/material";
import { primary, semantic, neutral } from "../../theme/tokens/colors";
import { theme } from "../../theme";
import { Checkbox } from "../Checkbox";

/** A single selectable filter checkbox row within a group. */
export interface FilterOption {
  /** Human-readable text shown next to the checkbox. */
  label: string;
  /** Stable value tracked in the `selected` array and toggled on change. */
  value: string;
}
/** A titled cluster of related filter options rendered under one slate header. */
export interface FilterGroup {
  /** Group heading shown in the slate header bar; also the React key. */
  label: string;
  /** Checkbox rows belonging to this group. */
  options: FilterOption[];
}

/** Props for {@link FilterPanel}. */
export interface FilterPanelProps {
  /** Panel heading; defaults to "Filters". */
  title?: string;
  /** Ordered groups of checkbox options to render. */
  groups: FilterGroup[];
  /** Selected option values */
  selected: string[];
  /** Called with the next `selected` array whenever an option is toggled. */
  onChange: (selected: string[]) => void;
  /** Optional handler; when set, renders a "Clear all" action in the header. */
  onClearAll?: () => void;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Faceted checkbox filter panel — Figma "Tables & Filter" (479:125).
 * Slate-blue tint container, per-group slate headers, checkbox option rows.
 */
export const FilterPanel: React.FC<FilterPanelProps> = ({
  title = "Filters",
  groups,
  selected,
  onChange,
  onClearAll,
  sx = {},
}) => {
  // Add/remove a value from the `selected` set, emitting the next array.
  const toggle = (v: string) =>
    onChange(
      selected.includes(v)
        ? selected.filter((s) => s !== v)
        : [...selected, v]
    );

  return (
    <Box
      sx={{
        backgroundColor: primary.slateBlue[50],
        borderRadius: "4px",
        boxShadow: "0px 8px 20px 0px #d1d1e6",
        p: "8px",
        width: 240,
        ...sx,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: "12px" }}
      >
        <Typography
          variant="b2"
          sx={{ fontWeight: 800, color: primary.slateBlue.primary }}
        >
          {title}
        </Typography>
        {onClearAll && (
          <Typography
            variant="b2"
            onClick={onClearAll}
            sx={{
              cursor: "pointer",
              fontWeight: theme.typography.fontWeight.bold,
              color: semantic.error.primary,
            }}
          >
            Clear all
          </Typography>
        )}
      </Stack>

      <Stack gap="12px">
        {groups.map((g) => (
          <Box key={g.label}>
            <Box
              sx={{
                backgroundColor: primary.slateBlue.primary,
                borderRadius: "4px",
                px: "8px",
                py: "4px",
                mb: "6px",
              }}
            >
              <Typography
                variant="b2"
                sx={{
                  fontWeight: theme.typography.fontWeight.medium,
                  color: neutral.white,
                }}
              >
                {g.label}
              </Typography>
            </Box>
            <Stack gap="3px">
              {g.options.map((o) => (
                <Stack
                  key={o.value}
                  direction="row"
                  alignItems="center"
                  gap="8px"
                >
                  <Checkbox
                    color="black"
                    checked={selected.includes(o.value)}
                    onChange={() => toggle(o.value)}
                    sx={{ p: 0 }}
                  />
                  <Typography
                    variant="b2"
                    sx={{
                      fontWeight: theme.typography.fontWeight.regular,
                      color: neutral.black,
                    }}
                  >
                    {o.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default FilterPanel;
