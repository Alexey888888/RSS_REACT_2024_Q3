import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider } from '../context/themeContext';
import { useTheme } from '../context/useTheme';

import '../../node_modules/modern-normalize/modern-normalize.css';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemeEffect />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

const ThemeEffect: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [theme]);

  return null;
};

export default MyApp;
