import { IResponse } from './types';

export const fetchBookList = async (pageNumber: number, pageSize: number): Promise<IResponse> => {
  const apiUrl = 'https://stapi.co/api/v2/rest/book/search';

  try {
    const response = await fetch(`${apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    const responseObj = await response.json();
    return { bookList: responseObj.books, totalElements: responseObj.page.totalElements };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
