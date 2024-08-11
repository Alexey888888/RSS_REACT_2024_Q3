'use client';

import { useContext } from 'react';
import { ThemeContext } from './themeContext';
import { IThemeContext } from './IThemeContext';

const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('Error: theme context');
  return context;
};

export default useTheme;
