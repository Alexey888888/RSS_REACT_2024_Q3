import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BookCard } from './bookCard';

const mockBook = {
  title: 'Book One',
};

describe('BookCard Component', () => {
  it('renders the title correctly', () => {
    render(
      <BookCard
        title={mockBook.title}
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    const titleElement = screen.getByText(mockBook.title);
    expect(titleElement).toBeInTheDocument();
  });
});
