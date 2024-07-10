export interface IPaginationProps {
  booksPerPage: number;
  totalBooks: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
