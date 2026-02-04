import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language: _language = "tsx" }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ position: "relative", my: 2 }}>
      <Tooltip title={copied ? "Copied!" : "Copy code"}>
        <IconButton
          onClick={handleCopy}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#9CA3AF",
            "&:hover": { color: "#fff" },
          }}
          size="small"
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Box
        component="pre"
        sx={{
          backgroundColor: "#1e1e1e",
          color: "#d4d4d4",
          p: 2,
          borderRadius: 2,
          overflow: "auto",
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        <code>{code}</code>
      </Box>
    </Box>
  );
};

export default CodeBlock;
