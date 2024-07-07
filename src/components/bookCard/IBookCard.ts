import { IBook } from '../../pages/mainPage/types';

export interface IBookCardProps extends Pick<IBook, 'title' | 'publishedYear' | 'numberOfPages'> {}