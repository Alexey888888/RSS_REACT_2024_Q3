import React from 'react';
import { GetServerSideProps } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../redux/store';
import { setPage, setTerm } from '../redux/slices/paginationSlice';
import { Details } from '../components/details/details';
import { SearchBar } from '../components/searchBar/searchBar';
import { ListView } from '../components/listView/listView';
import { Pagination } from '../components/pagination/paginationComponent';
import IBook, { IMainPageState } from '../interfaces/types';
import { fetchBooks } from '../controllers/starTrekApi';
import { useTheme } from '../context/useTheme';
import styles from '../styles/index.module.scss';
import Head from 'next/head';
import { ThemeSelector } from '../components/themeSelector/themeSelector';
import { Flyout } from '../components/flyout/flyout';

interface MainPageProps {
  initialBooks: IBook[];
  initialTotalBooks: number;
  initialTerm: string;
  initialPage: number;
}

const MainPage: React.FC<MainPageProps> = ({
  initialBooks,
  initialTotalBooks,
  initialTerm,
  initialPage,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentPage, term } = useSelector((state: RootState) => state.pagination);
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);
  const { theme } = useTheme();

  const [state, setState] = React.useState<IMainPageState>({
    bookList: initialBooks,
    totalBooks: initialTotalBooks,
    hasError: false,
  });

  const [selectedBookUid, setSelectedBookUid] = React.useState<string | null>(null);

  const handleSubmit = async (term: string, page = 1) => {
    setState({ bookList: [], totalBooks: 0, hasError: false });
    dispatch(setTerm(term));
    dispatch(setPage(page));

    const result = await fetchBooks(term, page);
    setState(result);
    router.push(`?search=${term}&page=${page}`, undefined, { shallow: true });
  };

  React.useEffect(() => {
    dispatch(setTerm(initialTerm));
    dispatch(setPage(initialPage));
  }, [dispatch, initialTerm, initialPage]);

  const handleBookClick = (bookUid: string) => {
    setSelectedBookUid(bookUid);
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    handleSubmit(term, page);
  };

  const handleCloseDetails = () => {
    setSelectedBookUid(null);
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
            <SearchBar handleSubmit={handleSubmit} term={term} />
          </div>
        </header>
        <main className={styles.main__wrapper}>
          <div className={styles.listView__wrapper}>
            <ListView bookList={state.bookList} onBookClick={handleBookClick} />
            <Pagination
              booksPerPage={15}
              totalBooks={state.totalBooks}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
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
