import { useState, useEffect } from "react";

type ReturnType = [
  any | undefined,// eslint-disable-line @typescript-eslint/no-explicit-any
  React.Dispatch<React.SetStateAction<any | undefined>>,// eslint-disable-line @typescript-eslint/no-explicit-any
];

export const useLocalStorage = (
  key: string,
  defaultValue?: any,// eslint-disable-line @typescript-eslint/no-explicit-any
): ReturnType => {
  const stored = localStorage.getItem(key);
  const initial = stored ? JSON.parse(stored) : defaultValue;
  const [value, setValue] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, JSON.stringify(value)]);

  return [value, setValue];
};
