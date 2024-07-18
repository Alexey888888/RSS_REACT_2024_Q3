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
import { setSelectedItem } from '../../redux/slices/selectedItemSlice';

import './mainPage.scss';
import { IMainPageState } from './types';

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { currentPageRRR, termRRR } = useSelector((state: RootState) => state.pagination);

  const [state, setState] = React.useState<IMainPageState>({
    bookList: [],
    errorMessage: '',
    term: termRRR,
    currentPage: currentPageRRR,
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

  const [searchTerm] = useSearchTermMutation();

  const handleSubmit = useCallback(
    async (term: string, page = 1) => {
      try {
        setState((prevState) => ({
          ...prevState,
          currentPage: page,
          term,
          errorMessage: '',
          bookList: [],
          totalBooks: 0,
        }));
        dispatch(setTerm(term));
        dispatch(setPage(page));

        const pageNumber = page - 1;
        const pageSize = state.booksPerPage;

        if (term) {
          console.log(term, state.term);
          const searchResult = await searchTerm({ pageNumber, pageSize, term });
          const bookList = searchResult.data?.books;
          const totalElements = searchResult.data?.page.totalElements;

          if (bookList && totalElements && totalElements > 0) {
            setState((prevState) => ({
              ...prevState,
              bookList,
              totalBooks: totalElements,
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              bookList: [],
              totalBooks: 0,
              errorMessage: 'No books found for this term.',
            }));
          }
        } else {
          navigate(`?search=${term}&page=${page}`);
          dispatch(setTerm(''));
        }
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          errorMessage: 'Failed to fetch books.',
        }));
      }
    },
    [dispatch, navigate, searchTerm, state.booksPerPage, state.term],
  );

  useEffect(() => {
    const searchTerm = termRRR || localStorage.getItem('searchTerm_888888');

    const fetchBooks = async () => {
      try {
        if (!searchTerm) {
          if (allBooks) {
            setState((prevState) => ({
              ...prevState,
              bookList: allBooks.books ?? [],
              totalBooks: allBooks.page.totalElements ?? 0,
              errorMessage: allBooksError ? 'Failed to fetch books.' : '',
            }));
          } else if (allBooksError) {
            setState((prevState) => ({
              ...prevState,
              errorMessage: 'Failed to fetch books.',
            }));
          }
        } else {
          setState((prevState) => ({ ...prevState, term: searchTerm }));
          await handleSubmit(searchTerm, state.currentPage);
        }
      } catch (error) {
        setState((prevState) => ({ ...prevState, errorMessage: 'Failed to fetch books.' }));
      }
    };

    fetchBooks();
  }, [allBooks, allBooksError, handleSubmit, allBooksIsLoading, state.currentPage, termRRR]);

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
  }, [location.search]);

  const handleBookClick = (bookUid: string) => {
    dispatch(setSelectedItem(bookUid));
    navigate(`/details/${bookUid}?search=${state.term}&page=${state.currentPage}`);
  };

  const handleCloseDetails = () => {
    const queryParams = `?search=${state.term}&page=${state.currentPage}`;
    navigate('/' + queryParams);
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
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
            {allBooksIsLoading && <p className="loading">Loading...</p>}
            {state.errorMessage && <p>{state.errorMessage}</p>}
            {!allBooksIsLoading && !state.errorMessage && (
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
