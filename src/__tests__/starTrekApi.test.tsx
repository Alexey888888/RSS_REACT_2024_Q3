import { describe, it, expect, vi } from 'vitest';
import { fetchBooks } from '../controllers/starTrekApi';

describe('fetchBooks', () => {
  it('fetches books successfully', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            page: {
              totalElements: 2,
            },
            books: [
              { uid: '1', title: 'Book One', authors: [] },
              { uid: '2', title: 'Book Two', authors: [] },
            ],
          }),
      }),
    ) as unknown as jest.Mock;
    const result = await fetchBooks('Star Trek', 1);
    expect(result).toEqual({
      bookList: [
        { uid: '1', title: 'Book One', authors: [] },
        { uid: '2', title: 'Book Two', authors: [] },
      ],
      totalBooks: 2,
      hasError: false,
    });
  });

  it('handles fetch error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error'))) as unknown as jest.Mock;
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = await fetchBooks('Star Trek', 1);
    expect(result).toEqual({
      bookList: [],
      totalBooks: 0,
      hasError: true,
    });
    consoleErrorSpy.mockRestore();
  });
});
