import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ListView } from '../components/listView/listView';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../redux/slices/selectedItemsSlice';
import React from 'react';
import IBook from '../interfaces/types';

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

const bookList: IBook[] = [
  {
    uid: '1',
    title: 'Book One',
    publishedYear: 2720,
    publishedMonth: 10,
    publishedDay: 1,
    numberOfPages: 1500,
    stardateFrom: 14,
    stardateTo: 787777,
    yearFrom: 2020,
    yearTo: 2025,
    novel: true,
    referenceBook: false,
    biographyBook: false,
    rolePlayingBook: false,
    ebook: false,
    anthology: false,
    novelization: false,
    unauthorizedPublication: false,
    audiobook: false,
    audiobookAbridged: false,
    audiobookPublishedYear: null,
    audiobookPublishedMonth: null,
    audiobookPublishedDay: null,
    audiobookRunTime: null,
    productionNumber: null,
  },
  {
    uid: '2',
    title: 'Book Two',
    publishedYear: 2021,
    publishedMonth: 10,
    publishedDay: 15,
    numberOfPages: 200,
    stardateFrom: 8,
    stardateTo: 45,
    yearFrom: 2021,
    yearTo: 2022,
    novel: false,
    referenceBook: true,
    biographyBook: false,
    rolePlayingBook: false,
    ebook: true,
    anthology: false,
    novelization: false,
    unauthorizedPublication: false,
    audiobook: true,
    audiobookAbridged: true,
    audiobookPublishedYear: 2021,
    audiobookPublishedMonth: 10,
    audiobookPublishedDay: 15,
    audiobookRunTime: 300,
    productionNumber: 12345,
  },
];

describe('ListView', () => {
  it('should render list of books', () => {
    render(
      <Provider store={mockStore}>
        <ListView bookList={bookList} onBookClick={(uid) => console.log(uid)} />
      </Provider>,
    );

    expect(screen.getByText('Book One')).toBeTruthy();
    expect(screen.getByText('Book Two')).toBeTruthy();
  });

  it('should call onBookClick with correct uid when BookCard is clicked', () => {
    const onBookClick = vi.fn();

    render(
      <Provider store={mockStore}>
        <ListView bookList={bookList} onBookClick={onBookClick} />
      </Provider>,
    );
    fireEvent.click(screen.getByText('Book One'));
    expect(onBookClick).toHaveBeenCalledWith('1');

    fireEvent.click(screen.getByText('Book Two'));
    expect(onBookClick).toHaveBeenCalledWith('2');
  });
});
