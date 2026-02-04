import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#425281",
    color: theme.palette.common.white,
    borderRightStyle: "solid",
    borderRightColor: "#EDEFF5",
    borderRightWidth: "1px",
    padding: "20px 10px",
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRightStyle: "solid",
    borderRightColor: "#EDEFF5",
    borderRightWidth: "1px",
    padding: "10px 12px",
  },
  [`&:last-child.${tableCellClasses.body}, &:last-child.${tableCellClasses.head}, &:nth-last-of-type(2).${tableCellClasses.body}, &:nth-last-of-type(2).${tableCellClasses.head}`]:
  {
    borderRight: 0,
    textAlign: "center",
  },
  [`&:first-of-type.${tableCellClasses.body}, &:first-of-type.${tableCellClasses.head}`]:
  {
    borderLeft: 0,
  },
}));

interface StyledTableContainerProps {
  hidecount?: boolean;
  containerWidth?: string;
  containerHeight?: string;
}

const StyledTableContainer = styled(TableContainer, {
  shouldForwardProp: (prop) =>
    prop !== "hidecount" && prop !== "containerWidth" && prop !== "containerHeight",
})<StyledTableContainerProps>(({ hidecount, containerWidth, containerHeight }) => ({
  height: containerHeight || "calc(100vh - 242px)",
  boxShadow: "0px 4px 25px #d1d1e6",
  borderRadius: "0px 0px 10px 10px",
  marginTop: hidecount ? 0 : "30px",
  width: containerWidth || "100%",
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(207, 211, 223, 0.6)",
    borderRadius: "8px",
  },
}));

export interface TableSkeletonColumn {
  /** Column header title */
  title?: string;
  /** Alternative value for header */
  value?: string;
  /** Custom styles for the column */
  style?: React.CSSProperties;
}

export interface TableSkeletonLoaderProps {
  /** Column definitions */
  columns: TableSkeletonColumn[];
  /** Hide the count margin at top */
  hideCount?: boolean;
  /** Custom width for the table container */
  width?: string;
  /** Custom height for the table container */
  height?: string;
  /** Number of skeleton rows to display */
  rowCount?: number;
  /** Minimum width of the table */
  minWidth?: string;
  /** Header background color */
  headerBgColor?: string;
}

export const TableSkeletonLoader: React.FC<TableSkeletonLoaderProps> = ({
  columns,
  hideCount = false,
  width,
  height,
  rowCount = 9,
  minWidth = "1165px",
  headerBgColor = "#425281",
}) => {
  const tableData = useMemo(() => new Array(rowCount).fill(0), [rowCount]);

  return (
    <StyledTableContainer
      component={Paper}
      hidecount={hideCount}
      containerWidth={width}
      containerHeight={height}
    >
      <Table sx={{ minWidth }} aria-label="skeleton loader table" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <StyledTableCell
                key={column.title || column.value || index}
                style={{
                  ...column.style,
                  backgroundColor: headerBgColor,
                }}
              >
                {column.title || column.value}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <StyledTableCell
                  key={`${rowIndex}-${colIndex}`}
                  style={column.style}
                >
                  <Skeleton variant="rectangular" height={15} />
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default TableSkeletonLoader;
