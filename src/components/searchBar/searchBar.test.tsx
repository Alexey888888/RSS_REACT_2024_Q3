import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { SearchBar } from './searchBar';
import { ThemeProvider } from '../../context/themeContext';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <Router>{ui}</Router>
    </ThemeProvider>,
  );
};

describe('SearchBar Component', () => {
  it('renders component without crashing', () => {
    renderWithProviders(<SearchBar term="" handleSubmit={() => {}} />);
    expect(screen.getByText('Search for a Star Trek books')).toBeInTheDocument();
  });

  it('calls handleSubmit with the correct search term', () => {
    const mockHandleSubmit = vi.fn();
    renderWithProviders(<SearchBar term="initial term" handleSubmit={mockHandleSubmit} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new term' } });

    const buttonElement = screen.getByText('Search');
    fireEvent.click(buttonElement);

    expect(mockHandleSubmit).toHaveBeenCalledWith('new term');
  });
});
