import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainPage } from './mainPage';

describe('MainPage Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <MainPage />
      </Router>,
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
