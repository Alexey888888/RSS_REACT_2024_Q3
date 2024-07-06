import { IBook } from '../../pages/mainPage/types';

export interface ISearchBarState {
  searchTerm: string;
}

export interface ISearchBarProps {
  bookList: IBook[];
  term: string;
  handleSubmit: (bookList: IBook[], term: string) => void;
}
