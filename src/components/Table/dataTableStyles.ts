import {
  Box,
  IconButton,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { primary, neutral, semantic } from "../../theme/tokens/colors";

/**
 * Styled table parts for the {@link DataTable}, ported from the VizDom
 * `DataTable/styles.js` (commit 9c0e7419). VizDom used styled-components with
 * `$`-transient props; here we use MUI `styled` (fs-ui's dominant idiom) with a
 * `shouldForwardProp` guard so the `$width` / `$isSticky` / … control props are
 * consumed for styling and never leak onto the DOM.
 *
 * All colors come from the design-system tokens. Widths and sticky offsets are
 * multiplied by the consumer-supplied `--scale` CSS variable, matching every
 * other fs-ui component.
 *
 * VizDom `theme.palette` → fs-ui token map:
 *   blue[600]  → primary.blue.primary   stateBlue[300] → primary.slateBlue[300]
 *   blue[500]  → primary.blue[500]      stateBlue[200] → primary.slateBlue[200]
 *   blue[300]  → primary.blue[300]      stateBlue[100] → primary.slateBlue[100]
 *   white.main → neutral.white          softSteel[300] → neutral.softSteel[300]
 *   black.main → neutral.ink            grey[200]      → neutral.grey[200]
 */

/** Don't forward `$`-prefixed transient styling props to the underlying element. */
const forwardTransient = {
  shouldForwardProp: (prop: PropertyKey) => !String(prop).startsWith("$"),
};

const getWidthStyles = (width?: number) =>
  width
    ? {
        width: `calc(${width}px * var(--scale, 1))`,
        minWidth: `calc(${width}px * var(--scale, 1))`,
        maxWidth: `calc(${width}px * var(--scale, 1))`,
      }
    : {};

const getStickyStyles = (isSticky: boolean, left = 0, zIndex = 10) =>
  isSticky
    ? {
        position: "sticky" as const,
        left: `calc(${left}px * var(--scale, 1))`,
        zIndex,
      }
    : {};

/**
 * Append `!important`. The fs-ui theme styles tables with high-specificity
 * descendant selectors (`.MuiTableHead-root .MuiTableRow-root
 * .MuiTableCell-root`), which a single-class `styled(TableCell)` can't beat.
 * `!important` keeps the DataTable's own look intact with or without that theme
 * — the same approach the existing `StyledHeaderCell` primitive uses.
 */
const imp = (value: string): string => `${value} !important`;

/** Scrolling wrapper — fills its parent and scrolls both axes. */
export const StyledDataTableContainer = styled(TableContainer)({
  boxShadow: "none",
  height: "100%",
  overflow: "auto",
  position: "relative",
});

/** Shadow-less paper used as the container's surface component. */
export const StyledDataTablePaper = styled(Paper)({
  boxShadow: "none",
});

/** The `<table>` itself — `max-content` width so columns keep their fixed size. */
export const StyledDataTable = styled(Table)({
  minWidth: "max-content",
  borderCollapse: "separate",
  borderSpacing: 0,
  position: "relative",
  borderRadius: "0px !important",
  "& .MuiTableHead-root": {
    position: "sticky",
    top: 0,
    zIndex: 220,
  },
  "& .MuiTableBody-root": {
    position: "relative",
    zIndex: 1,
  },
});

export const ControlsRow = styled(TableRow)({
  height: "calc(20px * var(--scale, 1))",
});

export const HeaderRow = styled(TableRow)({
  height: "calc(32px * var(--scale, 1))",
});

export const TotalRow = styled(TableRow)({
  height: "calc(28px * var(--scale, 1))",
});

export const BodyRow = styled(TableRow)({
  height: "calc(42px * var(--scale, 1))",
});

export interface DataTableCellStyleProps {
  $width?: number;
  $isSticky?: boolean;
  $left?: number;
  $zIndex?: number;
  $borderLeft?: boolean;
  $borderRight?: boolean;
}

/** Control-row cell (expand toggles + group lines for expandable columns). */
export const ControlsCell = styled(
  TableCell,
  forwardTransient
)<DataTableCellStyleProps>(
  ({
    $width,
    $isSticky = false,
    $left = 0,
    $zIndex = 10,
    $borderLeft = false,
    $borderRight = false,
  }) => ({
    ...getWidthStyles($width),
    position: "relative",
    height: imp("calc(20px * var(--scale, 1))"),
    padding: imp("0px"),
    border: imp("none"),
    borderRadius: "0px !important",
    backgroundColor: imp(neutral.softSteel[50]),
    overflow: "hidden",
    borderLeft: imp($borderLeft ? `0.5px solid ${primary.slateBlue[300]}` : "none"),
    borderRight: imp($borderRight ? `0.5px solid ${primary.slateBlue[300]}` : "none"),
    ...getStickyStyles($isSticky, $left, $zIndex),
  })
);

/** Header cell — dark-blue fill, white text, right hairline; hosts the resizer. */
export const HeaderCell = styled(
  TableCell,
  forwardTransient
)<DataTableCellStyleProps>(
  ({ $width, $isSticky = false, $left = 0, $zIndex = 10 }) => ({
    ...getWidthStyles($width),
    position: "relative",
    zIndex: $zIndex,
    ...getStickyStyles($isSticky, $left, $zIndex),
    height: imp("calc(32px * var(--scale, 1))"),
    backgroundColor: imp(primary.blue.primary),
    color: imp(neutral.white),
    border: imp("none"),
    borderRadius: "0px !important",
    padding: imp("6px 8px"),
    fontWeight: imp("500"),
    borderRight: imp(`0.5px solid ${primary.slateBlue[300]}`),
    "&:last-of-type": {
      borderRight: imp("none"),
    },
  })
);

export interface DataTableTotalCellStyleProps extends DataTableCellStyleProps {
  $highlightTotal?: boolean;
}

/** Totals-row cell — tinted slate-blue, emphasized on total-bearing columns. */
export const TotalCell = styled(
  TableCell,
  forwardTransient
)<DataTableTotalCellStyleProps>(
  ({
    $width,
    $isSticky = false,
    $left = 0,
    $zIndex = 10,
    $highlightTotal = false,
    $borderLeft = false,
    $borderRight = false,
  }) => ({
    ...getWidthStyles($width),
    ...getStickyStyles($isSticky, $left, $zIndex),
    height: imp("calc(28px * var(--scale, 1))"),
    backgroundColor: imp(
      $highlightTotal ? primary.slateBlue[200] : primary.slateBlue[100]
    ),
    color: imp(neutral.ink),
    border: imp("none"),
    borderLeft: imp($borderLeft ? `0.5px solid ${primary.slateBlue[300]}` : "none"),
    borderRight: imp($borderRight ? `0.5px solid ${primary.slateBlue[300]}` : "none"),
    borderRadius: "0px !important",
    padding: imp("8px"),
    fontWeight: imp("600"),
    overflow: "hidden",
  })
);

export interface DataTableBodyCellStyleProps extends DataTableCellStyleProps {
  $isSelected?: boolean;
}

/** Body cell — white (or selected-blue) fill with blue hairline grid. */
export const DataBodyCell = styled(
  TableCell,
  forwardTransient
)<DataTableBodyCellStyleProps>(
  ({ $width, $isSticky = false, $left = 0, $zIndex = 10, $isSelected = false }) => ({
    ...getWidthStyles($width),
    ...getStickyStyles($isSticky, $left, $zIndex),
    height: imp("calc(42px * var(--scale, 1))"),
    backgroundColor: imp($isSelected ? primary.blue[100] : neutral.white),
    color: imp(neutral.ink),
    border: imp("none"),
    borderRadius: "0px !important",
    padding: imp("8px"),
    fontWeight: imp("600"),
    borderRight: imp(`0.5px solid ${primary.blue[300]}`),
    borderBottom: imp(`0.5px solid ${primary.blue[300]}`),
    overflow: "hidden",
    "&:last-of-type": {
      borderRight: imp("none"),
    },
  })
);

/** Expand/collapse toggle rendered in the control row for expandable columns. */
export const ExpandToggle = styled(
  IconButton,
  forwardTransient
)<{ $isExpanded?: boolean }>(({ $isExpanded = false }) => ({
  position: "absolute",
  top: "50%",
  left: $isExpanded ? "16px" : "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 10,
  width: "calc(14px * var(--scale, 1))",
  height: "calc(14px * var(--scale, 1))",
  borderRadius: 2,
  border: `0.5px solid ${neutral.ink}`,
  color: neutral.ink,
  padding: 0,
  backgroundColor: $isExpanded ? neutral.grey[200] : "transparent",
  "&:hover": {
    backgroundColor: $isExpanded ? neutral.grey[200] : "transparent",
  },
}));

/** Horizontal grouping line drawn across an expanded parent / child cells. */
export const GroupLine = styled("div")({
  position: "absolute",
  left: 16,
  right: 16,
  top: "50%",
  transform: "translateY(-50%)",
  height: "1px",
  background: neutral.ink,
  opacity: 0.9,
  pointerEvents: "none",
});

/** Vertical end-cap for a group line at the last child column. */
export const GroupLineEnd = styled("div")({
  position: "absolute",
  right: 16,
  top: "50%",
  width: "1px",
  height: "100%",
  background: neutral.ink,
  pointerEvents: "none",
});

/** The header filter/sort trigger (wraps the funnel icon). */
export const FilterButton = styled(
  "button",
  forwardTransient
)<{ $hasActiveFilter?: boolean }>(({ $hasActiveFilter = false }) => ({
  cursor: "pointer",
  color: $hasActiveFilter ? semantic.success.primary : neutral.grey[400],
  marginRight: 0,
  fontWeight: $hasActiveFilter ? "bold" : "normal",
  background: "none",
  border: "none",
  padding: 0,
  display: "inline-flex",
  alignItems: "center",
}));

/**
 * The drag handle. Absolutely positioned on the right edge of a header cell;
 * wire its `onMouseDown` to `startColumnResize`. Ships standalone so it can be
 * dropped onto any `StyledTable` header cell alongside {@link useColumnResize}.
 */
export const ColumnResizer = styled(Box)({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  width: "4px",
  cursor: "col-resize",
  zIndex: 250,
  transform: "translateX(50%)",
  touchAction: "none",
  "&:hover": {
    backgroundColor: primary.slateBlue[300],
  },
});

/** Flex wrapper inside a header cell (label + filter button, with the resizer). */
export const HeaderCellContent = styled(Box)({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  overflow: "hidden",
});

/** Flex wrapper for the "Total" label + optional currency dropdown. */
export const TotalLabelWrap = styled(Box)({
  display: "flex",
  width: "100%",
  alignItems: "center",
  gap: "6px",
});

/** Thin blank row used to visually separate the header block from the body. */
export const SpacerCell = styled(TableCell)({
  padding: 0,
  height: "calc(10px * var(--scale, 1))",
  border: "none",
  backgroundColor: neutral.white,
});

/** Shared paper styling for the header context menu popover. */
export const FilterPopoverPaperSx = {
  p: 0,
  width: "calc(280px * var(--scale, 1))",
  borderRadius: "8px",
  border: `0.5px solid ${neutral.softSteel[300]}`,
  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
} as const;
