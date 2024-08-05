import React from 'react';
import { GetServerSideProps } from 'next';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { ThemeProvider } from '../../context/themeContext';
import { Details } from '../../components/details/details';

interface DetailsPageProps {
  bookUid: string;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ bookUid }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Details handleCloseDetails={() => {}} bookUid={bookUid} />
      </ThemeProvider>
    </Provider>
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
