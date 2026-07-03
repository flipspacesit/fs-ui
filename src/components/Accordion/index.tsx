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
import { SystemStyleObject } from "@mui/system";
import { styled } from "@mui/material/styles";
import { ArrowDown } from "../../icons/ArrowDown";
import { theme } from "../../theme";

// Styled components for Accordion using MUI styled
/** DS-styled MUI `Accordion` shell: rounded card, primary-blue border, white surface, no default shadow/divider. */
export const StyledAccordion = styled(MUIAccordion)({
  border: `0.5px solid ${theme.palette.primaryBlue[300]}`,
  borderRadius: "8px",
  margin: "6px 0",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "6px 0",
  },
  backgroundColor: theme.palette.white.main,
  boxShadow: "none",
});

/** DS-styled MUI `AccordionSummary`: compact clickable header row with 12px content gap and hover transition. */
export const StyledAccordionSummary = styled(AccordionSummary)({
  padding: "4px 12px",
  minHeight: "auto",
  borderRadius: "4px",
  backgroundColor: theme.palette.white.main,
  "& .MuiAccordionSummary-content": {
    margin: "0px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "none",
  },
  "&.Mui-expanded": {
    backgroundColor: "transparent",
    minHeight: "unset",
  },
  cursor: "pointer",
  transition: "all 0.2s ease",
});

/** DS-styled MUI `AccordionDetails`: white expanded-content panel with 12px padding (no top padding). */
export const StyledAccordionDetails = styled(AccordionDetails)({
  backgroundColor: theme.palette.white.main,
  borderRadius: "4px",
  padding: "12px",
  paddingTop: "0px",
});

/** Props for the single {@link Accordion} component. */
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
  /** MUI `sx` overrides, merged last. */
  titleSx?: SxProps<Theme>;
  /** MUI `sx` overrides, merged last. */
  accordionSx?: SxProps<Theme>;
  /** MUI `sx` overrides, merged last. */
  accordionSummarySx?: SystemStyleObject<Theme>;
  /** MUI `sx` overrides, merged last. */
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
 * Single collapsible DS accordion (title header + expandable content panel).
 * Works controlled (`open` + `handleChange`) or uncontrolled (`defaultExpanded`).
 * Supports left/right expand-icon placement, custom expand/collapse icons or a
 * rotating default arrow, a disabled state, and per-slot `sx` overrides.
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
    <ArrowDown size="20" />
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
            variant="b1"
            sx={{
              fontWeight: theme.typography.fontWeight.medium,
              color: isOpen
                ? theme.palette.primaryBlue.primary
                : theme.palette.black.main,
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

/** A single item rendered inside an {@link AccordionGroup}. */
export interface AccordionGroupItem {
  /** Header label - can be string or ReactNode */
  title: string | React.ReactNode;
  /** Expandable panel content; a bare string is wrapped in a Typography */
  content: React.ReactNode;
}

/** Props for the {@link AccordionGroup} component. */
export interface AccordionGroupProps {
  /** Array of accordion items */
  items?: AccordionGroupItem[];
  /** Index of default expanded item (single) or object for multiple */
  defaultExpanded?: number | Record<number, boolean> | null;
  /** Allow multiple items to be open simultaneously */
  allowMultiple?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** MUI `sx` overrides, merged last. */
  titleSx?: SxProps<Theme>;
  /** MUI `sx` overrides, merged last. */
  accordionSx?: SxProps<Theme>;
  /** MUI `sx` overrides, merged last. */
  accordionSummarySx?: SystemStyleObject<Theme>;
  /** MUI `sx` overrides, merged last. */
  accordionDetailsSx?: SxProps<Theme>;
}

/**
 * Renders an `items` array as a stack of DS accordions with its own internal
 * expand state. Defaults to single-open (accordion behavior); set
 * `allowMultiple` to let several panels stay open at once.
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
    number | Record<number, boolean> | null | false
  >(defaultExpanded);

  const handleChange =
    (panelId: number) =>
      (_event: React.SyntheticEvent, isExpanded: boolean) => {
        if (disabled) return;

        if (allowMultiple) {
          setExpanded((prevState) => {
            const newState = { ...(prevState as Record<number, boolean>) };
            newState[panelId] = isExpanded;
            return newState;
          });
        } else {
          setExpanded(isExpanded ? panelId : false);
        }
      };

  // Resolves expanded state per panel: keyed lookup in multi mode, index match in single mode.
  const isItemExpanded = (panelId: number): boolean => {
    if (allowMultiple && typeof expanded === "object") {
      return expanded?.[panelId] || false;
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
            expandIcon={<ArrowDown size="20" />}
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
              variant="b1"
              sx={{
                fontWeight: theme.typography.fontWeight.medium,
                color: isItemExpanded(index)
                  ? theme.palette.primaryBlue.primary
                  : theme.palette.black.main,
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
