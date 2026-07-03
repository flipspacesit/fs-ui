import React from "react";
import { Box, Stack, SxProps, Theme } from "@mui/material";
import { primary, semantic, misc, neutral } from "../../theme/tokens/colors";

/** The pin actions a comment bubble exposes: edit, move, or delete the pin. */
export type PinAction = "edit" | "move" | "delete";

/** Props for {@link PinCommentBox}. */
export interface PinCommentBoxProps {
  /** Comment body */
  children?: React.ReactNode;
  /** Which action is currently active (colours its button) */
  activeAction?: PinAction | null;
  /** Called when the edit action button is clicked. */
  onEdit?: () => void;
  /** Called when the move action button is clicked. */
  onMove?: () => void;
  /** Called when the delete action button is clicked. */
  onDelete?: () => void;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

// Dark bubble background colour (matches the Figma "Pins" spec).
const DARK = "#2f3238";

// Inline SVG glyph rendered inside each action button, keyed by action.
const ICONS: Record<PinAction, React.ReactNode> = {
  edit: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M11 2.5L13.5 5L5.5 13H3V10.5L11 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  move: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2v12M2 8h12M8 2L6 4M8 2l2 2M8 14l-2-2M8 14l2-2M2 8l2-2M2 8l2 2M14 8l-2-2M14 8l-2 2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  delete: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.5 8h6l.5-8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

// Fill colour applied to the button of the currently active action.
const ACTIVE_BG: Record<PinAction, string> = {
  edit: primary.yellow.brand,
  move: misc.moodyBlue.light,
  delete: semantic.error.primary,
};

/**
 * Dark comment bubble with edit / move / delete actions — Figma "Pins"
 * (909:7536). The active action is colour-filled (edit=yellow, move=blue,
 * delete=red).
 */
export const PinCommentBox: React.FC<PinCommentBoxProps> = ({
  children,
  activeAction = null,
  onEdit,
  onMove,
  onDelete,
  sx = {},
}) => {
  const handlers: Record<PinAction, (() => void) | undefined> = {
    edit: onEdit,
    move: onMove,
    delete: onDelete,
  };
  const order: PinAction[] = ["edit", "move", "delete"];

  return (
    <Box
      sx={{
        backgroundColor: DARK,
        borderRadius: "16px",
        p: "12px",
        width: 240,
        ...sx,
      }}
    >
      <Box
        sx={{ color: neutral.softSteel[200], fontSize: 12, mb: "10px" }}
      >
        {children}
      </Box>
      <Stack direction="row" gap="8px">
        {order.map((a) => {
          const active = activeAction === a;
          return (
            <Box
              key={a}
              onClick={handlers[a]}
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: active
                  ? ACTIVE_BG[a]
                  : "rgba(255, 255, 255, 0.12)",
                color: active
                  ? a === "edit"
                    ? neutral.black
                    : neutral.white
                  : neutral.softSteel[200],
              }}
            >
              {ICONS[a]}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default PinCommentBox;
