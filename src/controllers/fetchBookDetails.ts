import { IFetchDetailBook } from './types';

export const fetchBookDetails = async (uid: string): Promise<IFetchDetailBook> => {
  const apiUrl = 'https://stapi.co/api/v2/rest/book';

  try {
    const response = await fetch(`${apiUrl}?uid=${uid}`);
    const responseObj = await response.json();
    return { book: responseObj.book };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
