import React from "react";
import { TextField, TextFieldProps, SxProps, Theme } from "@mui/material";
import { theme } from "../../theme";

/** Props for {@link TextArea}; all MUI `TextField` props except `multiline` (always on), plus row bounds. */
export interface TextAreaProps extends Omit<TextFieldProps, "multiline"> {
  /** Minimum number of visible text rows before the field grows. Defaults to 4. */
  minRows?: number;
  /** Maximum number of visible text rows; beyond this the field scrolls. Unbounded if omitted. */
  maxRows?: number;
  /** MUI `sx` overrides, merged last. */
  sx?: SxProps<Theme>;
}

/**
 * Multiline text area (Text Box / Notes) — Figma "Input Components" (313:386).
 * radius-xxs, SoftSteel border, italic placeholder.
 */
export const TextArea: React.FC<TextAreaProps> = ({
  minRows = 4,
  maxRows,
  sx = {},
  ...props
}) => {
  return (
    <TextField
      multiline
      minRows={minRows}
      maxRows={maxRows}
      sx={{
        "& .MuiInputBase-root": {
          height: "auto !important",
          alignItems: "flex-start",
          padding: "8px 12px !important",
          fontSize: "12px !important",
        },
        "& .MuiInputBase-input::placeholder": {
          fontStyle: "italic",
          color: theme.palette.grey[300],
          opacity: 1,
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default TextArea;
