import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider } from '../context/themeContext';

import '../styles/globals.scss';
import '../../node_modules/modern-normalize/modern-normalize.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
