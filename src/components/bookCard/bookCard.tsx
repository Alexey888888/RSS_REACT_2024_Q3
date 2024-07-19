import { IBookCardProps } from './IBookCard';

import './bookCard.scss';

export const BookCard: React.FC<IBookCardProps> = ({ title, onClick }) => {
  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-card__inner">
        <p>{title}</p>
      </div>
    </div>
  );
};
