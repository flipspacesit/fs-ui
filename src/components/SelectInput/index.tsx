import { ArrowDown2, CheckIcon } from "@/icons";
import {
  FormControl,
  FormLabel,
  Stack,
  Select,
  SelectProps,
  FormHelperText,
  MenuItem,
  Typography,
  InputAdornment,
  Box,
  SxProps,
  Theme,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

export type Option = {
  label: string;
  value: string | number;
};

export type SelectInputProps<T = unknown> = SelectProps<T> & {
  label?: string;
  helperText?: React.ReactNode;
  options?: Option[];
  placeholder?: string;
  showSelectedIcon?: boolean;
  // Style customization props
  labelSx?: SxProps<Theme>;
  helperTextSx?: SxProps<Theme>;
  menuPaperSx?: SxProps<Theme>;
  placeholderSx?: SxProps<Theme>;
};

const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
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
  children,
  options,
  placeholder,
  showSelectedIcon = true,
  startAdornment,
  labelSx,
  helperTextSx,
  menuPaperSx,
  placeholderSx,
  ...props
}: SelectInputProps<T>) => {
  const theme = useTheme();
  return (
    <FormControl fullWidth={fullWidth} sx={sx} error={props.error}>
      {label && (
        <StyledFormLabel required={required} sx={labelSx}>
          {label}
        </StyledFormLabel>
      )}
      <Stack gap='4px'>
        <Select
          startAdornment={
            startAdornment ? (
              <InputAdornment position='start'>{startAdornment}</InputAdornment>
            ) : undefined
          }
          IconComponent={(props) => (
            <Box {...props}>
              <ArrowDown2 />
            </Box>
          )}
          required={required}
          fullWidth
          displayEmpty={!!placeholder}
          sx={{
            paddingLeft: startAdornment ? "10px" : undefined,
            "& .MuiInputAdornment-root": {
              marginRight: "0px",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: [
                () => ({
                  padding: "4px",
                  marginTop: "8px",
                  border: `0.5px solid ${theme.palette.blue[300]}`,
                  borderRadius: "8px",
                  boxShadow: "0 4px 25px 0 rgba(209, 209, 230, 0.60)",
                  maxHeight: "350px",
                  overflowY: "auto",
                  "& .MuiMenuItem-root": {
                    height: "calc(28px * var(--scale))",
                    minHeight: "auto",
                    fontSize: "13px",
                    padding: "6px 8px",
                    borderBottom: `0.5px solid ${theme.palette.border.main}`,
                    color: theme.palette.text.primary,
                    "&:last-child": {
                      borderBottom: "none",
                    },
                    "&:hover": {
                      backgroundColor: theme.palette.blue[200],
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
                  },
                }),
                ...(Array.isArray(menuPaperSx) ? menuPaperSx : [menuPaperSx]),
              ],
            },
            MenuListProps: {
              sx: {
                padding: 0,
              },
            },
          }}
          renderValue={
            options?.length
              ? (selected: any) => {
                  if ((!selected || selected === "") && placeholder) {
                    return (
                      <Typography
                        variant='b1'
                        sx={{
                          color: theme.palette.grey1.main,
                          ...placeholderSx,
                        }}
                      >
                        {placeholder}
                      </Typography>
                    );
                  }
                  const selectedOption = options.find(
                    (opt) => opt.value === selected,
                  );
                  return selectedOption ? selectedOption.label : selected;
                }
              : undefined
          }
          {...props}
        >
          {placeholder && !options?.length && (
            <MenuItem value='' disabled sx={{ display: "none" }}>
              <Typography
                variant='b1'
                sx={{
                  color: theme.palette.grey1.main,
                  ...placeholderSx,
                }}
              >
                {placeholder}
              </Typography>
            </MenuItem>
          )}
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <MenuItemStack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography>{option.label}</Typography>
                {showSelectedIcon && props.value === option.value && (
                  <CheckIcon />
                )}
              </MenuItemStack>
            </MenuItem>
          ))}
          {children}
        </Select>
        {helperText && (
          <StyledFormHelperText sx={helperTextSx}>
            {helperText}
          </StyledFormHelperText>
        )}
      </Stack>
    </FormControl>
  );
};

export default SelectInput;
