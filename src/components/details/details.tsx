import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookDetails } from '../../controllers/fetchBookDetails';
import { Button } from '../../components/button/button';
import { IFetchDetailBook } from '../../controllers/types';

import './details.scss';

export const Details: React.FC = () => {
  const { bookUid } = useParams<{ bookUid: string }>();
  const [book, setBook] = useState<IFetchDetailBook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookDetails = async () => {
      const bookDetails = await fetchBookDetails(bookUid!);
      setBook(bookDetails);
      setLoading(false);
    };

    getBookDetails();
  }, [bookUid]);

  const handleClose = () => {
    console.log(close);
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="details">
      <Button type="button" text="Close" onClick={handleClose} />
      <h3>Title: {book?.book?.title}</h3>
      <ul className="book-detail__list">
        {book?.book?.authors && book?.book?.authors.length > 0 && (
          <li>
            <b>Author: </b>
            <ul>{book?.book?.authors.map((author) => <li key={author.uid}>{author.name}</li>)}</ul>
          </li>
        )}
        <li>
          <b>Published year: </b>
          {book?.book?.publishedYear}
        </li>
        <li>
          <b>Number of pages: </b>
          {book?.book?.numberOfPages}
        </li>
      </ul>
    </div>
  );
};
