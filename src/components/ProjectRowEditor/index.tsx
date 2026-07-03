import React from "react";
import { Box, Stack, Typography, SxProps, Theme } from "@mui/material";
import { primary, neutral } from "../../theme/tokens/colors";
import { shadows } from "../../theme/tokens/shadows";
import { theme } from "../../theme";

/** One field row in the editor grid: a label plus its value/control slot. */
export interface RowEditorField {
  /** Field label shown above the value. */
  label: string;
  /** Value display or an editable control (Dropdown/SelectInput/input) */
  value?: React.ReactNode;
}

/** Props for {@link ProjectRowEditor}. */
export interface ProjectRowEditorProps {
  /** Text shown in the title bar. */
  title: string;
  /** Ordered fields rendered in the grid body. */
  fields: RowEditorField[];
  /** Columns in the field grid */
  columns?: number;
  /** Invoked when the close rail is clicked/keyed; the rail hides when omitted. */
  onClose?: () => void;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Inline project row-editor panel — Figma "Custom UI Elements" (1150:279).
 * SlateBlue title bar + white field grid + a blue close rail. Field values are
 * slots — drop Dropdown/SelectInput/inputs in.
 */
export const ProjectRowEditor: React.FC<ProjectRowEditorProps> = ({
  title,
  fields,
  columns = 2,
  onClose,
  sx = {},
}) => (
  <Box
    sx={{
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0px 8px 20px 0px #d1d1e6",
      width: "fit-content",
      backgroundColor: neutral.white,
      display: "flex",
      ...sx,
    }}
  >
    <Box sx={{ flex: 1 }}>
      <Box
        sx={{
          backgroundColor: primary.slateBlue.primaryDark,
          px: "16px",
          py: "8px",
        }}
      >
        <Typography
          variant="b2"
          sx={{ fontWeight: theme.typography.fontWeight.bold, color: neutral.white }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: neutral.white,
          border: `0.5px solid ${neutral.softSteel[400]}`,
          boxShadow: shadows.elevation03,
          p: "16px",
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(140px, 1fr))`,
          columnGap: "24px",
          rowGap: "16px",
        }}
      >
        {fields.map((f) => (
          <Stack key={f.label} gap="8px">
            <Typography
              variant="b2"
              sx={{
                fontWeight: theme.typography.fontWeight.medium,
                color: primary.blue.primary,
              }}
            >
              {f.label}
            </Typography>
            {typeof f.value === "string" ? (
              <Typography
                variant="b2"
                sx={{
                  fontWeight: theme.typography.fontWeight.medium,
                  color: primary.slateBlue.primaryDark,
                }}
              >
                {f.value}
              </Typography>
            ) : (
              f.value
            )}
          </Stack>
        ))}
      </Box>
    </Box>
    {onClose && (
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
        sx={{
          width: 28,
          flexShrink: 0,
          backgroundColor: primary.blue[100],
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          pt: "8px",
          cursor: "pointer",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke={neutral.ink}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </Box>
    )}
  </Box>
);

export default ProjectRowEditor;
