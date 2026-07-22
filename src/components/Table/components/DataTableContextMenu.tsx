import { MenuItem, Popover } from "@mui/material";

import { FilterPopoverPaperSx } from "../dataTableStyles";

export interface DataTableContextMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  columnField: string;
  isColumnFrozen: (field: string) => boolean;
  handleFreezeColumn: (field: string) => void;
  handleUnfreezeColumns: () => void;
}

/**
 * Right-click menu on a header's filter button — freeze the column up to this
 * point, or unfreeze everything.
 */
const DataTableContextMenu = ({
  anchorEl,
  open,
  onClose,
  columnField,
  isColumnFrozen,
  handleFreezeColumn,
  handleUnfreezeColumns,
}: DataTableContextMenuProps) => (
  <Popover
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "left" }}
    slotProps={{ paper: { sx: FilterPopoverPaperSx } }}
  >
    {!isColumnFrozen(columnField) ? (
      <MenuItem
        dense
        onClick={() => {
          handleFreezeColumn(columnField);
          onClose();
        }}
      >
        Freeze Column
      </MenuItem>
    ) : (
      <MenuItem
        dense
        onClick={() => {
          handleUnfreezeColumns();
          onClose();
        }}
      >
        Unfreeze Columns
      </MenuItem>
    )}
  </Popover>
);

export default DataTableContextMenu;
