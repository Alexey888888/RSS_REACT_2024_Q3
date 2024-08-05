import React from 'react';
import { Button } from '../../components/button/button';
import { useFetchBookDetailsQuery } from '../../controllers/starTrekApi';

import styles from './details.module.scss';

interface DetailsProps {
  bookUid: string;
  handleCloseDetails: () => void;
}

export const Details: React.FC<DetailsProps> = ({ bookUid, handleCloseDetails }) => {
  const { data: bookDetails, error, isLoading } = useFetchBookDetailsQuery(bookUid);

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">Failed to load book details.</p>;
  }

  const book = bookDetails?.book;

  return (
    <div className={styles.details} data-testid="details-container">
      <Button type="button" text="Close" onClick={handleCloseDetails} />
      <h3>Title: {book?.title}</h3>
      <ul className="book-detail__list">
        {book?.authors && book?.authors.length > 0 && (
          <li>
            <b>Author: </b>
            <ul>
              {book?.authors.map((author: { uid: number; name: string }) => (
                <li key={author.uid}>{author.name}</li>
              ))}
            </ul>
          </li>
        )}
        {book?.publishedYear && (
          <li>
            <b>Published year: </b>
            {book?.publishedYear}
          </li>
        )}
        {book?.numberOfPages && (
          <li>
            <b>Number of pages: </b>
            {book?.numberOfPages}
          </li>
        )}
      </ul>
    </div>
  );
};
