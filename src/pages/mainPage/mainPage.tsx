import React, { useCallback, useEffect, useState } from 'react';
import { SearchBar } from '../../components/searchBar/searchBar';
import { ListView } from '../../components/listView/listView';
import { IMainPageState } from './types';
import { useFetchAllBooksQuery, useSearchTermMutation } from '../../controllers/starTrekApi';
import { Button } from '../../components/button/button';
import { Pagination } from '../../components/pagination/paginationComponent';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

import './mainPage.scss';

export const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageQueryParam = parseInt(queryParams.get('page') || '1', 10);
  const searchQueryParam = queryParams.get('search') || '';

  const [shouldFetch, setShouldFetch] = useState(false);

  const [state, setState] = useState<IMainPageState>({
    bookList: [],
    errorMessage: '',
    term: searchQueryParam,
    loading: false,
    currentPage: pageQueryParam,
    booksPerPage: 15,
    totalBooks: 0,
    hasError: false,
  });

  const {
    data: allBooks,
    error: allBooksError,
    isLoading: allBooksIsLoading,
  } = useFetchAllBooksQuery({
    pageNumber: state.currentPage - 1,
    pageSize: state.booksPerPage,
  });

  const [searchTermRRR] = useSearchTermMutation();

  const handleSubmit = useCallback(
    async (term: string, page = 1) => {
      try {
        setState((prevState) => ({
          ...prevState,
          loading: true,
          currentPage: page,
          term,
          errorMessage: '',
          bookList: [],
          totalBooks: 0,
        }));
        const pageNumber = page - 1;
        const pageSize = state.booksPerPage;

        if (term) {
          const searchResult = await searchTermRRR({ pageNumber, pageSize, term });
          const bookList = searchResult.data?.books;
          const totalElements = searchResult.data?.page.totalElements;

          if (bookList && totalElements && totalElements > 0) {
            setState((prevState) => ({
              ...prevState,
              bookList,
              totalBooks: totalElements,
              loading: false,
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              bookList: [],
              totalBooks: 0,
              errorMessage: 'No books found for this term.',
              loading: false,
            }));
          }
        } else {
          console.log(888);
          navigate(`?search=&page=${page}`);
          setShouldFetch(true);
        }
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          errorMessage: 'Failed to fetch books.',
          loading: false,
        }));
      }
    },
    [navigate, searchTermRRR, state.booksPerPage],
  );

  useEffect(() => {
    const searchTerm = state.term || localStorage.getItem('searchTerm_888888');

    const fetchBooks = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        if (!searchTerm) {
          if (allBooks) {
            setState((prevState) => ({
              ...prevState,
              bookList: allBooks.books ?? [],
              totalBooks: allBooks.page.totalElements ?? 0,
              loading: allBooksIsLoading,
              errorMessage: allBooksError ? 'Failed to fetch books.' : '',
            }));
          } else if (allBooksError) {
            setState((prevState) => ({
              ...prevState,
              errorMessage: 'Failed to fetch books.',
              loading: false,
            }));
          } else if (allBooksIsLoading) {
            setState((prevState) => ({
              ...prevState,
              loading: true,
            }));
          }
        } else {
          setState((prevState) => ({ ...prevState, term: searchTerm }));
          await handleSubmit(searchTerm, state.currentPage);
        }
      } catch (error) {
        setState((prevState) => ({ ...prevState, errorMessage: 'Failed to fetch books.' }));
      } finally {
        setState((prevState) => ({ ...prevState, loading: false }));
        setShouldFetch(false);
      }
    };

    fetchBooks();
  }, [
    allBooks,
    allBooksError,
    handleSubmit,
    allBooksIsLoading,
    shouldFetch,
    state.currentPage,
    state.term,
  ]);

  const handleErrorButtonClick = () => {
    setState((prevState) => ({ ...prevState, hasError: true }));
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newPage = parseInt(queryParams.get('page') || '1', 10);
    const newSearch = queryParams.get('search') || '';
    setState((prevState) => ({
      ...prevState,
      currentPage: newPage,
      term: newSearch,
    }));
    setShouldFetch(true);
  }, [location.search]);

  const handleBookClick = (bookUid: string) => {
    navigate(`/details/${bookUid}?search=${state.term}&page=${state.currentPage}`);
  };

  const handleCloseDetails = () => {
    const queryParams = `?search=${state.term}&page=${state.currentPage}`;
    navigate('/' + queryParams);
  };

  const handlePageChange = (page: number) => {
    setState((prevState) => ({ ...prevState, currentPage: page }));
    navigate(`?search=${state.term}&page=${page}`);
    setShouldFetch(true);
  };

  const outletExists = !!useLocation().pathname.includes('details');

  if (state.hasError) throw new Error();

  return (
    <div className="main-page">
      <div className="container">
        <header className="header">
          <div className="search-bar-container">
            <SearchBar handleSubmit={handleSubmit} term={state.term} />
          </div>
          <div className="error-button">
            <Button type="button" text="Test error" onClick={handleErrorButtonClick}></Button>
          </div>
        </header>
        <main className="main__wrapper">
          <div style={outletExists ? { width: '270px' } : {}}>
            {state.loading && <p className="loading">Loading...</p>}
            {state.errorMessage && <p>{state.errorMessage}</p>}
            {!state.loading && !state.errorMessage && (
              <>
                <ListView bookList={state.bookList} onBookClick={handleBookClick} />
                <Pagination
                  booksPerPage={state.booksPerPage}
                  totalBooks={state.totalBooks}
                  currentPage={state.currentPage}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
          <Outlet context={{ handleCloseDetails }} />
        </main>
      </div>
    </div>
  );
};
