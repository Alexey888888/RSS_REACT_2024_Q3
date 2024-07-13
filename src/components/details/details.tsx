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
      <h3>{book?.book?.title}</h3>
    </div>
  );
};
