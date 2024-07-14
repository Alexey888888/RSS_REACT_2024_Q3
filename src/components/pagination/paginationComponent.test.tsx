import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './paginationComponent';

describe('Pagination Component', () => {
  it('renders component without crashing', () => {
    render(
      <Pagination booksPerPage={10} totalBooks={100} currentPage={1} onPageChange={() => {}} />,
    );

    expect(screen.getByText('1 of 10')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination booksPerPage={10} totalBooks={100} currentPage={1} onPageChange={() => {}} />,
    );

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination booksPerPage={10} totalBooks={100} currentPage={10} onPageChange={() => {}} />,
    );

    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('calls onPageChange with correct page number when next button is clicked', () => {
    const mockOnPageChange = vi.fn();
    render(
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
    render(
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
