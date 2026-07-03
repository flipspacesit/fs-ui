import { createTheme } from "@mui/material";
import React from "react";

import "@mui/material/styles";
import "@mui/x-date-pickers/themeAugmentation";

import {
  primary as primaryColors,
  neutral,
  semantic,
  buttons,
} from "./tokens/colors";
import { shadows } from "./tokens/shadows";
import { fontFamily, fontSize } from "./tokens/typography";
import { radii } from "./tokens/radii";

// Module augmentation for custom palette colors
declare module "@mui/material/styles" {
  interface Palette {
    // Design-system palette groups (full ramps)
    softSteel: Record<string, string> & Palette["primary"];
    slateBlue: Record<string, string> & Palette["primary"];
    primaryBlue: Record<string, string> & Palette["primary"];
    interactive: Record<string, string> & Palette["primary"];
    tertiary: Record<string, string> & Palette["primary"];
    teal: Record<string, string> & Palette["primary"];
    surface: Record<string, string> & Palette["primary"];
    white: Record<string, string> & Palette["primary"];
    black: Record<string, string> & Palette["primary"];
    border: Record<string, string> & Palette["primary"];
    yellow: Record<string, string> & Palette["primary"];
    /** @deprecated Not in the design system — use `slateBlue`, `misc.duskyPurple`, or `misc.lavenderIndigo`. Retained for backward compatibility. */
    purple: Record<string, string> & Palette["primary"];
    /** @deprecated Legacy Blue ramp — use `primaryBlue` (the DS Blue). Retained for backward compatibility. */
    blue: Record<string, string> & Palette["primary"];
    /** @deprecated Not in the design system palette — use `success` or `misc.lightSeaGreen`. Retained for backward compatibility. */
    green: Record<string, string> & Palette["primary"];
    /** @deprecated Not in the design system palette — use `misc.sunriseOrange` / `misc.cocoaBrown`. Retained for backward compatibility. */
    orange: Record<string, string> & Palette["primary"];
    /** @deprecated Superseded by DS neutrals — use `grey` / `softSteel`. Retained for backward compatibility. */
    grey1: Record<string, string> & Palette["primary"];
    /** @deprecated Superseded by DS neutrals — use `grey` / `softSteel`. Retained for backward compatibility. */
    grey2: Record<string, string> & Palette["primary"];
  }
  interface PaletteOptions {
    softSteel?: Record<string, string> & PaletteOptions["primary"];
    slateBlue?: Record<string, string> & PaletteOptions["primary"];
    primaryBlue?: Record<string, string> & PaletteOptions["primary"];
    interactive?: Record<string, string> & PaletteOptions["primary"];
    tertiary?: Record<string, string> & PaletteOptions["primary"];
    teal?: Record<string, string> & PaletteOptions["primary"];
    surface?: Record<string, string> & PaletteOptions["primary"];
    white?: Record<string, string> & PaletteOptions["primary"];
    black?: Record<string, string> & PaletteOptions["primary"];
    border?: Record<string, string> & PaletteOptions["primary"];
    yellow?: Record<string, string> & PaletteOptions["primary"];
    /** @deprecated Not in the design system — use `slateBlue` / `misc`. Retained for backward compatibility. */
    purple?: Record<string, string> & PaletteOptions["primary"];
    /** @deprecated Legacy Blue ramp — use `primaryBlue`. Retained for backward compatibility. */
    blue?: Record<string, string> & PaletteOptions["primary"];
    /** @deprecated Not in the design system palette — use `success` / `misc`. Retained for backward compatibility. */
    green?: Record<string, string> & PaletteOptions["primary"];
    /** @deprecated Not in the design system palette — use `misc`. Retained for backward compatibility. */
    orange?: Record<string, string> & PaletteOptions["primary"];
    /** @deprecated Superseded by DS neutrals. Retained for backward compatibility. */
    grey1?: Record<string, string> & PaletteOptions["primary"];
    /** @deprecated Superseded by DS neutrals. Retained for backward compatibility. */
    grey2?: Record<string, string> & PaletteOptions["primary"];
  }

  interface PaletteColor {
    primary?: string;
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    950?: string;
    brand?: string;
    hover?: string;
    primaryDark?: string;
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

// Augment MUI's component prop types so the DS additions type-check on consumers.
declare module "@mui/material" {
  /** Extra `color` values accepted by `<Button color>` / `<IconButton>` beyond MUI's defaults. */
  interface ButtonPropsColorOverrides {
    softSteel: true;
    tertiary: true;
    black: true;
    teal: true;
  }
  /** DS typography variants selectable via `<Typography variant>` (t1 + b1/b2/c1/f1/f2). */
  interface TypographyPropsVariantOverrides {
    t1: true;
    b1: true;
    b2: true;
    c1: true;
    f1: true;
    f2: true;
  }
  /** Extra `<TextField size>` steps mapped to the DS height scale. */
  interface TextFieldPropsSizeOverrides {
    large: true;
    extraLarge: true;
  }
  /** DS-only `<Button shape>` prop — drives corner radius (round = pill, rectangular = radius-sm). */
  interface ButtonOwnProps {
    shape?: "square" | "rectangular" | "round";
  }
}

/**
 * Flipspaces Design System Theme
 *
 * Faithful implementation of the canonical Figma Design System
 * (file `adSPuBSUsaaSvaCUvLPMf1`). All color values are sourced from the token
 * layer in `./tokens` — do not hardcode hex here.
 *
 * It includes:
 * - Design-system color palette (primary / neutral / semantic groups)
 * - Responsive typography variants
 * - Component style overrides for MUI components
 *
 * Legacy palette keys (`purple`, `blue`, `green`, `orange`, `grey1`, `grey2`)
 * are retained unchanged and marked `@deprecated` for a non-breaking rollout —
 * migrate consumers to the DS groups (`slateBlue`, `primaryBlue`, `misc`, …).
 */
export const theme = createTheme({
  palette: {
    // Brand — Primary/Yellow
    primary: {
      main: primaryColors.yellow.brand,
      light: primaryColors.yellow[300],
      dark: primaryColors.yellow[700],
      contrastText: neutral.black,
    },
    // Accent — Primary/SlateBlue
    secondary: {
      main: primaryColors.slateBlue.primary,
      light: primaryColors.slateBlue[300],
      dark: primaryColors.slateBlue.primaryDark,
      contrastText: neutral.white,
    },
    text: {
      primary: neutral.ink,
      secondary: neutral.grey[400],
    },

    // --- Design system palette groups (full ramps) ---
    yellow: { ...primaryColors.yellow, main: primaryColors.yellow.brand },
    slateBlue: {
      ...primaryColors.slateBlue,
      main: primaryColors.slateBlue.primary,
    },
    primaryBlue: { ...primaryColors.blue, main: primaryColors.blue.primary },
    softSteel: { ...neutral.softSteel, main: neutral.softSteel[400] },
    interactive: {
      ...semantic.interactive,
      main: semantic.interactive.primary,
    },
    // Button color families
    tertiary: {
      main: buttons.tertiary,
      light: buttons.tertiary,
      dark: buttons.tertiaryHover,
      contrastText: "#1B1C1E",
    },
    teal: {
      main: primaryColors.teal.primary,
      light: primaryColors.teal.primary,
      dark: primaryColors.teal.hover,
      contrastText: neutral.white,
    },
    grey: { ...neutral.grey },
    border: { main: neutral.softSteel[400] },
    surface: {
      main: "#EEEEE7",
      300: "#F6F6F4",
      200: "#FBFBFF",
    },
    white: { main: neutral.white },
    black: { main: neutral.ink, 900: "#000000" },

    // --- Semantics ---
    success: {
      main: semantic.success.primary,
      light: semantic.success[300],
      dark: semantic.success[950],
      200: semantic.success[200],
      300: semantic.success[300],
      700: semantic.success[700],
      900: semantic.success[950],
    },
    error: {
      main: semantic.error.primary,
      light: semantic.error[300],
      dark: semantic.error[900],
      200: semantic.error[200],
      300: semantic.error[300],
      400: semantic.error[400],
      700: semantic.error[700],
      900: semantic.error[900],
    },
    warning: {
      main: semantic.warning.primary,
      light: semantic.warning[400],
      dark: semantic.warning[800],
      200: semantic.warning[200],
      400: semantic.warning[400],
      600: semantic.warning[600],
      800: semantic.warning[800],
    },
    info: {
      main: semantic.interactive.primary,
      light: semantic.interactive[400],
      dark: semantic.interactive[800],
      200: semantic.interactive[200],
      400: semantic.interactive[400],
      600: semantic.interactive[600],
      800: semantic.interactive[800],
    },

    // --- Legacy (deprecated): unchanged values, retained for backward compatibility ---
    /** @deprecated Not in the design system — use `slateBlue` / `misc`. */
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
    /** @deprecated Legacy Blue ramp — use `primaryBlue` (the DS Blue). */
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
    /** @deprecated Not in the design system palette — use `success` / `misc.lightSeaGreen`. */
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
    /** @deprecated Not in the design system palette — use `misc.sunriseOrange` / `misc.cocoaBrown`. */
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
    /** @deprecated Superseded by DS neutrals — use `grey` / `softSteel`. */
    grey1: {
      main: "#929279",
      400: "#929279",
      300: "#BDBDA6",
      200: "#D1D1BF",
      100: "#E4E4D8",
    },
    /** @deprecated Superseded by DS neutrals — use `grey` / `softSteel`. */
    grey2: {
      main: "#989891",
      400: "#989891",
      300: "#BABAB1",
      200: "#DADAD4",
      100: "#EBEBE7",
      50: "#E6E6F6",
    },
  },
  typography: {
    fontSize: fontSize.b1,
    fontFamily,
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
      color: neutral.ink,
      "@media (min-width:1280px)": { fontSize: "32px" },
      "@media (min-width:1536px)": { fontSize: "33.60px" },
      "@media (min-width:1920px)": { fontSize: "35.84px" },
      "@media (min-width:2500px)": { fontSize: "41.60px" },
    },
    h1: {
      fontSize: fontSize.h1,
      fontWeight: 600,
      color: neutral.ink,
      "@media (min-width:1280px)": { fontSize: "24px" },
      "@media (min-width:1536px)": { fontSize: "25.20px" },
      "@media (min-width:1920px)": { fontSize: "26.88px" },
      "@media (min-width:2500px)": { fontSize: "31.20px" },
    },
    h2: {
      fontSize: fontSize.h2,
      fontWeight: 600,
      color: neutral.ink,
      "@media (min-width:1280px)": { fontSize: "20px" },
      "@media (min-width:1536px)": { fontSize: "21.00px" },
      "@media (min-width:1920px)": { fontSize: "22.40px" },
      "@media (min-width:2500px)": { fontSize: "26.00px" },
    },
    h3: {
      fontSize: fontSize.h3,
      fontWeight: 600,
      color: neutral.ink,
      "@media (min-width:1280px)": { fontSize: "16px" },
      "@media (min-width:1536px)": { fontSize: "16.80px" },
      "@media (min-width:1920px)": { fontSize: "17.92px" },
      "@media (min-width:2500px)": { fontSize: "20.80px" },
    },
    h4: {
      fontSize: fontSize.h4,
      fontWeight: 600,
      color: neutral.ink,
      "@media (min-width:1280px)": { fontSize: "14px" },
      "@media (min-width:1536px)": { fontSize: "14.70px" },
      "@media (min-width:1920px)": { fontSize: "15.68px" },
      "@media (min-width:2500px)": { fontSize: "18.20px" },
    },
    b1: {
      fontSize: fontSize.b1,
      fontWeight: 600,
      color: neutral.ink,
      "@media (min-width:1280px)": { fontSize: "13px" },
      "@media (min-width:1536px)": { fontSize: "13.65px" },
      "@media (min-width:1920px)": { fontSize: "14.56px" },
      "@media (min-width:2500px)": { fontSize: "16.90px" },
    },
    b2: {
      fontSize: fontSize.b2,
      fontWeight: 600,
      color: neutral.ink,
      "@media (min-width:1280px)": { fontSize: "12px" },
      "@media (min-width:1536px)": { fontSize: "12.60px" },
      "@media (min-width:1920px)": { fontSize: "13.44px" },
      "@media (min-width:2500px)": { fontSize: "15.60px" },
    },
    c1: {
      fontSize: fontSize.c1,
      fontWeight: 600,
      color: neutral.ink,
      "@media (min-width:1280px)": { fontSize: "11px" },
      "@media (min-width:1536px)": { fontSize: "11.55px" },
      "@media (min-width:1920px)": { fontSize: "12.32px" },
      "@media (min-width:2500px)": { fontSize: "14.30px" },
    },
    f1: {
      fontSize: fontSize.f1,
      fontWeight: 600,
      color: neutral.ink,
      "@media (min-width:1280px)": { fontSize: "10px" },
      "@media (min-width:1536px)": { fontSize: "10.50px" },
      "@media (min-width:1920px)": { fontSize: "11.20px" },
      "@media (min-width:2500px)": { fontSize: "13.00px" },
    },
    f2: {
      fontSize: fontSize.f2,
      fontWeight: 600,
      color: neutral.ink,
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
        // Design-system Button — Figma "Buttons" (257:2). Shape (round/rectangular),
        // per-size type + icon, and a contained/outlined/ghost × colour taxonomy.
        root: ({ ownerState, theme }) => {
          const iconPx =
            ownerState.size === "large"
              ? 18
              : ownerState.size === "medium"
                ? 16
                : 14;
          return {
            fontWeight: 600,
            color: theme.palette.black.main,
            lineHeight: "16px",
            padding: "4px 12px",
            gap: "8px",
            boxShadow: "none",
            textTransform: "none",
            // Shape → corner radius (rectangular = radius-sm, round = pill)
            borderRadius:
              ownerState.shape === "round"
                ? `${radii.pill100}px`
                : `${radii.sm}px`,
            // Size → height + label type + icon size (responsive via --scale)
            ...(ownerState.size === "large" && {
              height: "calc(32px * var(--scale))",
              fontSize: `calc(${fontSize.h4}px * var(--scale))`,
            }),
            ...(ownerState.size === "medium" && {
              height: "calc(28px * var(--scale))",
              fontSize: `calc(${fontSize.b1}px * var(--scale))`,
            }),
            ...(ownerState.size === "small" && {
              height: "calc(24px * var(--scale))",
              fontSize: `calc(${fontSize.b2}px * var(--scale))`,
            }),
            "& .MuiButton-startIcon, & .MuiButton-endIcon": { margin: 0 },
            "& .MuiButton-startIcon svg, & .MuiButton-endIcon svg": {
              width: `calc(${iconPx}px * var(--scale))`,
              height: `calc(${iconPx}px * var(--scale))`,
            },
            "&.Mui-disabled": {
              backgroundColor: `${theme.palette.grey[50]} !important`,
              color: `${theme.palette.grey[300]} !important`,
              border: "none",
              cursor: "not-allowed",
              pointerEvents: "auto",
              boxShadow: "none",
            },
            // ---- Contained ----
            ...(ownerState.variant === "contained" && {
              ...(ownerState.color === "primary" && {
                backgroundColor: primaryColors.yellow.brand,
                color: `${theme.palette.black.main} !important`,
                "&:hover": { backgroundColor: primaryColors.yellow.hover },
              }),
              ...(ownerState.color === "secondary" && {
                backgroundColor: primaryColors.blue.primary,
                color: `${neutral.white} !important`,
                "&:hover": { backgroundColor: primaryColors.blue[700] },
              }),
              ...(ownerState.color === "tertiary" && {
                backgroundColor: buttons.tertiary,
                color: `${theme.palette.black.main} !important`,
                "&:hover": { backgroundColor: buttons.tertiaryHover },
              }),
            }),
            // ---- Outlined ----
            ...(ownerState.variant === "outlined" && {
              backgroundColor: neutral.white,
              borderWidth: "0.5px",
              borderStyle: "solid",
              ...(ownerState.color === "primary" && {
                borderColor: primaryColors.yellow.brand,
                color: primaryColors.yellow[700],
                "&:hover": { backgroundColor: primaryColors.yellow[50] },
              }),
              ...(ownerState.color === "secondary" && {
                borderColor: primaryColors.blue[400],
                color: primaryColors.blue.primary,
                "&:hover": { backgroundColor: primaryColors.blue[50] },
              }),
              ...(ownerState.color === "black" && {
                borderColor: theme.palette.black.main,
                color: theme.palette.black.main,
                "&:hover": { backgroundColor: neutral.softSteel[50] },
              }),
            }),
            // ---- Text (Ghost) ----
            ...(ownerState.variant === "text" && {
              backgroundColor: "transparent",
              ...(ownerState.color === "primary" && {
                color: primaryColors.yellow[700],
                "&:hover": { backgroundColor: primaryColors.yellow[50] },
              }),
              ...(ownerState.color === "secondary" && {
                color: primaryColors.blue.primary,
                "&:hover": { backgroundColor: primaryColors.blue[50] },
              }),
              ...(ownerState.color === "black" && {
                color: theme.palette.black.main,
                "&:hover": { backgroundColor: neutral.softSteel[50] },
              }),
              ...(ownerState.color === "teal" && {
                color: primaryColors.teal.primary,
                "&:hover": { backgroundColor: "transparent" },
              }),
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
        root: ({ ownerState, theme }) => ({
          "& .MuiInputBase-root": {
            borderRadius: "4px !important",
            fontSize: "13px !important",
            fontWeight: "600 !important",
            color: theme.palette.text.primary + " !important",
            // border: `0.5px solid ${theme.palette.border.main} !important`,
            ...(ownerState.shape === "square" && {
              borderRadius: "4px",
            }),
            ...(ownerState.shape === "round" && {
              borderRadius: "100px",
            }),
            ...(ownerState.size === "extraLarge" && {
              height: "calc(48px * var(--scale))",
              fontSize: `${fontSize.h4}px !important`,
            }),
            ...(ownerState.size === "large" && {
              height: "calc(32px * var(--scale))",
              fontSize: `${fontSize.h4}px !important`,
            }),
            ...(ownerState.size === "medium" && {
              height: "calc(28px * var(--scale))",
              fontSize: `${fontSize.b1}px !important`,
            }),
            ...(ownerState.size === "small" && {
              height: "calc(24px * var(--scale))",
              fontSize: `${fontSize.b2}px !important`,
            }),
            "&.MuiInputBase-adornedStart": {
              paddingLeft: "10px !important",
            },
            "&.MuiInputBase-adornedEnd": {
              paddingRight: "10px !important",
            },
          },
          "& .MuiInputAdornment-positionStart": {
            margin: 0,
          },
          "& .MuiInputAdornment-positionEnd": {
            margin: 0,
          },
          "& .MuiOutlinedInput-input": {
            padding: "4px 10px !important",
          },

          "& .MuiInputBase-root.Mui-disabled": {
            backgroundColor: theme.palette.grey[50],
            color: theme.palette.grey[300] + " !important",
            cursor: "not-allowed",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.border.main,
            },
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #ffffff inset !important",
            WebkitTextFillColor: theme.palette.text.primary + " !important",
            borderRadius: "4px",
          },
          "& input:-webkit-autofill:hover": {
            WebkitBoxShadow: "0 0 0 100px #ffffff inset !important",
            WebkitTextFillColor: theme.palette.text.primary + " !important",
          },
          "& input:-webkit-autofill:focus": {
            WebkitBoxShadow: "0 0 0 100px #ffffff inset !important",
            WebkitTextFillColor: theme.palette.text.primary + " !important",
          },
          "& input:-webkit-autofill:active": {
            WebkitBoxShadow: "0 0 0 100px #ffffff inset !important",
            WebkitTextFillColor: theme.palette.text.primary + " !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.border.main,
            borderWidth: "0.5px",
          },
          "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.slateBlue[400],
            boxShadow: shadows.elevation03,
          },
          "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.slateBlue[400],
            borderWidth: "0.5px",
          },
          "& .MuiInputBase-root.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error[300],
          },
          "& .MuiFormHelperText-root.Mui-error": {
            color: theme.palette.error.main,
          },
          "& .MuiFormHelperText-root": {
            marginLeft: "0px",
            marginTop: "4px",
          },
        }),
      },
    },
    // Select — mirrors the DS TextField: SoftSteel default border, SlateBlue/400
    // hover+focus (with elevation-03 hover shadow), per-size height, rotating caret.
    MuiSelect: {
      defaultProps: {
        size: "medium",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: "4px",
          fontSize: theme.typography.b1.fontSize,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.palette.text.primary,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.border.main,
            borderWidth: "0.5px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.slateBlue[400],
            boxShadow: shadows.elevation03,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.slateBlue[400],
            borderWidth: "0.5px",
          },
          ...(ownerState.size === "small" && {
            height: "calc(24px * var(--scale))",
          }),
          ...(ownerState.size === "medium" && {
            height: "calc(28px * var(--scale))",
          }),
          "& .MuiSelect-icon": {
            top: "50%",
            transform: "translateY(-50%)",
            right: "10px",
            position: "absolute",
            userSelect: "none",
            pointerEvents: "none",
          },
          "& .MuiSelect-iconOpen": {
            transform: "translateY(-50%) rotate(180deg)",
          },
        }),
        select: {
          padding: "4px 10px !important",
          display: "flex",
          alignItems: "center",
        },
      },
    },
    // DS Table — Figma "Tables & Filter" (479:125). Rounded SoftSteel-bordered
    // container; SlateBlue-100 header cells with ink text; body rows on white
    // with PrimaryBlue-300 gridlines. (See also the Styled* helpers in
    // components/Table for the composed variant.)
    MuiTableContainer: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            boxShadow: "none",
            border: `0.5px solid ${theme.palette.softSteel[400]}`,
            borderRadius: "12px",
            maxHeight: "100%",
          };
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            "& .MuiTableRow-root": {
              backgroundColor: theme.palette.slateBlue[100],
              "& .MuiTableCell-root": {
                backgroundColor: theme.palette.slateBlue[100],
                border: "none",
                borderRight: `0.5px solid ${theme.palette.softSteel[400]}`,
                fontSize: "12px",
                fontWeight: 500,
                color: theme.palette.black.main,
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
          return {
            "& .MuiTableRow-root": {
              backgroundColor: theme.palette.white.main,
              "& .MuiTableCell-root": {
                backgroundColor: theme.palette.white.main,
                border: "none",
                borderBottom: `0.5px solid ${theme.palette.primaryBlue[300]}`,
                borderRight: `0.5px solid ${theme.palette.primaryBlue[300]}`,
                fontSize: "12px",
                fontWeight: 500,
                color: theme.palette.black.main,
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
    // Date pickers — Figma "Calender Components" (902:7306)
    MuiPickerPopper: {
      styleOverrides: {
        paper: {
          border: `0.5px solid ${primaryColors.blue[500]}`,
          borderRadius: `${radii.sm}px`,
          boxShadow: shadows.elevation03,
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          backgroundColor: buttons.tertiary,
          borderRadius: `${radii.xxs}px`,
          minHeight: "auto",
          paddingLeft: "12px",
          paddingRight: "4px",
          marginTop: "8px",
          marginBottom: "8px",
        },
        label: {
          fontSize: `${fontSize.b2}px`,
          fontWeight: 600,
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          color: primaryColors.blue.primary,
          fontWeight: 600,
          fontSize: `${fontSize.b2}px`,
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: `${fontSize.b2}px`,
          fontWeight: 500,
          color: theme.palette.black.main,
          "&.MuiPickersDay-dayOutsideMonth": {
            color: theme.palette.grey[400],
            fontWeight: 400,
          },
          "&.Mui-selected": {
            backgroundColor: `${primaryColors.yellow.brand} !important`,
            color: `${theme.palette.black.main} !important`,
            fontWeight: 600,
          },
          "&.Mui-selected:hover": {
            backgroundColor: `${primaryColors.yellow.hover} !important`,
          },
          "&.MuiPickersDay-today": {
            borderColor: primaryColors.blue.primary,
          },
        }),
      },
    },
  },
});

export default theme;
