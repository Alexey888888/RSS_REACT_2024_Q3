import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { Pagination } from './paginationComponent';
import { ThemeProvider } from '../../context/themeContext';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <Router>{ui}</Router>
    </ThemeProvider>,
  );
};

describe('Pagination Component', () => {
  it('renders component without crashing', () => {
    renderWithProviders(
      <Pagination booksPerPage={10} totalBooks={100} currentPage={1} onPageChange={() => {}} />,
    );

    expect(screen.getByText('1 of 10')).toBeInTheDocument();
  });

  it('calls onPageChange with correct page number when next button is clicked', () => {
    const mockOnPageChange = vi.fn();
    renderWithProviders(
      <Pagination
        booksPerPage={10}
        totalBooks={100}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(screen.getByText('Next'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with correct page number when previous button is clicked', () => {
    const mockOnPageChange = vi.fn();
    renderWithProviders(
      <Pagination
        booksPerPage={10}
        totalBooks={100}
        currentPage={2}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });
});
