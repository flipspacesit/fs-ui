import React from "react";
import { Stack, Box, styled, SxProps, Theme } from "@mui/material";
import { neutral, primary } from "../../theme/tokens/colors";
import { theme } from "../../theme";

// Borderless transparent text input filling the pill; italic grey placeholder.
const Field = styled("input")({
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
  fontFamily: "inherit",
  fontSize: 12,
  color: theme.palette.black.main,
  "&::placeholder": { fontStyle: "italic", color: theme.palette.grey[300] },
});

/** Props for {@link PinCommentInput}. */
export interface PinCommentInputProps {
  /** Current comment text (controlled). */
  value: string;
  /** Fired with the new text on every keystroke. */
  onChange: (value: string) => void;
  /** Fired when the send button is clicked or Enter is pressed with non-empty text. */
  onSend?: () => void;
  /** Placeholder shown when the field is empty; defaults to "Add a Comment". */
  placeholder?: string;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Add-a-Comment field — Figma "Pins" (909:7536). Send button turns brand
 * yellow once text is entered.
 */
export const PinCommentInput: React.FC<PinCommentInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder = "Add a Comment",
  sx = {},
}) => {
  const hasText = value.trim().length > 0;
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap="8px"
      sx={{
        backgroundColor: neutral.white,
        border: `1px solid ${neutral.softSteel[200]}`,
        borderRadius: "16px",
        padding: "4px 4px 4px 12px",
        width: 260,
        ...sx,
      }}
    >
      <Field
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && hasText) onSend?.();
        }}
      />
      <Box
        onClick={() => hasText && onSend?.()}
        sx={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: hasText ? "pointer" : "default",
          backgroundColor: hasText ? primary.yellow.brand : neutral.grey[100],
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 13V3M8 3L4 7M8 3L12 7"
            stroke={theme.palette.black.main}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    </Stack>
  );
};

export default PinCommentInput;
