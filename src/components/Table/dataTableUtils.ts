import type { ReactNode } from "react";
import dayjs from "dayjs";

import type {
  ActiveFilters,
  ColumnFilter,
  ColumnWidths,
  ConditionFilter,
  CurrencyOption,
  DataTableColumn,
  DataTableColumnType,
  DataTableRow,
  ExpandedColumns,
  FieldMappingItem,
  FieldMappings,
  HiddenColumns,
  SortConfig,
  TotalsByField,
} from "./dataTableTypes";

/** Fallback column width (px, before `--scale`) when neither runtime nor `width` is set. */
export const DEFAULT_COLUMN_WIDTH = 120;

/** Defaults merged into every column by {@link normalizeColumn}. */
export const DEFAULT_COLUMN_CONFIG = {
  headerAlign: "left",
  bodyAlign: "left",
  totalAlign: "right",
  type: "text",
  showTotal: false,
  showFilter: false,
  expandable: false,
  expandedColumns: [],
  resizable: false,
} as const;

/** Merge a raw column with the defaults, recursing into `expandedColumns`. */
export const normalizeColumn = <Row = DataTableRow>(
  column: DataTableColumn<Row>
): DataTableColumn<Row> => ({
  ...DEFAULT_COLUMN_CONFIG,
  ...column,
  expandedColumns: (column.expandedColumns || []).map(normalizeColumn),
});

export const normalizeColumns = <Row = DataTableRow>(
  columns: DataTableColumn<Row>[]
): DataTableColumn<Row>[] => columns.map(normalizeColumn);

/**
 * Resolve a column's effective width, preferring a runtime (resized) value,
 * then the column's declared `width`, then {@link DEFAULT_COLUMN_WIDTH}.
 *
 * Accepts any object exposing `field` / `width` so it stays usable with a
 * consumer's own generically-typed columns without variance friction.
 */
export const getColumnWidth = (
  column: { field: string; width?: number },
  columnWidths: ColumnWidths = {}
): number => columnWidths[column.field] || column.width || DEFAULT_COLUMN_WIDTH;

export const getCurrencyCodeFromRow = (
  row: DataTableRow,
  currencyField = "projectCurrency",
  fallbackCurrencyField = "currency"
): string =>
  (row?.[currencyField] as string) ||
  (row?.[fallbackCurrencyField] as string) ||
  "INR";

export const getCurrencyOptionsFromData = (
  data: DataTableRow[],
  currencyField = "projectCurrency",
  fallbackCurrencyField = "currency"
): CurrencyOption[] => {
  const unique = new Set<string>();

  data.forEach((row) => {
    const code = getCurrencyCodeFromRow(row, currencyField, fallbackCurrencyField);
    if (code) unique.add(code);
  });

  return Array.from(unique).map((code) => ({ label: code, value: code }));
};

export const formatDateValue = (
  value: unknown,
  dateFormat = "DD MMM YYYY"
): string => {
  if (!value) return "--";
  const parsed = dayjs(value as string);
  return parsed.isValid() ? parsed.format(dateFormat) : "--";
};

/**
 * Format a raw cell value for display based on the column `type`. When the
 * column declares a custom `render`, the raw value is returned untouched.
 */
export const formatCellValue = <Row = DataTableRow>({
  value,
  column,
  row,
  dateFormat = "DD MMM YYYY",
}: {
  value: unknown;
  column: DataTableColumn<Row>;
  row: DataTableRow;
  dateFormat?: string;
}): ReactNode => {
  if (column.render) return value as ReactNode;

  if (value === null || value === undefined || value === "") return "--";

  if (column.type === "date") {
    return formatDateValue(value, dateFormat);
  }

  if (column.type === "currency") {
    const currency = getCurrencyCodeFromRow(row);
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) return "--";

    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(numericValue);
    } catch {
      return numericValue.toLocaleString("en-IN");
    }
  }

  if (column.type === "number") {
    const numericValue = Number(value);
    return Number.isNaN(numericValue) ? "--" : numericValue.toLocaleString("en-IN");
  }

  return value as ReactNode;
};

/**
 * Flatten the column tree into the visible, ordered list: skips hidden columns
 * and inlines the children of expanded expandable columns.
 */
export const getFlattenedColumns = <Row = DataTableRow>(
  columns: DataTableColumn<Row>[],
  expandedColumns: ExpandedColumns,
  hiddenColumns: HiddenColumns
): DataTableColumn<Row>[] => {
  const flattened: DataTableColumn<Row>[] = [];

  columns.forEach((column) => {
    if (hiddenColumns[column.field]) return;

    flattened.push(column);

    if (
      column.expandable &&
      expandedColumns[column.field] &&
      column.expandedColumns?.length
    ) {
      column.expandedColumns.forEach((expandedColumn) => {
        if (hiddenColumns[expandedColumn.field]) return;
        flattened.push({
          ...expandedColumn,
          isExpandedChild: true,
          parentField: column.field,
        });
      });
    }
  });

  return flattened;
};

export const getColumnsByField = <Row = DataTableRow>(
  columns: DataTableColumn<Row>[]
): Record<string, DataTableColumn<Row>> =>
  columns.reduce<Record<string, DataTableColumn<Row>>>((acc, column) => {
    acc[column.field] = column;
    return acc;
  }, {});

/** Cumulative left offset (px) of a frozen column, summing prior frozen widths. */
export const getStickyLeft = <Row = DataTableRow>({
  targetField,
  flattenedColumns,
  frozenColumns,
  columnWidths,
}: {
  targetField: string;
  flattenedColumns: DataTableColumn<Row>[];
  frozenColumns: string[];
  columnWidths: ColumnWidths;
}): number => {
  let left = 0;

  for (const column of flattenedColumns) {
    if (column.field === targetField) break;
    if (!frozenColumns.includes(column.field)) continue;
    left += getColumnWidth(column, columnWidths);
  }

  return left;
};

/** All columns including expandable children, ignoring expansion/hidden state. */
export const getFilterableColumns = <Row = DataTableRow>(
  columns: DataTableColumn<Row>[]
): DataTableColumn<Row>[] => {
  const flattened: DataTableColumn<Row>[] = [];

  columns.forEach((column) => {
    flattened.push(column);
    if (column.expandedColumns?.length) {
      flattened.push(...column.expandedColumns);
    }
  });

  return flattened;
};

export const getNestedValue = (row: DataTableRow, field: string): unknown =>
  row?.[field];

const formatFilterValue = ({
  value,
  type,
  formatter,
}: {
  value: unknown;
  type?: DataTableColumnType;
  formatter?: (value: unknown) => string | number;
}): string => {
  if (value === null || value === undefined || value === "") return "";
  if (typeof formatter === "function") return String(formatter(value)).trim();
  if (type === "date") return formatDateValue(value);
  return String(value).trim();
};

const getMappingConfig = (
  fieldMappings: FieldMappings,
  field: string
): FieldMappingItem[] => {
  const mapping = fieldMappings[field];
  if (!mapping?.length) return [];

  return mapping.map((item) => {
    if (typeof item === "string") {
      return { field: item };
    }
    return { field: item.field, formatter: item.formatter };
  });
};

/** Distinct, naturally-sorted display values for a column's filter list. */
export const getUniqueValues = ({
  data,
  field,
  fieldMappings = {},
}: {
  data: DataTableRow[];
  field: string;
  fieldMappings?: FieldMappings;
}): string[] => {
  const mappingConfig = getMappingConfig(fieldMappings, field);
  const values = new Set<string>();

  data.forEach((row) => {
    const fields = mappingConfig.length
      ? mappingConfig
      : [{ field, formatter: undefined } as FieldMappingItem];

    fields.forEach((config) => {
      const rawValue = getNestedValue(row, config.field);

      if (Array.isArray(rawValue)) {
        rawValue.forEach((item) => {
          const formattedValue = formatFilterValue({
            value: item,
            formatter: config.formatter,
          });
          if (formattedValue) values.add(formattedValue);
        });
        return;
      }

      const formattedValue = formatFilterValue({
        value: rawValue,
        formatter: config.formatter,
      });
      if (formattedValue) values.add(formattedValue);
    });
  });

  return Array.from(values).sort((left, right) =>
    left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" })
  );
};

const normalizeComparableValue = (
  value: unknown,
  type?: DataTableColumnType,
  dateFormat?: string
): number | string => {
  if (type === "date") {
    const parsed = dayjs(value as string, dateFormat, true);
    return parsed.isValid() ? parsed.valueOf() : Number.NEGATIVE_INFINITY;
  }

  if (type === "number" || type === "currency") {
    const numericValue = Number(value);
    return Number.isNaN(numericValue) ? Number.NEGATIVE_INFINITY : numericValue;
  }

  return String(value ?? "").toLowerCase();
};

const matchCondition = ({
  candidateValue,
  filter,
  type,
  dateFormat,
}: {
  candidateValue: unknown;
  filter: ConditionFilter;
  type?: DataTableColumnType;
  dateFormat?: string;
}): boolean => {
  const normalizedCandidate = normalizeComparableValue(candidateValue, type, dateFormat);
  const normalizedFilter = normalizeComparableValue(filter.value, type, dateFormat);

  switch (filter.operator) {
    case "equals":
      return normalizedCandidate === normalizedFilter;
    case "notEquals":
      return normalizedCandidate !== normalizedFilter;
    case "contains":
      return String(normalizedCandidate).includes(String(normalizedFilter));
    case "startsWith":
      return String(normalizedCandidate).startsWith(String(normalizedFilter));
    case "greaterThan":
      return normalizedCandidate > normalizedFilter;
    case "greaterThanOrEqual":
      return normalizedCandidate >= normalizedFilter;
    case "lessThan":
      return normalizedCandidate < normalizedFilter;
    case "lessThanOrEqual":
      return normalizedCandidate <= normalizedFilter;
    default:
      return true;
  }
};

/** Apply the active filters and then the active sort, returning a new array. */
export const applyFiltersAndSort = <Row = DataTableRow>({
  data,
  activeFilters,
  sortConfig,
  columnsByField,
  fieldMappings,
  dateFormat,
}: {
  data: Row[];
  activeFilters: ActiveFilters;
  sortConfig: SortConfig;
  columnsByField: Record<string, DataTableColumn<Row>>;
  fieldMappings: FieldMappings;
  dateFormat?: string;
}): Row[] => {
  let nextData = [...data];

  const activeEntries = Object.entries(activeFilters).filter(([, filter]) => {
    if (!filter) return false;
    if (filter.type === "value") {
      return Array.isArray(filter.values) && filter.values.length > 0;
    }
    if (filter.type === "condition") {
      return String(filter.value ?? "").trim().length > 0;
    }
    return false;
  }) as [string, ColumnFilter][];

  if (activeEntries.length) {
    nextData = nextData.filter((row) =>
      activeEntries.every(([field, filter]) => {
        const column = columnsByField[field];
        if (!column) return true;

        const mappingConfig = getMappingConfig(fieldMappings, field);
        const valueConfigs = mappingConfig.length
          ? mappingConfig
          : [{ field, formatter: undefined } as FieldMappingItem];

        if (filter.type === "value") {
          return valueConfigs.some((config) => {
            const rawValue = getNestedValue(row as DataTableRow, config.field);

            if (Array.isArray(rawValue)) {
              return rawValue.some((item) =>
                filter.values.includes(
                  formatFilterValue({
                    value: item,
                    type: column.type,
                    formatter: config.formatter,
                  })
                )
              );
            }

            return filter.values.includes(
              formatFilterValue({
                value: rawValue,
                type: column.type,
                formatter: config.formatter,
              })
            );
          });
        }

        if (filter.type === "condition") {
          return valueConfigs.some((config) =>
            matchCondition({
              candidateValue: getNestedValue(row as DataTableRow, config.field),
              filter,
              type: column.type,
              dateFormat,
            })
          );
        }

        return true;
      })
    );
  }

  if (sortConfig.key && sortConfig.direction) {
    const sortColumn = columnsByField[sortConfig.key];
    const sortKey = sortConfig.key;

    if (sortColumn) {
      nextData = [...nextData].sort((left, right) => {
        const leftValue = normalizeComparableValue(
          getNestedValue(left as DataTableRow, sortKey),
          sortColumn.type,
          dateFormat
        );
        const rightValue = normalizeComparableValue(
          getNestedValue(right as DataTableRow, sortKey),
          sortColumn.type,
          dateFormat
        );

        if (leftValue < rightValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (leftValue > rightValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
  }

  return nextData;
};

/** Sum numeric values for every column with `showTotal`, honoring the currency filter. */
export const calculateTotals = <Row = DataTableRow>({
  data,
  columns,
  selectedCurrency,
  showTotalWithCurrencyDropdown,
  currencyField = "projectCurrency",
  fallbackCurrencyField = "currency",
}: {
  data: Row[];
  columns: DataTableColumn<Row>[];
  selectedCurrency: string;
  showTotalWithCurrencyDropdown: boolean;
  currencyField?: string;
  fallbackCurrencyField?: string;
}): TotalsByField =>
  columns.reduce<TotalsByField>((acc, column) => {
    if (!column.showTotal) return acc;

    acc[column.field] = data.reduce((sum, row) => {
      const rowCurrency = getCurrencyCodeFromRow(
        row as DataTableRow,
        currencyField,
        fallbackCurrencyField
      );

      if (showTotalWithCurrencyDropdown && rowCurrency !== selectedCurrency) {
        return sum;
      }

      const value = Number((row as DataTableRow)?.[column.field] ?? 0);
      return sum + (Number.isNaN(value) ? 0 : value);
    }, 0);

    return acc;
  }, {});

/** Seed the expanded-state map with every expandable column collapsed. */
export const getInitialExpandedColumns = <Row = DataTableRow>(
  columns: DataTableColumn<Row>[]
): ExpandedColumns =>
  columns.reduce<ExpandedColumns>((acc, column) => {
    if (column.expandable) {
      acc[column.field] = false;
    }
    return acc;
  }, {});
