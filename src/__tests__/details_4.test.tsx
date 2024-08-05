import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Details } from './details';
import { IThemeContext } from '../../context/IThemeContext';
import { ThemeContext } from '../../context/themeContext';

describe('Details Component', () => {
  beforeAll(() => {
    vi.mock('react-router-dom', () => ({
      useParams: () => ({ bookUid: 'testBookUid' }),
      useOutletContext: () => ({ handleCloseDetails: vi.fn() }),
    }));

    vi.mock('../../controllers/starTrekApi', () => ({
      useFetchBookDetailsQuery: vi.fn(() => ({
        data: {
          book: {
            title: 'Test Book',
            authors: [
              { uid: 1, name: 'Author One' },
              { uid: 2, name: 'Author Two' },
            ],
            publishedYear: 2024,
            numberOfPages: 300,
          },
        },
        error: null,
        isLoading: false,
      })),
    }));
  });
  const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const themeContextValue: IThemeContext = {
      theme: 'light',
      setTheme: vi.fn(),
    };
    return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
  };

  it('renders the details container', () => {
    render(
      <MockThemeProvider>
        <Details />
      </MockThemeProvider>,
    );
    const detailsElement = screen.getByTestId('details-container');
    expect(detailsElement).toBeInTheDocument();
  });
});
