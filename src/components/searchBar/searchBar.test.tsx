import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from './searchBar';

describe('SearchBar Component', () => {
  it('renders component without crashing', () => {
    render(<SearchBar term="" handleSubmit={() => {}} />);
    expect(screen.getByText('Search for a Star Trek books')).toBeInTheDocument();
  });

  it('calls handleSubmit with the correct search term', () => {
    const mockHandleSubmit = vi.fn();
    render(<SearchBar term="initial term" handleSubmit={mockHandleSubmit} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new term' } });

    const buttonElement = screen.getByText('Search');
    fireEvent.click(buttonElement);

    expect(mockHandleSubmit).toHaveBeenCalledWith('new term');
  });
});
