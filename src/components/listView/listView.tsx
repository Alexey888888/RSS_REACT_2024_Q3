import { IListView } from './IListView';
import { BookCard } from '../bookCard/bookCard';

import './listView.scss';

export const ListView: React.FC<IListView> = ({ bookList }) => {
  return (
    <div>
      <ul className="book-list">
        {bookList.map((book) => (
          <li key={book.uid}>
            <BookCard title={book.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};
