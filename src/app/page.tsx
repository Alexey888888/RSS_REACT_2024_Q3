'use client';

import React, { Suspense, useEffect, useState, useCallback, lazy } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setPage, setTerm } from '../redux/slices/paginationSlice';
import { fetchBooks } from '../controllers/starTrekApi';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import useTheme from '../context/useTheme';

import styles from '../styles/index.module.scss';

const ThemeSelector = lazy(() => import('../components/themeSelector/themeSelector'));
const SearchBar = lazy(() => import('../components/searchBar/searchBar'));
const ListView = lazy(() => import('../components/listView/listView'));
const Pagination = lazy(() => import('../components/pagination/paginationComponent'));
const Details = lazy(() => import('../components/details/details'));
const Flyout = lazy(() => import('../components/flyout/flyout'));

const Loading = () => <div>Loading...</div>;

function ClientComponent() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentPage } = useSelector((state: RootState) => state.pagination);
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [state, setState] = useState({
    bookList: [],
    totalBooks: 0,
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

      try {
        const result = await fetchBooks(term, page);
        setState(result);
      } catch (error) {
        setState({ bookList: [], totalBooks: 0, hasError: true });
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const localStorageTerm = localStorage.getItem('searchTerm');
    const currentSearchTerm = searchParams.get('search') || localStorageTerm || '';
    const pageNumber = parseInt(searchParams.get('page') || '1', 10);

    setSearchTerm(currentSearchTerm);

    if (searchParams.get('details')) {
      setSelectedBookUid(searchParams.get('details') || null);
    } else {
      setSelectedBookUid(null);
    }

    fetchAndUpdateBooks(currentSearchTerm, pageNumber);
  }, [searchParams, fetchAndUpdateBooks]);

  const handleBookClick = (bookUid: string) => {
    setSelectedBookUid(bookUid);
    router.push(`?search=${searchTerm}&page=${currentPage}&details=${bookUid}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`?search=${searchTerm}&page=${page}`);
  };

  const handleCloseDetails = () => {
    setSelectedBookUid(null);
    router.push(`?search=${searchTerm}&page=${currentPage}`);
  };

  const handleSubmit = async (term: string) => {
    setSearchTerm(term);
    localStorage.setItem('searchTerm', term);
    await fetchAndUpdateBooks(term, 1);
    router.push(`?search=${term}&page=1`);
  };

  if (state.hasError) return <p>Error!</p>;

  const booksPerPage = 15;
  const totalPages = Math.ceil(state.totalBooks / booksPerPage);

  return (
    <>
      <Head>
        <title>Star Trek Main</title>
      </Head>
      <div
        className={`${styles.container} ${theme === 'light' ? styles.container_light : styles.container_dark}`}
      >
        <header className={styles.header}>
          <Suspense fallback={<Loading />}>
            <ThemeSelector />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <SearchBar handleSubmit={handleSubmit} term={searchTerm} />
          </Suspense>
        </header>
        <main className={styles.main__wrapper}>
          <div className={styles.listView__wrapper}>
            {isLoading ? (
              <p className="loading">Loading...</p>
            ) : state.bookList.length > 0 ? (
              <>
                <Suspense fallback={<Loading />}>
                  <ListView bookList={state.bookList} onBookClick={handleBookClick} />
                </Suspense>
                {state.totalBooks > 0 && totalPages > 1 && (
                  <Suspense fallback={<Loading />}>
                    <Pagination
                      booksPerPage={booksPerPage}
                      totalBooks={state.totalBooks}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </Suspense>
                )}
              </>
            ) : (
              <p>No books found for this term.</p>
            )}
          </div>
          {selectedBookUid && (
            <div className={styles.details__wrapper}>
              <Suspense fallback={<Loading />}>
                <Details bookUid={selectedBookUid} handleCloseDetails={handleCloseDetails} />
              </Suspense>
            </div>
          )}
        </main>
        {selectedItems.length > 0 && (
          <Suspense fallback={<Loading />}>
            <Flyout />
          </Suspense>
        )}
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientComponent />
    </Suspense>
  );
}
