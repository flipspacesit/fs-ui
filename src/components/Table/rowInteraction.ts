import type { KeyboardEvent, MouseEvent } from "react";

import type { DataTableRow, DataTableRowClickHandler } from "./dataTableTypes";

/**
 * Row-level click/keyboard wiring for the {@link DataTable}'s `onRowClick`.
 *
 * Both body renderers (the plain `DataTableBody` and the virtualized row slot)
 * build their handlers here so a clickable row behaves identically with and
 * without virtualization.
 */

/**
 * Controls that own their own click. A row click fired from inside one of these
 * would double-handle the interaction — a row that opens a drawer plus a per-row
 * delete button, say. Mark any other node `data-no-row-click` to opt it out too.
 */
const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "select",
  "textarea",
  "label",
  "summary",
  '[role="button"]',
  '[role="checkbox"]',
  '[role="link"]',
  '[role="menuitem"]',
  '[role="switch"]',
  '[role="tab"]',
  '[contenteditable="true"]',
  "[data-no-row-click]",
].join(", ");

/** Keys that activate a focused row, mirroring native button behavior. */
const ACTIVATION_KEYS = ["Enter", " "];

/** True when the event originated inside a control that handles its own clicks. */
export const isInteractiveTarget = (target: EventTarget | null): boolean =>
  target instanceof Element ? Boolean(target.closest(INTERACTIVE_SELECTOR)) : false;

export interface RowClickPropsParams<Row = DataTableRow> {
  row: Row;
  index: number;
  onRowClick?: DataTableRowClickHandler<Row>;
}

/** Props spread onto a `BodyRow` to make it activatable. */
export interface RowClickProps {
  /** Drives the pointer cursor + hover tint on the styled `BodyRow`. */
  $clickable?: boolean;
  tabIndex?: number;
  onClick?: (event: MouseEvent<HTMLTableRowElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTableRowElement>) => void;
}

/**
 * Build the row props implementing `onRowClick`: the pointer/hover affordance,
 * mouse activation, and Enter/Space activation once the row is focused.
 *
 * Returns an empty object when there is no handler, so a table without
 * `onRowClick` keeps exactly the markup (and tab order) it had before.
 */
export const getRowClickProps = <Row = DataTableRow>({
  row,
  index,
  onRowClick,
}: RowClickPropsParams<Row>): RowClickProps => {
  if (!onRowClick) return {};

  return {
    $clickable: true,
    tabIndex: 0,
    onClick: (event) => {
      if (isInteractiveTarget(event.target)) return;
      onRowClick(row, index, event);
    },
    onKeyDown: (event) => {
      if (!ACTIVATION_KEYS.includes(event.key)) return;
      // Only the row itself activates — a keypress on a control inside a cell
      // bubbles up here and must stay that control's business.
      if (event.target !== event.currentTarget) return;
      // Space would otherwise scroll the table container.
      event.preventDefault();
      onRowClick(row, index, event);
    },
  };
};
