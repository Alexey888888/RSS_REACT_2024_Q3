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

  const { currentPageRRR, termRRR } = useSelector((state: RootState) => state.pagination);

  const pageSize = 15;

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
    pageNumber: currentPageRRR,
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
        } else {
          setState((prevState) => ({
            ...prevState,
            bookList: [],
            totalBooks: 0,
          }));
        }
      } else {
        navigate(`?search=${term}&page=${page}`);
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
    const searchTerm = termRRR || localStorage.getItem('searchTerm_888888');

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
        await handleSubmit(searchTerm, currentPageRRR);
      }
    };
    fetchBooks();
  }, [allBooks, allBooksError, handleSubmit, currentPageRRR, termRRR]);

  const handleErrorButtonClick = () => {
    setState((prevState) => ({ ...prevState, hasError: true }));
  };

  const handleBookClick = (bookUid: string) => {
    dispatch(setSelectedItem(bookUid));
    navigate(`/details/${bookUid}?search=${termRRR}&page=${currentPageRRR}`);
  };

  const handleCloseDetails = () => {
    const queryParams = `?search=${termRRR}&page=${currentPageRRR}`;
    navigate('/' + queryParams);
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    navigate(`?search=${termRRR}&page=${page}`);
  };

  const outletExists = !!useLocation().pathname.includes('details');

  if (state.hasError) throw new Error();

  return (
    <div className="main-page">
      <div className="container">
        <header className="header">
          <div className="search-bar-container">
            <SearchBar handleSubmit={handleSubmit} term={termRRR} />
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
                  currentPage={currentPageRRR}
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
