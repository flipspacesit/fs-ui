import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { primary, neutral } from "../../theme/tokens/colors";

/**
 * MUI `TableContainer` themed with an 8px rounded border, white background,
 * and a custom thin (8px) WebKit scrollbar. Also the default export of this module.
 */
export const StyledTableContainer = styled(TableContainer)({
  borderRadius: "8px",
  border: `0.5px solid ${neutral.softSteel[400]}`,
  backgroundColor: neutral.white,
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#c1c1c1",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#a8a8a8",
  },
});

/**
 * MUI `Table` with a fixed 650px minimum width to keep columns legible.
 */
export const StyledTable = styled(Table)({
  minWidth: "650px",
});

/**
 * MUI `TableHead` tinted with the slate-blue 100 background to set off headers.
 */
export const StyledTableHead = styled(TableHead)({
  backgroundColor: primary.slateBlue[100],
});

/**
 * MUI `TableCell` for header rows: 600 weight, ink text, no-wrap, bottom hairline border.
 */
export const StyledHeaderCell = styled(TableCell)({
  fontWeight: "600 !important",
  color: `${neutral.ink} !important`,
  borderBottom: `0.5px solid ${neutral.softSteel[400]} !important`,
  padding: "12px 16px !important",
  whiteSpace: "nowrap",
});

/**
 * MUI `TableBody` passthrough kept for API symmetry with the other styled parts.
 */
export const StyledTableBody = styled(TableBody)({});

/**
 * MUI `TableRow` with a slate-blue 50 hover highlight; drops the last row's cell border.
 */
export const StyledTableRow = styled(TableRow)({
  "&:hover": {
    backgroundColor: primary.slateBlue[50],
  },
  "&:last-child td": {
    borderBottom: "none",
  },
});

/**
 * MUI `TableCell` for body rows: ink text with a blue 300 bottom divider.
 */
export const StyledTableCell = styled(TableCell)({
  color: `${neutral.ink} !important`,
  borderBottom: `0.5px solid ${primary.blue[300]} !important`,
  padding: "12px 16px !important",
});

/**
 * MUI `TableRow` used as an 8px-tall spacer to visually separate groups of rows.
 */
export const StyledSpacerRow = styled(TableRow)({
  height: "8px",
});

/**
 * MUI `TableCell` for the spacer row: no padding, no border, so the gap reads as empty space.
 */
export const StyledSpacerCell = styled(TableCell)({
  padding: "0 !important",
  border: "none !important",
});

/**
 * MUI `Box` wrapper providing horizontal overflow scrolling and rounded corners around a table.
 */
export const StyledTableWrapper = styled(Box)({
  overflowX: "auto",
  borderRadius: "8px",
});

// Re-export the unstyled MUI table primitives so consumers can import them
// alongside the styled wrappers above from a single entry point.
export {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
};

/** Default export: the styled table container (alias of {@link StyledTableContainer}). */
export default StyledTableContainer;
