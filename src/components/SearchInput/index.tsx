import React, { useState, useCallback } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
  SxProps,
  Theme,
} from "@mui/material";

// Search Icon Component
const SearchIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = "#6B7280",
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

// Clear Icon Component
const ClearIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 16,
  color = "#6B7280",
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

export interface SearchInputProps
  extends Omit<TextFieldProps, "onChange" | "value"> {
  /** Current search value */
  value?: string;
  /** Callback when search value changes */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Debounce delay in ms */
  debounceMs?: number;
  /** Show clear button */
  showClear?: boolean;
  /** Custom container styles */
  containerSx?: SxProps<Theme>;
}

/**
 * Search input with optional debouncing and clear functionality
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value: controlledValue,
  onChange,
  placeholder = "Search...",
  debounceMs = 300,
  showClear = true,
  containerSx = {},
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const debouncedOnChange = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (newValue: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onChange?.(newValue);
        }, debounceMs);
      };
    })(),
    [onChange, debounceMs]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (debounceMs > 0) {
      debouncedOnChange(newValue);
    } else {
      onChange?.(newValue);
    }
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue("");
    }
    onChange?.("");
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: showClear && value ? (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={handleClear}
              edge="end"
              aria-label="clear search"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          "& fieldset": {
            borderColor: "#AEB6CE",
          },
          "&:hover fieldset": {
            borderColor: "#3361FF",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#3361FF",
            borderWidth: "1px",
          },
        },
        "& .MuiInputBase-input": {
          padding: "8px 0",
          fontSize: "14px",
        },
        ...containerSx,
      }}
      {...rest}
    />
  );
};

/**
 * Hook for managing search input state with debouncing
 */
export const useSearchInput = (initialValue = "", debounceMs = 300) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, debounceMs]);

  const clear = useCallback(() => {
    setValue("");
    setDebouncedValue("");
  }, []);

  return {
    value,
    debouncedValue,
    setValue,
    clear,
  };
};

export default SearchInput;
