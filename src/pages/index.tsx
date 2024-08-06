import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { SearchBar } from '../components/searchBar/searchBar';
import { ListView } from '../components/listView/listView';
import { Button } from '../components/button/button';
import { Pagination } from '../components/pagination/paginationComponent';
import { RootState, store } from '../redux/store';
import { useFetchAllBooksQuery, useSearchTermMutation } from '../controllers/starTrekApi';
import { setPage, setTerm } from '../redux/slices/paginationSlice';
import { setSelectedItemDetails } from '../redux/slices/selectedItemDetailsSlice';
import { IMainPageState } from '../interfaces/types';
import { Flyout } from '../components/flyout/flyout';
import { ThemeSelector } from '../components/themeSelector/themeSelector';
import { useTheme } from '../context/useTheme';
import { Provider } from 'react-redux';

import styles from '../styles/index.module.scss';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pageSize = 15;
  const { currentPage, term } = useSelector((state: RootState) => state.pagination);
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);
  const { theme } = useTheme();

  const [state, setState] = React.useState<IMainPageState>({
    bookList: [],
    totalBooks: 0,
    hasError: false,
  });

  const {
    data: allBooks,
    error: allBooksError,
    isLoading: allBooksIsLoading,
  } = useFetchAllBooksQuery({
    pageNumber: currentPage,
    pageSize,
  });

  const [searchTerm, { isLoading: searchTermIsLoading, isError: searchTermIsError }] =
    useSearchTermMutation();

  const handleSubmit = useCallback(
    async (term: string, page = 1) => {
      setState((prevState) => ({
        ...prevState,
        bookList: [],
        totalBooks: 0,
      }));
      dispatch(setTerm(term));
      dispatch(setPage(page));

      if (term) {
        const searchResult = await searchTerm({ pageNumber: page - 1, pageSize, term });
        const bookList = searchResult.data?.books;
        const totalElements = searchResult.data?.page.totalElements;

        if (bookList && totalElements && totalElements > 0) {
          setState((prevState) => ({
            ...prevState,
            bookList,
            totalBooks: totalElements,
          }));
          router.push(`?search=${term}&page=${page}`, undefined, { shallow: true });
        } else {
          setState((prevState) => ({
            ...prevState,
            bookList: [],
            totalBooks: 0,
          }));
        }
      } else {
        router.push(`?search=&page=${page}`, undefined, { shallow: true });
        dispatch(setTerm(''));
        if (allBooks) {
          setState((prevState) => ({
            ...prevState,
            bookList: allBooks.books ?? [],
            totalBooks: allBooks.page.totalElements ?? 0,
          }));
        }
      }
    },
    [allBooks, dispatch, router, searchTerm],
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    dispatch(setTerm(searchTerm));
    dispatch(setPage(page));

    const fetchBooks = async () => {
      if (!searchTerm) {
        if (allBooks) {
          setState((prevState) => ({
            ...prevState,
            bookList: allBooks.books ?? [],
            totalBooks: allBooks.page.totalElements ?? 0,
          }));
        }
      } else {
        await handleSubmit(searchTerm, page);
      }
    };
    fetchBooks();
  }, [allBooks, dispatch, handleSubmit]);

  const handleErrorButtonClick = () => {
    setState((prevState) => ({ ...prevState, hasError: true }));
  };

  const handleBookClick = (bookUid: string) => {
    dispatch(setSelectedItemDetails(bookUid));
    router.push(`/details/${bookUid}?search=${term}&page=${currentPage}`);
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    router.push(`?search=${term}&page=${page}`, undefined, { shallow: true });
  };

  if (state.hasError) throw new Error();

  return (
    <div className={styles.container}>
      <div
        className={`container ${theme === 'light' ? styles.container_light : styles.container_dark}`}
      >
        <header className={styles.header}>
          <div className={styles.themeSelector__container}>
            <ThemeSelector />
          </div>
          <div className={styles.searchBar__container}>
            <SearchBar handleSubmit={handleSubmit} term={term} />
          </div>
          <div className={styles.errorButton}>
            <Button type="button" text="Test error" onClick={handleErrorButtonClick} />
          </div>
        </header>
        <main className={styles.main__wrapper}>
          <div>
            {(allBooksIsLoading || searchTermIsLoading) && <p className="loading">Loading...</p>}
            {(allBooksError || searchTermIsError) && <p>Failed to fetch books.</p>}
            {!allBooksIsLoading && !allBooksError && !searchTermIsError && (
              <>
                {state.bookList.length === 0 && <p>No books found for this term.</p>}
                <ListView bookList={state.bookList} onBookClick={handleBookClick} />
                <Pagination
                  booksPerPage={pageSize}
                  totalBooks={state.totalBooks}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </main>
      </div>
      {selectedItems.length > 0 && <Flyout />}
    </div>
  );
};

export default function IndexPage() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}
