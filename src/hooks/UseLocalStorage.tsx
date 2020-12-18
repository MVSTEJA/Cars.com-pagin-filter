import { useState, useEffect } from "react";

type ReturnType = [
  any | undefined,
  React.Dispatch<React.SetStateAction<any | undefined>>
];

export const useLocalStorage = (
  key: string,
  defaultValue?: any
): ReturnType => {
  const stored = localStorage.getItem(key);
  const initial = stored ? JSON.parse(stored) : defaultValue;
  const [value, setValue] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, JSON.stringify(value)]);

  return [value, setValue];
};
