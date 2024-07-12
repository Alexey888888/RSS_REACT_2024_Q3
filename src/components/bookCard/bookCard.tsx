import { IBookCardProps } from './IBookCard';

import './bookCard.scss';

export const BookCard: React.FC<IBookCardProps> = ({ title }) => {
  return (
    <div className="book-card">
      <div className="book-card__inner">
        <p>{title}</p>
      </div>
    </div>
  );
};
