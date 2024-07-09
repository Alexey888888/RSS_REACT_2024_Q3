import { IBookCardProps } from './IBookCard';

import './bookCard.scss';

export const BookCard: React.FC<IBookCardProps> = ({ title, publishedYear, numberOfPages }) => {
  return (
    <div className="book-card">
      <div className="book-card__inner">
        <p>
          <b>Title</b>: {title}
        </p>
        {publishedYear && (
          <p>
            <b>Published year</b>: {publishedYear}
          </p>
        )}
        {numberOfPages && (
          <p>
            <b>Number of pages</b>: {numberOfPages}
          </p>
        )}
      </div>
    </div>
  );
};
