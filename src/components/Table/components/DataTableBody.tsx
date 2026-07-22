import type { ReactNode, Key } from "react";
import type { SxProps, Theme } from "@mui/material";
import { Fragment } from "react";

import { EllipsisTooltip } from "../../EllipsisTooltip";
import type {
  ColumnWidths,
  DataTableColumn,
  DataTableRow,
} from "../dataTableTypes";
import { BodyRow, DataBodyCell } from "../dataTableStyles";
import { formatCellValue, getColumnWidth } from "../dataTableUtils";
import { mergeSx, resolveSx } from "../sxHelpers";

export interface DataTableBodyProps {
  data: DataTableRow[];
  visibleColumns: DataTableColumn[];
  rowKey: (row: DataTableRow, index: number) => Key;
  isColumnFrozen: (field: string) => boolean;
  getStickyLeft: (field: string) => number;
  columnWidths: ColumnWidths;
  bodyRowSx?:
    | SxProps<Theme>
    | ((row: DataTableRow, index: number) => SxProps<Theme>);
  bodyCellSx?:
    | SxProps<Theme>
    | ((column: DataTableColumn, row: DataTableRow, index: number) => SxProps<Theme>);
  dateFormat?: string;
  renderRow?: (params: {
    row: DataTableRow;
    index: number;
    data: DataTableRow[];
    defaultRow: ReactNode;
  }) => ReactNode;
  renderBodySpacer?: (params: {
    row: DataTableRow;
    index: number;
    data: DataTableRow[];
    columnCount: number;
  }) => ReactNode;
}

/** Non-virtualized body renderer (used when `enableVirtualization` is off). */
const DataTableBody = ({
  data,
  visibleColumns,
  rowKey,
  isColumnFrozen,
  getStickyLeft,
  columnWidths,
  bodyRowSx,
  bodyCellSx,
  dateFormat,
  renderRow,
  renderBodySpacer,
}: DataTableBodyProps): ReactNode => {
  if (!data.length) {
    return null;
  }

  return data.map((row, index) => {
    const rowIdentifier = rowKey(row, index);

    const defaultRow = (
      <BodyRow
        key={rowIdentifier}
        sx={resolveSx(bodyRowSx, row, index)}
      >
        {visibleColumns.map((column) => {
          const isFrozen = isColumnFrozen(column.field);
          const value = row?.[column.field];
          const content = column.render ? (
            column.render({ row, index, data, value, column })
          ) : (
            <EllipsisTooltip>
              {formatCellValue({ value, column, row, dateFormat })}
            </EllipsisTooltip>
          );

          return (
            <DataBodyCell
              key={`cell-${rowIdentifier}-${column.field}`}
              $width={getColumnWidth(column, columnWidths)}
              $isSticky={isFrozen}
              $left={isFrozen ? getStickyLeft(column.field) : 0}
              $zIndex={isFrozen ? 25 : 1}
              align={column.bodyAlign || "left"}
              sx={mergeSx(resolveSx(bodyCellSx, column, row, index), column.bodyCellSx)}
            >
              {content}
            </DataBodyCell>
          );
        })}
      </BodyRow>
    );

    const renderedRow = renderRow
      ? renderRow({ row, index, data, defaultRow })
      : defaultRow;

    const spacer = renderBodySpacer
      ? renderBodySpacer({
          row,
          index,
          data,
          columnCount: visibleColumns.length,
        })
      : null;

    return (
      <Fragment key={`wrap-${rowIdentifier}`}>
        {renderedRow}
        {spacer}
      </Fragment>
    );
  });
};

export default DataTableBody;
