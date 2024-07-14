import { useCallback, useEffect, useState } from 'react';
import { SearchBar } from '../../components/searchBar/searchBar';
import { ListView } from '../../components/listView/listView';
import { IMainPageState } from './types';
import { fetchBookList } from '../../controllers/fetchBookList';
import { searchTerm } from '../../controllers/searchTerm';
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

  const [shouldFetch, setShouldFetch] = useState(false);

  const getAllBooks = useCallback(
    async (page = 1) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true, currentPage: page }));
        const pageNumber = page - 1;
        const pageSize = state.booksPerPage;
        const response = await fetchBookList(pageNumber, pageSize);
        const { error, bookList, totalElements } = response;
        if (error) {
          setState((prevState) => ({ ...prevState, errorMessage: error }));
        } else if (bookList && totalElements) {
          setState((prevState) => ({ ...prevState, bookList, totalBooks: totalElements }));
        }
      } catch (error) {
        setState((prevState) => ({ ...prevState, errorMessage: 'Failed to fetch books.' }));
      } finally {
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    },
    [state.booksPerPage],
  );

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
          const searchResult = await searchTerm(pageNumber, pageSize, term);
          const { bookList, totalElements } = searchResult;

          if (bookList && totalElements && totalElements > 0) {
            setState((prevState) => ({ ...prevState, bookList, totalBooks: totalElements }));
          } else {
            setState((prevState) => ({
              ...prevState,
              bookList: [],
              totalBooks: 0,
              errorMessage: 'No books found for this term.',
            }));
          }
        } else {
          getAllBooks(page);
        }
      } catch (error) {
        setState((prevState) => ({ ...prevState, errorMessage: 'Failed to fetch books.' }));
      } finally {
        setState((prevState) => ({ ...prevState, loading: false }));
        navigate(`?search=${term}&page=${page}`, { replace: true });
      }
    },
    [getAllBooks, navigate, state.booksPerPage],
  );

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

  useEffect(() => {
    if (!shouldFetch) return;

    const searchTerm = state.term || localStorage.getItem('searchTerm_888888');

    const fetchBooks = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        if (!searchTerm) {
          await getAllBooks(state.currentPage);
        } else {
          setState((prevState) => ({ ...prevState, term: searchTerm }));
          await handleSubmit(searchTerm, state.currentPage);
        }
      } catch (error) {
        setState((prevState) => ({ ...prevState, errorMessage: 'Failed to fetch books.' }));
      } finally {
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    };

    fetchBooks();

    setShouldFetch(false);
  }, [handleSubmit, getAllBooks, state.currentPage, state.term, shouldFetch]);

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
