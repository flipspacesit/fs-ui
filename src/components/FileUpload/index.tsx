import { useRef, ReactNode } from "react";
import {
  Stack,
  Typography,
  CircularProgress,
  Box,
  FormHelperText,
  FormLabel,
  SxProps,
  Theme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Scroll2,
  UploadSimple,
  CheckCircle,
  PdfFile,
  CloseIcon,
} from "@/icons";
import theme from "@/theme";

export interface FileUploadResponse {
  documentUrl: string;
  documentName: string;
  documentType: string;
  documentId: string;
  documentSize: number;
}

export interface FileUploadBoxProps {
  required?: boolean;
  error?: boolean;
  helperText?: string;
  icon?: ReactNode;
  uploadText?: string;
  uploadSubText?: string;
  accept?: string;
  onChange: (file: File | File[] | FileUploadResponse) => void;
  isLoading?: boolean;
  disabled?: boolean;
  value?: File | FileUploadResponse | null;
  fileName?: string;
  multiSelect?: boolean;
  uploadedFile?: { file?: { name: string } } | null;
  onRemove?: () => void;
  onFileSelect?: (file: File) => Promise<FileUploadResponse | null>;
  // Style customization props
  labelSx?: SxProps<Theme>;
  helperTextSx?: SxProps<Theme>;
  uploadSubTextSx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
  uploadedContainerSx?: SxProps<Theme>;
  fileNameSx?: SxProps<Theme>;
  uploadContentSx?: SxProps<Theme>;
  uploadIconContainerSx?: SxProps<Theme>;
}

const UploadContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "error" && prop !== "disabled",
})<{ error?: boolean; disabled?: boolean }>(({ error, disabled }) => ({
  border: error
    ? `0.5px solid ${theme.palette.error.main}`
    : `0.5px solid ${theme.palette.border.main}`,
  borderRadius: "6px",
  overflow: "hidden",
  minHeight: "calc(48px * var(--scale))",
  background: theme.palette.surface[200],
  display: "flex",
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.6 : 1,
}));

const UploadIconContainer = styled(Stack)(() => ({
  height: "100%",
  width: "calc(42px * var(--scale))",
  backgroundColor: theme.palette.purple[50],
  alignItems: "center",
  justifyContent: "center",
}));

const FileInputHidden = styled("input")({
  display: "none",
});

const UploadedDataContainer = styled(Stack)(() => ({
  height: "calc(48px * var(--scale))",
  padding: "0px 12px",
  borderRadius: "6px",
  border: `0.5px solid ${theme.palette.success.main}`,
  background: theme.palette.grey[50],
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

const FileContainer = styled(Stack)(() => ({
  height: "calc(28px * var(--scale))",
  width: "calc(153px * var(--scale))",
  gap: "4px",
  padding: "3px 8px",
  border: `0.5px solid ${theme.palette.purple[200]}`,
  background: theme.palette.common.white,
  borderRadius: "4px",
  flexDirection: "row",
  alignItems: "center",
}));

const ContentStack = styled(Stack)({
  flex: 1,
  height: "100%",
  padding: "8px 12px",
});

const StyledFormLabel = styled(FormLabel)(() => ({
  fontSize: "12px",
  fontWeight: "500",
  color: theme.palette.text.secondary,
  "& .MuiFormLabel-asterisk": {
    color: theme.palette.error.main,
  },
  "&.Mui-focused": {
    color: theme.palette.text.secondary,
  },
}));

const LoadingOverlay = styled(Stack)(() => ({
  height: "100%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: theme.palette.common.white,
  opacity: 0.5,
}));

const StyledFormHelperText = styled(FormHelperText, {
  shouldForwardProp: (prop) => prop !== "error",
})<{ error?: boolean }>(({ error }) => ({
  margin: 0,
  color: error ? theme.palette.error.main : theme.palette.text.secondary,
  marginTop: "4px",
}));

const FileNameTypography = styled(Typography)(() => ({
  flex: 1,
  color: theme.palette.text.secondary,
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
}));

const FileContentStack = styled(Stack)({
  flex: 1,
  overflow: "hidden",
});

const RemoveIconStack = styled(Stack)({
  cursor: "pointer",
});

export const FileUpload = ({
  error,
  helperText,
  icon = <Scroll2 size={18} />,
  uploadText = "Click to upload",
  uploadSubText,
  accept,
  onChange,
  isLoading,
  disabled,
  required,
  multiSelect = false,
  uploadedFile,
  onRemove,
  value,
  onFileSelect,
  labelSx,
  helperTextSx,
  uploadSubTextSx,
  containerSx,
  uploadedContainerSx,
  fileNameSx,
  uploadContentSx,
  uploadIconContainerSx,
}: FileUploadBoxProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert value (File) to uploadedFile format if not explicitly provided
  const displayFile =
    uploadedFile ||
    (value
      ? {
          file: {
            name:
              "documentName" in value
                ? (value as FileUploadResponse).documentName
                : (value as File).name,
          },
        }
      : null);

  const handleUploadClick = () => {
    if (!disabled && !isLoading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (multiSelect) {
        onChange(Array.from(files));
      } else {
        const singleFile = files[0];

        // If onFileSelect is provided (for useFileUpload hook integration)
        if (onFileSelect) {
          const result = await onFileSelect(singleFile);
          if (result) {
            onChange(result);
          }
        } else {
          // Standard file upload without hook
          onChange(singleFile);
        }
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = () => {
    if (onRemove) {
      onRemove();
    } else {
      // If no onRemove callback, call onChange with null to clear the value
      onChange(null as unknown as File);
    }
  };

  return (
    <Stack width='100%'>
      {!displayFile ? (
        <>
          <Stack position='relative'>
            <UploadContainer
              onClick={handleUploadClick}
              error={error}
              disabled={disabled || isLoading}
              sx={containerSx}
            >
              <ContentStack
                gap='4px'
                direction='row'
                alignItems='center'
                sx={uploadContentSx}
              >
                {icon && icon}
                <Stack gap='4px' flex={1}>
                  <StyledFormLabel required={required} sx={labelSx}>
                    {uploadText}
                  </StyledFormLabel>
                  {uploadSubText && (
                    <Typography
                      variant='c1'
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: theme.typography.fontWeight.light,
                        ...uploadSubTextSx,
                      }}
                    >
                      {uploadSubText}
                    </Typography>
                  )}
                </Stack>
              </ContentStack>

              <UploadIconContainer sx={uploadIconContainerSx}>
                <UploadSimple />
              </UploadIconContainer>

              <FileInputHidden
                ref={fileInputRef}
                type='file'
                accept={accept}
                onChange={handleFileInputChange}
                disabled={disabled || isLoading}
                multiple={multiSelect}
              />
            </UploadContainer>

            {isLoading && (
              <LoadingOverlay>
                <CircularProgress size={24} />
              </LoadingOverlay>
            )}
          </Stack>

          {helperText && (
            <StyledFormHelperText error={error} sx={helperTextSx}>
              {helperText}
            </StyledFormHelperText>
          )}
        </>
      ) : (
        <UploadedDataContainer sx={uploadedContainerSx}>
          <Stack flexDirection='row' gap='8px' alignItems='center'>
            <CheckCircle />
            <Typography variant='b2'>{uploadText}</Typography>
          </Stack>
          <FileContainer>
            <FileContentStack direction='row' gap='6px' alignItems='center'>
              <PdfFile />
              <FileNameTypography variant='b1' sx={fileNameSx}>
                {displayFile?.file?.name}
              </FileNameTypography>
            </FileContentStack>
            <RemoveIconStack onClick={handleRemoveFile}>
              <CloseIcon size='12' />
            </RemoveIconStack>
          </FileContainer>
        </UploadedDataContainer>
      )}
    </Stack>
  );
};

export default FileUpload;
