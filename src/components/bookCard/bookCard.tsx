import { IBookCardProps } from './IBookCard';

import styles from './bookCard.module.scss';

export const BookCard: React.FC<IBookCardProps> = ({ title, onClick }) => {
  return (
    <div className={styles.bookCard} onClick={onClick}>
      <div className={styles.bookCard__inner}>
        <p>{title}</p>
      </div>
    </div>
  );
};
