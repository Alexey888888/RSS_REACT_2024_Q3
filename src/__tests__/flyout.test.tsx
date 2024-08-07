import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Flyout } from '../components/flyout/flyout';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import React from 'react';
import { ThemeProvider } from '../context/themeContext';
import { setSelectedItems } from '../redux/slices/selectedItemsSlice';

vi.mock('react-csv', () => ({
  CSVLink: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('../context/useTheme', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

describe('Flyout Component', () => {
  it('renders the Flyout component with correct number of selected items', () => {
    store.dispatch(
      setSelectedItems([
        { uid: '1', title: 'Book 1', publishedYear: 2008, numberOfPages: 888 },
        { uid: '2', title: 'Book 2', publishedYear: 2009, numberOfPages: 888 },
      ]),
    );

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByText('2 items are selected')).toBeTruthy();
  });

  it('unselects all items when "Unselect all" button is clicked', () => {
    store.dispatch(
      setSelectedItems([
        { uid: '1', title: 'Book 1', publishedYear: 2000, numberOfPages: 808 },
        { uid: '2', title: 'Book 2', publishedYear: 2020, numberOfPages: 8 },
      ]),
    );

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>,
    );
    fireEvent.click(screen.getByText('Unselect all'));
    expect(screen.getByText('0 items are selected')).toBeTruthy();
  });

  it('provides correct CSV data when "Download" button is clicked', () => {
    store.dispatch(
      setSelectedItems([
        { uid: '1', title: 'Book 1', publishedYear: 2018, numberOfPages: 80 },
        { uid: '2', title: 'Book 2', publishedYear: 2007, numberOfPages: 7 },
      ]),
    );

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>,
    );
    fireEvent.click(screen.getByText('Download'));
    expect(screen.getByText('Download')).toBeTruthy();
  });
});
