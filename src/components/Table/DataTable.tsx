import type { CSSProperties, Key, ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
} from "@mui/material";
import { forwardRef, useCallback, useMemo, useRef } from "react";
import { TableVirtuoso } from "react-virtuoso";
import type { ContextProp, ItemProps, TableComponents } from "react-virtuoso";

import { EllipsisTooltip } from "../EllipsisTooltip";
import { NoDataContent } from "../NoDataContent";
import DataTableBody from "./components/DataTableBody";
import DataTableControls from "./components/DataTableControls";
import DataTableHeader from "./components/DataTableHeader";
import DataTableTotals from "./components/DataTableTotals";
import { DataTableSkeletonRows } from "./components/DataTableSkeletonRows";
import { buildSkeletonCells } from "./components/dataTableSkeleton";
import type { SkeletonCellContext } from "./components/dataTableSkeleton";
import { useDataTableInfiniteScroll } from "./useDataTableInfiniteScroll";
import type { DataTableApi } from "./useDataTableState";
import { useDataTableState } from "./useDataTableState";
import {
  BodyRow,
  DataBodyCell,
  StyledDataTable,
  StyledDataTableContainer,
} from "./dataTableStyles";
import {
  formatCellValue,
  getColumnWidth,
  getFlattenedColumns,
  normalizeColumns,
} from "./dataTableUtils";
import { mergeSx, resolveSx } from "./sxHelpers";
import type {
  ActiveFilters,
  ColumnWidths,
  DataTableColumn,
  DataTableRow,
  FieldMappings,
  HiddenColumns,
  SortConfig,
} from "./dataTableTypes";

type TotalRowPlacement = "header" | "footer";

// `Row extends object` (not `DataTableRow`) so consumers can use plain
// `interface` row types — interfaces lack the implicit string index signature
// that `Record<string, unknown>` requires. Internally the pipeline runs on the
// open `DataTableRow` shape via casts at the boundary.
export interface DataTableProps<Row extends object = DataTableRow> {
  /** The rows to render. */
  data?: Row[];
  /** Column definitions (see {@link DataTableColumn}). */
  columns?: DataTableColumn<Row>[];
  /** Stable per-row React key. Defaults to `row.id` / `row.key` / index. */
  rowKey?: (row: Row, index: number) => Key;
  /** Render the totals summary row. */
  showTotalRow?: boolean;
  /** Render the control row (expand toggles for expandable column groups). */
  showControlRow?: boolean;
  /** Show the per-column filter/sort funnel in the header. */
  showFilters?: boolean;
  /** Master switch for column resizing (columns still opt in via `column.resizable`). */
  columnResizable?: boolean;
  /** Whether the totals row sits under the header or in the footer. */
  totalRowPlacement?: TotalRowPlacement;
  /** Show a currency selector in the totals row and total only the chosen currency. */
  showTotalWithCurrencyDropdown?: boolean;
  /** Allow "Hide Column" in the header popover. */
  allowHideColumns?: boolean;
  /** Allow freeze/unfreeze via the header right-click menu. */
  allowFreezeColumns?: boolean;
  /** Map a column's filter to one or more source fields. */
  fieldMappings?: FieldMappings;
  /** Data used to build filter option lists (defaults to `data`). */
  filterSourceData?: Row[];
  /** dayjs format for `type: "date"` columns. */
  dateFormat?: string;
  /** Empty-state message. */
  emptyMessage?: string;
  /** Row field holding the currency code (for `type: "currency"` + totals). */
  currencyField?: string;
  /** Fallback currency field. */
  fallbackCurrencyField?: string;
  defaultHiddenColumns?: HiddenColumns;
  defaultFrozenColumns?: string[];
  defaultFilters?: ActiveFilters;
  defaultSortConfig?: SortConfig;
  /** Seed runtime column widths (field → px). */
  defaultColumnWidths?: ColumnWidths;
  /** Minimum width (px) a column can be dragged to. Defaults to 60. */
  minColumnWidth?: number;
  onStateChange?: (api: DataTableApi) => void;
  onFilterStateChange?: (activeFilters: ActiveFilters) => void;
  onHiddenColumnsChange?: (hiddenColumns: HiddenColumns) => void;
  onTableApiChange?: (api: DataTableApi) => void;
  renderHeaderSpacer?: (params: {
    data: DataTableRow[];
    visibleColumns: DataTableColumn[];
    columnCount: number;
  }) => ReactNode;
  renderBodySpacer?: (params: {
    row: DataTableRow;
    index: number;
    data: DataTableRow[];
    columnCount: number;
  }) => ReactNode;
  renderRow?: (params: {
    row: DataTableRow;
    index: number;
    data: DataTableRow[];
    defaultRow: ReactNode;
  }) => ReactNode;
  /** Use `react-virtuoso` row virtualization (default `true`). */
  enableVirtualization?: boolean;
  /**
   * Enable infinite scrolling. When on, {@link DataTableProps.onRefetch} fires
   * as the user nears the bottom of the list (works with or without
   * virtualization).
   */
  allowInfiniteScroll?: boolean;
  /**
   * Called when the user scrolls to the bottom — wire this to your
   * "fetch next page". Guarded by {@link DataTableProps.isLoading}, so it won't
   * re-fire while a load is already in flight; you are still responsible for
   * stopping once there are no more pages (e.g. gate on `hasNextPage`).
   */
  onRefetch?: () => void;
  /**
   * When `true`, the table renders skeleton placeholder rows itself: a full
   * page of them when there's no data yet, or a few appended to the bottom while
   * paging (with `allowInfiniteScroll`). Lets consumers drop their own loading
   * UI entirely.
   */
  isLoading?: boolean;
  /** Skeleton rows shown for the initial (empty) loading state. Defaults to `8`. */
  skeletonRowCount?: number;
  tableContainerSx?: SxProps<Theme>;
  tableSx?: SxProps<Theme>;
  headerRowSx?: SxProps<Theme>;
  headerCellSx?: SxProps<Theme> | ((column: DataTableColumn) => SxProps<Theme>);
  totalRowSx?: SxProps<Theme>;
  totalCellSx?: SxProps<Theme> | ((column: DataTableColumn) => SxProps<Theme>);
  bodyRowSx?:
    | SxProps<Theme>
    | ((row: DataTableRow, index: number) => SxProps<Theme>);
  bodyCellSx?:
    | SxProps<Theme>
    | ((column: DataTableColumn, row: DataTableRow, index: number) => SxProps<Theme>);
  controlsRowSx?: SxProps<Theme>;
  controlsCellSx?: SxProps<Theme> | ((column: DataTableColumn) => SxProps<Theme>);
}

/** Skeleton placeholder rows appended to the bottom during "load more". */
const LOADING_MORE_SKELETON_COUNT = 3;

/**
 * Marker key stamped on the throwaway row objects appended to virtuoso's `data`
 * while paging, so `itemContent` / `computeItemKey` / the row wrapper can tell a
 * skeleton placeholder apart from a real row.
 */
const SKELETON_ROW_FLAG = "__dtSkeletonRow";

const isSkeletonRow = (row: unknown): boolean =>
  Boolean((row as Record<string, unknown> | undefined)?.[SKELETON_ROW_FLAG]);

/**
 * Values threaded to the virtuoso slot components via `TableVirtuoso`'s
 * `context`. `bodyRowSx` lives here because the row wrapper is a stable,
 * module-level component that can't close over the current props — without this
 * the virtualized path would silently drop `bodyRowSx`.
 */
interface DataTableVirtuosoContext {
  bodyRowSx?: DataTableProps["bodyRowSx"];
}

/* ----- react-virtuoso slot components ----- */

const VirtuosoScroller = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { style?: CSSProperties }
>(function VirtuosoScroller(props, ref) {
  return (
    <TableContainer
      component={Paper}
      ref={ref}
      {...props}
      style={{
        boxShadow: "none",
        height: "100%",
        overflow: "auto",
        position: "relative",
        ...(props.style || {}),
      }}
    />
  );
});

const VirtuosoTableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function VirtuosoTableBody(props, ref) {
  return <TableBody {...props} ref={ref} />;
});

const VirtuosoTable = (props: {
  sx?: SxProps<Theme>;
  style?: CSSProperties;
  children?: ReactNode;
}) => <StyledDataTable {...props} sx={props.sx} />;

const VirtuosoTableRow = (
  props: ItemProps<DataTableRow> & ContextProp<DataTableVirtuosoContext>
) => {
  // `item` / `context` are virtuoso's own props — never forward them to the DOM
  // `<tr>`. The `data-*` attributes left in `rest` are valid to forward.
  const { item, context, ...rest } = props;
  const bodyRowSx = context?.bodyRowSx;
  const rowSx =
    bodyRowSx && !isSkeletonRow(item)
      ? resolveSx(bodyRowSx, item, props["data-index"])
      : undefined;
  return <BodyRow {...rest} sx={rowSx} />;
};

const VirtuosoTableHead = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function VirtuosoTableHead(props, ref) {
  return <TableHead {...props} ref={ref} />;
});

const VirtuosoTableFoot = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function VirtuosoTableFoot(props, ref) {
  return <TableFooter {...props} ref={ref} />;
});

interface BuildRowCellsParams {
  row: DataTableRow;
  index: number;
  data: DataTableRow[];
  visibleColumns: DataTableColumn[];
  rowIdentifier: Key;
  isColumnFrozen: (field: string) => boolean;
  getStickyLeft: (field: string) => number;
  columnWidths: ColumnWidths;
  bodyCellSx?: DataTableProps["bodyCellSx"];
  dateFormat: string;
}

const buildRowCells = ({
  row,
  index,
  data,
  visibleColumns,
  rowIdentifier,
  isColumnFrozen,
  getStickyLeft,
  columnWidths,
  bodyCellSx,
  dateFormat,
}: BuildRowCellsParams) =>
  visibleColumns.map((column) => {
    const isFrozen = isColumnFrozen(column.field);
    const value = row?.[column.field];
    const content = column.render ? (
      column.render({ row, index, data, value, column })
    ) : (
      <EllipsisTooltip style={{ width: "100%" }}>
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
  });

const defaultRowKey = (row: DataTableRow, index: number): Key =>
  (row?.id as Key) || (row?.key as Key) || index;

/**
 * Data-driven table with column **resizing**, sticky/frozen columns, per-column
 * filtering + sorting, a totals row, and optional row virtualization.
 *
 * Full TypeScript port of the VizDom `components_v2/DataTable` wrapper
 * (commit 9c0e7419) into the design system. It composes the exported
 * primitives — {@link useDataTableState} / `useColumnResize`, the styled cells,
 * and the `ColumnResizer` handle — so you can either use this assembled
 * component or build your own table on the same building blocks.
 */
export function DataTable<Row extends object = DataTableRow>({
  data = [],
  columns = [],
  rowKey,
  showTotalRow = false,
  showControlRow = false,
  showFilters = false,
  columnResizable = false,
  totalRowPlacement = "header",
  showTotalWithCurrencyDropdown = false,
  allowHideColumns = true,
  allowFreezeColumns = true,
  fieldMappings = {},
  filterSourceData,
  dateFormat = "DD MMM YYYY",
  emptyMessage = "No records found",
  currencyField = "projectCurrency",
  fallbackCurrencyField = "currency",
  defaultHiddenColumns = {},
  defaultFrozenColumns = [],
  defaultFilters = {},
  defaultSortConfig = { key: null, direction: null },
  defaultColumnWidths = {},
  minColumnWidth,
  onStateChange,
  onFilterStateChange,
  onHiddenColumnsChange,
  onTableApiChange,
  renderHeaderSpacer,
  renderBodySpacer,
  renderRow,
  enableVirtualization = true,
  allowInfiniteScroll = false,
  onRefetch,
  isLoading = false,
  skeletonRowCount = 8,
  tableContainerSx,
  tableSx,
  headerRowSx,
  headerCellSx,
  totalRowSx,
  totalCellSx,
  bodyRowSx,
  bodyCellSx,
  controlsRowSx,
  controlsCellSx,
}: DataTableProps<Row>) {
  // The internal pipeline runs on the open `DataTableRow` shape; the public
  // generic only narrows the `columns` / `data` / `rowKey` surface. `render`
  // callbacks are function-typed, so the column cast needs `unknown`.
  const normalizedColumns = useMemo(
    () => normalizeColumns(columns as unknown as DataTableColumn[]),
    [columns]
  );
  const rows = data as unknown as DataTableRow[];
  const rowKeyResolver =
    (rowKey as unknown as ((row: DataTableRow, index: number) => Key) | undefined) ??
    defaultRowKey;

  const {
    activeFilters,
    setActiveFilters,
    sortConfig,
    setSortConfig,
    setHiddenColumns,
    frozenColumns,
    setFrozenColumns,
    expandedColumns,
    setExpandedColumns,
    selectedCurrency,
    setSelectedCurrency,
    columnWidths,
    startColumnResize,
    filteredData,
    visibleColumns,
    totalsByField,
    currencyOptions,
  } = useDataTableState({
    data: rows,
    columns: normalizedColumns,
    defaultHiddenColumns,
    defaultFrozenColumns,
    defaultFilters,
    defaultSortConfig,
    defaultColumnWidths,
    fieldMappings,
    dateFormat,
    showTotalWithCurrencyDropdown,
    currencyField,
    fallbackCurrencyField,
    columnResizable,
    minColumnWidth,
    onStateChange,
    onFilterStateChange,
    onHiddenColumnsChange,
    onTableApiChange,
  });

  const filterColumns = useMemo(
    () => getFlattenedColumns(normalizedColumns, expandedColumns, {}),
    [expandedColumns, normalizedColumns]
  );

  const flattenedVisibleFields = useMemo(
    () => visibleColumns.map((column) => column.field),
    [visibleColumns]
  );

  const isColumnFrozen = (field: string): boolean => {
    if (frozenColumns.includes(field)) return true;

    const fieldIndex = flattenedVisibleFields.indexOf(field);
    if (fieldIndex === -1) return false;

    const maxFrozenIndex = Math.max(
      ...frozenColumns
        .map((frozenField) => flattenedVisibleFields.indexOf(frozenField))
        .filter((idx) => idx !== -1),
      -1
    );

    return fieldIndex <= maxFrozenIndex;
  };

  const getStickyLeft = (field: string): number => {
    let left = 0;

    for (const column of visibleColumns) {
      if (column.field === field) break;
      if (!isColumnFrozen(column.field)) continue;
      left += getColumnWidth(column, columnWidths);
    }

    return left;
  };

  const toggleColumnExpansion = (field: string) => {
    setExpandedColumns((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const toggleColumnVisibility = (field: string) => {
    setHiddenColumns((prev) => {
      const next = { ...prev };
      if (next[field]) {
        delete next[field];
      } else {
        next[field] = true;
      }
      return next;
    });

    setFrozenColumns((prev) => prev.filter((item) => item !== field));
    setActiveFilters((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setSortConfig((prev) =>
      prev.key === field ? { key: null, direction: null } : prev
    );
  };

  const handleFreezeColumn = (field: string) => {
    const fieldIndex = flattenedVisibleFields.indexOf(field);
    if (fieldIndex === -1) return;
    setFrozenColumns(flattenedVisibleFields.slice(0, fieldIndex + 1));
  };

  const handleUnfreezeColumns = () => setFrozenColumns([]);

  const headerSpacer = renderHeaderSpacer
    ? renderHeaderSpacer({
        data: filteredData,
        visibleColumns,
        columnCount: visibleColumns.length,
      })
    : null;

  const totalsRow = (
    <DataTableTotals
      visibleColumns={visibleColumns}
      data={filteredData}
      totalsByField={totalsByField}
      showTotalWithCurrencyDropdown={showTotalWithCurrencyDropdown}
      selectedCurrency={selectedCurrency}
      setSelectedCurrency={setSelectedCurrency}
      currencyOptions={currencyOptions}
      isColumnFrozen={isColumnFrozen}
      getStickyLeft={getStickyLeft}
      columnWidths={columnWidths}
      totalRowSx={totalRowSx}
      totalCellSx={totalCellSx}
    />
  );

  const fixedHeaderRows = () => (
    <>
      {showControlRow ? (
        <DataTableControls
          visibleColumns={visibleColumns}
          expandedColumns={expandedColumns}
          toggleColumnExpansion={toggleColumnExpansion}
          isColumnFrozen={isColumnFrozen}
          getStickyLeft={getStickyLeft}
          columnWidths={columnWidths}
          controlsRowSx={controlsRowSx}
          controlsCellSx={controlsCellSx}
        />
      ) : null}
      <DataTableHeader
        visibleColumns={visibleColumns}
        filterColumns={filterColumns}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        showFilters={showFilters}
        allowHideColumns={allowHideColumns}
        allowFreezeColumns={allowFreezeColumns}
        isColumnFrozen={isColumnFrozen}
        handleFreezeColumn={handleFreezeColumn}
        handleUnfreezeColumns={handleUnfreezeColumns}
        toggleColumnVisibility={toggleColumnVisibility}
        getStickyLeft={getStickyLeft}
        columnWidths={columnWidths}
        data={(filterSourceData as DataTableRow[]) || rows}
        fieldMappings={fieldMappings}
        headerRowSx={headerRowSx}
        headerCellSx={headerCellSx}
        columnResizable={columnResizable}
        startColumnResize={startColumnResize}
      />
      {showTotalRow && totalRowPlacement === "header" ? totalsRow : null}
      {headerSpacer}
    </>
  );

  const fixedFooterRows = () =>
    showTotalRow && totalRowPlacement === "footer" ? totalsRow : null;

  const virtuosoComponents = useMemo<
    TableComponents<DataTableRow, DataTableVirtuosoContext>
  >(
    () => ({
      Scroller: VirtuosoScroller,
      Table: VirtuosoTable,
      TableHead: VirtuosoTableHead,
      TableBody: VirtuosoTableBody,
      TableRow: VirtuosoTableRow,
      TableFoot: VirtuosoTableFoot,
    }),
    []
  );

  // Fire once the user reaches the bottom, but never while a load is already in
  // flight — consumers only need to gate on `hasNextPage` themselves.
  const requestMore = useCallback(() => {
    if (isLoading) return;
    onRefetch?.();
  }, [isLoading, onRefetch]);

  const showInitialSkeleton = isLoading && filteredData.length === 0;
  const showLoadingMore =
    allowInfiniteScroll && isLoading && filteredData.length > 0;

  const skeletonCellContext: SkeletonCellContext = {
    visibleColumns,
    isColumnFrozen,
    getStickyLeft,
    columnWidths,
  };

  const virtuosoContext = useMemo<DataTableVirtuosoContext>(
    () => ({ bodyRowSx }),
    [bodyRowSx]
  );

  // While paging, append throwaway skeleton rows so they scroll into view under
  // the real ones; they're stripped again the moment `isLoading` clears.
  const virtuosoData = useMemo<DataTableRow[]>(() => {
    if (!showLoadingMore) return filteredData;
    const sentinels = Array.from(
      { length: LOADING_MORE_SKELETON_COUNT },
      () => ({ [SKELETON_ROW_FLAG]: true }) as DataTableRow
    );
    return [...filteredData, ...sentinels];
  }, [showLoadingMore, filteredData]);

  // Non-virtualized end-of-list detection (the virtualized path uses virtuoso's
  // own `endReached`). Attach the returned ref to a sentinel at the body's end.
  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useDataTableInfiniteScroll({
    enabled:
      allowInfiniteScroll &&
      !enableVirtualization &&
      !!onRefetch &&
      !isLoading &&
      filteredData.length > 0,
    onReach: requestMore,
    rootRef: scrollRootRef,
  });

  const renderVirtualizedRowCells = (index: number, row: DataTableRow) => {
    if (isSkeletonRow(row)) {
      return buildSkeletonCells(`virtual-${index}`, skeletonCellContext);
    }

    const rowIdentifier = rowKeyResolver(row, index);

    return buildRowCells({
      row,
      index,
      data: filteredData,
      visibleColumns,
      rowIdentifier,
      isColumnFrozen,
      getStickyLeft,
      columnWidths,
      bodyCellSx,
      dateFormat,
    });
  };

  if (!filteredData.length) {
    return (
      <StyledDataTableContainer sx={tableContainerSx}>
        <StyledDataTable stickyHeader sx={tableSx}>
          <TableHead>{fixedHeaderRows()}</TableHead>
          <TableBody>
            {showInitialSkeleton ? (
              <DataTableSkeletonRows
                rowCount={skeletonRowCount}
                {...skeletonCellContext}
              />
            ) : (
              <BodyRow>
                <TableCell
                  colSpan={Math.max(visibleColumns.length, 1)}
                  sx={{ border: "none !important" }}
                >
                  <NoDataContent
                    entityName="records"
                    title={emptyMessage}
                    compact
                  />
                </TableCell>
              </BodyRow>
            )}
          </TableBody>
        </StyledDataTable>
      </StyledDataTableContainer>
    );
  }

  if (enableVirtualization) {
    return (
      <TableVirtuoso<DataTableRow, DataTableVirtuosoContext>
        style={{ height: "100%" }}
        data={virtuosoData}
        context={virtuosoContext}
        components={virtuosoComponents}
        fixedHeaderContent={fixedHeaderRows}
        fixedFooterContent={
          showTotalRow && totalRowPlacement === "footer"
            ? fixedFooterRows
            : undefined
        }
        itemContent={renderVirtualizedRowCells}
        computeItemKey={(index, row) =>
          isSkeletonRow(row)
            ? `data-table-skeleton-${index}`
            : `data-table-row-${rowKeyResolver(row, index)}`
        }
        endReached={allowInfiniteScroll && onRefetch ? requestMore : undefined}
        increaseViewportBy={320}
      />
    );
  }

  return (
    <StyledDataTableContainer sx={tableContainerSx} ref={scrollRootRef}>
      <StyledDataTable stickyHeader sx={tableSx}>
        <TableHead>{fixedHeaderRows()}</TableHead>

        <TableBody>
          <DataTableBody
            data={filteredData}
            visibleColumns={visibleColumns}
            rowKey={rowKeyResolver}
            isColumnFrozen={isColumnFrozen}
            getStickyLeft={getStickyLeft}
            columnWidths={columnWidths}
            bodyRowSx={bodyRowSx}
            bodyCellSx={bodyCellSx}
            dateFormat={dateFormat}
            renderRow={renderRow}
            renderBodySpacer={renderBodySpacer}
          />
          {showLoadingMore ? (
            <DataTableSkeletonRows
              rowCount={LOADING_MORE_SKELETON_COUNT}
              keyPrefix="more"
              {...skeletonCellContext}
            />
          ) : null}
          {allowInfiniteScroll && !isLoading ? (
            <BodyRow aria-hidden sx={{ height: "1px" }}>
              <TableCell
                ref={sentinelRef}
                colSpan={Math.max(visibleColumns.length, 1)}
                sx={{ p: 0, border: "none !important", height: "1px" }}
              />
            </BodyRow>
          ) : null}
        </TableBody>

        {showTotalRow && totalRowPlacement === "footer" ? (
          <TableFooter sx={{ position: "sticky", bottom: 0, zIndex: 230 }}>
            {totalsRow}
          </TableFooter>
        ) : null}
      </StyledDataTable>
    </StyledDataTableContainer>
  );
}

export default DataTable;
