import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StarTrekApiResponse } from './types';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v2/rest' }),
  endpoints: (builder) => ({
    fetchAllBooks: builder.query<StarTrekApiResponse, { pageNumber: number; pageSize: number }>({
      query: ({ pageNumber, pageSize }) =>
        `book/search?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
  }),
});

export const { useFetchAllBooksQuery } = bookApi;
