import type { SxProps, Theme } from "@mui/material";

/**
 * A style prop that may be a static `sx` or a factory computing one from
 * per-cell context (column, row, index). The factory form is what lets callers
 * vary styling per column/row.
 */
export type SxOrFactory<Args extends unknown[]> =
  | SxProps<Theme>
  | ((...args: Args) => SxProps<Theme>);

/**
 * Resolve a {@link SxOrFactory} to a concrete `sx`.
 *
 * `SxProps<Theme>` already includes a `(theme) => …` function form, so a plain
 * `typeof === "function"` check can't tell the theme-callback apart from our
 * context factory. These props are only ever a static sx or our own factory,
 * so we cast the function branch to the factory signature.
 */
export const resolveSx = <Args extends unknown[]>(
  value: SxOrFactory<Args> | undefined,
  ...args: Args
): SxProps<Theme> | undefined =>
  typeof value === "function"
    ? (value as (...a: Args) => SxProps<Theme>)(...args)
    : value;

/**
 * Merge several `sx` values into the array form MUI accepts, dropping falsy
 * entries and flattening any nested arrays. Avoids object-spreading `SxProps`
 * (unsafe, since it may be an array or function).
 */
export const mergeSx = (
  ...entries: (SxProps<Theme> | false | null | undefined)[]
): SxProps<Theme> =>
  entries
    .filter((entry): entry is SxProps<Theme> => Boolean(entry))
    .flatMap((entry) => (Array.isArray(entry) ? entry : [entry])) as SxProps<Theme>;
