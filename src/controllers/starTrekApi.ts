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
