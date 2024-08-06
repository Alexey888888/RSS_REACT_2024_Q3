import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISearchTermProps, StarTrekApiResponse } from './types';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v2/rest' }),
  endpoints: (builder) => ({
    fetchAllBooks: builder.query<StarTrekApiResponse, { pageNumber: number; pageSize: number }>({
      query: ({ pageNumber, pageSize }) =>
        `book/search?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
    searchTerm: builder.mutation<StarTrekApiResponse, ISearchTermProps>({
      query: ({ pageNumber, pageSize, term }) => ({
        url: `/book/search?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'POST',
        body: new URLSearchParams({ title: term }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    }),
    fetchBookDetails: builder.query({
      query: (uid) => `/book?uid=${uid}`,
    }),
  }),
});

export const { useFetchAllBooksQuery, useSearchTermMutation, useFetchBookDetailsQuery } = bookApi;

export const fetchBooks = async (term: string, page: number) => {
  const apiUrl = 'https://stapi.co/api/v2/rest/book/search';
  const pageSize = 15;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `title=${encodeURIComponent(term)}`,
  };

  try {
    const response = await fetch(
      `${apiUrl}?pageNumber=${page - 1}&pageSize=${pageSize}`,
      term ? requestOptions : undefined,
    );
    const data = await response.json();
    return {
      bookList: data.books || [],
      totalBooks: data.page?.totalElements || 0,
      hasError: false,
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return {
      bookList: [],
      totalBooks: 0,
      hasError: true,
    };
  }
};
