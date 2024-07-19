import { useContext } from 'react';
import { IThemeContext } from './IThemeContext';
import { ThemeContext } from './themeContext';

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('Error: theme context');
  return context;
};
