import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeSelector } from './themeSelector';
import { ThemeProvider } from '../../context/themeContext';

vi.mock('../../context/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
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
});
