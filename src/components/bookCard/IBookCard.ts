import IBook from '../../interfaces/types';

export interface IBookCardProps extends Pick<IBook, 'title'> {
  onClick: () => void;
}
