import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const renderWithProvider = (component: JSX.Element) => {
  render(<Provider store={store}>{component}</Provider>);
};

describe('index.tsx', () => {
  it('renders main content', () => {
    renderWithProvider(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
  it('renders theme selector', () => {
    renderWithProvider(<App />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  it('renders options theme selector', () => {
    renderWithProvider(<App />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(screen.getByRole('option', { name: /Light/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Dark/i })).toBeInTheDocument();
  });
});
