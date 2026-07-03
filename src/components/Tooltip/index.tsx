import React from "react";
import { Tooltip as MUITooltip, TooltipProps } from "@mui/material";
import { neutral } from "../../theme/tokens/colors";

/** Props for {@link Tooltip}; extends MUI `TooltipProps` (title, placement, children, etc.). */
export interface FsTooltipProps extends TooltipProps {
  /** Black (dark glass) or White surface */
  variant?: "black" | "white";
}

/**
 * Tooltip — Figma "Checkboxes, Tooltips & Scrolls" (403:13626). Dark-glass or
 * white surface, Caption (11px) text.
 */
export const Tooltip: React.FC<FsTooltipProps> = ({
  variant = "black",
  ...props
}) => {
  const isBlack = variant === "black";
  return (
    <MUITooltip
      arrow
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: isBlack ? "rgba(27,28,30,0.7)" : neutral.white,
            color: isBlack ? neutral.white : neutral.black,
            backdropFilter: "blur(2px)",
            borderRadius: "4px",
            padding: "4px 8px",
            fontSize: 11,
            fontWeight: 600,
            boxShadow: isBlack ? "none" : "0px 4px 12px rgba(209,209,230,0.6)",
            border: isBlack ? "none" : `0.5px solid ${neutral.softSteel[400]}`,
          },
        },
        arrow: {
          sx: { color: isBlack ? "rgba(27,28,30,0.7)" : neutral.white },
        },
      }}
      {...props}
    />
  );
};

export default Tooltip;
