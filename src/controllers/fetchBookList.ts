import { IBook } from '../pages/mainPage/types';

export const fetchBookList = async (
  pageNumber: number,
  pageSize: number,
): Promise<{ bookList?: IBook[]; error?: string }> => {
  const apiUrl = 'https://stapi.co/api/v2/rest/book/search';

  try {
    const response = await fetch(`${apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    const responseObj = await response.json();
    return { bookList: responseObj.books };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
