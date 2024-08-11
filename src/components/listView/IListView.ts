import IBook from '../../interfaces/types';

export interface IListView {
  bookList: IBook[];
  onBookClick: (bookUid: string) => void;
}
