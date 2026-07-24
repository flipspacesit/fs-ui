import type { Key, ReactNode } from "react";
import { Skeleton } from "@mui/material";

import { DataBodyCell } from "../dataTableStyles";
import { getColumnWidth } from "../dataTableUtils";
import type { ColumnWidths, DataTableColumn } from "../dataTableTypes";

/**
 * Placeholder-bar widths cycled across columns so a skeleton row reads as real,
 * uneven content rather than a block of identical bars.
 */
const SKELETON_BAR_WIDTHS = ["70%", "88%", "55%", "92%", "64%", "78%"];

export interface SkeletonCellContext {
  visibleColumns: DataTableColumn[];
  isColumnFrozen: (field: string) => boolean;
  getStickyLeft: (field: string) => number;
  columnWidths: ColumnWidths;
}

/**
 * The `<td>` cells for a single skeleton row — column-width- and freeze-aware so
 * the placeholder lines up with the real grid (same widths, same sticky
 * offsets). Returned bare, without a row wrapper, so the virtualized path can
 * drop them straight into `react-virtuoso`'s own `<tr>`.
 */
export const buildSkeletonCells = (
  rowKey: Key,
  { visibleColumns, isColumnFrozen, getStickyLeft, columnWidths }: SkeletonCellContext
): ReactNode =>
  visibleColumns.map((column, columnIndex) => {
    const isFrozen = isColumnFrozen(column.field);
    return (
      <DataBodyCell
        key={`skeleton-${rowKey}-${column.field}`}
        $width={getColumnWidth(column, columnWidths)}
        $isSticky={isFrozen}
        $left={isFrozen ? getStickyLeft(column.field) : 0}
        $zIndex={isFrozen ? 25 : 1}
      >
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            width: SKELETON_BAR_WIDTHS[columnIndex % SKELETON_BAR_WIDTHS.length],
            height: "calc(16px * var(--scale, 1))",
            borderRadius: "4px",
          }}
        />
      </DataBodyCell>
    );
  });
