import { describe, it, expect } from 'vitest';
import selectedItemsReducer, { addItem, removeItem, setSelectedItems } from './selectedItemsSlice';

describe('selectedItemsSlice', () => {
  it('should handle addItem action', () => {
    const initialState = { selectedItems: [] };
    const newBook = { uid: '1', title: 'Book Title', publishedYear: 2024, numberOfPages: 200 };
    const newState = selectedItemsReducer(initialState, addItem(newBook));
    expect(newState.selectedItems).toContain(newBook);
  });

  it('should handle removeItem action', () => {
    const initialState = {
      selectedItems: [{ uid: '1', title: 'Book Title', publishedYear: 2024, numberOfPages: 200 }],
    };
    const newState = selectedItemsReducer(initialState, removeItem('1'));
    expect(newState.selectedItems).not.toContainEqual({
      uid: '1',
      title: 'Book Title',
      publishedYear: 2024,
      numberOfPages: 200,
    });
  });

  it('should handle setSelectedItems action', () => {
    const initialState = { selectedItems: [] };
    const newBooks = [
      { uid: '1', title: 'Book One', publishedYear: 2028, numberOfPages: 150 },
      { uid: '2', title: 'Book Two', publishedYear: 2088, numberOfPages: 300 },
    ];
    const newState = selectedItemsReducer(initialState, setSelectedItems(newBooks));
    expect(newState.selectedItems).toEqual(newBooks);
  });
});
