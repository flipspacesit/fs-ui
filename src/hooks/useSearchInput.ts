import { useState, useCallback, useEffect } from "react";

/**
 * Hook for managing search input state with debouncing
 */
export const useSearchInput = (initialValue = "", debounceMs = 300) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, debounceMs]);

  const clear = useCallback(() => {
    setValue("");
    setDebouncedValue("");
  }, []);

  return {
    value,
    debouncedValue,
    setValue,
    clear,
  };
};

export default useSearchInput;
