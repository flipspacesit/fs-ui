import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ThemeChoice = "light" | "dark" | "system";
type Resolved = "light" | "dark";

const STORAGE_KEY = "fsui-docs-theme";

interface ThemeModeCtx {
  /** The user's explicit choice. */
  choice: ThemeChoice;
  /** The resolved value actually applied to <html data-theme>. */
  resolved: Resolved;
  setChoice: (c: ThemeChoice) => void;
}

const Ctx = createContext<ThemeModeCtx | null>(null);

const prefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const readChoice = (): ThemeChoice => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
    /* ignore */
  }
  return "light";
};

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [choice, setChoiceState] = useState<ThemeChoice>(readChoice);
  const [systemDark, setSystemDark] = useState<boolean>(prefersDark);

  // Derived during render — no setState-in-effect.
  const resolved: Resolved =
    choice === "system" ? (systemDark ? "dark" : "light") : choice;

  // Apply the resolved theme to <html> (side-effect only).
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolved);
  }, [resolved]);

  // Track the OS preference; setState happens only in the event handler.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setChoice = useCallback((c: ThemeChoice) => {
    setChoiceState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ choice, resolved, setChoice }),
    [choice, resolved, setChoice]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useThemeMode = (): ThemeModeCtx => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useThemeMode must be used within ThemeModeProvider");
  return ctx;
};
