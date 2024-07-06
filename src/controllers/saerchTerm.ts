import { IBook } from '../pages/mainPage/types';

export const searchTerm = (bookList: IBook[], term: string) =>
  bookList.filter((book) => book.title.toLowerCase().includes(term.toLowerCase()));
