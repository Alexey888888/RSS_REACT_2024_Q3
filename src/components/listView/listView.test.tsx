import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '../../context/themeContext';
import { ListView } from './listView';
import { IBook } from '../../pages/mainPage/types';
import { IListView } from './IListView';
import paginationReducer from '../../redux/slices/paginationSlice';
import selectedItemDetailsReducer from '../../redux/slices/selectedItemDetailsSlice';
import selectedItemsReducer from '../../redux/slices/selectedItemsSlice';
import { bookApi } from '../../controllers/starTrekApi';

const mockStore = configureStore({
  reducer: {
    pagination: paginationReducer,
    selectedItemDetails: selectedItemDetailsReducer,
    selectedItems: selectedItemsReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookApi.middleware),
});

const mockBooks: IBook[] = [
  {
    uid: '1',
    title: 'Book One',
    publishedYear: 2024,
    publishedMonth: 8,
    publishedDay: 8,
    numberOfPages: 800,
    stardateFrom: null,
    stardateTo: null,
    yearFrom: null,
    yearTo: null,
    novel: true,
    referenceBook: false,
    biographyBook: false,
    rolePlayingBook: false,
    ebook: true,
    anthology: false,
    novelization: false,
    unauthorizedPublication: false,
    audiobook: true,
    audiobookAbridged: false,
    audiobookPublishedYear: null,
    audiobookPublishedMonth: null,
    audiobookPublishedDay: null,
    audiobookRunTime: null,
    productionNumber: null,
  },
  {
    uid: '2',
    title: 'Book 222',
    publishedYear: 2024,
    publishedMonth: 8,
    publishedDay: 8,
    numberOfPages: 888888,
    stardateFrom: null,
    stardateTo: null,
    yearFrom: null,
    yearTo: null,
    novel: true,
    referenceBook: false,
    biographyBook: false,
    rolePlayingBook: false,
    ebook: true,
    anthology: false,
    novelization: false,
    unauthorizedPublication: false,
    audiobook: true,
    audiobookAbridged: false,
    audiobookPublishedYear: null,
    audiobookPublishedMonth: null,
    audiobookPublishedDay: null,
    audiobookRunTime: null,
    productionNumber: null,
  },
];

describe('ListView Component', () => {
  const renderWithProviders = (ui: React.ReactElement, store = mockStore) => {
    return render(
      <Provider store={store}>
        <ThemeProvider>
          <Router>{ui}</Router>
        </ThemeProvider>
      </Provider>,
    );
  };

  it('renders the specified number of cards', () => {
    const props: IListView = {
      bookList: mockBooks,
      onBookClick: vi.fn(),
    };
    renderWithProviders(<ListView {...props} />);
    const bookCards = screen.getAllByRole('listitem');
    expect(bookCards).toHaveLength(mockBooks.length);
  });

  it('calls onBookClick when a book is clicked', () => {
    const onBookClickMock = vi.fn();
    renderWithProviders(<ListView bookList={mockBooks} onBookClick={onBookClickMock} />);
    const bookCard = screen.getByText('Book One');
    fireEvent.click(bookCard);
    expect(onBookClickMock).toHaveBeenCalledWith('1');
  });

  it('checks if the checkbox reflects the selection state', () => {
    const store = configureStore({
      reducer: {
        pagination: paginationReducer,
        selectedItemDetails: selectedItemDetailsReducer,
        selectedItems: selectedItemsReducer,
        [bookApi.reducerPath]: bookApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookApi.middleware),
      preloadedState: {
        selectedItems: {
          selectedItems: [mockBooks[0]],
        },
      },
    });

    renderWithProviders(<ListView bookList={mockBooks} onBookClick={vi.fn()} />, store);
    const checkboxes = screen.getAllByRole('checkbox');
    const checkboxOne = checkboxes[0];
    const checkboxTwo = checkboxes[1];
    expect(checkboxOne).toBeChecked();
    expect(checkboxTwo).not.toBeChecked();
  });
});
