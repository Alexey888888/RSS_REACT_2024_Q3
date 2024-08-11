import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ThemeSelector from '../components/themeSelector/themeSelector';
import { ThemeProvider } from '../context/themeContext';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeSelector Component', () => {
  it('displays and changes the theme correctly', () => {
    render(
      <Wrapper>
        <ThemeSelector />
      </Wrapper>,
    );
    const selectElement = screen.getByLabelText('Select theme:') as HTMLSelectElement;
    expect(selectElement.value).toBe('light');
    fireEvent.change(selectElement, { target: { value: 'dark' } });
    expect(selectElement.value).toBe('dark');
  });
});
