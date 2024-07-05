import { Component } from 'react';
import { IListView } from './IListView';

export class ListView extends Component<IListView> {
  constructor(props: IListView) {
    super(props);
  }

  render() {
    const { bookList } = this.props;

    return (
      <div>
        <h2>ListView component</h2>
        <ul>
          {bookList.map((book) => (
            <li key={book.uid}>{book.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
