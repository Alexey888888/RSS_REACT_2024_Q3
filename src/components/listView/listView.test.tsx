import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ListView } from './listView';
import { IBook } from '../../pages/mainPage/types';
import { IListView } from './IListView';

const mockBooks: IBook[] = [
  {
    uid: '1',
    title: 'Book One',
    publishedYear: 2024,
    publishedMonth: 8,
    publishedDay: 8,
    numberOfPages: 800,
    stardateFrom: null,
    stardateTo: null,
    yearFrom: null,
    yearTo: null,
    novel: true,
    referenceBook: false,
    biographyBook: false,
    rolePlayingBook: false,
    ebook: true,
    anthology: false,
    novelization: false,
    unauthorizedPublication: false,
    audiobook: true,
    audiobookAbridged: false,
    audiobookPublishedYear: null,
    audiobookPublishedMonth: null,
    audiobookPublishedDay: null,
    audiobookRunTime: null,
    productionNumber: null,
  },
  {
    uid: '2',
    title: 'Book 222',
    publishedYear: 2024,
    publishedMonth: 8,
    publishedDay: 8,
    numberOfPages: 888888,
    stardateFrom: null,
    stardateTo: null,
    yearFrom: null,
    yearTo: null,
    novel: true,
    referenceBook: false,
    biographyBook: false,
    rolePlayingBook: false,
    ebook: true,
    anthology: false,
    novelization: false,
    unauthorizedPublication: false,
    audiobook: true,
    audiobookAbridged: false,
    audiobookPublishedYear: null,
    audiobookPublishedMonth: null,
    audiobookPublishedDay: null,
    audiobookRunTime: null,
    productionNumber: null,
  },
];

describe('ListView Component', () => {
  it('renders the specified number of cards', () => {
    const props: IListView = {
      bookList: mockBooks,
      onBookClick: vi.fn(),
    };
    render(<ListView {...props} />);
    const bookCards = screen.getAllByRole('listitem');
    expect(bookCards).toHaveLength(mockBooks.length);
  });

  it('displays appropriate message if no cards are present', () => {
    render(<ListView bookList={[]} onBookClick={vi.fn()} />);
    const message = screen.getByText(/no books available/i);
    expect(message).toBeInTheDocument();
  });

  it('calls onBookClick when a book is clicked', () => {
    const onBookClickMock = vi.fn();
    render(<ListView bookList={mockBooks} onBookClick={onBookClickMock} />);
    const bookCard = screen.getByText('Book One');
    fireEvent.click(bookCard);
    expect(onBookClickMock).toHaveBeenCalledWith('1');
  });
});
