import React from "react";
import {
  Drawer,
  Box,
  Stack,
  Typography,
  Divider,
  SxProps,
  Theme,
} from "@mui/material";
import { neutral, primary } from "../../theme/tokens/colors";
import { theme } from "../../theme";

/** A single tab in the {@link SideModal} tabbed header (Type 3). */
export interface SideModalTab {
  /** Visible tab label. */
  label: string;
  /** Unique tab identifier, matched against `activeTab`. */
  value: string;
}

/** Props for the {@link SideModal} right-docked drawer component. */
export interface SideModalProps {
  /** Whether the drawer is open. */
  open: boolean;
  /** Called when the drawer requests to close (backdrop click, Esc, or the close button). */
  onClose: () => void;
  /** Header title text. */
  title?: string;
  /** Body content */
  children: React.ReactNode;
  /** Footer actions (right-aligned) */
  footer?: React.ReactNode;
  /** Optional tabbed header (Type 3) */
  tabs?: SideModalTab[];
  /** `value` of the currently active tab. */
  activeTab?: string;
  /** Called with the selected tab's `value` when a tab is clicked. */
  onTabChange?: (value: string) => void;
  /** Drawer width in pixels (capped at `100vw`); defaults to `420`. */
  width?: number;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Inline 16x16 "X" close-icon glyph used in the header.
const CloseX: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M12 4L4 12M4 4l8 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Right-docked side modal / drawer — Figma "Modals, Popups" (465:793) Type 2/3.
 * Header + optional slate-blue tabs + scrollable body + footer actions.
 */
export const SideModal: React.FC<SideModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  tabs,
  activeTab,
  onTabChange,
  width = 420,
  sx = {},
}) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    PaperProps={{ sx: { width, maxWidth: "100vw", ...sx } }}
  >
    <Stack sx={{ height: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: "12px 16px", borderBottom: `1px solid ${neutral.softSteel[200]}` }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: theme.typography.fontWeight.medium, color: neutral.ink }}
        >
          {title}
        </Typography>
        <Box
          onClick={onClose}
          role="button"
          tabIndex={0}
          aria-label="Close"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClose();
            }
          }}
          sx={{ cursor: "pointer", display: "flex", color: neutral.ink }}
        >
          <CloseX />
        </Box>
      </Stack>

      {tabs && tabs.length > 0 && (
        <Stack
          direction="row"
          sx={{ borderBottom: `1px solid ${neutral.softSteel[200]}` }}
        >
          {tabs.map((t) => {
            const active = t.value === activeTab;
            return (
              <Box
                key={t.value}
                onClick={() => onTabChange?.(t.value)}
                sx={{
                  px: "16px",
                  py: "8px",
                  cursor: "pointer",
                  backgroundColor: active
                    ? primary.slateBlue.primary
                    : "transparent",
                }}
              >
                <Typography
                  variant="b2"
                  sx={{
                    fontWeight: theme.typography.fontWeight.medium,
                    color: active ? neutral.white : neutral.ink,
                  }}
                >
                  {t.label}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      )}

      <Box sx={{ flex: 1, overflow: "auto", p: "16px" }}>{children}</Box>

      {footer && (
        <>
          <Divider sx={{ borderColor: neutral.softSteel[200] }} />
          <Box
            sx={{
              p: "12px 16px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            {footer}
          </Box>
        </>
      )}
    </Stack>
  </Drawer>
);

export default SideModal;
