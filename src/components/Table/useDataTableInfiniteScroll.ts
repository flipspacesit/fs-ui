import { useEffect, useRef } from "react";
import type { RefObject } from "react";

export interface UseDataTableInfiniteScrollOptions {
  /** Observe only while this is true (e.g. off during a fetch, or when disabled). */
  enabled: boolean;
  /** Fired once each time the sentinel scrolls into view. */
  onReach: () => void;
  /** The scroll container the sentinel lives in (the IntersectionObserver root). */
  rootRef: RefObject<HTMLElement | null>;
  /** How early (before the true bottom) to fire. Defaults to a 200px lead. */
  rootMargin?: string;
}

/**
 * Infinite-scroll trigger for the **non-virtualized** {@link DataTable} body.
 *
 * The virtualized path gets end-of-list detection for free from
 * `react-virtuoso`'s `endReached`; the plain scrolling table has no equivalent,
 * so we watch a 1px sentinel cell at the end of the body with an
 * `IntersectionObserver` rooted on the scroll container. Attach the returned ref
 * to that sentinel.
 *
 * `onReach` is read through a ref so a changing callback identity (common — it
 * closes over `isLoading`) never tears down and rebuilds the observer.
 */
export function useDataTableInfiniteScroll({
  enabled,
  onReach,
  rootRef,
  rootMargin = "0px 0px 200px 0px",
}: UseDataTableInfiniteScrollOptions): RefObject<HTMLTableCellElement | null> {
  const sentinelRef = useRef<HTMLTableCellElement | null>(null);
  const onReachRef = useRef(onReach);

  useEffect(() => {
    onReachRef.current = onReach;
  }, [onReach]);

  useEffect(() => {
    if (!enabled) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onReachRef.current();
        }
      },
      { root: rootRef.current ?? null, rootMargin }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [enabled, rootRef, rootMargin]);

  return sentinelRef;
}

export default useDataTableInfiniteScroll;
