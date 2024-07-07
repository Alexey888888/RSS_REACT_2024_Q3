import { IBook } from '../pages/mainPage/types';

export const searchTerm = async (
  pageNumber: number,
  pageSize: number,
  term: string,
): Promise<{ bookList?: IBook[]; error?: string }> => {
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
    return { bookList: responseObj.books };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
