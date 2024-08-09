import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider } from '../context/themeContext';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
      </head>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
