import { describe, it, expect } from 'vitest';
import { bookApi } from './starTrekApi';

describe('bookApi', () => {
  it('defines fetchAllBooks endpoint', () => {
    expect(bookApi.endpoints.fetchAllBooks).toBeDefined();
  });

  it('defines searchTerm endpoint', () => {
    expect(bookApi.endpoints.searchTerm).toBeDefined();
  });

  it('defines fetchBookDetails endpoint', () => {
    expect(bookApi.endpoints.fetchBookDetails).toBeDefined();
  });
});
