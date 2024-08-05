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

  it('should render ThemeSelector', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </Router>
      </Provider>,
    );
    expect(getByText('Select theme:')).toBeInTheDocument();
  });

  it('should render SearchBar', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </Router>
      </Provider>,
    );
    expect(getByText('Search')).toBeInTheDocument();
  });

  it('should render TestError', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ThemeProvider>
            <MainPage />
          </ThemeProvider>
        </Router>
      </Provider>,
    );
    expect(getByText('Test error')).toBeInTheDocument();
  });
});
