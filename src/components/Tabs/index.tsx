import React from "react";
import { Stack, Box, Typography, SxProps, Theme } from "@mui/material";
import { primary, neutral } from "../../theme/tokens/colors";

/** Visual style of the tab strip: boxed segments, rounded pills, an underline film-strip, or stacked folder tabs. */
export type TabsVariant = "segmented" | "pill" | "underline" | "folder";
/** Colour family applied to the selected tab's fill. */
export type TabsColor = "slateBlue" | "blue" | "yellow";

/** A single tab entry. */
export interface TabItem {
  /** Text shown on the tab. */
  label: string;
  /** Unique identifier compared against `TabsProps.value` to determine selection. */
  value: string;
  /** Optional leading icon node rendered before the label. */
  icon?: React.ReactNode;
}

/** Props for the `Tabs` component. */
export interface TabsProps {
  /** Ordered list of tabs to render. */
  items: TabItem[];
  /** `value` of the currently selected tab. */
  value: string;
  /** Fires with the selected tab's `value` when a tab is clicked. */
  onChange: (value: string) => void;
  /** Visual style */
  variant?: TabsVariant;
  /** Colour family for the selected fill */
  color?: TabsColor;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Lookup: colour family → selected-tab fill, on-fill text colour, and inactive-tab border.
const FILL: Record<
  TabsColor,
  { fill: string; on: string; border: string }
> = {
  slateBlue: {
    fill: primary.slateBlue.primary,
    on: neutral.white,
    border: primary.slateBlue[300],
  },
  blue: {
    fill: primary.blue.primary,
    on: neutral.white,
    border: primary.blue[400],
  },
  yellow: {
    fill: primary.yellow.brand,
    on: neutral.black,
    border: primary.yellow[400],
  },
};

// Font weight used for the label of any non-selected tab.
const UNSELECTED_WEIGHT = 500;

/**
 * Tabs family — Figma "Tabs" (424:169). One component covering the segmented,
 * pill, underline (film-strip) and folder styles × three colour families.
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  onChange,
  variant = "segmented",
  color = "slateBlue",
  sx = {},
}) => {
  const c = FILL[color];
  const isSel = (v: string) => v === value;

  const Label: React.FC<{ text: string; color: string; weight: number }> = ({
    text,
    color: col,
    weight,
  }) => (
    <Typography
      variant="b2"
      sx={{ whiteSpace: "nowrap", fontWeight: weight, color: col }}
    >
      {text}
    </Typography>
  );

  if (variant === "pill") {
    return (
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          border: `0.5px solid ${neutral.softSteel[400]}`,
          borderRadius: "60px",
          p: "2px",
          gap: "4px",
          width: "fit-content",
          ...sx,
        }}
      >
        {items.map((item, i) => {
          const active = isSel(item.value);
          const prevActive = i > 0 && isSel(items[i - 1].value);
          return (
            <React.Fragment key={item.value}>
              {i > 0 && !active && !prevActive && (
                <Box
                  sx={{
                    width: "0.5px",
                    height: 20,
                    backgroundColor: neutral.softSteel[400],
                  }}
                />
              )}
              <Box
                onClick={() => onChange(item.value)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  px: "12px",
                  height: 24,
                  borderRadius: "100px",
                  backgroundColor: active ? c.fill : "transparent",
                }}
              >
                {item.icon}
                <Label
                  text={item.label}
                  color={active ? c.on : neutral.black}
                  weight={active ? 600 : UNSELECTED_WEIGHT}
                />
              </Box>
            </React.Fragment>
          );
        })}
      </Stack>
    );
  }

  if (variant === "underline") {
    return (
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          backgroundColor: "#e9eeff", // Primary/Blue/100 film-strip bar
          height: 32,
          px: "8px",
          gap: "16px",
          width: "fit-content",
          ...sx,
        }}
      >
        {items.map((item, i) => {
          const active = isSel(item.value);
          return (
            <React.Fragment key={item.value}>
              {i > 0 && (
                <Box
                  sx={{
                    width: "0.5px",
                    height: 16,
                    backgroundColor: neutral.softSteel[400],
                  }}
                />
              )}
              <Box
                onClick={() => onChange(item.value)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  height: "100%",
                  borderBottom: active
                    ? `2px solid ${primary.yellow.brand}`
                    : "2px solid transparent",
                }}
              >
                {item.icon}
                <Label
                  text={item.label}
                  color={active ? neutral.black : neutral.grey[400]}
                  weight={active ? 700 : UNSELECTED_WEIGHT}
                />
              </Box>
            </React.Fragment>
          );
        })}
      </Stack>
    );
  }

  // segmented + folder
  const folder = variant === "folder";
  return (
    <Stack
      direction="row"
      alignItems="flex-end"
      gap={folder ? "4px" : "8px"}
      sx={{ width: "fit-content", ...sx }}
    >
      {items.map((item) => {
        const active = isSel(item.value);
        return (
          <Box
            key={item.value}
            onClick={() => onChange(item.value)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              px: "12px",
              height: active && folder ? 34 : 28,
              borderRadius: folder ? "4px 4px 0 0" : "4px",
              backgroundColor: active ? c.fill : neutral.white,
              border: active ? "none" : `0.5px solid ${c.border}`,
              ...(folder && !active && { borderBottom: "none" }),
              ...(active &&
                folder && {
                  boxShadow: "0px -4px 15px 0px rgba(209, 209, 230, 0.6)",
                }),
            }}
          >
            {item.icon}
            <Label
              text={item.label}
              color={active ? c.on : neutral.black}
              weight={active ? 700 : UNSELECTED_WEIGHT}
            />
          </Box>
        );
      })}
    </Stack>
  );
};

export default Tabs;
