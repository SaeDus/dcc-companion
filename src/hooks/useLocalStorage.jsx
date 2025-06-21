import { useState, useEffect } from "react";

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      alert(`Error reading '${key}' from localStorage:`, e);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      alert(`Error writing '${key}' to localStorage:`, e);
    }
  }, [key, value]);

  const clear = () => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing '${key}' from localStorage:`, e);
    }
  };

  return [value, setValue, clear];
}
