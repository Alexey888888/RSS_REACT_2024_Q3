import { useCallback, useEffect, useState } from 'react';
import { SearchBar } from '../../components/searchBar/searchBar';
import { ListView } from '../../components/listView/listView';
import { IMainPageState } from './types';
import { fetchBookList } from '../../controllers/fetchBookList';
import { searchTerm } from '../../controllers/searchTerm';
import { Button } from '../../components/button/button';

import './mainPage.scss';

export const MainPage: React.FC = () => {
  const [state, setState] = useState<IMainPageState>({
    bookList: [],
    errorMessage: '',
    term: '',
    loading: false,
  });

  const getAllBooks = useCallback(async () => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const pageNumber = 0;
      const pageSize = 50;
      const response = await fetchBookList(pageNumber, pageSize);
      const responseError = response.error;
      const responseBookList = response.bookList;
      if (responseError) {
        setState((prevState) => ({ ...prevState, errorMessage: responseError }));
      } else if (responseBookList) {
        setState((prevState) => ({ ...prevState, bookList: responseBookList }));
      }
    } catch (error) {
      setState((prevState) => ({ ...prevState, errorMessage: 'Failed to fetch books.' }));
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, []);

  const handleSubmit = useCallback(
    async (term: string) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const pageNumber = 0;
        const pageSize = 50;
        if (term) {
          const searchResult = await searchTerm(pageNumber, pageSize, term);
          const searchResultBookList = searchResult.bookList;
          if (searchResultBookList)
            setState((prevState) => ({ ...prevState, bookList: searchResultBookList }));
        } else getAllBooks();
      } catch (error) {
        setState((prevState) => ({ ...prevState, errorMessage: 'Failed to fetch books.' }));
      } finally {
        setState((prevState) => ({ ...prevState, loading: false }));
      }

      localStorage.setItem('searchTerm_888888', term);
    },
    [getAllBooks],
  );

  const handleErrorButtonClick = () => {
    setState(() => {
      throw new Error('Testing error');
    });
  };

  useEffect(() => {
    const searchTerm = localStorage.getItem('searchTerm_888888');
    if (!searchTerm) {
      getAllBooks();
    } else {
      setState((prevState) => ({ ...prevState, term: searchTerm }));
      handleSubmit(searchTerm);
    }
  }, [handleSubmit, getAllBooks]);

  return (
    <div className="main-page">
      <div className="container">
        <div className="error-button">
          <Button type="button" text="Error" onClick={handleErrorButtonClick}></Button>
        </div>
        <SearchBar handleSubmit={handleSubmit} />
        {state.loading && <p className="loading">Loading...</p>}
        {state.errorMessage && <p>Error: {state.errorMessage}</p>}
        {!state.loading && !state.errorMessage && <ListView bookList={state.bookList} />}
      </div>
    </div>
  );
};
