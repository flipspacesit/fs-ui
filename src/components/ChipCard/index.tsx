import React from "react";
import { Stack, Box, Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

const COLOR_MAP: Record<number, { color: string; bgColor: string }> = {
  0: { color: "#149b8b", bgColor: "#e2f8f6" },
  1: { color: "#5C7ED6", bgColor: "#F6F7FC" },
  2: { color: "#FE9D26", bgColor: "#FFF1E1" },
  3: { color: "#F65E4F", bgColor: "#FFF3F2" },
  4: { color: "#425281", bgColor: "#F6F7FC" },
};

const TypeCard = styled(Box)<{
  bgColor?: string;
  color?: string;
  padding?: string;
  isEllipsis?: boolean;
}>(({ bgColor, color, padding, isEllipsis = true }) => ({
  width: "fit-content",
  background: bgColor,
  border: `1px solid ${color}`,
  borderRadius: "6px",
  padding: padding || "6px 10px",
  color: color,
  fontWeight: 600,
  lineHeight: "16px",
  fontSize: "12px",
  ...(isEllipsis && {
    maxWidth: "120px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  }),
}));

const CustomTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #EDEDED",
    boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.24)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#FFFFFF",
  },
});

const TooltipContentWrap = styled(Stack)({
  gridGap: "8px 10px",
});

export interface ChipCardProps {
  /** The label text to display */
  label: string;
  /** Index for auto-coloring (cycles through 5 colors) */
  index?: number | null;
  /** Custom padding */
  padding?: string;
  /** Enable text ellipsis for long text */
  isEllipsis?: boolean;
  /** Custom text color */
  color?: string;
  /** Custom background color */
  bgColor?: string;
  /** Additional styles */
  sx?: object;
}

export const ChipCard: React.FC<ChipCardProps> = ({
  label,
  index = null,
  padding = "6px 10px",
  isEllipsis = true,
  color,
  bgColor,
  ...rest
}) => {
  const colorProps =
    index !== null
      ? {
        color: color || COLOR_MAP[index % 5].color,
        bgColor: bgColor || COLOR_MAP[index % 5].bgColor,
      }
      : { color, bgColor };

  return (
    <TypeCard
      isEllipsis={isEllipsis}
      padding={padding}
      {...colorProps}
      {...rest}
    >
      {label}
    </TypeCard>
  );
};

export interface ChipCardWrapperProps {
  /** List of labels to display as chips */
  list: string[];
  /** Maximum number of chips to show before collapsing */
  maxVisible?: number;
}

export const ChipCardWrapper: React.FC<ChipCardWrapperProps> = ({
  list,
  maxVisible = 2,
}) => {
  if (!list || list.length === 0) return null;

  return (
    <Stack spacing={1.3} direction="row" alignItems="center">
      {list.slice(0, maxVisible).map((attr, i) => (
        <ChipCard key={`${attr}-${i}`} label={attr} index={i} />
      ))}
      {list.length > maxVisible && (
        <CustomTooltip
          arrow
          title={
            <TooltipContentWrap
              mt="12px"
              direction="row"
              paddingBottom="8px"
              flexWrap="wrap"
            >
              {list.map((attr, i) => (
                <ChipCard
                  key={`tooltip-${attr}-${i}`}
                  isEllipsis={false}
                  label={attr}
                  index={i}
                />
              ))}
            </TooltipContentWrap>
          }
        >
          <TypeCard padding="6px 10px" {...COLOR_MAP[2]}>
            +{list.length - maxVisible}
          </TypeCard>
        </CustomTooltip>
      )}
    </Stack>
  );
};

export default ChipCard;
