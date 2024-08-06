import React from 'react';
import { GetServerSideProps } from 'next';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { ThemeProvider } from '../../context/themeContext';
import { Details } from '../../components/details/details';
import Head from 'next/head';

interface DetailsPageProps {
  bookUid: string;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ bookUid }) => {
  return (
    <>
      <Head>
        <title>Star Trek Detail</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider>
          <Details handleCloseDetails={() => {}} bookUid={bookUid} />
        </ThemeProvider>
      </Provider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { bookUid } = context.params!;

  return {
    props: {
      bookUid,
    },
  };
};

export default DetailsPage;
