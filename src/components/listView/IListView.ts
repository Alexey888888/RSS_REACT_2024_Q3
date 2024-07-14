import { IBook } from '../../pages/mainPage/types';

export interface IListView {
  bookList: IBook[];
  onBookClick: (bookUid: string) => void;
}
