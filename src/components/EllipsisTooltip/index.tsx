import React, { useCallback, useEffect, useRef, useState } from "react";
import { Tooltip, Typography, TooltipProps } from "@mui/material";

export interface EllipsisTooltipProps {
  /** Content to display (will be truncated if overflows) */
  children: React.ReactNode;
  /** Custom styles for the span wrapper */
  style?: React.CSSProperties;
  /** Tooltip placement */
  placement?: TooltipProps["placement"];
  /** Typography variant for tooltip content */
  tooltipVariant?: "h1" | "h2" | "h3" | "h4" | "body1" | "body2";
  /** Max width for the text container */
  maxWidth?: string | number;
}

/**
 * Text component that automatically shows a tooltip when content is truncated
 */
export const EllipsisTooltip: React.FC<EllipsisTooltipProps> = ({
  children,
  style,
  placement = "top-start",
  tooltipVariant = "body2",
  maxWidth = "100%",
}) => {
  const [isOverflowed, setIsOverflowed] = useState(false);
  const textElementRef = useRef<HTMLSpanElement>(null);

  const checkOverflow = useCallback(() => {
    const element = textElementRef.current;
    if (element) {
      const scrollWidth = element.scrollWidth;
      const clientWidth = element.clientWidth;

      // Check if content is overflowing
      const isOverflowing = scrollWidth > clientWidth;
      setIsOverflowed(isOverflowing);
    }
  }, []);

  useEffect(() => {
    // Check overflow after a small delay to ensure layout is complete
    const timer = setTimeout(() => {
      checkOverflow();
    }, 100);

    window.addEventListener("resize", checkOverflow);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [checkOverflow, children]);

  return (
    <Tooltip
      title={
        <Typography
          variant={tooltipVariant}
          sx={{
            fontWeight: 400,
            color: "#FFFFFF",
          }}
        >
          {children}
        </Typography>
      }
      disableHoverListener={!isOverflowed}
      disableTouchListener={!isOverflowed}
      disableFocusListener={!isOverflowed}
      placement={placement}
      arrow
    >
      <span
        ref={textElementRef}
        style={{
          display: "inline-block",
          maxWidth,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          verticalAlign: "bottom",
          ...style,
        }}
        onMouseEnter={checkOverflow}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default EllipsisTooltip;
