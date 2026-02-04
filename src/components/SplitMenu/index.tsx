import React, { useState, useRef } from "react";
import { Typography, Box, Menu, MenuItem, Stack, SxProps, Theme } from "@mui/material";
import { HEIGHTS, FontSizeMap, ButtonBorderRadiusMap, ComponentSize, ComponentVariant } from "../../constants";
import { ArrowDown } from "../../icons/ArrowDown";
import { ArrowUp } from "../../icons/ArrowUp";

export interface SplitMenuOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface SplitMenuProps {
  /** Button text */
  btnText?: string;
  /** Menu options */
  options: SplitMenuOption[];
  /** Callback when option is clicked */
  handleClick: (value: string, event: React.MouseEvent) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Custom button styles */
  btnStyles?: SxProps<Theme>;
  /** Custom icon container styles */
  iconStyles?: SxProps<Theme>;
  /** Custom text styles */
  txtStyles?: SxProps<Theme>;
  /** Custom open icon */
  openIcon?: React.ReactNode;
  /** Custom close icon */
  closeIcon?: React.ReactNode;
  /** Size variant */
  size?: ComponentSize;
  /** Shape variant */
  variant?: ComponentVariant;
}

const defaultBtnStyles: SxProps<Theme> = {
  backgroundColor: "#AEB6CE",
  color: "#1B1C1E",
  border: "0.5px solid #AEB6CE",
  width: "100%",
};

const defaultIconStyles: SxProps<Theme> = {
  minWidth: "18px",
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const defaultTxtStyles: SxProps<Theme> = {
  fontWeight: 500,
  m: 0,
  color: "#FFFFFF",
};

/**
 * Split button with dropdown menu
 */
export const SplitMenu: React.FC<SplitMenuProps> = ({
  btnText = "More",
  options,
  handleClick,
  disabled = false,
  btnStyles = defaultBtnStyles,
  iconStyles = defaultIconStyles,
  txtStyles = defaultTxtStyles,
  openIcon = <ArrowUp size={20} />,
  closeIcon = <ArrowDown size={20} />,
  size = "medium",
  variant = "rectangular",
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const anchorElRef = useRef<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleChange = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    setAnchorEl(event.currentTarget);
    anchorElRef.current = event.currentTarget;
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack
        height={`calc(${HEIGHTS[size]} * var(--scale, 1))`}
        width={"100%"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          borderRadius: ButtonBorderRadiusMap[variant][size],
          cursor: "pointer",
          ...btnStyles,
          ...(disabled && {
            cursor: "not-allowed",
            backgroundColor: "#F3F4F6",
            border: "0.5px solid #F3F4F6",
          }),
        }}
        onClick={handleChange}
      >
        <Box padding={"12px"}>
          <Typography
            variant={FontSizeMap[size] as "h1" | "h2" | "h3" | "h4" | "body1" | "body2"}
            sx={{
              ...txtStyles,
              ...(disabled && { color: "#9CA3AF" }),
            }}
          >
            {btnText}
          </Typography>
        </Box>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"18px"}
          height={"100%"}
          sx={{
            ...iconStyles,
            borderTopRightRadius: ButtonBorderRadiusMap[variant][size],
            borderBottomRightRadius: ButtonBorderRadiusMap[variant][size],
            ...(disabled && {
              backgroundColor: "#F3F4F6",
              border: "0.5px solid #F3F4F6",
              cursor: "not-allowed",
            }),
          }}
        >
          {open ? openIcon : closeIcon}
        </Stack>
      </Stack>
      <Menu
        id="split-menu"
        MenuListProps={{
          "aria-labelledby": "split-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            minWidth: anchorEl ? anchorEl.offsetWidth : "auto",
            marginTop: "8px",
            border: "0.5px solid #C3D0F5",
            borderRadius: "8px",
            boxShadow: "0px 4px 25px 0px rgba(209, 209, 230, 0.6)",
            padding: "0px 6px",
          },
        }}
      >
        {options.map(({ label, value, icon }, index) => (
          <MenuItem
            key={value}
            onClick={(e) => {
              handleClose();
              handleClick(value, e);
            }}
            disabled={disabled}
            sx={{
              padding: "6px",
              borderBottom:
                index !== options.length - 1
                  ? "0.5px solid #AEB6CE"
                  : "none",
            }}
          >
            <Stack direction={"row"} alignItems={"center"} gap={"8px"}>
              {icon && (
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"14px"}
                  height={"14px"}
                >
                  {icon}
                </Stack>
              )}
              <Typography
                variant={FontSizeMap[size] as "h1" | "h2" | "h3" | "h4" | "body1" | "body2"}
                sx={{ fontWeight: 300 }}
              >
                {label}
              </Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SplitMenu;
