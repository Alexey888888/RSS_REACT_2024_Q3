import { useEffect, useState } from 'react';
import { IPaginationProps } from './IPagination';

import styles from './pagination.module.scss';
import { Button } from '../button/button';

export const Pagination: React.FC<IPaginationProps> = ({
  booksPerPage,
  totalBooks,
  currentPage,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (totalBooks > 0) {
      const calculatedPages = Math.ceil(totalBooks / booksPerPage);
      setTotalPages(calculatedPages);
    }
  }, [totalBooks, booksPerPage]);

  if (totalPages === 0) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <nav>
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          type={'button'}
          text={' Previous'}
        />
        <span>
          {currentPage} of {totalPages}
        </span>
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          type={'button'}
          text={'Next'}
        />
      </nav>
    </div>
  );
};
