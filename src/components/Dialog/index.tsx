import React from "react";
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  Divider,
  Slide,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { CloseIcon } from "../../icons/Close";
import { ArrowDown } from "../../icons/ArrowDown";
import { withDataTestId, type DataTestIdProps } from "../../constants";

const DividerStyled = styled(Divider)({
  position: "absolute",
  top: "22px",
  right: "70px",
  height: "24px",
});

const EllipsisWrap = styled("div")({
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const BackArrowIcon = styled("div")({
  transform: "rotate(90deg)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Props for {@link Dialog}. `data-testid` lands on the dialog paper; the header
 * buttons get `{data-testid}-close` and `{data-testid}-back`.
 *
 * Omitting `data-testid` leaves the header buttons on their long-standing
 * literal ids (`button-closeModal`, `icon-backArrow`) so existing suites keep
 * resolving — the prop overrides those rather than adding to them.
 */
export interface DialogProps extends DataTestIdProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Dialog title */
  title?: string;
  /** Show back arrow instead of close icon */
  backArrow?: boolean;
  /** Callback when dialog is closed */
  onClose?: () => void;
  /** Dialog content */
  children?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Show as side modal (slides from right) */
  showAsSideModal?: boolean;
  /** Disable content padding */
  disableContentGutters?: boolean;
  /** Custom styles for the dialog */
  styles?: React.CSSProperties;
  /** Enable closing on backdrop click */
  enableBackdropClick?: boolean;
  /** Show title bar */
  isTitleBarReq?: boolean;
  /** Header action component */
  headerAction?: React.ReactNode;
  /** Callback for back arrow click */
  backArrowCb?: (() => void) | null;
  /** Show divider before close button */
  showDivider?: boolean;
  /** Max width preset */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  /** Full width dialog */
  fullWidth?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  open = false,
  title = "",
  backArrow = false,
  onClose = () => { },
  children,
  footer,
  showAsSideModal = false,
  disableContentGutters = false,
  styles,
  enableBackdropClick = false,
  isTitleBarReq = true,
  headerAction = null,
  backArrowCb = null,
  showDivider = true,
  maxWidth = "sm",
  fullWidth = false,
  "data-testid": dataTestId,
}) => {
  const sideModalSx = {
    left: "auto",
    "& .MuiDialog-paper": {
      margin: 0,
      height: "100%",
      borderRadius: "0",
    },
  };

  const handleClose = (
    _event: object,
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick" && !enableBackdropClick) {
      return;
    }
    onClose();
  };

  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      onClick={(e) => e.stopPropagation()}
      sx={{ ...styles, ...(showAsSideModal && sideModalSx) }}
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={withDataTestId({}, dataTestId)}
    >
      {isTitleBarReq && (
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" width="50%">
              {backArrow && (
                <div
                  onClick={backArrowCb ? backArrowCb : onClose}
                  style={{ marginRight: "10px" }}
                >
                  <IconButton
                    data-testid={
                      dataTestId ? `${dataTestId}-back` : "icon-backArrow"
                    }
                  >
                    <BackArrowIcon>
                      <ArrowDown size={18} />
                    </BackArrowIcon>
                  </IconButton>
                </div>
              )}
              <Tooltip title={title} arrow>
                <EllipsisWrap>{title}</EllipsisWrap>
              </Tooltip>
            </Stack>
            {headerAction !== null && (
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "2rem",
                  flex: "1 1 35%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {headerAction}
              </div>
            )}
            {showDivider && <DividerStyled orientation="vertical" />}
            <Stack onClick={onClose}>
              <IconButton
                data-testid={
                  dataTestId ? `${dataTestId}-close` : "button-closeModal"
                }
              >
                <CloseIcon size={18} />
              </IconButton>
            </Stack>
          </Stack>
        </DialogTitle>
      )}
      <DialogContent
        dividers
        sx={{
          ...(disableContentGutters && { padding: 0 }),
        }}
      >
        {children}
      </DialogContent>
      {footer && <DialogActions>{footer}</DialogActions>}
    </MuiDialog>
  );
};

export default Dialog;
