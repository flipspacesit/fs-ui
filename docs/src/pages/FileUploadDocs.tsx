import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { FileUpload } from "../../../src";

const FileUploadDocs: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        FileUpload
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A file upload component that supports click-to-upload, loading state,
        file type detection with image/PDF previews, and displays uploaded file
        information with remove functionality. Fully customizable via style props.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { FileUpload } from '@flipspacesit/fs-ui';
import type { FileUploadResponse, FileUploadBoxProps } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection title="Basic Usage">
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 500 }}>
            <FileUpload
              onChange={(f) => setFile(f as File)}
              value={file}
              uploadText="Click to upload"
              uploadSubText="PDF, JPG, PNG (max 5MB)"
              accept=".pdf,.jpg,.png"
              onRemove={() => setFile(null)}
            />
            <Typography variant="body2">
              File: {file ? file.name : "None selected"}
            </Typography>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const [file, setFile] = useState<File | null>(null);

<FileUpload
  onChange={(f) => setFile(f as File)}
  value={file}
  uploadText="Click to upload"
  uploadSubText="PDF, JPG, PNG (max 5MB)"
  accept=".pdf,.jpg,.png"
  onRemove={() => setFile(null)}
/>`}
        />
      </DocSection>

      <DocSection title="Custom Upload Text">
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 500 }}>
            <FileUpload
              onChange={() => {}}
              uploadText="Upload Invoice"
              uploadSubText="Only PDF files accepted"
              accept=".pdf"
              required
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<FileUpload
  onChange={handleChange}
  uploadText="Upload Invoice"
  uploadSubText="Only PDF files accepted"
  accept=".pdf"
  required
/>`}
        />
      </DocSection>

      <DocSection title="Error State">
        <ExampleBox>
          <Stack spacing={2} sx={{ maxWidth: 500 }}>
            <FileUpload
              onChange={() => {}}
              uploadText="Upload Document"
              error
              helperText="Document is required"
            />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<FileUpload
  onChange={handleChange}
  uploadText="Upload Document"
  error
  helperText="Document is required"
/>`}
        />
      </DocSection>

      <DocSection title="Disabled & Loading">
        <ExampleBox>
          <Stack spacing={3} sx={{ maxWidth: 500 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Disabled:
              </Typography>
              <FileUpload
                onChange={() => {}}
                uploadText="Upload disabled"
                disabled
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Loading:
              </Typography>
              <FileUpload
                onChange={() => {}}
                uploadText="Uploading..."
                isLoading
              />
            </Box>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`// Disabled
<FileUpload onChange={handleChange} uploadText="Upload disabled" disabled />

// Loading
<FileUpload onChange={handleChange} uploadText="Uploading..." isLoading />`}
        />
      </DocSection>

      <DocSection title="With Hook Integration">
        <CodeBlock
          code={`// FileUpload supports an onFileSelect callback for async upload hooks
import { FileUpload } from '@flipspacesit/fs-ui';

function MyForm() {
  const [file, setFile] = useState(null);

  const handleFileSelect = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await uploadApi(formData);
    return {
      documentUrl: response.url,
      documentName: response.name,
      documentType: response.type,
      documentId: response.id,
      documentSize: response.size,
    };
  };

  return (
    <FileUpload
      onChange={setFile}
      value={file}
      onFileSelect={handleFileSelect}
      uploadText="Upload Document"
      accept=".pdf"
      onRemove={() => setFile(null)}
    />
  );
}`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          props={[
            {
              name: "onChange",
              type: "(file: File | File[] | FileUploadResponse) => void",
              description:
                "Callback when a file is selected or uploaded",
            },
            {
              name: "value",
              type: "File | FileUploadResponse | null",
              description: "Current file value (controlled)",
            },
            {
              name: "accept",
              type: "string",
              description:
                'Accepted file types (e.g. ".pdf,.jpg,.png")',
            },
            {
              name: "uploadText",
              type: "string",
              default: '"Click to upload"',
              description: "Primary text in the upload area",
            },
            {
              name: "uploadSubText",
              type: "string",
              description:
                "Secondary text below the upload text (e.g. file size limits)",
            },
            {
              name: "icon",
              type: "React.ReactNode",
              default: "<Scroll2 size={18} />",
              description: "Custom icon for the upload area",
            },
            {
              name: "isLoading",
              type: "boolean",
              default: "false",
              description: "Shows a loading overlay on the upload area",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables the upload interaction",
            },
            {
              name: "required",
              type: "boolean",
              default: "false",
              description: "Marks the label as required with an asterisk",
            },
            {
              name: "error",
              type: "boolean",
              default: "false",
              description: "Shows error styling on the upload container",
            },
            {
              name: "helperText",
              type: "string",
              description: "Helper or error message below the upload area",
            },
            {
              name: "multiSelect",
              type: "boolean",
              default: "false",
              description: "Allow selecting multiple files",
            },
            {
              name: "uploadedFile",
              type: '{ file?: { name: string; documentUrl?: string; mimeType?: string } } | null',
              description:
                "Pre-populated uploaded file info (overrides value display). Supports file type detection for PDF and image previews.",
            },
            {
              name: "onRemove",
              type: "() => void",
              description:
                "Callback to remove the uploaded file",
            },
            {
              name: "onFileSelect",
              type: "(file: File) => Promise<FileUploadResponse | null>",
              description:
                "Async callback for upload hook integration; resolves with upload response",
            },
            {
              name: "labelSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the upload label text",
            },
            {
              name: "helperTextSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the helper/error text",
            },
            {
              name: "uploadSubTextSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the upload sub text",
            },
            {
              name: "containerSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the upload container",
            },
            {
              name: "uploadedContainerSx",
              type: "SxProps<Theme>",
              description:
                "Custom styles for the uploaded file display container",
            },
            {
              name: "fileNameSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the file name text",
            },
            {
              name: "uploadContentSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the upload content area (icon + text stack)",
            },
            {
              name: "uploadIconContainerSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the upload icon container on the right side",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default FileUploadDocs;
