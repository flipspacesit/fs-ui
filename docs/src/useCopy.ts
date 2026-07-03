import { useEffect, useRef, useState } from "react";

/**
 * Copy-to-clipboard with a transient "copied" flag that auto-resets.
 * Shows the copied state only on a successful write, guards against a missing
 * Clipboard API, and clears its reset timer on re-copy / unmount.
 */
export function useCopy(resetMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const flash = () => {
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), resetMs);
  };

  const copy = (text: string) => {
    // No Clipboard API (insecure context / unsupported) → do nothing, don't lie.
    if (!navigator.clipboard?.writeText) return;
    navigator.clipboard.writeText(text).then(flash, () => {
      /* permission denied / not focused — leave `copied` false */
    });
  };

  return { copied, copy };
}
