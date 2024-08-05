import { configureStore } from '@reduxjs/toolkit';
import { bookApi } from '../controllers/starTrekApi';
import paginationReducer from './slices/paginationSlice';
import selectedItemDetailsReducer from './slices/selectedItemDetailsSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    selectedItemDetails: selectedItemDetailsReducer,
    selectedItems: selectedItemsReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookApi.middleware),
});

if (typeof window !== 'undefined') {
  const savedSelectedItems = localStorage.getItem('selectedItems_888888');
  if (savedSelectedItems) {
    store.dispatch({
      type: 'selectedItems/load',
      payload: JSON.parse(savedSelectedItems),
    });
  }

  store.subscribe(() => {
    localStorage.setItem(
      'selectedItems_888888',
      JSON.stringify(store.getState().selectedItems.selectedItems),
    );
  });
}

export const loadSelectedItems = () => {
  if (typeof window !== 'undefined') {
    const savedSelectedItems = localStorage.getItem('selectedItems_888888');
    return savedSelectedItems ? JSON.parse(savedSelectedItems) : [];
  }
  return [];
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
