import React from "react";
import { Stack, Typography, SxProps, Theme } from "@mui/material";
import { primary, neutral } from "../../theme/tokens/colors";
import { theme } from "../../theme";

/** A single breadcrumb step: its visible label and an optional click handler. */
export interface BreadcrumbItem {
  /** Text shown for this step (rendered capitalized). */
  label: string;
  /** Click handler; when set the step is rendered as a pointer/clickable link. */
  onClick?: () => void;
}

/** Props for the {@link Breadcrumb} navigation trail. */
export interface BreadcrumbProps {
  /** Ordered items — the last is the active/current step */
  items: BreadcrumbItem[];
  /** Separator glyph placed between items. Defaults to "/". */
  separator?: string;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Breadcrumb — Figma "Snackbar & Breadcrumb" (477:938). Completed steps in
 * medium black, the current step in bold blue, with a "/" separator.
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = "/",
  sx = {},
}) => (
  <Stack direction="row" alignItems="center" gap="4px" sx={{ ...sx }}>
    {items.map((item, i) => {
      const active = i === items.length - 1;
      return (
        <React.Fragment key={i}>
          {i > 0 && (
            <Typography
              variant="b2"
              sx={{
                color: neutral.black,
                fontWeight: theme.typography.fontWeight.light,
              }}
            >
              {separator}
            </Typography>
          )}
          <Typography
            variant="b2"
            onClick={item.onClick}
            sx={{
              textTransform: "capitalize",
              whiteSpace: "nowrap",
              cursor: item.onClick ? "pointer" : "default",
              color: active ? primary.blue.primary : neutral.black,
              fontWeight: active
                ? theme.typography.fontWeight.bold
                : theme.typography.fontWeight.regular,
            }}
          >
            {item.label}
          </Typography>
        </React.Fragment>
      );
    })}
  </Stack>
);

/** Default export alias of {@link Breadcrumb}. */
export default Breadcrumb;
