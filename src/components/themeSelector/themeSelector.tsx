import React from 'react';
import { useTheme } from '../../context/useTheme';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as 'light' | 'dark');
  };

  return (
    <div>
      <label>Select theme: </label>
      <select value={theme} onChange={handleChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};
