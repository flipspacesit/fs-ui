/** Shared size scale for fs-ui controls (buttons, inputs, icon buttons, …). */
export type ComponentSize =
  | "extraSmall"
  | "small"
  | "medium"
  | "large"
  | "extraLarge";

/** Shape variant shared by buttons/controls — `round` = pill, `rectangular` = radius-sm. */
export type ComponentVariant = "round" | "rectangular";

/**
 * Opt-in automation hook shared by every fs-ui input control.
 *
 * Each control renders the value on exactly one element — the focusable
 * `<input>` when it owns a single one, otherwise its root — so a
 * `[data-testid="x"]` selector never matches twice. Composite controls
 * (segments, PIN cells, stepper buttons, option rows) additionally stamp
 * suffixed ids (`x-increment`, `x-option-2`, …) on their interactive children;
 * each component's TSDoc lists the suffixes it emits.
 *
 * Declared explicitly because most of these components have closed prop
 * interfaces that drop unknown props. TypeScript also skips type-checking
 * hyphenated JSX attributes, so an unsupported `data-testid` fails silently —
 * hence the explicit prop rather than relying on rest-prop spreading.
 */
export interface DataTestIdProps {
  /** Rendered as the `data-testid` DOM attribute for test targeting. */
  "data-testid"?: string;
}

/**
 * Merges a `data-testid` into a component's `inputProps` bag, preserving
 * whatever the caller already put there.
 *
 * The assertion is load-bearing: MUI types some `inputProps` slots as
 * `InputHTMLAttributes<HTMLInputElement>` (Checkbox, Radio, Switch), and an
 * object literal with a hyphenated key trips excess-property checking there.
 * JSX attributes are exempt from that check; object literals are not.
 */
export const withDataTestId = <T,>(
  inputProps: T | undefined,
  dataTestId?: string,
): T => ({ ...inputProps, "data-testid": dataTestId }) as T;

/**
 * Same as {@link withDataTestId}, for MUI's `slotProps.input` channel — which
 * accepts either an object or an `ownerState` callback, so both forms have to
 * survive the merge.
 *
 * Used by the SwitchBase family (Checkbox / RadioButton / Switch), where the
 * legacy `inputProps` bag is deprecated and, on `Switch`, ignored outright.
 * `base` carries defaults that MUI itself sets on the slot and would otherwise
 * lose — passing `slotProps.input` to `Switch` replaces its `role="switch"`
 * wholesale rather than merging into it.
 */
export const withDataTestIdSlot = <S extends object, O>(
  slot: S | ((ownerState: O) => S) | undefined,
  dataTestId: string | undefined,
  base?: object,
): S | ((ownerState: O) => S) =>
  typeof slot === "function"
    ? (ownerState: O) =>
        ({ ...base, ...slot(ownerState), "data-testid": dataTestId }) as S
    : ({ ...base, ...slot, "data-testid": dataTestId }) as S;

/** Control heights per {@link ComponentSize} (px, before `--scale`). */
export const HEIGHTS: Record<ComponentSize, string> = {
  extraSmall: "20px",
  small: "24px",
  medium: "28px",
  large: "32px",
  extraLarge: "48px",
};

/**
 * Maps a {@link ComponentSize} to the MUI Typography variant used for its label.
 * Aligned to the DS component type scale: small 24px→12(b2), medium 28px→13(b1),
 * large 32px→14(h4). (Figma "Buttons" 257:2.)
 */
export const FontSizeMap: Record<ComponentSize, string> = {
  extraSmall: "c1", // 11px
  small: "b2", // 12px
  medium: "b1", // 13px
  large: "h4", // 14px
  extraLarge: "h4", // 14px
};

/** Corner radius per shape × size — `round` is always pill (100px), `rectangular` is radius-sm (8px, 4px at extraSmall). */
export const ButtonBorderRadiusMap: Record<
  ComponentVariant,
  Record<ComponentSize, string>
> = {
  rectangular: {
    extraSmall: "4px",
    small: "8px",
    medium: "8px",
    large: "8px",
    extraLarge: "8px",
  },
  round: {
    extraSmall: "100px",
    small: "100px",
    medium: "100px",
    large: "100px",
    extraLarge: "100px",
  },
};

import { primary, neutral, semantic } from "../theme/tokens/colors";

/**
 * Common color tokens.
 *
 * @deprecated Prefer the MUI theme palette (`theme.palette.*`) or the token
 * layer (`src/theme/tokens`) directly. These values are now derived from the
 * design-system tokens and kept only for backward compatibility.
 */
export const Colors = {
  // Primary / action colors
  primary: {
    main: semantic.interactive.primary,
    light: semantic.interactive[200],
    dark: primary.slateBlue.primaryDark,
  },
  // Border colors
  border: {
    light: neutral.softSteel[400],
    medium: primary.slateBlue[300],
    dark: neutral.black,
  },
  // Background colors
  background: {
    white: neutral.white,
    selected: primary.slateBlue[100],
    hover: primary.slateBlue[50],
  },
  // Text colors
  text: {
    primary: "#1B1C1E",
    secondary: neutral.grey[400],
    disabled: neutral.grey[300],
  },
  // Status colors
  status: {
    success: semantic.success.primary,
    warning: semantic.warning.primary,
    error: semantic.error.primary,
    info: semantic.interactive.primary,
  },
};
