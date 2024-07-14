import { describe, it, expect, vi } from 'vitest';
import { fetchBookDetails } from './fetchBookDetails';
import { fetchBookList } from './fetchBookList';
import { searchTerm } from './searchTerm';
import { mockFetchDetailBook, mockFetchBooks } from './mockData';

vi.mock('./fetchBookDetails', () => ({
  fetchBookDetails: vi.fn(),
}));

vi.mock('./fetchBookList', () => ({
  fetchBookList: vi.fn(),
}));

vi.mock('./searchTerm', () => ({
  searchTerm: vi.fn(),
}));

const fetchBookDetailsMock = fetchBookDetails as jest.MockedFunction<typeof fetchBookDetails>;
const fetchBookListMock = fetchBookList as jest.MockedFunction<typeof fetchBookList>;
const searchTermMock = searchTerm as jest.MockedFunction<typeof searchTerm>;

fetchBookDetailsMock.mockImplementation(async (uid: string) => {
  if (uid === 'book1') {
    return mockFetchDetailBook;
  }
  throw new Error(`Book with UID ${uid} not found`);
});

fetchBookListMock.mockResolvedValue(mockFetchBooks);
searchTermMock.mockResolvedValue(mockFetchBooks);

describe('Book API Tests', () => {
  it('Test fetchBookDetails', async () => {
    const uid = 'book1';
    const result = await fetchBookDetails(uid);
    expect(result).toEqual(mockFetchDetailBook);
  });

  it('Test fetchBookList', async () => {
    const pageNumber = 1;
    const pageSize = 10;
    const result = await fetchBookList(pageNumber, pageSize);
    expect(result).toEqual(mockFetchBooks);
  });

  it('Test searchTerm', async () => {
    const pageNumber = 1;
    const pageSize = 10;
    const term = 'Book';
    const result = await searchTerm(pageNumber, pageSize, term);
    expect(result).toEqual(mockFetchBooks);
  });
});
