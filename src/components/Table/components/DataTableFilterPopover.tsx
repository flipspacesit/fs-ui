import type { ReactNode } from "react";
import type { SelectChangeEvent, SxProps, Theme } from "@mui/material";
import {
  Box,
  Checkbox,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

import { DropDownApplyButton } from "../../Button";
import { ArrowUp } from "../../../icons/ArrowUp";
import { neutral, primary, semantic } from "../../../theme/tokens/colors";
import type {
  ActiveFilters,
  ColumnFilter,
  DataTableColumn,
  DataTableRow,
  FieldMappings,
  FilterOperator,
  SortConfig,
} from "../dataTableTypes";

const ButtonIcon = ({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
}) => (
  <Box sx={{ display: "flex", alignItems: "center", ...sx }}>{children}</Box>
);

const BASE_CONDITION_OPERATORS: { label: string; value: FilterOperator }[] = [
  { label: "Equals", value: "equals" },
  { label: "Not Equals", value: "notEquals" },
  { label: "Contains", value: "contains" },
  { label: "Starts With", value: "startsWith" },
];

const NUMERIC_DATE_CONDITION_OPERATORS: {
  label: string;
  value: FilterOperator;
}[] = [
  { label: "Greater Than", value: "greaterThan" },
  { label: "Less Than", value: "lessThan" },
  { label: "Greater Than or Equal", value: "greaterThanOrEqual" },
  { label: "Less Than or Equal", value: "lessThanOrEqual" },
];

interface MappingConfigEntry {
  field: string;
  label: string;
  formatter?: (value: unknown) => string | number;
}

const getMappingConfig = (
  fieldMappings: FieldMappings,
  columnField: string
): MappingConfigEntry[] => {
  const mapping = fieldMappings[columnField];
  if (!mapping?.length) return [];

  return mapping.map((item) => {
    if (typeof item === "string") {
      return { field: item, label: item };
    }
    return {
      field: item.field,
      label: item.label || item.field,
      formatter: item.formatter,
    };
  });
};

const formatDisplayValue = ({
  value,
  formatter,
  isDate,
}: {
  value: unknown;
  formatter?: (value: unknown) => string | number;
  isDate?: boolean;
}): string => {
  if (value === null || value === undefined || value === "") return "";
  if (typeof formatter === "function") return String(formatter(value));
  if (isDate) {
    const parsed = dayjs(value as string);
    return parsed.isValid() ? parsed.format("DD MMM YYYY") : String(value);
  }
  return String(value);
};

export interface DataTableFilterPopoverProps {
  column: DataTableColumn;
  columns: DataTableColumn[];
  data: DataTableRow[];
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  activeFilters: ActiveFilters;
  setActiveFilters: React.Dispatch<React.SetStateAction<ActiveFilters>>;
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  toggleColumnVisibility: (field: string) => void;
  allowHideColumns: boolean;
  fieldMappings: FieldMappings;
}

/**
 * Per-column header popover: hide column, sort A–Z / Z–A, "filter by value"
 * (checkbox list of distinct values, optionally grouped across mapped source
 * fields), and "filter by condition" (operator + operand).
 */
const DataTableFilterPopover = ({
  column,
  columns,
  data,
  anchorEl,
  open,
  onClose,
  activeFilters,
  setActiveFilters,
  sortConfig,
  setSortConfig,
  toggleColumnVisibility,
  allowHideColumns,
  fieldMappings,
}: DataTableFilterPopoverProps) => {
  const currentFilter: ColumnFilter | undefined = activeFilters[column.field];
  const columnType = column.type || "text";
  const isNumeric = columnType === "number" || columnType === "currency";
  const isDate = columnType === "date";
  const operators = [
    ...BASE_CONDITION_OPERATORS,
    ...(isNumeric || isDate ? NUMERIC_DATE_CONDITION_OPERATORS : []),
  ];

  const groupedUniqueValues = useMemo(() => {
    const mappingConfig = getMappingConfig(fieldMappings, column.field);

    if (!mappingConfig.length) {
      const values = new Set<string>();

      data.forEach((row) => {
        const formattedValue = formatDisplayValue({
          value: row?.[column.field],
          isDate,
        }).trim();
        if (formattedValue) values.add(formattedValue);
      });

      return {
        _default: {
          label: "Values",
          values: Array.from(values).sort((left, right) =>
            left.localeCompare(right, undefined, {
              numeric: true,
              sensitivity: "base",
            })
          ),
        },
      } as Record<string, { label: string; values: string[] }>;
    }

    return mappingConfig.reduce<
      Record<string, { label: string; values: string[] }>
    >((acc, config) => {
      const values = new Set<string>();

      data.forEach((row) => {
        const rawValue = row?.[config.field];

        if (Array.isArray(rawValue)) {
          rawValue.forEach((item) => {
            const formattedValue = formatDisplayValue({
              value: item,
              formatter: config.formatter,
              isDate,
            }).trim();
            if (formattedValue) values.add(formattedValue);
          });
          return;
        }

        const formattedValue = formatDisplayValue({
          value: rawValue,
          formatter: config.formatter,
          isDate,
        }).trim();
        if (formattedValue) values.add(formattedValue);
      });

      acc[config.field] = {
        label: config.label,
        values: Array.from(values).sort((left, right) =>
          left.localeCompare(right, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        ),
      };

      return acc;
    }, {});
  }, [column.field, data, fieldMappings, isDate]);

  const [selectedValues, setSelectedValues] = useState<string[]>(() =>
    currentFilter?.type === "value" ? currentFilter.values || [] : []
  );
  const [conditionOperator, setConditionOperator] = useState<FilterOperator>(
    () =>
      currentFilter?.type === "condition"
        ? currentFilter.operator || "contains"
        : "contains"
  );
  const [conditionValue, setConditionValue] = useState<string>(() =>
    currentFilter?.type === "condition" ? String(currentFilter.value || "") : ""
  );
  const [isValueExpanded, setIsValueExpanded] = useState(
    currentFilter?.type === "value"
  );
  const [isConditionExpanded, setIsConditionExpanded] = useState(
    currentFilter?.type === "condition"
  );

  const handleValueChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedValues((prev) => [...prev, value]);
    } else {
      setSelectedValues((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleSelectAll = () => {
    setSelectedValues(
      Object.values(groupedUniqueValues).flatMap((group) => group.values)
    );
  };

  const handleClearAll = () => {
    setSelectedValues([]);
  };

  const clearFilter = () => {
    setSelectedValues([]);
    setConditionOperator("contains");
    setConditionValue("");

    setActiveFilters((prev) => {
      const next = { ...prev };
      delete next[column.field];
      return next;
    });
    setSortConfig({ key: null, direction: null });
    onClose();
  };

  const applyFilters = () => {
    setActiveFilters((prev) => {
      const next = { ...prev };
      delete next[column.field];

      if (selectedValues.length > 0) {
        next[column.field] = { type: "value", values: selectedValues };
      }

      if (String(conditionValue).trim()) {
        next[column.field] = {
          type: "condition",
          operator: conditionOperator,
          value: conditionValue,
        };
      }

      return next;
    });

    onClose();
  };

  const clickableRowSx: SxProps<Theme> = {
    padding: "4px 8px",
    cursor: "pointer",
    "&:hover": { backgroundColor: primary.blue[100] },
  };

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        zIndex: 1200,
        "& .MuiPopover-paper": {
          width: "calc(220px * var(--scale, 1))",
          boxShadow: "none",
          borderRadius: "8px",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: neutral.white,
          border: `1px solid ${primary.blue[300]}`,
          borderRadius: "8px",
          width: "calc(220px * var(--scale, 1))",
          padding: "4px",
        }}
      >
        <Stack sx={{ paddingBottom: "4px" }}>
          {allowHideColumns && columns.length > 1 && (
            <Typography
              variant="c1"
              onClick={() => {
                toggleColumnVisibility(column.field);
                onClose();
              }}
              sx={clickableRowSx}
            >
              Hide Column
            </Typography>
          )}
          <Typography
            onClick={() => {
              setSortConfig({ key: column.field, direction: "asc" });
              onClose();
            }}
            variant="c1"
            sx={{
              ...clickableRowSx,
              backgroundColor:
                sortConfig.direction === "asc" && sortConfig.key === column.field
                  ? primary.blue[100]
                  : "transparent",
            }}
          >
            Sort A-Z
          </Typography>
          <Typography
            onClick={() => {
              setSortConfig({ key: column.field, direction: "desc" });
              onClose();
            }}
            variant="c1"
            sx={{
              ...clickableRowSx,
              backgroundColor:
                sortConfig.direction === "desc" && sortConfig.key === column.field
                  ? primary.blue[100]
                  : "transparent",
            }}
          >
            Sort Z-A
          </Typography>
        </Stack>

        <Box
          sx={{
            borderTop: `1px solid ${primary.blue[100]}`,
            margin: "4px 0",
          }}
        />

        <Box>
          <Typography
            onClick={() => setIsValueExpanded((prev) => !prev)}
            variant="c1"
            sx={{
              ...clickableRowSx,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <ButtonIcon sx={{ rotate: isValueExpanded ? "180deg" : "90deg" }}>
              <ArrowUp size="16px" />
            </ButtonIcon>
            Filter By Value
          </Typography>

          {isValueExpanded && (
            <Box sx={{ marginLeft: "16px", marginTop: "4px" }}>
              {Object.keys(groupedUniqueValues).length > 0 && (
                <Box sx={{ display: "flex", gap: "8px", padding: "4px 0" }}>
                  <Typography
                    onClick={handleSelectAll}
                    variant="f1"
                    sx={{
                      color: primary.blue[500],
                      cursor: "pointer",
                      textDecoration: "underline",
                      "&:hover": { color: primary.blue.primary },
                    }}
                  >
                    Select All (
                    {Object.values(groupedUniqueValues).reduce(
                      (sum, group) => sum + group.values.length,
                      0
                    )}
                    )
                  </Typography>
                  <Typography
                    onClick={handleClearAll}
                    variant="f1"
                    sx={{
                      color: primary.blue[500],
                      cursor: "pointer",
                      textDecoration: "underline",
                      "&:hover": { color: primary.blue.primary },
                    }}
                  >
                    Clear
                  </Typography>
                </Box>
              )}

              {Object.entries(groupedUniqueValues).map(([fieldName, group]) => {
                if (!group.values.length) return null;

                return (
                  <Box key={fieldName} sx={{ marginTop: "8px" }}>
                    {Object.keys(groupedUniqueValues).length > 1 && (
                      <Typography
                        variant="f2"
                        sx={{
                          fontWeight: 600,
                          color: primary.blue[500],
                          padding: "2px 0",
                          borderBottom: `1px solid ${primary.blue[100]}`,
                          marginBottom: "4px",
                        }}
                      >
                        {group.label}
                      </Typography>
                    )}

                    <Box
                      sx={{
                        maxHeight: "calc(120px * var(--scale, 1))",
                        overflowY: "auto",
                      }}
                    >
                      {group.values.map((value) => (
                        <Box
                          key={`${fieldName}-${value}`}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            margin: "2px 0",
                          }}
                        >
                          <Checkbox
                            checked={selectedValues.includes(value)}
                            onChange={(event) =>
                              handleValueChange(value, event.target.checked)
                            }
                            sx={{
                              color: primary.blue[500],
                              "& .MuiSvgIcon-root": { fontSize: "16px" },
                              "&.Mui-checked": { color: primary.blue[500] },
                            }}
                          />
                          <Typography
                            variant="f1"
                            sx={{ color: neutral.grey[400] }}
                          >
                            {value}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>

        <Box>
          <Typography
            onClick={() => setIsConditionExpanded((prev) => !prev)}
            variant="c1"
            sx={{
              ...clickableRowSx,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <ButtonIcon sx={{ rotate: isConditionExpanded ? "180deg" : "90deg" }}>
              <ArrowUp size="16px" />
            </ButtonIcon>
            Filter By Condition
          </Typography>

          {isConditionExpanded && (
            <Box sx={{ marginLeft: "16px", marginTop: "4px" }}>
              <Select
                value={conditionOperator}
                onChange={(event: SelectChangeEvent) =>
                  setConditionOperator(event.target.value as FilterOperator)
                }
                sx={{
                  fontSize: "10px",
                  height: "calc(28px * var(--scale, 1))",
                  width: "100%",
                  marginBottom: "4px",
                  "& .MuiSelect-select": { padding: "4px 8px" },
                }}
              >
                {operators.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Typography variant="c1">{option.label}</Typography>
                  </MenuItem>
                ))}
              </Select>
              <TextField
                type={isNumeric ? "number" : "text"}
                value={conditionValue}
                onChange={(event) => setConditionValue(event.target.value)}
                placeholder={
                  isNumeric
                    ? "Enter amount"
                    : isDate
                      ? "Enter date"
                      : "Enter value"
                }
                fullWidth
                size="small"
                sx={{
                  fontSize: "10px",
                  height: "calc(28px * var(--scale, 1))",
                  "& .MuiInputBase-input": { padding: "4px 8px" },
                }}
              />
            </Box>
          )}
        </Box>

        <Box
          sx={{
            borderTop: `1px solid ${primary.blue[100]}`,
            padding: "4px",
            paddingTop: "8px",
            marginTop: "8px",
            display: "flex",
            gap: "6px",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            variant="b1"
            onClick={clearFilter}
            sx={{
              fontSize: "12px",
              textDecoration: "underline",
              color: semantic.error[400],
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Clear
          </Typography>
          <DropDownApplyButton fullWidth={false} onClick={applyFilters}>
            Apply
          </DropDownApplyButton>
        </Box>
      </Box>
    </Popover>
  );
};

export default DataTableFilterPopover;
