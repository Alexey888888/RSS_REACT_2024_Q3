import { useCallback, useEffect, useState } from 'react';
import { SearchBar } from '../../components/searchBar/searchBar';
import { ListView } from '../../components/listView/listView';
import { IMainPageState } from './types';
import { fetchBookList } from '../../controllers/fetchBookList';
import { searchTerm } from '../../controllers/searchTerm';
import { Button } from '../../components/button/button';
import { Pagination } from '../../components/pagination/paginationComponent';

import './mainPage.scss';
import { useLocation, useNavigate } from 'react-router-dom';

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
    booksPerPage: 10,
    totalBooks: 0,
  });

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
        setState((prevState) => ({ ...prevState, loading: true, currentPage: page, term }));
        const pageNumber = page - 1;
        const pageSize = state.booksPerPage;
        if (term) {
          const searchResult = await searchTerm(pageNumber, pageSize, term);
          const { bookList, totalElements } = searchResult;
          if (bookList && totalElements) {
            setState((prevState) => ({ ...prevState, bookList, totalBooks: totalElements }));
          }
        } else {
          getAllBooks(page);
        }
      } catch (error) {
        setState((prevState) => ({ ...prevState, errorMessage: 'Failed to fetch books.' }));
      } finally {
        setState((prevState) => ({ ...prevState, loading: false }));
        navigate(`?search=${term}&page=${page}`);
      }
    },
    [getAllBooks, navigate, state.booksPerPage],
  );

  const handleErrorButtonClick = () => {
    throw new Error('Testing error');
  };

  useEffect(() => {
    const searchTerm = state.term || localStorage.getItem('searchTerm_888888');
    console.log(searchTerm);
    if (!searchTerm) {
      getAllBooks(state.currentPage);
    } else {
      setState((prevState) => ({ ...prevState, term: searchTerm }));
      handleSubmit(searchTerm, state.currentPage);
    }
  }, [handleSubmit, getAllBooks, state.currentPage, state.term]);

  const handlePageChange = (page: number) => {
    setState((prevState) => ({ ...prevState, currentPage: page }));
    handleSubmit(state.term, page);
  };

  return (
    <div className="main-page">
      <div className="container">
        <div className="error-button">
          <Button type="button" text="Error" onClick={handleErrorButtonClick}></Button>
        </div>
        <SearchBar handleSubmit={handleSubmit} term={state.term} />
        {state.loading && <p className="loading">Loading...</p>}
        {state.errorMessage && <p>Error: {state.errorMessage}</p>}
        {!state.loading && !state.errorMessage && (
          <>
            <ListView bookList={state.bookList} />
            <Pagination
              booksPerPage={state.booksPerPage}
              totalBooks={state.totalBooks}
              currentPage={state.currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};
