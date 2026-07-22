import type { SxProps, Theme } from "@mui/material";
import { Box } from "@mui/material";

import { Add } from "../../../icons/Add";
import { Minus } from "../../../icons/Minus";
import type {
  ColumnWidths,
  DataTableColumn,
  ExpandedColumns,
} from "../dataTableTypes";
import {
  ControlsCell,
  ControlsRow,
  ExpandToggle,
  GroupLine,
  GroupLineEnd,
} from "../dataTableStyles";
import { getColumnWidth } from "../dataTableUtils";
import { resolveSx } from "../sxHelpers";

export interface DataTableControlsProps {
  visibleColumns: DataTableColumn[];
  expandedColumns: ExpandedColumns;
  toggleColumnExpansion: (field: string) => void;
  isColumnFrozen: (field: string) => boolean;
  getStickyLeft: (field: string) => number;
  columnWidths: ColumnWidths;
  controlsRowSx?: SxProps<Theme>;
  controlsCellSx?: SxProps<Theme> | ((column: DataTableColumn) => SxProps<Theme>);
}

/**
 * Optional row above the header that carries the expand/collapse toggles and
 * grouping lines for expandable column groups.
 */
const DataTableControls = ({
  visibleColumns,
  expandedColumns,
  toggleColumnExpansion,
  isColumnFrozen,
  getStickyLeft,
  columnWidths,
  controlsRowSx,
  controlsCellSx,
}: DataTableControlsProps) => (
  <ControlsRow sx={controlsRowSx}>
    {visibleColumns.map((column, index) => {
      const nextColumn = visibleColumns[index + 1];
      const isParentExpanded = Boolean(
        column.expandable && expandedColumns[column.field]
      );
      const isExpandedChild = Boolean(column.isExpandedChild);
      const isLastExpandedChild =
        isExpandedChild && nextColumn?.parentField !== column.parentField;
      const isFrozen = isColumnFrozen(column.field);

      return (
        <ControlsCell
          key={`ctrl-${column.field}`}
          $width={getColumnWidth(column, columnWidths)}
          $isSticky={isFrozen}
          $left={isFrozen ? getStickyLeft(column.field) : 0}
          $zIndex={isFrozen ? 230 : 210}
          $borderLeft={Boolean(column.expandable)}
          $borderRight={Boolean(
            (column.expandable && !isParentExpanded) || isLastExpandedChild
          )}
          sx={resolveSx(controlsCellSx, column)}
        >
          {column.expandable ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              <ExpandToggle
                $isExpanded={Boolean(expandedColumns[column.field])}
                onClick={() => toggleColumnExpansion(column.field)}
                size="small"
              >
                {expandedColumns[column.field] ? (
                  <Minus size={10} />
                ) : (
                  <Add size={10} />
                )}
              </ExpandToggle>
            </Box>
          ) : null}

          {isParentExpanded ? <GroupLine style={{ right: 0 }} /> : null}

          {isExpandedChild ? (
            <>
              <GroupLine style={{ left: 0, right: isLastExpandedChild ? 16 : 0 }} />
              {isLastExpandedChild ? <GroupLineEnd /> : null}
            </>
          ) : null}
        </ControlsCell>
      );
    })}
  </ControlsRow>
);

export default DataTableControls;
