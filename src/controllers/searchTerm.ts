import { IResponse } from './types';

export const searchTerm = async (
  pageNumber: number,
  pageSize: number,
  term: string,
): Promise<IResponse> => {
  const apiUrl = 'https://stapi.co/api/v2/rest/book/search';
  const body = `pageNumber=${pageNumber}&pageSize=${pageSize}&title=${encodeURIComponent(term)}`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const responseObj = await response.json();
    return { bookList: responseObj.books, totalElements: responseObj.page.totalElements };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
