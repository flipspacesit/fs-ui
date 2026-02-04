import React, { useState, useRef, useEffect, useCallback } from "react";
import { Popper, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

const AutoCompleteContainer = styled("div")({
  position: "relative",
});

const StyledInput = styled("input")<{ disabled?: boolean }>(({ disabled }) => ({
  fontSize: "12px",
  fontWeight: 500,
  width: "100%",
  padding: "8px 12px",
  margin: "4px",
  boxSizing: "border-box",
  border: "1px solid #CFD3DF",
  outlineColor: "#ffc100",
  borderRadius: "8px",
  ...(disabled && {
    color: "#e5e5e5",
    borderColor: "#CFD3DF",
    cursor: "not-allowed",
  }),
}));

const ErrorText = styled("small")({
  color: "red",
  display: "block",
  marginLeft: "4px",
});

const DropdownContainer = styled("ul")({
  width: "min-content",
  maxWidth: "350px",
  maxHeight: "40vh",
  overflowY: "auto",
  backgroundColor: "white",
  listStyleType: "none",
  padding: 0,
  margin: "4px 0px",
  zIndex: 1,
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  borderRadius: "8px",
});

const DropdownItem = styled("li")<{
  selected?: boolean;
  isLongText?: boolean;
  itemColor?: string;
}>(({ selected, isLongText, itemColor }) => ({
  width: "100%",
  padding: "8px 12px",
  cursor: "pointer",
  backgroundColor: selected ? "rgba(255, 193, 0, 0.15)" : "#fff",
  whiteSpace: isLongText ? "pre-wrap" : "nowrap",
  color: itemColor || "inherit",
  fontSize: "12px",
  "&:hover": {
    backgroundColor: selected ? "rgba(255, 193, 0, 0.2)" : "#f5f5f5",
  },
}));

export interface AutoCompleteProps {
  /** Current value */
  value?: string;
  /** Callback when input changes */
  onInputChange?: (value: string) => void;
  /** Callback when an option is selected */
  onOptionClick?: (option: string, index: number) => void;
  /** List of options */
  options?: string[];
  /** Whether to filter options based on input */
  filterOptions?: boolean;
  /** Whether options are being fetched */
  isFetchingOptions?: boolean;
  /** Error object with message property */
  errors?: { message?: string };
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Allow custom values not in options */
  allowCustomValue?: boolean;
  /** Custom styles for the input */
  inputStyles?: React.CSSProperties;
  /** Custom styles for the dropdown container */
  dropDownContainerStyles?: React.CSSProperties;
  /** Custom styles for dropdown items */
  dropDownItemStyles?: React.CSSProperties;
  /** Color map for options */
  colorsMap?: Record<string, [string]>;
  /** Placeholder text */
  placeholder?: string;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  value = "",
  onInputChange,
  onOptionClick,
  options = [],
  filterOptions = true,
  isFetchingOptions = false,
  errors,
  disabled = false,
  allowCustomValue = false,
  inputStyles = {},
  dropDownContainerStyles = {},
  dropDownItemStyles = {},
  colorsMap,
  placeholder = "Select",
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);
  const autoCompleteRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openDropDown = () => {
    setIsDropdownOpen(true);
    // Update input width when opening dropdown
    if (inputRef.current) {
      setInputWidth(inputRef.current.clientWidth);
    }
  };

  const closeDropDown = () => {
    setIsDropdownOpen(false);
    setAnchorEl(null);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      autoCompleteRef.current &&
      !autoCompleteRef.current.contains(event.target as Node)
    ) {
      closeDropDown();
    }
  }, []);

  const changeFilteredOptions = (newValue: string) => {
    if (filterOptions) {
      const optionsArr: string[] = [];
      options.forEach((option) => {
        if (
          option.toLowerCase().includes(newValue.toLowerCase()) ||
          newValue === ""
        ) {
          optionsArr.push(option);
        }
      });
      setFilteredOptions(optionsArr);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return (
    <AutoCompleteContainer ref={autoCompleteRef}>
      <Tooltip title={inputValue} placement="top">
        <StyledInput
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            const newValue = e.target.value;
            setInputValue(newValue);
            changeFilteredOptions(newValue);
            if (newValue) {
              openDropDown();
            }
            if (allowCustomValue || options.includes(newValue)) {
              onInputChange?.(newValue);
            }
          }}
          onFocus={() => {
            if (!disabled) {
              setAnchorEl(autoCompleteRef.current);
              openDropDown();
            }
          }}
          onBlur={() => {
            if (options.includes(inputValue) || allowCustomValue) {
              onInputChange?.(inputValue);
            } else {
              onInputChange?.(value);
              setInputValue(value);
            }
            if (filterOptions) {
              setFilteredOptions(options);
            }
          }}
          readOnly={disabled}
          disabled={disabled}
          placeholder={placeholder}
          style={inputStyles}
        />
      </Tooltip>
      {errors?.message && <ErrorText>{errors.message}</ErrorText>}

      <Popper
        open={isDropdownOpen && options.length > 0 && !isFetchingOptions}
        anchorEl={anchorEl}
        placement="bottom-start"
        modifiers={[
          {
            name: "flip",
            enabled: true,
            options: {
              rootBoundary: "viewport",
              padding: 43,
            },
          },
          {
            name: "preventOverflow",
            enabled: true,
            options: {
              rootBoundary: "viewport",
              padding: 8,
            },
          },
        ]}
        style={{ zIndex: 9999 }}
      >
        <DropdownContainer
          style={{
            minWidth: inputWidth,
            ...dropDownContainerStyles,
          }}
        >
          {(filterOptions ? filteredOptions : options).map((option, index) => (
            <DropdownItem
              key={`${option}-${index}`}
              selected={option === value}
              isLongText={option.length > 40}
              itemColor={colorsMap?.[option]?.[0]}
              style={dropDownItemStyles}
              onMouseDown={() => {
                closeDropDown();
                setInputValue(option);
                onOptionClick?.(option, index);
              }}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownContainer>
      </Popper>
    </AutoCompleteContainer>
  );
};

export default AutoComplete;
