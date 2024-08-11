import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Details from '../components/details/details';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider } from '../context/themeContext';
import { useFetchBookDetailsQuery } from '../controllers/starTrekApi';
import { IFetchDetailBook } from '../controllers/types';

interface FetchBookDetailsQueryResult {
  data?: IFetchDetailBook;
  error?: boolean;
  isLoading: boolean;
}

vi.mock('../controllers/starTrekApi', async (importOriginal) => {
  const actual = (await importOriginal()) as { [key: string]: unknown };
  return {
    ...actual,
    useFetchBookDetailsQuery: vi.fn(),
  };
});

const mockBookDetails = {
  book: {
    title: 'Mock Book Title',
    authors: [
      { uid: 1, name: 'Author One' },
      { uid: 2, name: 'Author Two' },
    ],
    publishedYear: 2018,
    numberOfPages: 888,
  },
};

describe('Details Component', () => {
  it('displays error message when there is an error', () => {
    (useFetchBookDetailsQuery as unknown as jest.Mock<FetchBookDetailsQueryResult>).mockReturnValue(
      {
        data: undefined,
        error: true,
        isLoading: false,
      },
    );

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Details bookUid="1" handleCloseDetails={() => {}} />
        </ThemeProvider>
        ,
      </Provider>,
    );

    expect(screen.getByText('Failed to load book details.')).toBeTruthy();
  });

  it('calls handleCloseDetails when "Close" button is clicked', () => {
    const handleCloseDetails = vi.fn();

    (useFetchBookDetailsQuery as unknown as jest.Mock<FetchBookDetailsQueryResult>).mockReturnValue(
      {
        data: mockBookDetails as unknown as IFetchDetailBook,
        error: undefined,
        isLoading: false,
      },
    );

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Details bookUid="1" handleCloseDetails={handleCloseDetails} />
        </ThemeProvider>
      </Provider>,
    );

    fireEvent.click(screen.getByText('Close'));
    expect(handleCloseDetails).toHaveBeenCalled();
  });
});
