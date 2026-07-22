import type { MouseEvent as ReactMouseEvent } from "react";
import type { SxProps, Theme } from "@mui/material";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";

import { EllipsisTooltip } from "../../EllipsisTooltip";
import { Funnel } from "../../../icons/Funnel";
import { neutral, primary } from "../../../theme/tokens/colors";
import type {
  ActiveFilters,
  ColumnWidths,
  DataTableColumn,
  DataTableRow,
  FieldMappings,
  SortConfig,
} from "../dataTableTypes";
import {
  ColumnResizer,
  FilterButton,
  HeaderCell,
  HeaderCellContent,
  HeaderRow,
} from "../dataTableStyles";
import { getColumnWidth } from "../dataTableUtils";
import { mergeSx, resolveSx } from "../sxHelpers";
import DataTableContextMenu from "./DataTableContextMenu";
import DataTableFilterPopover from "./DataTableFilterPopover";

export interface DataTableHeaderProps {
  visibleColumns: DataTableColumn[];
  filterColumns: DataTableColumn[];
  activeFilters: ActiveFilters;
  setActiveFilters: React.Dispatch<React.SetStateAction<ActiveFilters>>;
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  showFilters: boolean;
  allowHideColumns: boolean;
  allowFreezeColumns: boolean;
  isColumnFrozen: (field: string) => boolean;
  handleFreezeColumn: (field: string) => void;
  handleUnfreezeColumns: () => void;
  toggleColumnVisibility: (field: string) => void;
  getStickyLeft: (field: string) => number;
  columnWidths: ColumnWidths;
  data: DataTableRow[];
  fieldMappings: FieldMappings;
  headerRowSx?: SxProps<Theme>;
  headerCellSx?: SxProps<Theme> | ((column: DataTableColumn) => SxProps<Theme>);
  columnResizable: boolean;
  startColumnResize: (
    field: string,
    startWidth: number,
    event: ReactMouseEvent
  ) => void;
}

/**
 * The header row: label + ellipsis tooltip, an optional filter/sort funnel
 * (opening {@link DataTableFilterPopover}), a right-click freeze menu, and — per
 * resizable column — the {@link ColumnResizer} drag handle.
 */
const DataTableHeader = ({
  visibleColumns,
  filterColumns,
  activeFilters,
  setActiveFilters,
  sortConfig,
  setSortConfig,
  showFilters,
  allowHideColumns,
  allowFreezeColumns,
  isColumnFrozen,
  handleFreezeColumn,
  handleUnfreezeColumns,
  toggleColumnVisibility,
  getStickyLeft,
  columnWidths,
  data,
  fieldMappings,
  headerRowSx,
  headerCellSx,
  columnResizable,
  startColumnResize,
}: DataTableHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(
    null
  );
  const [contextAnchorEl, setContextAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [contextColumnField, setContextColumnField] = useState<string | null>(
    null
  );

  const contextColumn = useMemo(
    () =>
      visibleColumns.find((column) => column.field === contextColumnField) ||
      null,
    [contextColumnField, visibleColumns]
  );

  return (
    <>
      <HeaderRow sx={headerRowSx}>
        {visibleColumns.map((column) => {
          const isFrozen = isColumnFrozen(column.field);
          const width = getColumnWidth(column, columnWidths);
          const headerContent = column.renderHeader
            ? column.renderHeader({ column, columns: visibleColumns, data })
            : column.header;
          const hasActiveFilter = Boolean(activeFilters[column.field]);
          const isActive =
            hasActiveFilter || sortConfig.key === column.field;

          return (
            <HeaderCell
              key={`header-${column.field}`}
              $width={width}
              $isSticky={isFrozen}
              $left={isFrozen ? getStickyLeft(column.field) : 0}
              $zIndex={isFrozen ? 240 : 220}
              align={column.headerAlign || "left"}
              sx={mergeSx(resolveSx(headerCellSx, column), column.headerCellSx)}
            >
              <HeaderCellContent>
                <Box
                  sx={{
                    overflow: "hidden",
                    flex: 1,
                    textAlign: column.headerAlign || "left",
                  }}
                >
                  <EllipsisTooltip style={{ width: "100%" }}>
                    {headerContent}
                  </EllipsisTooltip>
                </Box>

                {showFilters && column.showFilter ? (
                  <FilterButton
                    type="button"
                    $hasActiveFilter={hasActiveFilter}
                    onClick={(event) => {
                      event.stopPropagation();
                      setContextAnchorEl(null);
                      setContextColumnField(null);
                      setAnchorEl(event.currentTarget);
                      setActiveFilterColumn((prev) =>
                        prev === column.field ? null : column.field
                      );
                    }}
                    onContextMenu={(event) => {
                      if (!allowFreezeColumns) return;
                      event.preventDefault();
                      event.stopPropagation();
                      setAnchorEl(null);
                      setActiveFilterColumn(null);
                      setContextAnchorEl(event.currentTarget);
                      setContextColumnField(column.field);
                    }}
                  >
                    <Funnel
                      size={16}
                      fill={isActive ? primary.yellow.brand : neutral.white}
                    />
                  </FilterButton>
                ) : null}
              </HeaderCellContent>

              {activeFilterColumn === column.field ? (
                <DataTableFilterPopover
                  key={`${column.field}-${JSON.stringify(
                    activeFilters[column.field] || {}
                  )}`}
                  open={activeFilterColumn === column.field}
                  anchorEl={anchorEl}
                  onClose={() => {
                    setActiveFilterColumn(null);
                    setAnchorEl(null);
                  }}
                  column={column}
                  columns={filterColumns}
                  data={data}
                  activeFilters={activeFilters}
                  setActiveFilters={setActiveFilters}
                  sortConfig={sortConfig}
                  setSortConfig={setSortConfig}
                  toggleColumnVisibility={toggleColumnVisibility}
                  allowHideColumns={allowHideColumns}
                  fieldMappings={fieldMappings}
                />
              ) : null}

              {columnResizable && column.resizable ? (
                <ColumnResizer
                  onMouseDown={(event) =>
                    startColumnResize(column.field, width, event)
                  }
                />
              ) : null}
            </HeaderCell>
          );
        })}
      </HeaderRow>

      {allowFreezeColumns && contextColumn ? (
        <DataTableContextMenu
          open={Boolean(contextAnchorEl)}
          anchorEl={contextAnchorEl}
          onClose={() => {
            setContextAnchorEl(null);
            setContextColumnField(null);
          }}
          columnField={contextColumn.field}
          isColumnFrozen={isColumnFrozen}
          handleFreezeColumn={handleFreezeColumn}
          handleUnfreezeColumns={handleUnfreezeColumns}
        />
      ) : null}
    </>
  );
};

export default DataTableHeader;
