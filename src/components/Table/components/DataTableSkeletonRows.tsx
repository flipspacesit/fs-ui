import type { ReactNode } from "react";

import { BodyRow } from "../dataTableStyles";
import { buildSkeletonCells } from "./dataTableSkeleton";
import type { SkeletonCellContext } from "./dataTableSkeleton";

export interface DataTableSkeletonRowsProps extends SkeletonCellContext {
  /** How many placeholder rows to render. */
  rowCount: number;
  /** Namespaces the row keys so they stay unique when appended after real rows. */
  keyPrefix?: string;
}

/**
 * Full skeleton `<tr>` rows — used for the initial (empty) loading state and,
 * appended to the body, for the non-virtualized "loading more" state.
 */
export const DataTableSkeletonRows = ({
  rowCount,
  keyPrefix = "row",
  ...cellContext
}: DataTableSkeletonRowsProps): ReactNode =>
  Array.from({ length: rowCount }, (_unused, rowIndex) => (
    <BodyRow key={`skeleton-${keyPrefix}-${rowIndex}`} aria-hidden>
      {buildSkeletonCells(`${keyPrefix}-${rowIndex}`, cellContext)}
    </BodyRow>
  ));

export default DataTableSkeletonRows;
