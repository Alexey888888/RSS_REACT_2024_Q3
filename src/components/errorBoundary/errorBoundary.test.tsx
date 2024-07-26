import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from './errorBoundary';
import { vi } from 'vitest';

const ProblemChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
  });

  afterAll(() => {
    vi.spyOn(console, 'error').mockRestore();
  });

  test('should display error message when an error occurs', async () => {
    await act(async () => {
      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>,
      );
    });

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test('should display children when no error occurs', async () => {
    await act(async () => {
      render(
        <ErrorBoundary>
          <div>No errors</div>
        </ErrorBoundary>,
      );
    });

    expect(screen.getByText(/no errors/i)).toBeInTheDocument();
  });
});
