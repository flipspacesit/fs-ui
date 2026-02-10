import {
  FormControl,
  FormLabel,
  Stack,
  FormHelperText,
  SxProps,
  Theme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import theme from "@/theme";
import { CalendarBlank } from "@/icons";

export type DateInputProps = {
  label?: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  format?: string;
  placeholder?: string;
  // Style customization props
  labelSx?: SxProps<Theme>;
  helperTextSx?: SxProps<Theme>;
  datePickerSx?: SxProps<Theme>;
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

export const DateInput = ({
  label,
  value,
  onChange,
  error,
  helperText,
  required,
  fullWidth = true,
  sx,
  format = "DD/MM/YYYY",
  placeholder,
  labelSx,
  helperTextSx,
  datePickerSx,
}: DateInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl fullWidth={fullWidth} sx={sx} error={error}>
        {label && (
          <StyledFormLabel required={required} sx={labelSx}>
            {label}
          </StyledFormLabel>
        )}
        <Stack gap='4px'>
          <DatePicker
            value={value}
            onChange={onChange}
            format={format}
            enableAccessibleFieldDOMStructure={false}
            slotProps={{
              textField: {
                fullWidth: true,
                error: error,
                size: "medium",
                sx: [
                  {
                    "& .MuiOutlinedInput-root": {
                      paddingRight: "14px",
                    },
                  },
                  ...(Array.isArray(datePickerSx)
                    ? datePickerSx
                    : [datePickerSx]),
                ],
                inputProps: {
                  placeholder: placeholder || format,
                  readOnly: true,
                },
              },
              field: {
                clearable: false,
              },
            }}
            slots={{
              openPickerIcon: () => (
                <CalendarBlank fill={theme.palette.black.main} />
              ),
            }}
          />
          {helperText && (
            <StyledFormHelperText sx={helperTextSx}>
              {helperText}
            </StyledFormHelperText>
          )}
        </Stack>
      </FormControl>
    </LocalizationProvider>
  );
};

export default DateInput;
