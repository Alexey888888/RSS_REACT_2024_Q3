import { Component } from 'react';
import { IBookCardProps } from './IBookCard';

import './bookCard.scss';

export class BookCard extends Component<IBookCardProps> {
  constructor(props: IBookCardProps) {
    super(props);
  }

  render() {
    const { title, publishedYear, numberOfPages } = this.props;

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
  }
}
