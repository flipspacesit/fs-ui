import { useCallback, useEffect, useMemo, useState } from "react";

import type {
  ActiveFilters,
  ColumnWidths,
  CurrencyOption,
  DataTableColumn,
  DataTableRow,
  ExpandedColumns,
  FieldMappings,
  HiddenColumns,
  SortConfig,
  TotalsByField,
} from "./dataTableTypes";
import {
  applyFiltersAndSort,
  calculateTotals,
  getColumnsByField,
  getCurrencyOptionsFromData,
  getFilterableColumns,
  getFlattenedColumns,
  getInitialExpandedColumns,
} from "./dataTableUtils";
import { useColumnResize } from "./useColumnResize";

/** Imperative snapshot + setters surfaced to `onStateChange` / `onTableApiChange`. */
export interface DataTableApi<Row = DataTableRow> {
  activeFilters: ActiveFilters;
  sortConfig: SortConfig;
  hiddenColumns: HiddenColumns;
  frozenColumns: string[];
  expandedColumns: ExpandedColumns;
  selectedCurrency: string;
  visibleColumns: DataTableColumn<Row>[];
  filteredData: Row[];
  totalsByField: TotalsByField;
  setActiveFilters: React.Dispatch<React.SetStateAction<ActiveFilters>>;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  setHiddenColumns: React.Dispatch<React.SetStateAction<HiddenColumns>>;
  setFrozenColumns: React.Dispatch<React.SetStateAction<string[]>>;
  setExpandedColumns: React.Dispatch<React.SetStateAction<ExpandedColumns>>;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<string>>;
  setColumnWidths: React.Dispatch<React.SetStateAction<ColumnWidths>>;
  clearFilters: () => void;
  clearHiddenColumns: () => void;
  toggleColumnVisibility: (field: string) => void;
}

export interface UseDataTableStateOptions<Row = DataTableRow> {
  data: Row[];
  columns: DataTableColumn<Row>[];
  defaultHiddenColumns?: HiddenColumns;
  defaultFrozenColumns?: string[];
  defaultFilters?: ActiveFilters;
  defaultSortConfig?: SortConfig;
  defaultColumnWidths?: ColumnWidths;
  fieldMappings?: FieldMappings;
  dateFormat?: string;
  showTotalWithCurrencyDropdown?: boolean;
  currencyField?: string;
  fallbackCurrencyField?: string;
  /** Enable the column-resize engine (drag handles are still gated per column). */
  columnResizable?: boolean;
  /** Minimum width a column can be dragged to. */
  minColumnWidth?: number;
  onStateChange?: (api: DataTableApi<Row>) => void;
  onFilterStateChange?: (activeFilters: ActiveFilters) => void;
  onHiddenColumnsChange?: (hiddenColumns: HiddenColumns) => void;
  onTableApiChange?: (api: DataTableApi<Row>) => void;
}

export interface UseDataTableStateResult<Row = DataTableRow> {
  activeFilters: ActiveFilters;
  setActiveFilters: React.Dispatch<React.SetStateAction<ActiveFilters>>;
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  hiddenColumns: HiddenColumns;
  setHiddenColumns: React.Dispatch<React.SetStateAction<HiddenColumns>>;
  frozenColumns: string[];
  setFrozenColumns: React.Dispatch<React.SetStateAction<string[]>>;
  expandedColumns: ExpandedColumns;
  setExpandedColumns: React.Dispatch<React.SetStateAction<ExpandedColumns>>;
  selectedCurrency: string;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<string>>;
  columnWidths: ColumnWidths;
  setColumnWidths: React.Dispatch<React.SetStateAction<ColumnWidths>>;
  startColumnResize: (
    field: string,
    startWidth: number,
    event: React.MouseEvent
  ) => void;
  resetColumnWidths: () => void;
  filteredData: Row[];
  visibleColumns: DataTableColumn<Row>[];
  totalsByField: TotalsByField;
  currencyOptions: CurrencyOption[];
  columnsByField: Record<string, DataTableColumn<Row>>;
  api: DataTableApi<Row>;
}

/**
 * All derived state for the {@link DataTable}: filtering, sorting, column
 * visibility, freezing, expansion, the totals-row currency selection, and
 * (via {@link useColumnResize}) live column widths. Ported to TS from the
 * VizDom `DataTable` hook, kept exported so consumers can drive their own
 * table markup off the same engine.
 */
export const useDataTableState = <Row = DataTableRow>({
  data,
  columns,
  defaultHiddenColumns = {},
  defaultFrozenColumns = [],
  defaultFilters = {},
  defaultSortConfig = { key: null, direction: null },
  defaultColumnWidths = {},
  fieldMappings = {},
  dateFormat = "DD MMM YYYY",
  showTotalWithCurrencyDropdown = false,
  currencyField = "projectCurrency",
  fallbackCurrencyField = "currency",
  columnResizable = false,
  minColumnWidth,
  onStateChange,
  onFilterStateChange,
  onHiddenColumnsChange,
  onTableApiChange,
}: UseDataTableStateOptions<Row>): UseDataTableStateResult<Row> => {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(defaultFilters);
  const [sortConfig, setSortConfig] = useState<SortConfig>(defaultSortConfig);
  const [hiddenColumns, setHiddenColumns] =
    useState<HiddenColumns>(defaultHiddenColumns);
  const [frozenColumns, setFrozenColumns] =
    useState<string[]>(defaultFrozenColumns);
  const [expandedColumns, setExpandedColumns] = useState<ExpandedColumns>(() =>
    getInitialExpandedColumns(columns)
  );
  const [selectedCurrency, setSelectedCurrency] = useState<string>(() => {
    const initialCurrencies = getCurrencyOptionsFromData(
      data as DataTableRow[],
      currencyField,
      fallbackCurrencyField
    );
    return initialCurrencies[0]?.value || "INR";
  });

  const {
    columnWidths,
    setColumnWidths,
    startColumnResize,
    resetColumnWidths,
  } = useColumnResize({
    enabled: columnResizable,
    minWidth: minColumnWidth,
    defaultColumnWidths,
  });

  const columnsByField = useMemo(
    () => getColumnsByField(getFilterableColumns(columns)),
    [columns]
  );

  const filteredData = useMemo(
    () =>
      applyFiltersAndSort({
        data,
        activeFilters,
        sortConfig,
        columnsByField,
        fieldMappings,
        dateFormat,
      }),
    [activeFilters, columnsByField, data, dateFormat, fieldMappings, sortConfig]
  );

  const currencyOptions = useMemo(
    () =>
      getCurrencyOptionsFromData(
        filteredData as DataTableRow[],
        currencyField,
        fallbackCurrencyField
      ),
    [currencyField, fallbackCurrencyField, filteredData]
  );

  const effectiveSelectedCurrency = useMemo(() => {
    if (!currencyOptions.length) return selectedCurrency;

    const hasSelectedCurrency = currencyOptions.some(
      (option) => option.value === selectedCurrency
    );

    return hasSelectedCurrency ? selectedCurrency : currencyOptions[0].value;
  }, [currencyOptions, selectedCurrency]);

  const visibleColumns = useMemo(
    () => getFlattenedColumns(columns, expandedColumns, hiddenColumns),
    [columns, expandedColumns, hiddenColumns]
  );

  const totalsByField = useMemo(
    () =>
      calculateTotals({
        data: filteredData,
        columns: visibleColumns,
        selectedCurrency: effectiveSelectedCurrency,
        showTotalWithCurrencyDropdown,
        currencyField,
        fallbackCurrencyField,
      }),
    [
      currencyField,
      effectiveSelectedCurrency,
      fallbackCurrencyField,
      filteredData,
      showTotalWithCurrencyDropdown,
      visibleColumns,
    ]
  );

  const toggleColumnVisibility = useCallback((field: string) => {
    setHiddenColumns((prev) => {
      const next = { ...prev };
      if (next[field]) {
        delete next[field];
      } else {
        next[field] = true;
      }
      return next;
    });
  }, []);

  const api = useMemo<DataTableApi<Row>>(
    () => ({
      activeFilters,
      sortConfig,
      hiddenColumns,
      frozenColumns,
      expandedColumns,
      selectedCurrency: effectiveSelectedCurrency,
      visibleColumns,
      filteredData,
      totalsByField,
      setActiveFilters,
      setSortConfig,
      setHiddenColumns,
      setFrozenColumns,
      setExpandedColumns,
      setSelectedCurrency,
      setColumnWidths,
      clearFilters: () => setActiveFilters({}),
      clearHiddenColumns: () => setHiddenColumns({}),
      toggleColumnVisibility,
    }),
    [
      activeFilters,
      effectiveSelectedCurrency,
      expandedColumns,
      filteredData,
      frozenColumns,
      hiddenColumns,
      setColumnWidths,
      sortConfig,
      toggleColumnVisibility,
      totalsByField,
      visibleColumns,
    ]
  );

  useEffect(() => {
    onFilterStateChange?.(activeFilters);
  }, [activeFilters, onFilterStateChange]);

  useEffect(() => {
    onHiddenColumnsChange?.(hiddenColumns);
  }, [hiddenColumns, onHiddenColumnsChange]);

  useEffect(() => {
    onStateChange?.(api);
  }, [api, onStateChange]);

  useEffect(() => {
    onTableApiChange?.(api);
  }, [api, onTableApiChange]);

  return {
    activeFilters,
    setActiveFilters,
    sortConfig,
    setSortConfig,
    hiddenColumns,
    setHiddenColumns,
    frozenColumns,
    setFrozenColumns,
    expandedColumns,
    setExpandedColumns,
    selectedCurrency: effectiveSelectedCurrency,
    setSelectedCurrency,
    columnWidths,
    setColumnWidths,
    startColumnResize,
    resetColumnWidths,
    filteredData,
    visibleColumns,
    totalsByField,
    currencyOptions,
    columnsByField,
    api,
  };
};

export default useDataTableState;
