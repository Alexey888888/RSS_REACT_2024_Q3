import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFoundPage from '../app/not-found.tsx';
import React from 'react';

describe('NotFoundPage Component', () => {
  it('should render correctly', () => {
    render(<NotFoundPage />);
    expect(screen.getByRole('heading', { name: /404/i })).toBeTruthy();
    expect(screen.getByText('Back to the main page')).toBeTruthy();
  });
});
