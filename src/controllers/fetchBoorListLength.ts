export const fetchBookListLength = async (): Promise<{
  bookListLength?: number;
  error?: string;
}> => {
  const apiUrl = 'https://stapi.co/api/v2/rest/book/search';

  try {
    const response = await fetch(`${apiUrl}`);
    const responseObj = await response.json();
    return { bookListLength: responseObj.page.totalElements };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
