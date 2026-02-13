import React, { useState } from "react";
import { Box, Typography, Stack, Paper, TextField, InputAdornment } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import {
  AirplaneTilt,
  ArrowDown,
  ArrowDown2,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bank,
  Building,
  CalendarBlank,
  Cardholder,
  CheckIcon,
  CheckCircle,
  CheckCircle2,
  CheckSquareOffset,
  CloseIcon,
  CreditCard,
  CurrencyInr,
  CurrencyInr2,
  Download,
  ErrorIcon,
  FileText,
  FloppyDisk,
  IdentificationCard,
  Info,
  MagnifyingGlass,
  MapPin,
  MinusCircle,
  NoDataIcon,
  PaperPlaneTilt,
  PdfFile,
  PencilSimpleLine,
  Phone,
  Repeat,
  Scroll,
  Scroll2,
  ShoppingCart,
  Storefront,
  Subtitles,
  Success,
  Trash,
  Trash2,
  TrayArrowUp,
  UploadSimple,
  UserCircle,
  VendorIcon,
  Warning,
  Warning2,
} from "../../../src";

interface IconItem {
  name: string;
  component: React.FC<{ size?: number | string; fill?: string; color?: string }>;
  description: string;
  category: "Navigation" | "Status" | "Actions" | "Finance" | "Documents" | "Misc";
  /** Override fill color for display (for icons with white default) */
  displayFill?: string;
  /** Note about the icon's default color */
  defaultNote?: string;
}

const IconsDocs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const icons: IconItem[] = [
    // Navigation
    { name: "ArrowDown", component: ArrowDown, description: "Downward arrow", category: "Navigation" },
    { name: "ArrowDown2", component: ArrowDown2 as React.FC<{ size?: number | string; fill?: string; color?: string }>, description: "Downward chevron arrow", category: "Navigation" },
    { name: "ArrowLeft", component: ArrowLeft, description: "Left arrow", category: "Navigation" },
    { name: "ArrowRight", component: ArrowRight, description: "Right arrow", category: "Navigation" },
    { name: "ArrowUp", component: ArrowUp, description: "Upward arrow", category: "Navigation" },

    // Status
    { name: "CheckIcon", component: CheckIcon, description: "Checkmark", category: "Status" },
    { name: "CheckCircle", component: CheckCircle, description: "Success check in circle", category: "Status" },
    { name: "CheckCircle2", component: CheckCircle2, description: "Check in circle (outline)", category: "Status" },
    { name: "CheckSquareOffset", component: CheckSquareOffset, description: "Check with square offset", category: "Status" },
    { name: "CloseIcon", component: CloseIcon, description: "Close/X icon", category: "Status" },
    { name: "ErrorIcon", component: ErrorIcon, description: "Error indicator", category: "Status", displayFill: "#EF4444", defaultNote: "Default: white (for dark backgrounds)" },
    { name: "Info", component: Info, description: "Information icon", category: "Status" },
    { name: "Success", component: Success, description: "Double checkmark", category: "Status", displayFill: "#10B981", defaultNote: "Default: white (for dark backgrounds)" },
    { name: "Warning", component: Warning, description: "Warning badge", category: "Status", displayFill: "#F59E0B", defaultNote: "Default: white (for dark backgrounds)" },
    { name: "Warning2", component: Warning2, description: "Warning triangle", category: "Status" },
    { name: "MinusCircle", component: MinusCircle, description: "Minus in circle", category: "Status" },

    // Actions
    { name: "Download", component: Download, description: "Download arrow", category: "Actions" },
    { name: "UploadSimple", component: UploadSimple, description: "Upload arrow", category: "Actions" },
    { name: "TrayArrowUp", component: TrayArrowUp, description: "Tray with upload arrow", category: "Actions" },
    { name: "MagnifyingGlass", component: MagnifyingGlass, description: "Search icon", category: "Actions" },
    { name: "PencilSimpleLine", component: PencilSimpleLine, description: "Edit/pencil", category: "Actions" },
    { name: "FloppyDisk", component: FloppyDisk, description: "Save icon", category: "Actions" },
    { name: "Repeat", component: Repeat, description: "Refresh/repeat", category: "Actions", displayFill: "#3361FF", defaultNote: "Default: white (for dark backgrounds)" },
    { name: "PaperPlaneTilt", component: PaperPlaneTilt, description: "Send message", category: "Actions", displayFill: "#3361FF", defaultNote: "Default: white (for dark backgrounds)" },
    { name: "Trash", component: Trash, description: "Delete/trash bin", category: "Actions" },
    { name: "ShoppingCart", component: ShoppingCart, description: "Shopping cart", category: "Actions" },
    { name: "AirplaneTilt", component: AirplaneTilt, description: "Airplane tilted", category: "Actions" },

    // Finance
    { name: "Bank", component: Bank, description: "Bank building", category: "Finance" },
    { name: "CreditCard", component: CreditCard, description: "Credit card", category: "Finance" },
    { name: "Cardholder", component: Cardholder, description: "Card holder", category: "Finance" },
    { name: "CurrencyInr", component: CurrencyInr, description: "Indian Rupee", category: "Finance" },
    { name: "CurrencyInr2", component: CurrencyInr2, description: "Indian Rupee (alt)", category: "Finance" },
    { name: "Building", component: Building, description: "Office building", category: "Finance" },

    // Documents
    { name: "FileText", component: FileText, description: "File with text", category: "Documents" },
    { name: "PdfFile", component: PdfFile, description: "PDF document", category: "Documents" },
    { name: "Scroll", component: Scroll, description: "Scroll document", category: "Documents" },
    { name: "Scroll2", component: Scroll2, description: "Scroll document (alt)", category: "Documents" },
    { name: "IdentificationCard", component: IdentificationCard, description: "ID card", category: "Documents" },
    { name: "Subtitles", component: Subtitles, description: "Subtitles/captions", category: "Documents" },

    // Misc
    { name: "CalendarBlank", component: CalendarBlank, description: "Calendar", category: "Misc" },
    { name: "MapPin", component: MapPin, description: "Location pin", category: "Misc" },
    { name: "Phone", component: Phone, description: "Phone icon", category: "Misc" },
    { name: "Storefront", component: Storefront, description: "Store icon", category: "Misc" },
    { name: "UserCircle", component: UserCircle, description: "User avatar", category: "Misc" },
    { name: "VendorIcon", component: VendorIcon as React.FC<{ size?: number | string }>, description: "Flipspaces vendor logo", category: "Misc" },
    { name: "NoDataIcon", component: NoDataIcon as React.FC<{ size?: number | string; fill?: string; color?: string }>, description: "No data placeholder", category: "Misc" },
    { name: "Trash2", component: Trash2 as React.FC<{ size?: number | string; fill?: string; color?: string }>, description: "Large trash bin", category: "Misc", displayFill: "#1B1C1E", defaultNote: "Default: white (for dark backgrounds)" },
  ];

  const filteredIcons = icons.filter(
    (icon) =>
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ["Navigation", "Status", "Actions", "Finance", "Documents", "Misc"] as const;

  const iconsByCategory = categories.reduce(
    (acc, category) => {
      acc[category] = filteredIcons.filter((icon) => icon.category === category);
      return acc;
    },
    {} as Record<string, IconItem[]>
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Icons
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A comprehensive set of {icons.length} SVG icons for use throughout your application.
        All icons accept size and color/fill props for customization.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import {
  AirplaneTilt,
  ArrowDown,
  ArrowDown2,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bank,
  Building,
  CalendarBlank,
  Cardholder,
  CheckIcon,
  CheckCircle,
  CheckCircle2,
  CheckSquareOffset,
  CloseIcon,
  CreditCard,
  CurrencyInr,
  CurrencyInr2,
  Download,
  ErrorIcon,
  FileText,
  FloppyDisk,
  IdentificationCard,
  Info,
  MagnifyingGlass,
  MapPin,
  MinusCircle,
  NoDataIcon,
  PaperPlaneTilt,
  PdfFile,
  PencilSimpleLine,
  Phone,
  Repeat,
  Scroll,
  Scroll2,
  ShoppingCart,
  Storefront,
  Subtitles,
  Success,
  Trash,
  Trash2,
  TrayArrowUp,
  UploadSimple,
  UserCircle,
  VendorIcon,
  Warning,
  Warning2,
} from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection title="Icon Gallery">
        <Box sx={{ mb: 3 }}>
          <TextField
            placeholder="Search icons..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlass size={16} fill="#6B7280" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {categories.map((category) => {
          const categoryIcons = iconsByCategory[category];
          if (categoryIcons.length === 0) return null;

          return (
            <Box key={category} sx={{ mb: 4 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, mb: 2, color: "#374151" }}
              >
                {category}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: 2,
                }}
              >
                {categoryIcons.map((icon) => (
                  <Paper
                    key={icon.name}
                    variant="outlined"
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        backgroundColor: "#F0F4FF",
                        borderColor: "#3361FF",
                      },
                    }}
                    title={icon.defaultNote ? `${icon.description} - ${icon.defaultNote}` : icon.description}
                  >
                    <Box sx={{ height: 32, display: "flex", alignItems: "center" }}>
                      <icon.component size={24} fill={icon.displayFill} />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        textAlign: "center",
                        fontSize: "11px",
                        color: "#4B5563",
                        wordBreak: "break-word",
                      }}
                    >
                      {icon.name}
                    </Typography>
                    {icon.displayFill && (
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "9px",
                          color: "#9CA3AF",
                          fontStyle: "italic",
                        }}
                      >
                        (white default)
                      </Typography>
                    )}
                  </Paper>
                ))}
              </Box>
            </Box>
          );
        })}
      </DocSection>

      <DocSection title="Basic Usage">
        <ExampleBox>
          <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
            <ArrowDown />
            <CheckIcon />
            <CloseIcon />
            <Download />
            <Info />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<ArrowDown />
<CheckIcon />
<CloseIcon />
<Download />
<Info />`}
        />
      </DocSection>

      <DocSection title="Custom Size">
        <ExampleBox>
          <Stack direction="row" spacing={4} alignItems="end">
            <Stack alignItems="center" spacing={1}>
              <Download size={12} />
              <Typography variant="caption">12px</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Download size={16} />
              <Typography variant="caption">16px</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Download size={24} />
              <Typography variant="caption">24px</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Download size={32} />
              <Typography variant="caption">32px</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Download size={48} />
              <Typography variant="caption">48px</Typography>
            </Stack>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<Download size={12} />
<Download size={16} />
<Download size={24} />
<Download size={32} />
<Download size={48} />`}
        />
      </DocSection>

      <DocSection title="Custom Colors">
        <ExampleBox>
          <Stack direction="row" spacing={4} alignItems="center" flexWrap="wrap">
            <Stack alignItems="center" spacing={1}>
              <CheckCircle size={28} fill="#10B981" />
              <Typography variant="caption">Success</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <ErrorIcon size={28} fill="#EF4444" />
              <Typography variant="caption">Error</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Warning size={28} fill="#F59E0B" />
              <Typography variant="caption">Warning</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Info size={28} fill="#3361FF" />
              <Typography variant="caption">Info</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Bank size={28} fill="#6868B4" />
              <Typography variant="caption">Purple</Typography>
            </Stack>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<CheckCircle size={28} fill="#10B981" />  // Success
<ErrorIcon size={28} fill="#EF4444" />    // Error
<Warning size={28} fill="#F59E0B" />      // Warning
<Info size={28} fill="#3361FF" />         // Info
<Bank size={28} fill="#6868B4" />         // Purple`}
        />
      </DocSection>

      <DocSection
        title="Icons with White Defaults"
        description="Some icons have white as their default fill color because they're designed for use on dark or colored backgrounds (like buttons, badges, toasts). Always pass a fill color when using these on light backgrounds."
      >
        <ExampleBox>
          <Stack spacing={3}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              On dark backgrounds (using default white):
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Box sx={{ backgroundColor: "#EF4444", p: 1.5, borderRadius: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <ErrorIcon size={18} />
                <Typography variant="caption" sx={{ color: "white" }}>Error</Typography>
              </Box>
              <Box sx={{ backgroundColor: "#10B981", p: 1.5, borderRadius: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <Success size={18} />
                <Typography variant="caption" sx={{ color: "white" }}>Success</Typography>
              </Box>
              <Box sx={{ backgroundColor: "#F59E0B", p: 1.5, borderRadius: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <Warning size={18} />
                <Typography variant="caption" sx={{ color: "white" }}>Warning</Typography>
              </Box>
              <Box sx={{ backgroundColor: "#3361FF", p: 1.5, borderRadius: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <PaperPlaneTilt size={18} />
                <Typography variant="caption" sx={{ color: "white" }}>Send</Typography>
              </Box>
              <Box sx={{ backgroundColor: "#1B1C1E", p: 1.5, borderRadius: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <Repeat size={18} />
                <Typography variant="caption" sx={{ color: "white" }}>Refresh</Typography>
              </Box>
            </Stack>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2 }}>
              On light backgrounds (pass a fill color):
            </Typography>
            <Stack direction="row" spacing={3} alignItems="center">
              <Stack alignItems="center" spacing={0.5}>
                <ErrorIcon size={24} fill="#EF4444" />
                <Typography variant="caption">ErrorIcon</Typography>
              </Stack>
              <Stack alignItems="center" spacing={0.5}>
                <Success size={24} fill="#10B981" />
                <Typography variant="caption">Success</Typography>
              </Stack>
              <Stack alignItems="center" spacing={0.5}>
                <Warning size={24} fill="#F59E0B" />
                <Typography variant="caption">Warning</Typography>
              </Stack>
              <Stack alignItems="center" spacing={0.5}>
                <PaperPlaneTilt size={24} fill="#3361FF" />
                <Typography variant="caption">PaperPlaneTilt</Typography>
              </Stack>
              <Stack alignItems="center" spacing={0.5}>
                <Repeat size={24} fill="#1B1C1E" />
                <Typography variant="caption">Repeat</Typography>
              </Stack>
            </Stack>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`// On dark/colored backgrounds - use default white fill
<Box sx={{ backgroundColor: "#EF4444", p: 1.5 }}>
  <ErrorIcon size={18} />  {/* White by default */}
</Box>

// On light backgrounds - always pass a fill color
<ErrorIcon size={24} fill="#EF4444" />
<Success size={24} fill="#10B981" />
<Warning size={24} fill="#F59E0B" />
<PaperPlaneTilt size={24} fill="#3361FF" />
<Repeat size={24} fill="#1B1C1E" />`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          props={[
            {
              name: "size",
              type: "number | string",
              default: "14-18 (varies)",
              description: "Size of the icon in pixels",
            },
            {
              name: "fill / color",
              type: "string",
              default: "varies by icon",
              description: "Color of the icon (CSS color value). Some icons use 'fill', others use 'color'",
            },
          ]}
        />
      </DocSection>

      <DocSection title="All Available Icons">
        <Box sx={{ overflowX: "auto" }}>
          <Box
            component="table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              "& th, & td": {
                border: "1px solid #E5E7EB",
                p: 1.5,
                textAlign: "left",
              },
              "& th": {
                backgroundColor: "#F9FAFB",
                fontWeight: 600,
              },
            }}
          >
            <thead>
              <tr>
                <th>Icon</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {icons.map((icon) => (
                <tr key={icon.name}>
                  <td style={{ textAlign: "center", width: 60 }}>
                    <icon.component size={20} fill={icon.displayFill} />
                  </td>
                  <td>
                    <code style={{ fontSize: 13 }}>{icon.name}</code>
                  </td>
                  <td>{icon.category}</td>
                  <td>
                    {icon.description}
                    {icon.defaultNote && (
                      <Typography
                        component="span"
                        variant="caption"
                        sx={{ ml: 1, color: "#9CA3AF", fontStyle: "italic" }}
                      >
                        ({icon.defaultNote})
                      </Typography>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Box>
        </Box>
      </DocSection>

      <DocSection title="Usage Examples">
        <CodeBlock
          code={`// In a button
import { Button } from '@mui/material';
import { Download, ArrowRight } from '@flipspacesit/fs-ui';

<Button startIcon={<Download />}>
  Download File
</Button>

<Button endIcon={<ArrowRight />}>
  Next Step
</Button>

// In an IconButton
import { IconButton } from '@mui/material';
import { CloseIcon, PencilSimpleLine } from '@flipspacesit/fs-ui';

<IconButton onClick={onClose}>
  <CloseIcon />
</IconButton>

<IconButton onClick={onEdit}>
  <PencilSimpleLine />
</IconButton>

// Status indicators
import { CheckCircle, ErrorIcon, Warning, Info } from '@flipspacesit/fs-ui';

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <CheckCircle fill="#10B981" />
  <Typography>Payment successful</Typography>
</Box>

// In navigation
import { ArrowDown, ArrowUp, ArrowRight } from '@flipspacesit/fs-ui';

<MenuItem>
  Sort Ascending <ArrowUp size={14} />
</MenuItem>
<MenuItem>
  Sort Descending <ArrowDown size={14} />
</MenuItem>`}
        />
      </DocSection>
    </Box>
  );
};

export default IconsDocs;
