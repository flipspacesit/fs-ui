import {
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
  TextFieldProps,
  InputAdornment,
  SxProps,
  Theme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export type TextInputProps = TextFieldProps & {
  label?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  readOnly?: boolean;
  labelSx?: SxProps<Theme>;
  inputSx?: SxProps<Theme>;
  helperTextSx?: SxProps<Theme>;
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

const StyledFormHelperText = styled(FormHelperText, {
  shouldForwardProp: (prop) => prop !== "error",
})<{ error?: boolean }>(({ theme, error }) => ({
  margin: 0,
  color: error ? theme.palette.error.main : theme.palette.text.secondary,
}));

export const TextInput = ({
  label,
  required,
  fullWidth = true,
  helperText,
  startAdornment,
  endAdornment,
  readOnly = false,
  error,
  labelSx,
  inputSx,
  helperTextSx,
  sx,
  ...props
}: TextInputProps) => {
  return (
    <FormControl fullWidth={fullWidth} sx={sx}>
      {label && (
        <StyledFormLabel required={required} error={error} sx={labelSx}>
          {label}
        </StyledFormLabel>
      )}
      <Stack gap='4px'>
        <TextField
          required={required}
          fullWidth
          error={error}
          {...props}
          sx={inputSx}
          InputProps={{
            readOnly,
            ...props.InputProps,
            startAdornment: startAdornment ? (
              <InputAdornment position='start'>{startAdornment}</InputAdornment>
            ) : null,
            endAdornment: endAdornment ? (
              <InputAdornment position='end'>{endAdornment}</InputAdornment>
            ) : null,
          }}
        />
        {helperText && (
          <StyledFormHelperText error={error} sx={helperTextSx}>
            {helperText}
          </StyledFormHelperText>
        )}
      </Stack>
    </FormControl>
  );
};

export default TextInput;
