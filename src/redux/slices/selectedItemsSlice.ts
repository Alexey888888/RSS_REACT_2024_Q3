import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  uid: string;
  title: string;
  publishedYear: number;
  numberOfPages: number;
}

export interface SelectedItemsState {
  selectedItems: Book[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Book>) {
      state.selectedItems.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.selectedItems = state.selectedItems.filter((item) => item.uid !== action.payload);
    },
    setSelectedItems(state, action: PayloadAction<Book[]>) {
      state.selectedItems = action.payload;
    },
  },
});

export const { addItem, removeItem, setSelectedItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
