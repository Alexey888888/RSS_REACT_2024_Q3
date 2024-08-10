import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import ClientComponent from '../app/page';
import { store } from '../redux/store';
import { ThemeProvider } from '../context/themeContext';
import React from 'react';

const mockUseSearchParams = vi.fn().mockReturnValue({
  get: (key: string | number) => {
    const params = {
      search: 'test',
      page: '1',
      details: null,
    };
    return params[key] || null;
  },
});

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: vi.fn(),
  }),
  useSearchParams: () => mockUseSearchParams(),
}));

test('renders ClientComponent without crashing', async () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <ClientComponent />
      </ThemeProvider>
    </Provider>,
  );

  await waitFor(() => {
    expect(screen.queryByText(/loading.../i)).toBeNull();
  });

  await waitFor(() => {
    expect(screen.queryByText(/Search for a Star Trek books/i)).toBeTruthy();
  });
});
