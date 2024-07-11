import { IBook } from '../pages/mainPage/types';

export interface IResponse {
  bookList?: IBook[];
  totalElements?: number;
  error?: string;
}
