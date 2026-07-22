import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

import type { ColumnWidths } from "./dataTableTypes";
import { getColumnWidth as resolveColumnWidth } from "./dataTableUtils";

/** Smallest width (px, before `--scale`) a column can be dragged down to. */
export const DEFAULT_MIN_COLUMN_WIDTH = 60;

export interface UseColumnResizeOptions {
  /** Master switch. When `false`, `startColumnResize` is a no-op. Defaults to `true`. */
  enabled?: boolean;
  /** Lower bound applied while dragging. Defaults to {@link DEFAULT_MIN_COLUMN_WIDTH}. */
  minWidth?: number;
  /** Seed widths (field → px). */
  defaultColumnWidths?: ColumnWidths;
  /** Notified with the full map whenever a width changes. */
  onColumnWidthsChange?: (columnWidths: ColumnWidths) => void;
}

export interface UseColumnResizeResult {
  /** Current field → width map (only fields that have been resized appear here). */
  columnWidths: ColumnWidths;
  /** Direct setter, for programmatic width changes. */
  setColumnWidths: React.Dispatch<React.SetStateAction<ColumnWidths>>;
  /**
   * Begin a drag from a resizer handle's `onMouseDown`. Tracks the pointer on
   * `window` and updates the column's width until the button is released,
   * clamping to `minWidth`.
   */
  startColumnResize: (
    field: string,
    startWidth: number,
    event: ReactMouseEvent
  ) => void;
  /** Clear all runtime widths (columns fall back to their declared/default width). */
  resetColumnWidths: () => void;
  /** Convenience: resolve a column's effective width against the current map. */
  getColumnWidth: (column: { field: string; width?: number }) => number;
}

/**
 * Column-resize engine extracted from the VizDom `DataTable` wrapper
 * (commit 9c0e7419). Owns the `columnWidths` map and a pointer-driven
 * `startColumnResize` handler you wire to a resizer element's `onMouseDown`.
 *
 * Standalone and design-system-agnostic — pair it with the `ColumnResizer`
 * handle and the width-aware styled cells, or drop it onto your own
 * `StyledTable` header cells.
 *
 * @example
 * const { startColumnResize, getColumnWidth } = useColumnResize();
 * <StyledHeaderCell style={{ width: getColumnWidth(col) }}>
 *   {col.header}
 *   <ColumnResizer onMouseDown={(e) => startColumnResize(col.field, getColumnWidth(col), e)} />
 * </StyledHeaderCell>
 */
export const useColumnResize = ({
  enabled = true,
  minWidth = DEFAULT_MIN_COLUMN_WIDTH,
  defaultColumnWidths = {},
  onColumnWidthsChange,
}: UseColumnResizeOptions = {}): UseColumnResizeResult => {
  const [columnWidths, setColumnWidths] =
    useState<ColumnWidths>(defaultColumnWidths);

  // Track the live listeners so a mid-drag unmount doesn't leak them.
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(
    () => () => {
      cleanupRef.current?.();
    },
    []
  );

  const startColumnResize = useCallback(
    (field: string, startWidth: number, event: ReactMouseEvent) => {
      if (!enabled) return;

      event.preventDefault();
      event.stopPropagation();

      const startX = event.clientX;

      const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
        const nextWidth = Math.max(
          minWidth,
          startWidth + (moveEvent.clientX - startX)
        );

        setColumnWidths((prev) => ({ ...prev, [field]: nextWidth }));
      };

      const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        cleanupRef.current = null;
      };

      // If a previous drag never released (e.g. lost pointerup), tear it down.
      cleanupRef.current?.();
      cleanupRef.current = handleMouseUp;

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [enabled, minWidth]
  );

  const resetColumnWidths = useCallback(() => setColumnWidths({}), []);

  const getColumnWidth = useCallback(
    (column: { field: string; width?: number }) =>
      resolveColumnWidth(column, columnWidths),
    [columnWidths]
  );

  useEffect(() => {
    onColumnWidthsChange?.(columnWidths);
  }, [columnWidths, onColumnWidthsChange]);

  return {
    columnWidths,
    setColumnWidths,
    startColumnResize,
    resetColumnWidths,
    getColumnWidth,
  };
};

export default useColumnResize;
