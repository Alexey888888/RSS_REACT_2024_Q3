import { IFetchBooks } from './types';

export const searchTerm = async (
  pageNumber: number,
  pageSize: number,
  term: string,
): Promise<IFetchBooks> => {
  const apiUrl = 'https://stapi.co/api/v2/rest/book/search';
  const body = `title=${encodeURIComponent(term)}`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  };

  try {
    const response = await fetch(
      `${apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      requestOptions,
    );
    const responseObj = await response.json();
    return { bookList: responseObj.books, totalElements: responseObj.page.totalElements };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
