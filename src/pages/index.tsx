import React, { useEffect, useState, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../redux/store';
import { setPage, setTerm } from '../redux/slices/paginationSlice';
import { Details } from '../components/details/details';
import { SearchBar } from '../components/searchBar/searchBar';
import { ListView } from '../components/listView/listView';
import { Pagination } from '../components/pagination/paginationComponent';
import { IMainPageState, MainPageProps } from '../interfaces/types';
import { fetchBooks } from '../controllers/starTrekApi';
import { useTheme } from '../context/useTheme';
import styles from '../styles/index.module.scss';
import Head from 'next/head';
import { ThemeSelector } from '../components/themeSelector/themeSelector';
import { Flyout } from '../components/flyout/flyout';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const MainPage: React.FC<MainPageProps> = ({
  initialBooks,
  initialTotalBooks,
  initialTerm,
  initialPage,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentPage } = useSelector((state: RootState) => state.pagination);
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);
  const { theme } = useTheme();

  const [searchTerm, setSearchTerm] = useLocalStorage({
    key: 'searchTerm_888888',
    initValue: initialTerm,
  });

  const [state, setState] = useState<IMainPageState>({
    bookList: initialBooks,
    totalBooks: initialTotalBooks,
    hasError: false,
  });

  const [selectedBookUid, setSelectedBookUid] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAndUpdateBooks = useCallback(
    async (term: string, page: number) => {
      setIsLoading(true);
      setState({ bookList: [], totalBooks: 0, hasError: false });
      dispatch(setTerm(term));
      dispatch(setPage(page));

      const result = await fetchBooks(term, page);
      setState(result);
      setIsLoading(false);
    },
    [dispatch],
  );

  useEffect(() => {
    const { search, page, details } = router.query;
    const currentSearchTerm = search || searchTerm;
    const pageNumber = parseInt(page as string, 10) || initialPage;

    if (details) {
      setSelectedBookUid(details as string);
    } else {
      setSelectedBookUid(null);
    }

    fetchAndUpdateBooks(currentSearchTerm as string, pageNumber);
  }, [router.query, fetchAndUpdateBooks, initialPage, searchTerm]);

  const handleBookClick = (bookUid: string) => {
    setSelectedBookUid(bookUid);
    router.push(`/?search=${searchTerm}&page=${currentPage}&details=${bookUid}`, undefined, {
      shallow: true,
    });
  };

  const handlePageChange = (page: number) => {
    router.push(`/?search=${searchTerm}&page=${page}`, undefined, { shallow: true });
  };

  const handleCloseDetails = () => {
    setSelectedBookUid(null);
    router.push(`/?search=${searchTerm}&page=${currentPage}`, undefined, { shallow: true });
  };

  const handleSubmit = async (term: string) => {
    setSearchTerm(term);
    await fetchAndUpdateBooks(term, 1);
    router.push(`/?search=${term}&page=1`, undefined, { shallow: true });
  };

  if (state.hasError) return <p>Error!</p>;

  return (
    <>
      <Head>
        <title>Star Trek Main</title>
      </Head>
      <div
        className={`container ${theme === 'light' ? styles.container_light : styles.container_dark}`}
      >
        <header className={styles.header}>
          <div className={styles.themeSelector__container}>
            <ThemeSelector />
          </div>
          <div className={styles.searchBar__container}>
            <SearchBar handleSubmit={handleSubmit} term={searchTerm} />
          </div>
        </header>
        <main className={styles.main__wrapper}>
          <div className={styles.listView__wrapper}>
            {isLoading ? (
              <p className="loading">Loading...</p>
            ) : state.bookList.length > 0 ? (
              <>
                <ListView bookList={state.bookList} onBookClick={handleBookClick} />
                <Pagination
                  booksPerPage={15}
                  totalBooks={state.totalBooks}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <p>No books found for this term.</p>
            )}
          </div>
          {selectedBookUid && (
            <div className={styles.details__wrapper}>
              <Details bookUid={selectedBookUid} handleCloseDetails={handleCloseDetails} />
            </div>
          )}
        </main>
        {selectedItems.length > 0 && <Flyout />}
      </div>
    </>
  );
};

export default MainPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const searchTerm = query.search || '';
  const page = parseInt(query.page as string, 10) || 1;

  const result = await fetchBooks(searchTerm as string, page);

  return {
    props: {
      initialBooks: result.bookList,
      initialTotalBooks: result.totalBooks,
      initialTerm: searchTerm,
      initialPage: page,
    },
  };
};
