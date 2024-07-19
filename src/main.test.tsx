import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const renderWithProvider = (component: JSX.Element) => {
  render(<Provider store={store}>{component}</Provider>);
};

describe('App Component', () => {
  it('renders App component without crashing', () => {
    renderWithProvider(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders main content', () => {
    renderWithProvider(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
