import { createTheme } from "@mui/material";
import React from "react";

import "@mui/material/styles";

// Module augmentation for custom palette colors
declare module "@mui/material/styles" {
  interface Palette {
    softSteel: Record<string, string> & Palette["primary"];
    surface: Record<string, string> & Palette["primary"];
    white: Record<string, string> & Palette["primary"];
    purple: Record<string, string> & Palette["primary"];
    black: Record<string, string> & Palette["primary"];
    border: Record<string, string> & Palette["primary"];
    yellow: Record<string, string> & Palette["primary"];
    grey1: Record<string, string> & Palette["primary"];
    grey2: Record<string, string> & Palette["primary"];
    green: Record<string, string> & Palette["primary"];
    orange: Record<string, string> & Palette["primary"];
    blue: Record<string, string> & Palette["primary"];
  }
  interface PaletteOptions {
    softSteel?: Record<string, string> & PaletteOptions["primary"];
    surface?: Record<string, string> & PaletteOptions["primary"];
    white?: Record<string, string> & PaletteOptions["primary"];
    purple?: Record<string, string> & PaletteOptions["primary"];
    black?: Record<string, string> & PaletteOptions["primary"];
    border?: Record<string, string> & PaletteOptions["primary"];
    yellow?: Record<string, string> & PaletteOptions["primary"];
    grey1?: Record<string, string> & PaletteOptions["primary"];
    grey2?: Record<string, string> & PaletteOptions["primary"];
    green?: Record<string, string> & PaletteOptions["primary"];
    orange?: Record<string, string> & PaletteOptions["primary"];
    blue?: Record<string, string> & PaletteOptions["primary"];
  }

  interface PaletteColor {
    primary?: string;
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }

  interface TypographyVariants {
    fontWeight: {
      small: number;
      light: number;
      regular: number;
      medium: number;
      bold: number;
    };
    t1: React.CSSProperties & Record<string, unknown>;
    b1: React.CSSProperties & Record<string, unknown>;
    b2: React.CSSProperties & Record<string, unknown>;
    c1: React.CSSProperties & Record<string, unknown>;
    f1: React.CSSProperties & Record<string, unknown>;
    f2: React.CSSProperties & Record<string, unknown>;
  }

  interface TypographyVariantsOptions {
    fontWeight?: {
      small?: number;
      light?: number;
      regular?: number;
      medium?: number;
      bold?: number;
    };
    t1?: React.CSSProperties & Record<string, unknown>;
    b1?: React.CSSProperties & Record<string, unknown>;
    b2?: React.CSSProperties & Record<string, unknown>;
    c1?: React.CSSProperties & Record<string, unknown>;
    f1?: React.CSSProperties & Record<string, unknown>;
    f2?: React.CSSProperties & Record<string, unknown>;
  }
}

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    softSteel: true;
  }
  interface TypographyPropsVariantOverrides {
    t1: true;
    b1: true;
    b2: true;
    c1: true;
    f1: true;
    f2: true;
  }
  interface TextFieldPropsSizeOverrides {
    large: true;
    extraLarge: true;
  }
  interface ButtonOwnProps {
    shape?: "square" | "round";
  }
}

/**
 * Flipspaces Design System Theme
 * 
 * This theme provides consistent styling across all Flipspaces applications.
 * It includes:
 * - Custom color palette with brand colors
 * - Responsive typography variants
 * - Component style overrides for MUI components
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: "#ffc100",
    },
    secondary: {
      main: "#6868B4",
    },
    text: {
      primary: "#1B1C1E",
      secondary: "#616161",
    },
    // Custom Flipspaces colors
    blue: {
      main: "#3361FF",
      50: "#F0F4FF",
      100: "#DEE7FF",
      200: "#DEE7FF",
      300: "#C3D0F5",
      400: "#7B9CFF",
      600: "#2952CC",
      700: "#1E40AF",
      800: "#1E3A8A",
      900: "#1E3A5F",
    },
    softSteel: {
      main: "#AEB6CE",
      400: "#AEB6CE",
    },
    surface: {
      main: "#EEEEE7",
      300: "#F6F6F4",
      200: "#FBFBFF",
    },
    white: {
      main: "#FFFFFF",
    },
    purple: {
      primary: "#8686D5",
      main: "#8686D5",
      900: "#383859",
      800: "#4A4A75",
      700: "#5F5F97",
      600: "#6868B4",
      400: "#9E9EDD",
      300: "#AEAEE3",
      200: "#C7C7EC",
      100: "#DADAF2",
      50: "#F1F1FF",
    },
    grey: {
      400: "#616161",
      300: "#919191",
      200: "#BFBFBF",
      100: "#D9D9D9",
      50: "#F0F0F0",
    },
    grey1: {
      main: "#929279",
      400: "#929279",
      300: "#BDBDA6",
      200: "#D1D1BF",
      100: "#E4E4D8",
    },
    grey2: {
      main: "#989891",
      400: "#989891",
      300: "#BABAB1",
      200: "#DADAD4",
      100: "#EBEBE7",
      50: "#E6E6F6",
    },
    black: {
      main: "#1B1C1E",
      900: "#000000",
    },
    border: {
      main: "#AEB6CE",
    },
    yellow: {
      main: "#ffc100",
    },
    green: {
      primary: "#8DB749",
      main: "#8DB749",
      900: "#3B4D1F",
      800: "#4E6528",
      700: "#648234",
      600: "#80A742",
      400: "#A4C56D",
      300: "#B3CF85",
      200: "#CBDEAB",
      100: "#E7F6CF",
      50: "#F4F8ED",
    },
    orange: {
      primary: "#D89F62",
      main: "#D89F62",
      900: "#5B4329",
      800: "#775736",
      700: "#997146",
      600: "#C59159",
      400: "#E0B281",
      300: "#E5BF96",
      200: "#EDD3B7",
      100: "#FFEFD5",
      50: "#FBF5EF",
    },
    warning: {
      main: "#DB8709",
      600: "#DB8709",
      200: "#FCEEC0",
    },
    error: {
      main: "#DF2409",
      400: "#FB452B",
      200: "#FFE4E0",
    },
    success: {
      main: "#1A5E24",
      200: "#E5F5E8",
      900: "#1A5E24",
    },
  },
  typography: {
    fontSize: 13,
    fontFamily: '"Inter", sans-serif',
    fontWeight: {
      small: 300,
      light: 400,
      regular: 500,
      medium: 600,
      bold: 700,
    },
    t1: {
      fontSize: 32,
      fontWeight: 600,
      color: "#1B1C1E",
      "@media (min-width:1280px)": { fontSize: "32px" },
      "@media (min-width:1536px)": { fontSize: "33.60px" },
      "@media (min-width:1920px)": { fontSize: "35.84px" },
      "@media (min-width:2500px)": { fontSize: "41.60px" },
    },
    h1: {
      fontSize: 24,
      fontWeight: 600,
      color: "#1B1C1E",
      "@media (min-width:1280px)": { fontSize: "24px" },
      "@media (min-width:1536px)": { fontSize: "25.20px" },
      "@media (min-width:1920px)": { fontSize: "26.88px" },
      "@media (min-width:2500px)": { fontSize: "31.20px" },
    },
    h2: {
      fontSize: 20,
      fontWeight: 600,
      color: "#1B1C1E",
      "@media (min-width:1280px)": { fontSize: "20px" },
      "@media (min-width:1536px)": { fontSize: "21.00px" },
      "@media (min-width:1920px)": { fontSize: "22.40px" },
      "@media (min-width:2500px)": { fontSize: "26.00px" },
    },
    h3: {
      fontSize: 16,
      fontWeight: 600,
      color: "#1B1C1E",
      "@media (min-width:1280px)": { fontSize: "16px" },
      "@media (min-width:1536px)": { fontSize: "16.80px" },
      "@media (min-width:1920px)": { fontSize: "17.92px" },
      "@media (min-width:2500px)": { fontSize: "20.80px" },
    },
    h4: {
      fontSize: 14,
      fontWeight: 600,
      color: "#1B1C1E",
      "@media (min-width:1280px)": { fontSize: "14px" },
      "@media (min-width:1536px)": { fontSize: "14.70px" },
      "@media (min-width:1920px)": { fontSize: "15.68px" },
      "@media (min-width:2500px)": { fontSize: "18.20px" },
    },
    b1: {
      fontSize: 13,
      fontWeight: 600,
      color: "#1B1C1E",
      "@media (min-width:1280px)": { fontSize: "13px" },
      "@media (min-width:1536px)": { fontSize: "13.65px" },
      "@media (min-width:1920px)": { fontSize: "14.56px" },
      "@media (min-width:2500px)": { fontSize: "16.90px" },
    },
    b2: {
      fontSize: 12,
      fontWeight: 600,
      color: "#1B1C1E",
      "@media (min-width:1280px)": { fontSize: "12px" },
      "@media (min-width:1536px)": { fontSize: "12.60px" },
      "@media (min-width:1920px)": { fontSize: "13.44px" },
      "@media (min-width:2500px)": { fontSize: "15.60px" },
    },
    c1: {
      fontSize: 11,
      fontWeight: 600,
      color: "#1B1C1E",
      "@media (min-width:1280px)": { fontSize: "11px" },
      "@media (min-width:1536px)": { fontSize: "11.55px" },
      "@media (min-width:1920px)": { fontSize: "12.32px" },
      "@media (min-width:2500px)": { fontSize: "14.30px" },
    },
    f1: {
      fontSize: 10,
      fontWeight: 600,
      color: "#1B1C1E",
      "@media (min-width:1280px)": { fontSize: "10px" },
      "@media (min-width:1536px)": { fontSize: "10.50px" },
      "@media (min-width:1920px)": { fontSize: "11.20px" },
      "@media (min-width:2500px)": { fontSize: "13.00px" },
    },
    f2: {
      fontSize: 9,
      fontWeight: 600,
      color: "#1B1C1E",
      "@media (min-width:1280px)": { fontSize: "9px" },
      "@media (min-width:1536px)": { fontSize: "9.45px" },
      "@media (min-width:1920px)": { fontSize: "10.08px" },
      "@media (min-width:2500px)": { fontSize: "11.70px" },
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        size: "small",
        variant: "contained",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const palette = theme.palette as any;
          return {
            fontWeight: 600,
            fontSize: "calc(13px * var(--scale, 1))",
            color: palette.black?.main || "#1B1C1E",
            height: "calc(24px * var(--scale, 1))",
            lineHeight: "16px",
            padding: "8px 12px",
            borderRadius: "6px",
            boxShadow: "none",
            textTransform: "none" as const,
            "&.Mui-disabled": {
              backgroundColor: "#F0F0F0 !important",
              color: "#919191 !important",
              cursor: "not-allowed",
              pointerEvents: "auto",
              boxShadow: "none",
            },
            ...((ownerState as { shape?: string }).shape === "square" && {
              borderRadius: "8px",
              "& .MuiButton-startIcon": { margin: "0" },
            }),
            ...((ownerState as { shape?: string }).shape === "round" && {
              borderRadius: "100px",
              "& .MuiButton-startIcon": { margin: "0" },
            }),
            ...(ownerState.size === "large" && {
              height: "calc(32px * var(--scale, 1))",
            }),
            ...(ownerState.size === "medium" && {
              height: "calc(28px * var(--scale, 1))",
            }),
            ...(ownerState.size === "small" && {
              height: "calc(24px * var(--scale, 1))",
            }),
            ...(ownerState.color === "primary" && {
              backgroundColor: palette.yellow?.main || "#ffc100",
              color: (palette.black?.main || "#1B1C1E") + " !important",
            }),
            ...(ownerState.color === "secondary" && {
              backgroundColor: palette.purple?.[600] || "#6868B4",
              color: (palette.white?.main || "#FFFFFF") + " !important",
            }),
          };
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const palette = theme.palette as any;
          return {
            "& .MuiInputBase-root": {
              borderRadius: "4px !important",
              fontSize: "13px !important",
              fontWeight: "600 !important",
              color: (palette.text?.primary || "#1B1C1E") + " !important",
              ...((ownerState as { shape?: string }).shape === "square" && {
                borderRadius: "4px",
              }),
              ...((ownerState as { shape?: string }).shape === "round" && {
                borderRadius: "100px",
              }),
              ...(ownerState.size === "large" && {
                height: "calc(32px * var(--scale, 1))",
              }),
              ...(ownerState.size === "medium" && {
                height: "calc(28px * var(--scale, 1))",
              }),
              ...(ownerState.size === "small" && {
                height: "calc(24px * var(--scale, 1))",
              }),
            },
            "& .MuiOutlinedInput-input": {
              padding: "4px 10px !important",
            },
            "& .MuiInputBase-root.Mui-disabled": {
              backgroundColor: palette.grey?.[50] || "#F0F0F0",
              color: (palette.grey?.[300] || "#919191") + " !important",
              cursor: "not-allowed",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: palette.border?.main || "#AEB6CE",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: palette.border?.main || "#AEB6CE",
              borderWidth: "0.5px",
            },
            "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: palette.border?.main || "#AEB6CE",
              boxShadow: "0 4px 12px 0 rgba(209, 209, 230, 0.60)",
            },
            "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: palette.border?.main || "#AEB6CE",
              borderWidth: "0.5px",
            },
            "& .MuiFormHelperText-root": {
              marginLeft: "0px",
              marginTop: "4px",
            },
          };
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: ({ theme }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const palette = theme.palette as any;
          return {
            boxShadow: "none",
            border: `0.5px solid ${palette.grey2?.[400] || "#989891"}`,
            borderRadius: "12px",
            maxHeight: "100%",
          };
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const palette = theme.palette as any;
          return {
            "& .MuiTableRow-root": {
              backgroundColor: palette.purple?.[50] || "#F1F1FF",
              "& .MuiTableCell-root": {
                backgroundColor: palette.purple?.[50] || "#F1F1FF",
                border: "none",
                borderRight: `0.5px solid ${palette.softSteel?.[400] || "#AEB6CE"}`,
                fontSize: "12px",
                fontWeight: 500,
                color: palette.grey?.[400] || "#616161",
                padding: "1px 8px",
                height: "calc(20px * var(--scale, 1))",
                lineHeight: 1.2,
              },
              "& .MuiTableCell-root:last-child": {
                borderRight: "none",
              },
            },
          };
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: ({ theme }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const palette = theme.palette as any;
          return {
            "& .MuiTableRow-root": {
              backgroundColor: palette.white?.main || "#FFFFFF",
              "& .MuiTableCell-root": {
                backgroundColor: palette.white?.main || "#FFFFFF",
                border: "none",
                borderBottom: `0.5px solid ${palette.purple?.[200] || "#C7C7EC"}`,
                borderRight: `0.5px solid ${palette.purple?.[200] || "#C7C7EC"}`,
                fontSize: "12px",
                fontWeight: 500,
                color: palette.black?.main || "#1B1C1E",
                height: "calc(36px * var(--scale, 1))",
                padding: "6px 8px",
                lineHeight: 1,
              },
              "& .MuiTableCell-root:last-child": {
                borderRight: "none",
              },
              "&:last-child .MuiTableCell-root": {
                borderBottom: "none",
              },
            },
          };
        },
      },
    },
  },
});

export default theme;
