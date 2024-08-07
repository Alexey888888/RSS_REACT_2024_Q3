import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from '../components/pagination/paginationComponent';
import React from 'react';
import { ThemeProvider } from '../context/themeContext';

describe('Pagination Component', () => {
  it('should render correctly', () => {
    const onPageChange = vi.fn();
    render(
      <ThemeProvider>
        <Pagination booksPerPage={10} totalBooks={50} currentPage={1} onPageChange={onPageChange} />
      </ThemeProvider>,
    );
    expect(screen.getByText(/Previous/i)).toBeTruthy();
    expect(screen.getByText(/Next/i)).toBeTruthy();
    expect(screen.getByText(/1 of 5/i)).toBeTruthy();
  });

  it('should call onPageChange when clicking next button', () => {
    const onPageChange = vi.fn();
    render(
      <ThemeProvider>
        <Pagination booksPerPage={10} totalBooks={50} currentPage={1} onPageChange={onPageChange} />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText(/Next/i));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange when clicking previous button', () => {
    const onPageChange = vi.fn();
    render(
      <ThemeProvider>
        <Pagination booksPerPage={10} totalBooks={50} currentPage={2} onPageChange={onPageChange} />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText(/Previous/i));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('should not render anything if totalPages is 0', () => {
    const { container } = render(
      <ThemeProvider>
        <Pagination booksPerPage={10} totalBooks={0} currentPage={1} onPageChange={vi.fn()} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toBeNull();
  });
});
