import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { ThemeProvider } from '../../context/themeContext';
import { MainPage } from '../../pages/mainPage/mainPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Details Component', () => {
  it('should render Title', () => {
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
});
