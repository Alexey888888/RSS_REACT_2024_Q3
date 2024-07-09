import { useState } from 'react';

interface IUseLocalStorage {
  key: string;
  initValue: string;
}

type LocalStorageTuple = [string, React.Dispatch<React.SetStateAction<string>>, () => void];

export const useLocalStorage = ({ key, initValue }: IUseLocalStorage): LocalStorageTuple => {
  const [value, setValue] = useState(() => {
    const storedTerm = localStorage.getItem(key);
    return storedTerm ? storedTerm : initValue;
  });

  const updateLocalStorage = () => {
    localStorage.setItem(key, value);
  };

  return [value, setValue, updateLocalStorage];
};
