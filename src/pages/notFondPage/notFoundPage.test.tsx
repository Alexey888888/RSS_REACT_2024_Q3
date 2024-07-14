import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { NotFoundPage } from './notFoundPage';

describe('NotFoundPage Component', () => {
  it('contains a link to the main page', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    const linkElement = screen.getByText('Back to the main page');
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
