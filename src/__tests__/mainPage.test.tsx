import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { MainPage } from '../pages/index';
import { ThemeProvider } from '../context/themeContext';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import React from 'react';

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    isFallback: false,
  }),
}));

describe('MainPage Component', () => {
  it('should render ThemeSelector', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider>
          <MainPage initialBooks={[]} initialTotalBooks={0} initialTerm={''} initialPage={0} />
        </ThemeProvider>
      </Provider>,
    );
    expect(getByText('Select theme:')).toBeTruthy();
  });

  it('should render SearchBar', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider>
          <MainPage initialBooks={[]} initialTotalBooks={0} initialTerm={''} initialPage={0} />
        </ThemeProvider>
      </Provider>,
    );
    expect(getByText('Search')).toBeTruthy();
  });
});
