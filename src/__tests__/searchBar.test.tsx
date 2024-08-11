import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '../components/searchBar/searchBar';
import '@testing-library/jest-dom';
import React from 'react';
import { ThemeProvider } from '../context/themeContext';

vi.mock('../../hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn().mockImplementation(({ initValue }) => [initValue, () => {}, () => {}]),
}));

describe('SearchBar', () => {
  it('should render the SearchBar component', () => {
    render(
      <ThemeProvider>
        <SearchBar term="" handleSubmit={vi.fn()} />
      </ThemeProvider>,
    );

    expect(screen.getByText('Search for a Star Trek books')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should update input value when typed', () => {
    render(
      <ThemeProvider>
        <SearchBar term="" handleSubmit={vi.fn()} />
      </ThemeProvider>,
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Search term' } });
    expect(screen.getByRole('textbox')).toHaveValue('Search term');
  });
});
