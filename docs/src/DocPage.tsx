import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface TocSection {
  id: string;
  label: string;
}

interface DocPageCtx {
  sections: TocSection[];
  register: (s: TocSection) => void;
  unregister: (id: string) => void;
}

const Ctx = createContext<DocPageCtx | null>(null);

/** Slugify a section title into a stable anchor id. */
export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Provider that collects DocSection registrations (in mount = DOM order) so the
 * right-rail TOC can render them. Key this by the active page so it resets.
 */
export const DocPageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sections, setSections] = useState<TocSection[]>([]);

  const register = useCallback((s: TocSection) => {
    setSections((prev) => {
      if (prev.some((p) => p.id === s.id)) return prev;
      return [...prev, s];
    });
  }, []);

  const unregister = useCallback((id: string) => {
    setSections((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const value = useMemo(
    () => ({ sections, register, unregister }),
    [sections, register, unregister]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useDocPage = (): DocPageCtx => {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // graceful no-op so DocSection works even outside a provider
    return {
      sections: [],
      register: () => {},
      unregister: () => {},
    };
  }
  return ctx;
};
