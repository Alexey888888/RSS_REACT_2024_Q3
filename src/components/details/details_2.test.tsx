import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Details } from './details';
import { IThemeContext } from '../../context/IThemeContext';
import { ThemeContext } from '../../context/themeContext';

vi.mock('react-router-dom', () => ({
  useParams: () => ({ bookUid: 'testBookUid' }),
  useOutletContext: () => ({ handleCloseDetails: vi.fn() }),
}));

vi.mock('../../controllers/starTrekApi', () => ({
  useFetchBookDetailsQuery: vi.fn(() => ({
    data: null,
    error: null,
    isLoading: true,
  })),
}));

const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeContextValue: IThemeContext = {
    theme: 'light',
    setTheme: vi.fn(),
  };

  return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
};

describe('Details Component', () => {
  it('renders loading state correctly when data is being fetched', () => {
    render(
      <MockThemeProvider>
        <Details />
      </MockThemeProvider>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
