import { configureStore } from '@reduxjs/toolkit';
import { bookApi } from '../controllers/starTrekApi';
import paginationReducer from './slices/paginationSlice';
import selectedItemReducer from './slices/selectedItemSlice';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    selectedItem: selectedItemReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
