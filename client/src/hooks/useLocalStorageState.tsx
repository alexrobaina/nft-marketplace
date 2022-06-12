import { useState, useEffect, useRef } from 'react';

export const useLocalStorageState = (
  key: string,
  defaultValue: string | (() => {}) = '',
  { serialize = JSON.stringify, deserialize = JSON.parse } = {},
) => {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = localStorage.getItem(key);

    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }

    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;

    if (localStorage.getItem(key) !== defaultValue) {
      localStorage.setItem(key, serialize(defaultValue));
    } else {
      localStorage.setItem(key, serialize(state));
    }
  }, [key, state, serialize, defaultValue]);

  return [state, setState];
};
