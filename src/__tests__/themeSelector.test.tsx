import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeSelector } from './themeSelector';
import { ThemeProvider } from '../../context/themeContext';

const mockedSetTheme = vi.fn();

vi.mock('../../context/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockedSetTheme,
  }),
}));

describe('ThemeSelector Component', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>,
    );
    const themeLabel = screen.getByText('Select theme:');
    const lightOption = screen.getByText('Light');
    const darkOption = screen.getByText('Dark');
    expect(themeLabel).toBeInTheDocument();
    expect(lightOption).toBeInTheDocument();
    expect(darkOption).toBeInTheDocument();
  });

  it('calls setTheme with the correct value on change', () => {
    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>,
    );
    const selectElement = screen.getByLabelText('Select theme:');
    fireEvent.change(selectElement, { target: { value: 'dark' } });
    expect(mockedSetTheme).toHaveBeenCalledWith('dark');
  });
});
