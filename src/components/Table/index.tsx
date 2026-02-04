import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import styled from "styled-components";

/**
 * Styled table container with custom scrollbar
 */
export const StyledTableContainer = styled(TableContainer)`
  border-radius: 8px;
  border: 0.5px solid #aeb6ce;
  background-color: #ffffff;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

/**
 * Styled table with consistent styling
 */
export const StyledTable = styled(Table)`
  min-width: 650px;
`;

/**
 * Styled table head with background
 */
export const StyledTableHead = styled(TableHead)`
  background-color: #f0f4ff;
`;

/**
 * Styled header cell
 */
export const StyledHeaderCell = styled(TableCell)`
  font-weight: 600 !important;
  color: #1b1c1e !important;
  border-bottom: 0.5px solid #aeb6ce !important;
  padding: 12px 16px !important;
  white-space: nowrap;
`;

/**
 * Styled table body
 */
export const StyledTableBody = styled(TableBody)``;

/**
 * Styled table row with hover effect
 */
export const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: #f9fafb;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

/**
 * Styled table cell
 */
export const StyledTableCell = styled(TableCell)`
  color: #1b1c1e !important;
  border-bottom: 0.5px solid #aeb6ce !important;
  padding: 12px 16px !important;
`;

/**
 * Spacer row for visual separation
 */
export const StyledSpacerRow = styled(TableRow)`
  height: 8px;
`;

/**
 * Spacer cell
 */
export const StyledSpacerCell = styled(TableCell)`
  padding: 0 !important;
  border: none !important;
`;

/**
 * Table wrapper with consistent layout
 */
export const StyledTableWrapper = styled(Box)`
  overflow-x: auto;
  border-radius: 8px;
`;

// Re-export MUI table components for convenience
export {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
};

export default StyledTableContainer;
