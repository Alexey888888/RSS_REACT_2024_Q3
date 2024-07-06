import { Component } from 'react';
import { IListView } from './IListView';
import { BookCard } from '../bookCard/bookCard';

import './listView.scss';

export class ListView extends Component<IListView> {
  constructor(props: IListView) {
    super(props);
  }

  render() {
    const { bookList } = this.props;

    return (
      <div>
        <ul className="book-list">
          {bookList.map((book) => (
            <li key={book.uid}>
              <BookCard
                title={book.title}
                publishedYear={book.publishedYear}
                numberOfPages={book.numberOfPages}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
