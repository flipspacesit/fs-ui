import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, type SxProps, type Theme } from "@mui/material";
import { useSnackbar } from "notistack";
import { t } from "../docTokens";
import { useDocPage, slugify } from "../DocPage";
import CodeBlock from "./CodeBlock";
import { MagnifyingGlass } from "../../../src";

/* ------------------------------------------------------------------ helpers */

/** Render a string, styling `inline code` spans wrapped in backticks. */
const renderInline = (text: string): React.ReactNode => {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith("`") && p.endsWith("`")) {
      return (
        <Box
          key={i}
          component="code"
          className="doc-mono"
          sx={{
            fontSize: 13,
            backgroundColor: t.sunken,
            border: `1px solid ${t.border}`,
            borderRadius: "6px",
            px: "6px",
            py: "2px",
            color: t.accent,
          }}
        >
          {p.slice(1, -1)}
        </Box>
      );
    }
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
};

/* -------------------------------------------------------------- DocSection */

interface DocSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const DocSection: React.FC<DocSectionProps> = ({
  title,
  description,
  children,
}) => {
  const id = slugify(title);
  const { register, unregister } = useDocPage();
  const { enqueueSnackbar } = useSnackbar();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    register({ id, label: title });
    return () => unregister(id);
  }, [id, title, register, unregister]);

  const copyLink = () => {
    const url = `${window.location.href.split("#")[0]}#${id}`;
    navigator.clipboard.writeText(url);
    enqueueSnackbar("Link copied", { variant: "default" });
  };

  return (
    <Box component="section" sx={{ mb: "48px", scrollMarginTop: "88px" }}>
      <Typography
        id={id}
        data-doc-heading
        variant="h2"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          fontSize: 21,
          fontWeight: 600,
          lineHeight: 1.3,
          letterSpacing: "-0.015em",
          color: t.text,
          mb: description ? "8px" : "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {title}
        <Box
          component="button"
          onClick={copyLink}
          aria-label="Copy link to section"
          sx={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: t.textSubtle,
            fontSize: 15,
            opacity: hover ? 1 : 0,
            transition: "opacity 150ms",
            p: 0,
            lineHeight: 1,
            "&:hover": { color: t.accent },
          }}
        >
          #
        </Box>
      </Typography>
      {description && (
        <Typography
          sx={{
            fontSize: 15,
            lineHeight: 1.7,
            color: t.textMuted,
            mb: "20px",
            maxWidth: 720,
          }}
        >
          {renderInline(description)}
        </Typography>
      )}
      {children}
    </Box>
  );
};

/* ---------------------------------------------------- Preview artboard bits */

const LightCaption: React.FC = () => (
  <Box
    className="doc-mono"
    sx={{
      position: "absolute",
      top: 8,
      right: 10,
      fontSize: 10,
      letterSpacing: "0.04em",
      color: t.textSubtle,
      textTransform: "uppercase",
      pointerEvents: "none",
      zIndex: 1,
    }}
  >
    Light theme only
  </Box>
);

/** Shared preview artboard — always light so light-only fs-ui components read true. */
const PreviewSurface: React.FC<{ children: React.ReactNode; pad?: number }> = ({
  children,
  pad = 32,
}) => (
  <Box
    className="doc-no-transition"
    sx={{
      position: "relative",
      backgroundColor: "#ffffff",
      backgroundImage:
        "radial-gradient(#e6e9f2 1px, transparent 1px)",
      backgroundSize: "16px 16px",
      minHeight: 160,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      p: `${pad}px`,
      // Always-light island: re-pin the light-mode text tokens so any MUI
      // heading rendered inside a preview stays dark on the white artboard,
      // even when the surrounding docs are in dark mode.
      "--doc-text": "#1b1c1e",
      "--doc-text-muted": "#616161",
      "--doc-text-subtle": "#919191",
    }}
  >
    <LightCaption />
    {children}
  </Box>
);

/* --------------------------------------------------- ExampleBox (back-compat) */

interface ExampleBoxProps {
  children: React.ReactNode;
}

/** Preview-only shell used by existing pages. Bordered artboard, always light. */
export const ExampleBox: React.FC<ExampleBoxProps> = ({ children }) => (
  <Box
    className="doc-chrome"
    sx={{
      borderRadius: "12px",
      border: `1px solid ${t.borderStrong}`,
      overflow: "hidden",
      boxShadow: t.shadowSm,
      my: "16px",
    }}
  >
    <PreviewSurface>{children}</PreviewSurface>
  </Box>
);

/* --------------------------------------------------------- Example (tabbed) */

interface ExampleProps {
  preview: React.ReactNode;
  code: string;
  language?: string;
}

const ExampleTab: React.FC<{ active: boolean; label: string; onClick: () => void }> = ({
  active,
  label,
  onClick,
}) => (
  <Box
    component="button"
    onClick={onClick}
    sx={{
      position: "relative",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      height: 40,
      px: "14px",
      fontSize: 13,
      fontWeight: active ? 600 : 500,
      color: active ? t.text : t.textMuted,
      "&:hover": { color: t.text },
      "&::after": active
        ? {
            content: '""',
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 0,
            height: 2,
            borderRadius: 2,
            backgroundColor: t.signal,
          }
        : {},
    }}
  >
    {label}
  </Box>
);

export const Example: React.FC<ExampleProps> = ({
  preview,
  code,
  language = "tsx",
}) => {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <Box
      className="doc-chrome"
      sx={{
        borderRadius: "12px",
        border: `1px solid ${t.borderStrong}`,
        overflow: "hidden",
        boxShadow: t.shadowSm,
        backgroundColor: t.surface,
        my: "16px",
      }}
    >
      {/* tab strip */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 40,
          backgroundColor: t.sunken,
          borderBottom: `1px solid ${t.border}`,
          pr: "12px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <ExampleTab active={tab === "preview"} label="Preview" onClick={() => setTab("preview")} />
          <ExampleTab active={tab === "code"} label="Code" onClick={() => setTab("code")} />
        </Box>
        <Box
          className="doc-mono"
          sx={{ fontSize: 10, letterSpacing: "0.04em", color: t.textSubtle, textTransform: "uppercase" }}
        >
          Light theme only
        </Box>
      </Box>

      {tab === "preview" ? (
        <PreviewSurface>{preview}</PreviewSurface>
      ) : (
        <CodeBlock code={code} language={language} embedded />
      )}
    </Box>
  );
};

/* --------------------------------------------------------------- PropsTable */

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropRow[];
}

const TypePills: React.FC<{ type: string }> = ({ type }) => {
  // split unions on top-level " | " (leave function/object types whole)
  const looksUnion = / \| /.test(type) && !/=>|\{/.test(type);
  const pills = looksUnion ? type.split(" | ") : [type];
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
      {pills.map((p, i) => (
        <Box
          key={i}
          component="code"
          className="doc-mono"
          sx={{
            fontSize: 12,
            border: `1px solid ${t.border}`,
            borderRadius: "6px",
            px: "8px",
            py: "2px",
            backgroundColor: t.sunken,
            color: t.pillText,
            maxWidth: "100%",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {p}
        </Box>
      ))}
    </Box>
  );
};

const DefaultChip: React.FC<{ value?: string }> = ({ value }) =>
  value ? (
    <Box
      component="code"
      className="doc-mono"
      sx={{
        fontSize: 12,
        borderRadius: "6px",
        px: "8px",
        py: "2px",
        backgroundColor: t.signalTint,
        color: t.text,
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </Box>
  ) : (
    <Box component="span" sx={{ color: t.textSubtle }}>
      —
    </Box>
  );

const PropName: React.FC<{ row: PropRow }> = ({ row }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
    <Box
      component="code"
      className="doc-mono"
      sx={{ fontSize: 13, fontWeight: row.required ? 600 : 500, color: t.text }}
    >
      {row.name}
      {row.required && <Box component="sup" sx={{ color: t.error }}>*</Box>}
    </Box>
    {row.required && (
      <Box
        sx={{
          fontSize: 10,
          fontWeight: 700,
          borderRadius: "4px",
          px: "5px",
          py: "1px",
          backgroundColor: t.errorBg,
          color: t.error,
        }}
      >
        required
      </Box>
    )}
  </Box>
);

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  const stacked = useMediaQuery("(max-width:720px)");

  if (stacked) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", my: "16px" }}>
        {props.map((row) => (
          <Box
            key={row.name}
            className="doc-chrome"
            sx={{
              borderRadius: "8px",
              backgroundColor: t.sunken,
              border: `1px solid ${t.border}`,
              p: "14px",
            }}
          >
            <PropName row={row} />
            <Box sx={{ mt: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <Row label="Type"><TypePills type={row.type} /></Row>
              <Row label="Default"><DefaultChip value={row.default} /></Row>
              <Box sx={{ fontSize: 14, lineHeight: 1.6, color: t.textMuted }}>
                {renderInline(row.description)}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box
      className="doc-chrome"
      sx={{
        borderRadius: "12px",
        border: `1px solid ${t.borderStrong}`,
        overflow: "hidden",
        boxShadow: t.shadowSm,
        backgroundColor: t.surface,
        my: "16px",
      }}
    >
      <Box sx={{ overflowX: "auto" }}>
        <Box
          component="table"
          sx={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
            "& th": {
              textAlign: "left",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: t.textSubtle,
              backgroundColor: t.sunken,
              p: "10px 16px",
              borderBottom: `1px solid ${t.border}`,
            },
            "& td": {
              p: "12px 16px",
              verticalAlign: "top",
              fontSize: 14,
              borderBottom: `1px solid ${t.border}`,
            },
            "& tbody tr:last-of-type td": { borderBottom: "none" },
            "& tbody tr": {
              position: "relative",
              transition: "background-color 120ms",
            },
            "& tbody tr:nth-of-type(even) td": {
              backgroundColor: "color-mix(in srgb, var(--doc-sunken) 40%, transparent)",
            },
            "& tbody tr:hover td": { backgroundColor: t.accentTint },
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "22%" }}>Prop</th>
              <th style={{ width: "26%" }}>Type</th>
              <th style={{ width: "16%" }}>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((row) => (
              <tr key={row.name}>
                <td><PropName row={row} /></td>
                <td><TypePills type={row.type} /></td>
                <td><DefaultChip value={row.default} /></td>
                <td style={{ color: "var(--doc-text-muted)", lineHeight: 1.6 }}>
                  {renderInline(row.description)}
                </td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>
    </Box>
  );
};

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <Box sx={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
    <Box sx={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: t.textSubtle, width: 56, flexShrink: 0 }}>
      {label}
    </Box>
    <Box sx={{ minWidth: 0 }}>{children}</Box>
  </Box>
);

/* ------------------------------------------------------- DocSearchField */

interface DocSearchFieldProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  sx?: SxProps<Theme>;
}

/** Shared filter input (search glyph + bordered field) used by index pages. */
export const DocSearchField: React.FC<DocSearchFieldProps> = ({
  value,
  onChange,
  placeholder = "Search…",
  sx = {},
}) => (
  <Box
    className="doc-chrome"
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      height: 40,
      px: "12px",
      maxWidth: 320,
      borderRadius: "8px",
      border: `1px solid ${t.border}`,
      backgroundColor: t.sunken,
      ...sx,
    }}
  >
    <MagnifyingGlass size={16} fill="var(--doc-text-subtle)" />
    <Box
      component="input"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      placeholder={placeholder}
      sx={{
        flex: 1,
        border: "none",
        outline: "none",
        background: "transparent",
        fontSize: 14,
        fontFamily: "inherit",
        color: t.text,
        "&::placeholder": { color: t.textSubtle },
      }}
    />
  </Box>
);

export default DocSection;
