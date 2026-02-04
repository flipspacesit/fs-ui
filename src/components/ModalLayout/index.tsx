import React from "react";
import {
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  SxProps,
  Theme,
  DialogProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CloseIcon } from "../../icons/Close";

interface StyledModalProps {
  paperstyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  rootBackground?: string;
  muiPaperRootPosition?: string;
}

const Modal = styled(Dialog)<StyledModalProps>(
  ({
    paperstyle,
    contentStyle = {},
    rootBackground = "#FFF",
    muiPaperRootPosition,
  }) => ({
    "& .MuiDialog-paper": paperstyle || {
      width: "1298px",
      height: "660px",
    },
    "& .MuiPaper-root": {
      borderRadius: "10px",
      position: muiPaperRootPosition ? muiPaperRootPosition : "relative",
      background: rootBackground ? rootBackground : "#FFF",
    },
    "& .MuiDialog-container": {
      alignItems: "center",
    },
    "& .MuiDialogActions-root": {
      height: "91px",
    },
    "& .MuiDialogTitle-root": {
      height: "60px",
      display: "flex",
      alignItems: "center",
    },
    "& ::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "& ::-webkit-scrollbar-track": {
      borderRadius: "8px",
    },
    "& ::-webkit-scrollbar-thumb": {
      borderRadius: "8px",
      backgroundColor: "rgba(207, 211, 223, 0.6)",
      border: "1px solid #CFD3DF",
      display: "block",
    },
    "& .MuiDialogContent-root": contentStyle || {},
  })
);

const DividerStyled = styled(Divider)(() => ({
  position: "absolute",
  top: "23px",
  right: "60px",
  height: "16px",
}));

const IconButtonStyled = styled(IconButton)(() => ({
  position: "absolute",
  right: "24px",
  top: "16px",
}));

export interface ModalLayoutProps extends Omit<DialogProps, "onClose" | "title"> {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Modal title */
  title?: string | React.ReactNode;
  /** Modal content */
  children: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Max width size */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  /** Hide content overflow */
  hideOverflow?: boolean;
  /** Hide the title bar */
  isTitleNull?: boolean;
  /** Additional footer modal content */
  footerModal?: React.ReactNode;
  /** Custom content styles */
  contentStyles?: SxProps<Theme>;
  /** Custom paper styles */
  paperstyle?: React.CSSProperties;
}

/**
 * Reusable Modal/Dialog layout component
 */
export const ModalLayout: React.FC<ModalLayoutProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  size,
  hideOverflow = false,
  isTitleNull = false,
  footerModal = null,
  contentStyles = {},
  paperstyle,
  ...rest
}) => {
  return (
    <Modal
      onClose={onClose}
      open={open}
      maxWidth={size}
      paperstyle={paperstyle}
      {...rest}
    >
      {!isTitleNull && (
        <DialogTitle id="customized-dialog-title" sx={{ m: 0, p: 2 }}>
          <IconButtonStyled
            className="customized-dialog-close-icon"
            aria-label="close"
            onClick={onClose}
            data-testid="button-closeModal"
          >
            <CloseIcon />
          </IconButtonStyled>
          <Typography sx={{ fontWeight: 600, fontSize: "20px", flex: 1 }}>
            {title}
          </Typography>
          <DividerStyled orientation="vertical" />
        </DialogTitle>
      )}
      <DialogContent
        dividers
        sx={{
          padding: "31px 30px",
          overflow: hideOverflow ? "hidden" : "auto",
          ...contentStyles,
        }}
      >
        {children}
      </DialogContent>
      {footer && <DialogActions>{footer}</DialogActions>}
      {footerModal && <>{footerModal}</>}
    </Modal>
  );
};

export default ModalLayout;
