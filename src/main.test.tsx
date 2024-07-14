import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Index Component', () => {
  it('renders App component without crashing', () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders main content', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
