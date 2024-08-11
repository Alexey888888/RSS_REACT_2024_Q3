import { useEffect, useRef, useState } from 'react';

interface IUseLocalStorage {
  key: string;
  initValue: string;
}

type LocalStorageTuple = [string, React.Dispatch<React.SetStateAction<string>>, () => void];

export const useLocalStorage = ({ key, initValue }: IUseLocalStorage): LocalStorageTuple => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTerm = localStorage.getItem(key);
      return storedTerm !== null ? storedTerm : initValue;
    }
    return initValue;
  });

  const valueRef = useRef(value);
  const keyRef = useRef(key);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    keyRef.current = key;
  }, [key]);

  const updateLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(keyRef.current, valueRef.current);
    }
  };

  useEffect(() => {
    return () => {
      updateLocalStorage();
    };
  }, []);

  return [value, setValue, updateLocalStorage];
};
