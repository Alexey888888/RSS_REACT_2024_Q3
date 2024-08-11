'use client';

import React, { createContext, useState, ReactNode } from 'react';
import { IThemeContext, Theme } from './IThemeContext';

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
