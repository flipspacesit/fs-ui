import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
  SxProps,
  Theme,
} from "@mui/material";
import { theme } from "../../theme";
import { shadows } from "../../theme/tokens/shadows";

/** Internal magnifier (leading) icon; `size` px and `color` default to the DS grey-400. */
// Magnifier (leading) icon
const SearchIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 16,
  color = theme.palette.grey[400],
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Internal clear (trailing) "X" icon; `size` px and `color` default to the DS grey-400. */
// Clear (trailing) icon
const ClearIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 16,
  color = theme.palette.grey[400],
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L4 12M4 4L12 12"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Props for {@link SearchInput}; extends MUI `TextFieldProps` (minus its own `onChange`/`value`). */
export interface SearchInputProps
  extends Omit<TextFieldProps, "onChange" | "value"> {
  /** Current search value */
  value?: string;
  /** Callback when search value changes */
  onChange?: (value: string) => void;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Placeholder text */
  placeholder?: string;
  /** Debounce delay in ms */
  debounceMs?: number;
  /** Show clear button */
  showClear?: boolean;
  /** Shape — rounded (pill) or rectangular (radius-xxs). Defaults to round. */
  shape?: "round" | "rectangular";
  /** Add the DS elevation-03 drop shadow */
  elevated?: boolean;
  /** Leading slot — e.g. a scope/country selector (Secondary search variant) */
  leadingSlot?: React.ReactNode;
  /** Custom container styles */
  containerSx?: SxProps<Theme>;
}

// Maps the MUI TextField `size` to an adornment icon px (large 18 / medium 16 / else 14).
const iconSizeFor = (size?: string): number =>
  size === "large" ? 18 : size === "medium" ? 16 : 14;

/**
 * Search input — Figma "Search Components" (902:5684). Defers border/focus to
 * the DS theme (SoftSteel default, SlateBlue focus), pill/square shape, italic
 * placeholder, optional elevation, and an optional leading scope slot.
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value: controlledValue,
  onChange,
  placeholder = "Search...",
  debounceMs = 300,
  showClear = true,
  shape = "round",
  elevated = false,
  leadingSlot,
  size = "small",
  containerSx = {},
  onClear,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue ?? "");
  const [prevControlled, setPrevControlled] = useState(controlledValue);
  const isControlled = controlledValue !== undefined;
  // Sync the display when an external controlled value changes (render-time, not an effect).
  if (isControlled && controlledValue !== prevControlled) {
    setPrevControlled(controlledValue);
    setInternalValue(controlledValue ?? "");
  }
  const value = internalValue;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iconPx = iconSizeFor(size as string);

  const debouncedOnChange = useCallback(
    (newValue: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onChange?.(newValue);
      }, debounceMs);
    },
    [onChange, debounceMs]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    if (debounceMs > 0) {
      debouncedOnChange(newValue);
    } else {
      onChange?.(newValue);
    }
  };

  const handleClear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setInternalValue("");
    onChange?.("");
    onClear?.();
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      size={size}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {leadingSlot ?? <SearchIcon size={iconPx} />}
          </InputAdornment>
        ),
        endAdornment:
          showClear && value ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                edge="end"
                aria-label="clear search"
                disableRipple
              >
                <ClearIcon size={iconPx} />
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
      sx={{
        // Radius wins over the theme's base 4px !important
        "& .MuiOutlinedInput-root": {
          borderRadius: `${shape === "round" ? "100px" : "4px"} !important`,
          backgroundColor: theme.palette.white.main,
          ...(elevated && { boxShadow: shadows.elevation03 }),
        },
        "& input::placeholder": {
          fontStyle: "italic",
          color: theme.palette.grey[400],
          opacity: 1,
        },
        ...containerSx,
      }}
      {...rest}
    />
  );
};

export default SearchInput;
