import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { SearchBar } from '../../components/searchBar/searchBar';
import { ListView } from '../../components/listView/listView';
import { Button } from '../../components/button/button';
import { Pagination } from '../../components/pagination/paginationComponent';
import { RootState } from '../../redux/store';
import { useFetchAllBooksQuery, useSearchTermMutation } from '../../controllers/starTrekApi';
import { setPage, setTerm } from '../../redux/slices/paginationSlice';
import { setSelectedItemDetails } from '../../redux/slices/selectedItemDetailsSlice';
import { IMainPageState } from './types';
import { Flyout } from '../../components/flyout/flyout';
import { ThemeSelector } from '../../components/themeSelector/themeSelector';
import { useTheme } from '../../context/useTheme';

import './mainPage.scss';

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          navigate(`?search=${term}&page=${page}`);
        } else {
          setState((prevState) => ({
            ...prevState,
            bookList: [],
            totalBooks: 0,
          }));
        }
      } else {
        navigate(`?search=&page=${page}`);
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
    [allBooks, dispatch, navigate, searchTerm],
  );

  useEffect(() => {
    const searchTerm = term || localStorage.getItem('searchTerm_888888');

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
        await handleSubmit(searchTerm, currentPage);
      }
    };
    fetchBooks();
  }, [allBooks, allBooksError, handleSubmit, currentPage, term]);

  const handleErrorButtonClick = () => {
    setState((prevState) => ({ ...prevState, hasError: true }));
  };

  const handleBookClick = (bookUid: string) => {
    dispatch(setSelectedItemDetails(bookUid));
    navigate(`/details/${bookUid}?search=${term}&page=${currentPage}`);
  };

  const handleCloseDetails = () => {
    const queryParams = `?search=${term}&page=${currentPage}`;
    navigate('/' + queryParams);
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    navigate(`?search=${term}&page=${page}`);
  };

  const outletExists = !!useLocation().pathname.includes('details');

  if (state.hasError) throw new Error();

  return (
    <div className="main-page">
      <div className={`container ${theme === 'light' ? 'container_light' : 'container_dark'}`}>
        <header className="header">
          <div className="theme-selector__container">
            <ThemeSelector />
          </div>
          <div className="search-bar__container">
            <SearchBar handleSubmit={handleSubmit} term={term} />
          </div>
          <div className="error-button">
            <Button type="button" text="Test error" onClick={handleErrorButtonClick}></Button>
          </div>
        </header>
        <main className="main__wrapper">
          <div style={outletExists ? { width: '270px' } : {}}>
            {(allBooksIsLoading || searchTermIsLoading) && <p className="loading">Loading...</p>}
            {(allBooksError || searchTermIsError) && <p>Failed to fetch books.</p>}
            {!allBooksIsLoading && !allBooksError && !searchTermIsError && (
              <>
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
          <Outlet context={{ handleCloseDetails }} />
        </main>
      </div>
      {selectedItems.length > 0 && <Flyout />}
    </div>
  );
};
