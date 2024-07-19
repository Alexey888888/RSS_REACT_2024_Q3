export type Theme = 'light' | 'dark';

export interface IThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
