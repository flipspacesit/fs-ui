import React, { useState } from "react";
import {
  Typography,
  Box,
  Accordion as MUIAccordion,
  AccordionSummary,
  AccordionDetails,
  SxProps,
  Theme,
} from "@mui/material";
import styled from "styled-components";
import { ArrowDown } from "../../icons/ArrowDown";

// Styled components for Accordion
export const StyledAccordion = styled(MUIAccordion) <{ $borderColor?: string; $bgColor?: string }>`
  border: 0.5px solid ${(props) => props.$borderColor || "#AEB6CE"};
  border-radius: 4px !important;
  margin: 6px 0 !important;
  &:before {
    display: none;
  }
  &.Mui-expanded {
    margin: 6px 0 !important;
  }
  background-color: ${(props) => props.$bgColor || "#FFFFFF"};
  box-shadow: none !important;
`;

export const StyledAccordionSummary = styled(AccordionSummary) <{ $summaryBgColor?: string }>`
  padding: 4px 12px;
  min-height: auto !important;
  border-radius: 4px;
  background-color: ${(props) => props.$summaryBgColor || "#F0F4FF"};
  & .MuiAccordionSummary-content {
    margin: 0px !important;
    display: flex;
    align-items: center;
    gap: 12px;
    border: none;
  }
  &.Mui-expanded {
    background-color: transparent;
    min-height: unset !important;
  }
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const StyledAccordionDetails = styled(AccordionDetails)`
  background-color: #ffffff;
  border-radius: 4px;
  padding: 12px;
  padding-top: 0px;
`;

export interface AccordionProps {
  /** Title of the accordion - can be string or ReactNode */
  title: string | React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback when accordion state changes */
  handleChange?: (isExpanded: boolean) => void;
  /** Accordion content */
  children: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Styles for title text */
  titleSx?: SxProps<Theme>;
  /** Styles for accordion container */
  accordionSx?: SxProps<Theme>;
  /** Styles for accordion summary */
  accordionSummarySx?: SxProps<Theme>;
  /** Styles for accordion details */
  accordionDetailsSx?: SxProps<Theme>;
  /** Default expanded state (uncontrolled) */
  defaultExpanded?: boolean;
  /** Position of expand icon */
  expandIconPosition?: "left" | "right";
  /** Custom expand icon */
  expandIcon?: React.ReactNode;
  /** Custom collapse icon */
  collapseIcon?: React.ReactNode;
  /** Hide the expand icon */
  hideExpandIcon?: boolean;
}

/**
 * Single Accordion component with controlled/uncontrolled state support
 */
export const Accordion: React.FC<AccordionProps> = ({
  title,
  open,
  handleChange,
  children,
  disabled = false,
  titleSx = {},
  accordionSx = {},
  accordionSummarySx = {},
  accordionDetailsSx = {},
  defaultExpanded = false,
  expandIconPosition = "right",
  expandIcon,
  collapseIcon,
  hideExpandIcon = false,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultExpanded);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleAccordionChange = (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    if (!isControlled) {
      setInternalOpen(isExpanded);
    }
    if (handleChange) {
      handleChange(isExpanded);
    }
  };

  const renderedExpandIcon = hideExpandIcon ? null : expandIcon && collapseIcon ? (
    isOpen ? collapseIcon : expandIcon
  ) : (
    <ArrowDown size={20} />
  );

  return (
    <StyledAccordion
      expanded={isOpen}
      onChange={handleAccordionChange}
      sx={{
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
        ...accordionSx,
      }}
      defaultExpanded={defaultExpanded}
    >
      <StyledAccordionSummary
        expandIcon={renderedExpandIcon}
        sx={{
          flexDirection: expandIconPosition === "left" ? "row-reverse" : "row",
          "& .MuiAccordionSummary-expandIconWrapper": {
            transform:
              expandIcon && collapseIcon
                ? "rotate(0deg)"
                : isOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
            transition: "transform 0.3s ease",
            marginLeft: expandIconPosition === "left" ? "0px" : "8px",
            marginRight: expandIconPosition === "left" ? "8px" : "0px",
          },
          ...accordionSummarySx,
        }}
      >
        {typeof title === "string" ? (
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: isOpen ? "#3361FF" : "#1B1C1E",
              ...titleSx,
            }}
          >
            {title}
          </Typography>
        ) : (
          title
        )}
      </StyledAccordionSummary>
      <StyledAccordionDetails role="region" sx={{ ...accordionDetailsSx }}>
        {children}
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export interface AccordionGroupItem {
  title: string | React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionGroupProps {
  /** Array of accordion items */
  items?: AccordionGroupItem[];
  /** Index of default expanded item (single) or object for multiple */
  defaultExpanded?: number | Record<number, boolean> | null;
  /** Allow multiple items to be open simultaneously */
  allowMultiple?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Styles for title text */
  titleSx?: SxProps<Theme>;
  /** Styles for accordion container */
  accordionSx?: SxProps<Theme>;
  /** Styles for accordion summary */
  accordionSummarySx?: SxProps<Theme>;
  /** Styles for accordion details */
  accordionDetailsSx?: SxProps<Theme>;
}

/**
 * Group of accordions with single/multiple expand support
 */
export const AccordionGroup: React.FC<AccordionGroupProps> = ({
  items = [],
  defaultExpanded = null,
  allowMultiple = false,
  disabled = false,
  titleSx = {},
  accordionSx = {},
  accordionSummarySx = {},
  accordionDetailsSx = {},
  ...rest
}) => {
  const [expanded, setExpanded] = useState<
    number | Record<number, boolean> | false
  >(defaultExpanded ?? false);

  const handleChange =
    (panelId: number) =>
      (_event: React.SyntheticEvent, isExpanded: boolean) => {
        if (disabled) return;

        if (allowMultiple) {
          setExpanded((prevState) => {
            const newState =
              typeof prevState === "object" && prevState !== null
                ? { ...prevState }
                : {};
            newState[panelId] = isExpanded;
            return newState;
          });
        } else {
          setExpanded(isExpanded ? panelId : false);
        }
      };

  const isItemExpanded = (panelId: number): boolean => {
    if (allowMultiple && typeof expanded === "object" && expanded !== null) {
      return expanded[panelId] || false;
    }
    return expanded === panelId;
  };

  return (
    <Box>
      {items.map((item, index) => (
        <StyledAccordion
          key={index}
          expanded={isItemExpanded(index)}
          onChange={handleChange(index)}
          {...rest}
          sx={{
            opacity: disabled ? 0.6 : 1,
            pointerEvents: disabled ? "none" : "auto",
            ...accordionSx,
          }}
        >
          <StyledAccordionSummary
            expandIcon={<ArrowDown size={20} />}
            aria-controls={`accordion-content-${index}`}
            id={`accordion-header-${index}`}
            sx={{
              "& .MuiAccordionSummary-expandIconWrapper": {
                transform: isItemExpanded(index)
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.3s ease",
                marginLeft: "8px",
              },
              ...accordionSummarySx,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: isItemExpanded(index) ? "#3361FF" : "#1B1C1E",
                ...titleSx,
              }}
            >
              {item.title}
            </Typography>
          </StyledAccordionSummary>
          <StyledAccordionDetails
            id={`accordion-content-${index}`}
            role="region"
            aria-labelledby={`accordion-header-${index}`}
            sx={{ ...accordionDetailsSx }}
          >
            {typeof item.content === "string" ? (
              <Typography variant="h4">{item.content}</Typography>
            ) : (
              item.content
            )}
          </StyledAccordionDetails>
        </StyledAccordion>
      ))}
    </Box>
  );
};

export default Accordion;
