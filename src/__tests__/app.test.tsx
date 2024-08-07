import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import MyApp from '../pages/_app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider } from '../context/themeContext';
import React from 'react';
import { NextRouter, Router } from 'next/router';

vi.mock('../context/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
  }),
}));

const mockRouter: Partial<NextRouter> = {
  basePath: '',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
};

describe('MyApp Component', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  it('should render correctly with provided pageProps', () => {
    const Component = () => <div>Test Component</div>;
    const pageProps = {};

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MyApp Component={Component} pageProps={pageProps} router={mockRouter as Router} />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByText('Test Component')).toBeTruthy();
  });

  it('should apply light theme class to body', () => {
    const Component = () => <div>Test Component</div>;
    const pageProps = {};

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MyApp Component={Component} pageProps={pageProps} router={mockRouter as Router} />
        </ThemeProvider>
      </Provider>,
    );

    expect(document.body.className).toBe('dark-theme');
  });

  it('should apply dark theme class to body', () => {
    vi.mock('../context/useTheme', () => ({
      useTheme: () => ({
        theme: 'dark',
      }),
    }));

    const Component = () => <div>Test Component</div>;
    const pageProps = {};

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MyApp Component={Component} pageProps={pageProps} router={mockRouter as Router} />
        </ThemeProvider>
      </Provider>,
    );

    expect(document.body.className).toBe('dark-theme');
  });
});
