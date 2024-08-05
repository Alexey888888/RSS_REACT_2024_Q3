import { describe, it, expect } from 'vitest';
import paginationReducer, { IPaginationState, setPage, setTerm } from './paginationSlice';

describe('paginationSlice', () => {
  it('should handle setPage', () => {
    const initialState: IPaginationState = {
      currentPage: 1,
      term: '',
    };

    const newPage = 3;
    const result = paginationReducer(initialState, setPage(newPage));

    expect(result.currentPage).toBe(newPage);
  });

  it('should handle setTerm', () => {
    const initialState: IPaginationState = {
      currentPage: 1,
      term: '',
    };

    const newTerm = 'search term';
    const result = paginationReducer(initialState, setTerm(newTerm));

    expect(result.term).toBe(newTerm);
  });
});
