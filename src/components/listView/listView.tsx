import { IListView } from './IListView';
import { BookCard } from '../bookCard/bookCard';

import styles from './listView.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addItem, removeItem } from '../../redux/slices/selectedItemsSlice';

export const ListView: React.FC<IListView> = ({ bookList, onBookClick }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.selectedItems);

  const handleCheckboxChange = (
    book: {
      uid: string;
      title: string;
      publishedYear: number;
      numberOfPages: number;
    },
    isChecked: boolean,
  ) => {
    if (isChecked) {
      dispatch(addItem(book));
    } else {
      dispatch(removeItem(book.uid));
    }
  };

  return (
    <div>
      <ul className={styles.bookList}>
        {bookList.map((book) => (
          <li key={book.uid}>
            <input
              type="checkbox"
              checked={selectedItems.some((item) => item.uid === book.uid)}
              onChange={(e) =>
                handleCheckboxChange(
                  {
                    uid: book.uid,
                    title: book.title,
                    publishedYear: book.publishedYear,
                    numberOfPages: book.numberOfPages,
                  },
                  e.target.checked,
                )
              }
            />
            <BookCard title={book.title} onClick={() => onBookClick(book.uid)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
