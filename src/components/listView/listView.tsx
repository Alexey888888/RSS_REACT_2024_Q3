import { IListView } from './IListView';
import { BookCard } from '../bookCard/bookCard';

import './listView.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addItem, removeItem } from '../../redux/slices/selectedItemsSlice';

export const ListView: React.FC<IListView> = ({ bookList, onBookClick }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);

  const handleCheckboxChange = (uid: string, isChecked: boolean) => {
    if (isChecked) {
      dispatch(addItem(uid));
    } else {
      dispatch(removeItem(uid));
    }
  };

  return (
    <div>
      <ul className="book-list">
        {bookList.map((book) => (
          <li key={book.uid}>
            <input
              type="checkbox"
              checked={selectedItems.includes(book.uid)}
              onChange={(e) => handleCheckboxChange(book.uid, e.target.checked)}
            />
            <BookCard title={book.title} onClick={() => onBookClick(book.uid)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
