import { IListView } from './IListView';
import { BookCard } from '../bookCard/bookCard';

import './listView.scss';

export const ListView: React.FC<IListView> = ({ bookList, onBookClick }) => {
  return (
    <div>
      <ul className="book-list">
        {bookList.map((book) => (
          <li key={book.uid}>
            <input type="checkbox" />
            <BookCard title={book.title} onClick={() => onBookClick(book.uid)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
