import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainPage } from './mainPage';
import { ThemeProvider } from '../../context/themeContext';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('MainPage Component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Router>
            <MainPage />
          </Router>
        </ThemeProvider>
      </Provider>,
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
