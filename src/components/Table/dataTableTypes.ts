import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material";

/**
 * Shared types for the {@link DataTable} component and its composable
 * primitives (the resize/state hooks, styled cells, and sub-components).
 *
 * Ported to TypeScript from the VizDom `components_v2/DataTable` wrapper so the
 * whole feature set (column resizing, sticky/frozen columns, filtering, totals,
 * virtualization) lives in the design system.
 */

/** How a column's raw value is interpreted for formatting, filtering and totals. */
export type DataTableColumnType = "text" | "number" | "currency" | "date";

/** Horizontal alignment accepted by the underlying MUI `TableCell`. */
export type DataTableCellAlign =
  | "left"
  | "center"
  | "right"
  | "inherit"
  | "justify";

/** A single table row. Kept intentionally open — consumers pass their own shape. */
export type DataTableRow = Record<string, unknown>;

/** Params handed to a column's custom `render` (body cell). */
export interface DataTableCellRenderParams<Row = DataTableRow> {
  row: Row;
  index: number;
  data: Row[];
  value: unknown;
  column: DataTableColumn<Row>;
}

/** Params handed to a column's custom `renderHeader`. */
export interface DataTableHeaderRenderParams<Row = DataTableRow> {
  column: DataTableColumn<Row>;
  columns: DataTableColumn<Row>[];
  data: Row[];
}

/** Params handed to a column's custom `renderTotal`. */
export interface DataTableTotalRenderParams<Row = DataTableRow> {
  total: number | undefined;
  column: DataTableColumn<Row>;
  data: Row[];
  selectedCurrency: string;
}

/**
 * Column definition. Only `field` is required — everything else is normalized
 * against {@link DEFAULT_COLUMN_CONFIG}. Set `resizable` to enable the drag
 * handle when the table's `columnResizable` prop is on.
 */
export interface DataTableColumn<Row = DataTableRow> {
  /** Row key this column reads (also its identity for width/filter/sort state). */
  field: string;
  /** Header label (falls back to nothing; use `renderHeader` for custom nodes). */
  header?: ReactNode;
  /** Fixed/base width in px (before `--scale`). Resizing overrides this at runtime. */
  width?: number;
  /** Value interpretation for formatting/filtering/totals. Defaults to `"text"`. */
  type?: DataTableColumnType;
  /** Show a drag handle on this column when the table has `columnResizable`. */
  resizable?: boolean;
  headerAlign?: DataTableCellAlign;
  bodyAlign?: DataTableCellAlign;
  totalAlign?: DataTableCellAlign;
  /** Include this column in the totals row (sum of numeric values). */
  showTotal?: boolean;
  /** Show the filter/sort funnel button in the header. */
  showFilter?: boolean;
  /** Column is an expandable group (renders a control-row toggle). */
  expandable?: boolean;
  /** Child columns revealed when an expandable column is expanded. */
  expandedColumns?: DataTableColumn<Row>[];
  /** Internal — set by the flattener on revealed child columns. */
  isExpandedChild?: boolean;
  /** Internal — parent field of a revealed child column. */
  parentField?: string;
  /** Custom body-cell renderer. When present, `formatCellValue` is bypassed. */
  render?: (params: DataTableCellRenderParams<Row>) => ReactNode;
  /** Custom header renderer. */
  renderHeader?: (params: DataTableHeaderRenderParams<Row>) => ReactNode;
  /** Custom totals-cell renderer. */
  renderTotal?: (params: DataTableTotalRenderParams<Row>) => ReactNode;
  headerCellSx?: SxProps<Theme>;
  bodyCellSx?: SxProps<Theme>;
  totalCellSx?: SxProps<Theme>;
}

/** Sort direction; `null` means unsorted. */
export type SortDirection = "asc" | "desc" | null;

/** Active sort — which column and which direction. */
export interface SortConfig {
  key: string | null;
  direction: SortDirection;
}

/** Comparison operators available in the "Filter by condition" section. */
export type FilterOperator =
  | "equals"
  | "notEquals"
  | "contains"
  | "startsWith"
  | "greaterThan"
  | "greaterThanOrEqual"
  | "lessThan"
  | "lessThanOrEqual";

/** Checkbox ("filter by value") selection. */
export interface ValueFilter {
  type: "value";
  values: string[];
}

/** Operator + operand ("filter by condition"). */
export interface ConditionFilter {
  type: "condition";
  operator: FilterOperator;
  value: string | number;
}

export type ColumnFilter = ValueFilter | ConditionFilter;

/** Field → active filter map. */
export type ActiveFilters = Record<string, ColumnFilter | undefined>;

/** Field → hidden flag. */
export type HiddenColumns = Record<string, boolean>;

/** Field → expanded flag (for expandable column groups). */
export type ExpandedColumns = Record<string, boolean>;

/** Field → runtime width (px, before `--scale`). Written by column resizing. */
export type ColumnWidths = Record<string, number>;

/** A mapped source field for multi-field filtering, optionally formatted. */
export interface FieldMappingItem {
  field: string;
  label?: string;
  formatter?: (value: unknown) => string | number;
}

/** A field mapping entry — a bare field name or a {@link FieldMappingItem}. */
export type FieldMapping = string | FieldMappingItem;

/** Column field → the source fields its filter draws its options from. */
export type FieldMappings = Record<string, FieldMapping[]>;

/** Currency dropdown option for the totals row. */
export interface CurrencyOption {
  label: string;
  value: string;
}

/** Field → computed total. */
export type TotalsByField = Record<string, number>;
