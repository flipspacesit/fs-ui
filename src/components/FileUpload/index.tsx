import { useEffect, useMemo, useRef, useState, ReactNode } from "react";
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
  FileText,
  CloseIcon,
} from "@/icons";
import theme from "@/theme";
import type { DataTestIdProps } from "../../constants";

export interface FileUploadResponse {
  documentUrl: string;
  documentName: string;
  documentType: string;
  documentId: string;
  documentSize: number;
}

/**
 * Props for {@link FileUpload}. `data-testid` lands on the outer wrapper (the
 * dropzone and the uploaded-file card swap places inside it); the hidden file
 * input gets `{data-testid}-input` — the one to use with Playwright's
 * `setInputFiles` — and the remove button `{data-testid}-remove`.
 */
export interface FileUploadBoxProps extends DataTestIdProps {
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
  multiSelect?: boolean;
  uploadedFile?: {
    file?: {
      name: string;
      documentUrl?: string;
      mimeType?: string;
    };
  } | null;
  onRemove?: () => void;
  onFileSelect?: (file: File) => Promise<FileUploadResponse | null>;
  /**
   * Opt out of drag-and-drop; the dropzone then only responds to clicks.
   * Drag-and-drop is on by default.
   */
  disableDragDrop?: boolean;
  /**
   * Called when every dragged file is filtered out by `accept`, with the
   * rejected files. Nothing is uploaded in that case.
   */
  onDropRejected?: (files: File[]) => void;
  /**
   * Replaces `uploadText` while files are dragged over the dropzone. Left
   * undefined the text does not change — the highlight is the only cue.
   */
  dragActiveText?: string;
  // Style customization props
  labelSx?: SxProps<Theme>;
  helperTextSx?: SxProps<Theme>;
  uploadSubTextSx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
  uploadedContainerSx?: SxProps<Theme>;
  fileNameSx?: SxProps<Theme>;
  uploadContentSx?: SxProps<Theme>;
  uploadIconContainerSx?: SxProps<Theme>;
  dragActiveSx?: SxProps<Theme>;
}

const getBorderColor = (error?: boolean, dragActive?: boolean) => {
  if (dragActive) {
    return theme.palette.purple.main;
  }

  return error ? theme.palette.error.main : theme.palette.border.main;
};

const UploadContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "error" && prop !== "disabled" && prop !== "dragActive",
})<{ error?: boolean; disabled?: boolean; dragActive?: boolean }>(
  ({ error, disabled, dragActive }) => ({
    border: `${dragActive ? "1px dashed" : "0.5px solid"} ${getBorderColor(
      error,
      dragActive,
    )}`,
    borderRadius: "6px",
    overflow: "hidden",
    minHeight: "calc(48px * var(--scale))",
    background: dragActive
      ? theme.palette.purple[50]
      : theme.palette.surface[200],
    display: "flex",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    transition: "background 120ms ease, border-color 120ms ease",
  }),
);

const UploadIconContainer = styled(Stack)(() => ({
  // `alignSelf: stretch` fills the flex container's full height. `height: 100%`
  // does not work here — the container only sets `minHeight` (no definite
  // height), so the percentage collapses to content height and the icon pins to
  // the top instead of centering.
  alignSelf: "stretch",
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

const FilePreviewImage = styled("img")({
  width: "21px",
  height: "21px",
  objectFit: "cover",
  borderRadius: "2px",
  flexShrink: 0,
});

type FileTypeMeta = {
  mimeType?: string;
  mediaType?: string;
  fileType?: string;
  documentType?: string;
  documentName?: string;
  name?: string;
  documentUrl?: string;
};

const IMAGE_EXTENSIONS = new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "svg",
  "webp",
  "bmp",
  "tif",
  "tiff",
  "avif",
]);

const getFileExtension = (value?: string) => {
  if (!value) {
    return "";
  }

  const cleanedValue = value.split("?")[0].split("#")[0];
  const extension = cleanedValue.split(".").pop()?.toLowerCase() || "";
  return extension === cleanedValue.toLowerCase() ? "" : extension;
};

/**
 * Mirrors the browser's own `accept` filtering for dropped files — the file
 * input enforces `accept` on click-to-upload, but a drop bypasses it entirely.
 * Handles extensions (`.pdf`), exact mime types (`application/pdf`) and mime
 * wildcards (`image/*`).
 */
const getIsFileAccepted = (file: File, accept?: string) => {
  const tokens = (accept || "")
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);

  if (!tokens.length) {
    return true;
  }

  const fileName = file.name.toLowerCase();
  const mimeType = file.type.toLowerCase();

  return tokens.some((token) => {
    if (token.startsWith(".")) {
      return fileName.endsWith(token);
    }

    if (token.endsWith("/*")) {
      return mimeType.startsWith(`${token.slice(0, -1)}`);
    }

    return mimeType === token;
  });
};

const getIsPdfFileType = (file?: FileTypeMeta | null) => {
  const extensions = [
    getFileExtension(file?.name),
    getFileExtension(file?.documentName),
    getFileExtension(file?.fileType),
    getFileExtension(file?.documentType),
    getFileExtension(file?.documentUrl),
  ];

  if (extensions.includes("pdf")) {
    return true;
  }

  const values = [
    file?.mimeType?.toLowerCase(),
    file?.mediaType?.toLowerCase(),
    file?.fileType?.toLowerCase(),
    file?.documentType?.toLowerCase(),
  ].filter(Boolean) as string[];

  return (
    values.includes("pdf") ||
    values.includes("application/pdf") ||
    values.some((value) => value.endsWith("/pdf"))
  );
};

const getIsImageFileType = (file?: FileTypeMeta | null) => {
  const allowedTypes = [
    "gif",
    "svg+xml",
    "svg",
    "jpeg",
    "png",
    "webp",
    "jpg",
    "bmp",
    "tif",
    "tiff",
    "avif",
  ];

  const extensions = [
    getFileExtension(file?.name),
    getFileExtension(file?.documentName),
    getFileExtension(file?.fileType),
    getFileExtension(file?.documentType),
    getFileExtension(file?.documentUrl),
  ];

  if (extensions.some((ext) => IMAGE_EXTENSIONS.has(ext))) {
    return true;
  }

  const values = [
    file?.mimeType?.toLowerCase(),
    file?.mediaType?.toLowerCase(),
    file?.fileType?.toLowerCase(),
    file?.documentType?.toLowerCase(),
  ].filter(Boolean) as string[];

  const isHeic =
    values.some((value) => value.includes("heic")) ||
    values.some((value) => value.includes("heif"));

  if (isHeic) {
    return false;
  }

  return (
    values.some((value) => value.startsWith("image/")) ||
    allowedTypes.some((allowed) =>
      values.some((value) => value.includes(allowed)),
    )
  );
};

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
  disableDragDrop = false,
  onDropRejected,
  dragActiveText,
  labelSx,
  helperTextSx,
  uploadSubTextSx,
  containerSx,
  uploadedContainerSx,
  fileNameSx,
  uploadContentSx,
  uploadIconContainerSx,
  dragActiveSx,
  "data-testid": dataTestId,
}: FileUploadBoxProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  // dragenter/dragleave also fire for every child element the pointer crosses,
  // so a plain boolean flickers. Counting enters minus leaves is what keeps the
  // highlight stable while the pointer moves over the icon/label inside.
  const dragDepthRef = useRef(0);

  const localFilePreviewUrl = useMemo(() => {
    if (uploadedFile?.file || !(value instanceof File)) {
      return undefined;
    }

    return URL.createObjectURL(value);
  }, [uploadedFile?.file, value]);

  useEffect(() => {
    return () => {
      if (localFilePreviewUrl) {
        URL.revokeObjectURL(localFilePreviewUrl);
      }
    };
  }, [localFilePreviewUrl]);

  const displayFile = useMemo(() => {
    const valueData = (() => {
      if (!value) {
        return null;
      }

      if (value instanceof File) {
        return {
          name: value.name,
          documentUrl: localFilePreviewUrl,
          mimeType: value.type,
          mediaType: value.type,
          fileType: value.name,
          documentType: value.type,
        };
      }

      return {
        name: value.documentName,
        documentUrl: value.documentUrl,
        // Map documentType to multiple fields to ensure type detection works
        // whether it's a mime type or extension
        mimeType: value.documentType,
        mediaType: value.documentType,
        fileType: value.documentType || value.documentName,
        documentType: value.documentType,
      };
    })();

    if (uploadedFile?.file) {
      const { file } = uploadedFile;
      const mimeType = file.mimeType || valueData?.mimeType;

      return {
        name: file.name || valueData?.name || "",
        documentUrl: file.documentUrl || valueData?.documentUrl,
        mimeType,
        mediaType: mimeType || valueData?.mediaType,
        fileType: mimeType || file.name || valueData?.fileType,
        documentType: mimeType || valueData?.documentType,
      };
    }

    return valueData;
  }, [uploadedFile, value, localFilePreviewUrl]);

  const filePreviewType = useMemo(() => {
    switch (true) {
      case getIsImageFileType(displayFile):
        return "image";
      case getIsPdfFileType(displayFile):
        return "pdf";
      default:
        return "doc";
    }
  }, [displayFile]);

  const handleUploadClick = () => {
    if (!disabled && !isLoading) {
      fileInputRef.current?.click();
    }
  };

  const processFiles = async (files: File[]) => {
    if (!files.length) {
      return;
    }

    if (multiSelect) {
      onChange(files);
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
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await processFiles(Array.from(files));

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const isDropDisabled = disableDragDrop || disabled || isLoading;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (isDropDisabled) {
      return;
    }

    // Both dragover and dragenter must be prevented, otherwise the browser
    // treats the element as a non-drop target and opens the file instead.
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "copy";
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (isDropDisabled) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current += 1;
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (isDropDisabled) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) {
      setIsDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    if (isDropDisabled) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current = 0;
    setIsDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer?.files || []);
    if (!droppedFiles.length) {
      return;
    }

    const acceptedFiles = droppedFiles.filter((file) =>
      getIsFileAccepted(file, accept),
    );

    if (!acceptedFiles.length) {
      onDropRejected?.(droppedFiles);
      return;
    }

    await processFiles(multiSelect ? acceptedFiles : [acceptedFiles[0]]);
  };

  const handleRemoveFile = () => {
    if (onRemove) {
      onRemove();
    } else {
      // If no onRemove callback, call onChange with null to clear the value
      onChange(null as unknown as File);
    }
  };

  const renderFilePreview = () => {
    switch (filePreviewType) {
      case "pdf":
        return <PdfFile />;
      case "image":
        return displayFile?.documentUrl ? (
          <FilePreviewImage
            src={displayFile.documentUrl}
            alt={displayFile.name}
          />
        ) : (
          <FileText size={21} />
        );
      default:
        return <FileText size={21} />;
    }
  };

  return (
    <Stack width="100%" data-testid={dataTestId}>
      {!displayFile ? (
        <>
          <Stack position="relative">
            <UploadContainer
              onClick={handleUploadClick}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              error={error}
              disabled={disabled || isLoading}
              dragActive={isDragActive}
              sx={[
                ...(Array.isArray(containerSx) ? containerSx : [containerSx]),
                ...(isDragActive
                  ? Array.isArray(dragActiveSx)
                    ? dragActiveSx
                    : [dragActiveSx]
                  : []),
              ]}
            >
              <ContentStack
                gap="4px"
                direction="row"
                alignItems="center"
                sx={uploadContentSx}
              >
                {icon && icon}
                <Stack gap="4px" flex={1}>
                  <StyledFormLabel required={required} sx={labelSx}>
                    {isDragActive && dragActiveText
                      ? dragActiveText
                      : uploadText}
                  </StyledFormLabel>
                  {uploadSubText && (
                    <Typography
                      variant="c1"
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
                data-testid={dataTestId ? `${dataTestId}-input` : undefined}
                type="file"
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
          <Stack flexDirection="row" gap="8px" alignItems="center">
            <CheckCircle />
            <Typography variant="b2">{uploadText}</Typography>
          </Stack>
          <FileContainer>
            <FileContentStack direction="row" gap="6px" alignItems="center">
              {renderFilePreview()}
              <FileNameTypography variant="b1" sx={fileNameSx}>
                {displayFile?.name}
              </FileNameTypography>
            </FileContentStack>
            <RemoveIconStack
              onClick={handleRemoveFile}
              data-testid={dataTestId ? `${dataTestId}-remove` : undefined}
            >
              <CloseIcon size="12" />
            </RemoveIconStack>
          </FileContainer>
        </UploadedDataContainer>
      )}
    </Stack>
  );
};

export default FileUpload;
