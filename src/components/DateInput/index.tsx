import {
  FormControl,
  FormLabel,
  Stack,
  FormHelperText,
  SxProps,
  Theme,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Dayjs } from 'dayjs'
import theme from '@/theme'
import {
  buttons,
  fontFamily,
  fontSize,
  neutral,
  primary,
  radii,
  semantic,
  shadows,
} from '@/theme/tokens'
import { CalendarBlank } from '@/icons'

export type DateInputProps = DatePickerProps & {
  label?: string
  value: Dayjs | null
  onChange: (value: Dayjs | null) => void
  error?: boolean
  helperText?: string
  required?: boolean
  fullWidth?: boolean
  sx?: SxProps<Theme>
  format?: string
  placeholder?: string
  // Style customization props
  labelSx?: SxProps<Theme>
  helperTextSx?: SxProps<Theme>
  datePickerSx?: SxProps<Theme>
}

const StyledFormLabel = styled(FormLabel)(() => ({
  fontFamily,
  fontSize: '12px',
  fontWeight: '500',
  color: theme.palette.text.secondary,
  marginBottom: '4px',
  '& .MuiFormLabel-asterisk': {
    color: theme.palette.error.main,
  },
  '&.Mui-focused': {
    color: theme.palette.text.secondary,
  },
}))

const StyledFormHelperText = styled(FormHelperText)({
  margin: 0,
  '&.Mui-error': {
    color: semantic.error.primary,
  },
})

// The DatePicker subtree below runs on the @mui/x-date-pickers build bundled
// into fs-ui's dist (deliberately not externalized — consumers may ship an
// incompatible major), so it resolves its own MUI theme context: component
// overrides from the consuming app's theme — and even fs-ui's exported theme —
// never reach it. All design-system styling must therefore be inlined here.
// The values mirror the MuiTextField / MuiPickers* overrides in @/theme; keep
// the two in sync when the DS changes.
const dsTextFieldSx = {
  '& .MuiInputBase-root': {
    fontFamily,
    borderRadius: '4px',
    fontSize: `${fontSize.b1}px`,
    fontWeight: 600,
    color: theme.palette.text.primary,
    height: 'calc(28px * var(--scale, 1))',
    '&.MuiInputBase-adornedEnd': {
      paddingRight: '10px',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '4px 10px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.border.main,
    borderWidth: '0.5px',
  },
  '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: primary.slateBlue[400],
    boxShadow: shadows.elevation03,
  },
  '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: primary.slateBlue[400],
    borderWidth: '0.5px',
  },
  '& .MuiInputBase-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: semantic.error[300],
  },
  '& .MuiInputBase-root.Mui-disabled': {
    backgroundColor: neutral.grey[50],
    color: neutral.grey[300],
    cursor: 'not-allowed',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.border.main,
    },
  },
}

const dsCalendarHeaderSx = {
  backgroundColor: buttons.tertiary,
  borderRadius: `${radii.xxs}px`,
  minHeight: 'auto',
  paddingLeft: '12px',
  paddingRight: '4px',
  marginTop: '8px',
  marginBottom: '8px',
  '& .MuiPickersCalendarHeader-label': {
    fontFamily,
    fontSize: `${fontSize.b2}px`,
    fontWeight: 600,
  },
}

const dsDaySx = {
  fontFamily,
  fontSize: `${fontSize.b2}px`,
  fontWeight: 500,
  color: theme.palette.black.main,
  // !important: the bundled ButtonBase's `border-radius: 0` and this rule sit
  // in different style sheets (two style engines), so cascade order between
  // them is unstable across consumers — pin the DS circle unconditionally.
  borderRadius: '50% !important',
  '&.MuiPickersDay-dayOutsideMonth': {
    color: neutral.grey[400],
    fontWeight: 400,
  },
  '&.Mui-selected': {
    backgroundColor: `${primary.yellow.brand} !important`,
    color: `${theme.palette.black.main} !important`,
    fontWeight: 600,
  },
  '&.Mui-selected:hover': {
    backgroundColor: `${primary.yellow.hover} !important`,
  },
  '&.MuiPickersDay-today': {
    borderColor: primary.blue.primary,
  },
}

const dsDesktopPaperSx = {
  fontFamily,
  '& .MuiDayCalendar-weekDayLabel': {
    fontFamily,
    color: primary.blue.primary,
    fontWeight: 600,
    fontSize: `${fontSize.b2}px`,
  },
  '& .MuiPickersYear-yearButton, & .MuiPickersMonth-monthButton, & button': {
    fontFamily,
  },
}

export const DateInput = ({
  label,
  value,
  onChange,
  error,
  helperText,
  required,
  fullWidth = true,
  sx,
  format = 'DD/MM/YYYY',
  placeholder,
  labelSx,
  helperTextSx,
  datePickerSx,
  ...props
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
            {...props}
            slotProps={{
              textField: {
                fullWidth: true,
                error: error,
                size: 'medium',
                sx: [
                  dsTextFieldSx,
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
              calendarHeader: {
                sx: dsCalendarHeaderSx,
              },
              day: {
                sx: dsDaySx,
              },
              desktopPaper: {
                sx: dsDesktopPaperSx,
              },
              // Open below the field by default (matches the DS Dropdown popover)
              // so the calendar doesn't flip up over adjacent content in tall
              // layouts / near the viewport bottom.
              popper: {
                placement: 'bottom-start',
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
  )
}

export default DateInput
