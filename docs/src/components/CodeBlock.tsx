import React, { useState } from "react";
import { Box } from "@mui/material";
import { Highlight, type PrismTheme } from "prism-react-renderer";
import { MONO } from "../docTokens";
import { useCopy } from "../useCopy";

interface CodeBlockProps {
  code: string;
  language?: string;
  /** Show a line-number gutter. */
  showLineNumbers?: boolean;
  /** Render without the outer border/radius (mounted inside an Example). */
  embedded?: boolean;
}

/** Prism theme mapped to the fs-ui slate/signal palette (always-dark well). */
const fsuiTheme: PrismTheme = {
  plain: { color: "#f1f7ff", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#6f84a8", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#a5bad5" } },
    { types: ["keyword", "control", "directive", "module", "important"], style: { color: "#96aff5" } },
    { types: ["string", "char", "attr-value", "template-string", "regex"], style: { color: "#ffd84d" } },
    { types: ["function", "method", "function-variable"], style: { color: "#c3e8ca" } },
    { types: ["class-name", "maybe-class-name"], style: { color: "#c3e8ca" } },
    { types: ["tag"], style: { color: "#a5bad5" } },
    { types: ["attr-name", "property"], style: { color: "#dee7ff" } },
    { types: ["number", "boolean", "constant", "symbol"], style: { color: "#f7c352" } },
    { types: ["operator", "entity", "url"], style: { color: "#a5bad5" } },
    { types: ["builtin"], style: { color: "#c3e8ca" } },
    { types: ["variable"], style: { color: "#f1f7ff" } },
  ],
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "tsx",
  showLineNumbers = false,
  embedded = false,
}) => {
  const { copied, copy } = useCopy();
  const [expanded, setExpanded] = useState(false);
  const trimmed = code.replace(/\n$/, "");
  const lines = trimmed.split("\n");
  const collapsible = lines.length > 18 && !expanded;

  const handleCopy = () => copy(trimmed);

  return (
    <Box
      className="doc-no-transition"
      sx={{
        borderRadius: embedded ? 0 : "12px",
        border: embedded ? "none" : "1px solid var(--doc-border)",
        overflow: "hidden",
        my: embedded ? 0 : "20px",
        backgroundColor: "var(--doc-code-bg)",
      }}
    >
      {/* header bar */}
      <Box
        sx={{
          height: 38,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "12px",
          backgroundColor: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Box
          className="doc-mono"
          sx={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "#96aff5",
            backgroundColor: "rgba(255,255,255,0.06)",
            borderRadius: "6px",
            px: "8px",
            py: "3px",
          }}
        >
          {language.toUpperCase()}
        </Box>
        <Box
          component="button"
          onClick={handleCopy}
          className="doc-mono"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            color: copied ? "#ffc100" : "#6f84a8",
            transition: "color 150ms",
            "&:hover": { color: copied ? "#ffc100" : "#a5bad5" },
          }}
          aria-label="Copy code"
        >
          {copied ? "Copied ✓" : "Copy"}
        </Box>
      </Box>

      {/* code body */}
      <Box sx={{ position: "relative" }}>
        <Highlight theme={fsuiTheme} code={trimmed} language={language}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <Box
              component="pre"
              sx={{
                m: 0,
                p: "16px 20px",
                overflowX: "auto",
                fontFamily: MONO,
                fontSize: 13.5,
                lineHeight: 1.65,
                maxHeight: collapsible
                  ? "calc(18 * 1.65 * 13.5px + 32px)"
                  : "none",
                overflowY: "hidden",
              }}
            >
              {tokens.map((line, i) => {
                const lp = getLineProps({ line });
                return (
                  <div key={i} {...lp} style={{ ...lp.style, display: "flex" }}>
                    {showLineNumbers && (
                      <span
                        style={{
                          width: 28,
                          flexShrink: 0,
                          color: "#465177",
                          userSelect: "none",
                          textAlign: "right",
                          marginRight: 16,
                        }}
                      >
                        {i + 1}
                      </span>
                    )}
                    <span style={{ flex: 1 }}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </Box>
          )}
        </Highlight>

        {collapsible && (
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 72,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              pb: "12px",
              background:
                "linear-gradient(to bottom, rgba(10,17,46,0), var(--doc-code-bg))",
            }}
          >
            <Box
              component="button"
              onClick={() => setExpanded(true)}
              className="doc-mono"
              sx={{
                cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.06)",
                color: "#a5bad5",
                borderRadius: "8px",
                px: "12px",
                py: "5px",
                fontSize: 12,
                fontWeight: 600,
                "&:hover": { background: "rgba(255,255,255,0.1)" },
              }}
            >
              Expand code ({lines.length} lines)
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CodeBlock;
