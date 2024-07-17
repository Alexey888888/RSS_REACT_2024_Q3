import { useParams, useOutletContext } from 'react-router-dom';
import { Button } from '../../components/button/button';

import './details.scss';
import { useFetchBookDetailsQuery } from '../../controllers/starTrekApi';

interface DetailsProps {
  handleCloseDetails: () => void;
}

export const Details: React.FC = () => {
  const { bookUid } = useParams<{ bookUid: string }>();
  const { data: bookDetails, error, isLoading } = useFetchBookDetailsQuery(bookUid!);
  const { handleCloseDetails } = useOutletContext<DetailsProps>();

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">Failed to load book details.</p>;
  }

  const book = bookDetails?.book;

  return (
    <div className="details">
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
        {book?.publishedYear && book?.authors.length > 0 && (
          <li>
            <b>Published year: </b>
            {book?.publishedYear}
          </li>
        )}
        {book?.numberOfPages && book?.authors.length > 0 && (
          <li>
            <b>Number of pages: </b>
            {book?.numberOfPages}
          </li>
        )}
      </ul>
    </div>
  );
};
