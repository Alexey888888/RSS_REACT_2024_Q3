import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/themeContext';
import { configureStore } from '@reduxjs/toolkit';
import { Flyout } from './flyout';
import selectedItemsReducer from '../../redux/slices/selectedItemsSlice';

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
  preloadedState: {
    selectedItems: {
      selectedItems: [
        {
          uid: '1',
          title: 'Book One',
          publishedYear: 2024,
          numberOfPages: 800,
        },
        {
          uid: '2',
          title: 'Book Two',
          publishedYear: 2023,
          numberOfPages: 400,
        },
      ],
    },
  },
});

vi.mock('../../context/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
  }),
}));

describe('Flyout Component', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <Provider store={mockStore}>
        <ThemeProvider>{ui}</ThemeProvider>
      </Provider>,
    );
  };

  it('renders correctly', () => {
    renderWithProviders(<Flyout />);
    const downloadButton = screen.getByText('Download');
    const unselectAllButton = screen.getByText('Unselect all');
    const message = screen.getByText(/2 items are selected/i);
    expect(downloadButton).toBeInTheDocument();
    expect(unselectAllButton).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
