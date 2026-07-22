import type { SxProps, Theme } from "@mui/material";
import { Typography } from "@mui/material";

import { Dropdown } from "../../Dropdown";
import { EllipsisTooltip } from "../../EllipsisTooltip";
import type {
  ColumnWidths,
  CurrencyOption,
  DataTableColumn,
  DataTableRow,
  TotalsByField,
} from "../dataTableTypes";
import { TotalCell, TotalLabelWrap, TotalRow } from "../dataTableStyles";
import { formatCellValue, getColumnWidth } from "../dataTableUtils";
import { mergeSx, resolveSx } from "../sxHelpers";

export interface DataTableTotalsProps {
  visibleColumns: DataTableColumn[];
  data: DataTableRow[];
  totalsByField: TotalsByField;
  showTotalWithCurrencyDropdown: boolean;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  currencyOptions: CurrencyOption[];
  isColumnFrozen: (field: string) => boolean;
  getStickyLeft: (field: string) => number;
  columnWidths: ColumnWidths;
  totalRowSx?: SxProps<Theme>;
  totalCellSx?: SxProps<Theme> | ((column: DataTableColumn) => SxProps<Theme>);
}

/**
 * The summary row. The first cell shows the "Total" label (and, optionally, a
 * currency selector); columns flagged `showTotal` render their computed sum.
 */
const DataTableTotals = ({
  visibleColumns,
  data,
  totalsByField,
  showTotalWithCurrencyDropdown,
  selectedCurrency,
  setSelectedCurrency,
  currencyOptions,
  isColumnFrozen,
  getStickyLeft,
  columnWidths,
  totalRowSx,
  totalCellSx,
}: DataTableTotalsProps) => (
  <TotalRow sx={totalRowSx}>
    {visibleColumns.map((column, index) => {
      const nextColumn = visibleColumns[index + 1];
      const isFrozen = isColumnFrozen(column.field);
      const highlightTotal = Boolean(column.showTotal);
      const shouldAddPreTotalRightBorder =
        !highlightTotal && Boolean(nextColumn?.showTotal);

      return (
        <TotalCell
          key={`total-${column.field}`}
          $width={getColumnWidth(column, columnWidths)}
          $isSticky={isFrozen}
          $left={isFrozen ? getStickyLeft(column.field) : 0}
          $zIndex={isFrozen ? 225 : 205}
          $highlightTotal={highlightTotal}
          $borderRight={highlightTotal || shouldAddPreTotalRightBorder}
          align={column.totalAlign || column.bodyAlign || "left"}
          sx={mergeSx(resolveSx(totalCellSx, column), column.totalCellSx)}
        >
          {index === 0 ? (
            <TotalLabelWrap>
              <Typography variant="b1" fontWeight={600}>
                Total
              </Typography>
              {showTotalWithCurrencyDropdown ? (
                <Dropdown
                  boxSx={{ width: "calc(80px * var(--scale, 1))" }}
                  value={selectedCurrency}
                  options={currencyOptions}
                  onChange={(option) => setSelectedCurrency(option.value)}
                  size="small"
                />
              ) : null}
            </TotalLabelWrap>
          ) : column.renderTotal ? (
            column.renderTotal({
              total: totalsByField[column.field],
              column,
              data,
              selectedCurrency,
            })
          ) : column.showTotal ? (
            <EllipsisTooltip style={{ width: "100%" }}>
              {formatCellValue({
                value: totalsByField[column.field],
                column: {
                  ...column,
                  type: column.type === "date" ? "text" : column.type,
                },
                row: {
                  projectCurrency: selectedCurrency,
                  currency: selectedCurrency,
                },
              })}
            </EllipsisTooltip>
          ) : null}
        </TotalCell>
      );
    })}
  </TotalRow>
);

export default DataTableTotals;
