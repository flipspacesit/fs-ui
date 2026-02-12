import React, { useState, useRef } from "react";
import {
  FormControl,
  FormLabel,
  Stack,
  SelectProps,
  FormHelperText,
  MenuItem,
  Typography,
  Box,
  SxProps,
  Theme,
  Autocomplete,
  TextField,
  Paper,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "@/theme";
import { ArrowDown2, CheckIcon } from "@/icons";
import SearchInput from "../SearchInput";

export type Option = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
};

export type SelectInputProps<T = unknown> = Omit<
  SelectProps<T>,
  "renderValue"
> & {
  label?: string;
  helperText?: React.ReactNode;
  options?: Option[];
  placeholder?: string;
  showSelectedIcon?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  // Style customization props
  labelSx?: SxProps<Theme>;
  helperTextSx?: SxProps<Theme>;
  menuPaperSx?: SxProps<Theme>;
  menuItemStackSx?: SxProps<Theme>;
  menuItemTypographySx?: SxProps<Theme>;
  inputSx?: SxProps<Theme>;
  menuItemSx?: SxProps<Theme>;
};

const StyledFormLabel = styled(FormLabel)(() => ({
  fontSize: "12px",
  fontWeight: "500",
  color: theme.palette.text.secondary,
  marginBottom: "4px",
  "& .MuiFormLabel-asterisk": {
    color: theme.palette.error.main,
  },
  "&.Mui-focused": {
    color: theme.palette.text.secondary,
  },
}));

const StyledFormHelperText = styled(FormHelperText)({
  margin: 0,
});

const MenuItemStack = styled(Stack)({
  width: "100%",
});

export const SelectInput = <T = unknown,>({
  label,
  helperText,
  required,
  fullWidth = true,
  sx,
  options = [],
  placeholder,
  showSelectedIcon = true,
  size = "medium",
  startAdornment,
  labelSx,
  helperTextSx,
  menuPaperSx,
  menuItemStackSx,
  menuItemTypographySx,
  searchable,
  searchPlaceholder,
  inputSx,
  menuItemSx,
  readOnly = true,
  ...props
}: SelectInputProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchInteractingRef = useRef(false);

  const filteredOptions = searchable
    ? options.filter((option) =>
        option?.label?.toLowerCase()?.includes(searchTerm.toLowerCase()),
      )
    : options;

  const selectedOption =
    options.find((opt) => opt.value === props.value) || null;

  return (
    <FormControl fullWidth={fullWidth} sx={sx} error={props.error}>
      {label && (
        <StyledFormLabel required={required} sx={labelSx}>
          {label}
        </StyledFormLabel>
      )}
      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        options={filteredOptions}
        getOptionLabel={(option) => option.label}
        value={selectedOption}
        onClose={(event, reason) => {
          const target = event?.target as Node | null;
          const relatedTarget = (
            event as unknown as { relatedTarget?: EventTarget | null }
          )?.relatedTarget as Node | null;
          const clickedInsideSearch =
            !!target && !!searchRef.current?.contains(target);
          const focusedInsideSearch =
            !!relatedTarget && !!searchRef.current?.contains(relatedTarget);

          if (
            clickedInsideSearch ||
            focusedInsideSearch ||
            (reason === "blur" && searchInteractingRef.current)
          ) {
            searchInteractingRef.current = false;
            return;
          }

          setOpen(false);
        }}
        onChange={(_, newValue) => {
          if (props.onChange) {
            props.onChange(
              {
                target: { value: newValue?.value ?? "" },
              } as SelectChangeEvent<T>,
              null,
            );
          }
        }}
        popupIcon={
          <Box display='flex' alignItems='center'>
            <ArrowDown2 />
          </Box>
        }
        forcePopupIcon
        renderInput={(params) => (
          <TextField
            {...params}
            size={size}
            autoFocus={false}
            sx={inputSx}
            placeholder={!selectedOption ? placeholder : undefined}
            required={required}
            error={props.error}
            InputProps={{
              ...params.InputProps,
              startAdornment: startAdornment ? (
                <Box display='flex' alignItems='center'>
                  {startAdornment}
                </Box>
              ) : null,
              sx: {
                paddingLeft: startAdornment ? "10px" : undefined,
                cursor: "pointer",
                "& .MuiInputBase-input": {
                  cursor: "pointer",
                  caretColor: "transparent",
                  userSelect: "none",
                },
                "& .MuiAutocomplete-clearIndicator": {
                  display: "none",
                },
              },
              readOnly: readOnly,
            }}
          />
        )}
        renderOption={(propsOption, option) => {
          const { key, ...optionProps } = propsOption;
          return (
            <MenuItem
              key={key}
              {...optionProps}
              sx={{
                height: "calc(28px * var(--scale))",
                minHeight: "auto",
                fontSize: "12px",
                fontWeight: 400,
                padding: "6px",
                borderBottom: `0.5px solid ${theme.palette.border.main}`,
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.white.main,
                "&:last-child": {
                  borderBottom: "none",
                },
                "&:hover": {
                  backgroundColor: theme.palette.white.main,
                },
                "&.Mui-selected": {
                  backgroundColor: `${theme.palette.blue[200]} !important`,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: theme.palette.blue[200],
                  },
                },
                "&.Mui-focusVisible": {
                  backgroundColor: theme.palette.blue[200],
                },
                ...menuItemSx,
              }}
            >
              <MenuItemStack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                sx={menuItemStackSx}
                gap='8px'
              >
                <Stack direction='row' alignItems='center' gap='8px'>
                  {option.icon && (
                    <Box component='span' display='flex' alignItems='center'>
                      {option.icon}
                    </Box>
                  )}
                  <Typography
                    variant='b2'
                    fontWeight={400}
                    sx={menuItemTypographySx}
                  >
                    {option.label}
                  </Typography>
                </Stack>
                {showSelectedIcon && props.value === option.value && (
                  <CheckIcon />
                )}
              </MenuItemStack>
            </MenuItem>
          );
        }}
        PaperComponent={({ children, ...paperProps }) => (
          <Paper
            {...paperProps}
            sx={{
              ...menuPaperSx,
              padding: "4px",
              marginTop: "8px",
              border: `0.5px solid ${theme.palette.blue[300]}`,
              borderRadius: "8px",
              "& .MuiAutocomplete-listbox": {
                padding: 0,
              },
            }}
          >
            {searchable && (
              <Box ref={searchRef} sx={{ marginBottom: "4px" }}>
                <SearchInput
                  autoFocus
                  inputRef={searchInputRef}
                  size='small'
                  value={searchTerm}
                  placeholder={searchPlaceholder || "Search..."}
                  fullWidth
                  debounceMs={0}
                  onChange={(val) => setSearchTerm(val)}
                  onFocus={() => setOpen(true)}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </Box>
            )}
            {!filteredOptions?.length && searchable ? (
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
                p={2}
              >
                <Typography variant='b2' color='text.secondary'>
                  No results found
                </Typography>
              </Stack>
            ) : (
              children
            )}
          </Paper>
        )}
      />
      {helperText && (
        <StyledFormHelperText sx={helperTextSx}>
          {helperText}
        </StyledFormHelperText>
      )}
    </FormControl>
  );
};

export default SelectInput;
