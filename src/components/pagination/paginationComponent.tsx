import { IPaginationProps } from './IPagination';

export const Pagination: React.FC<IPaginationProps> = ({
  booksPerPage,
  totalBooks,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalBooks / booksPerPage);

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
    <nav className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </nav>
  );
};
