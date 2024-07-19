import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedItemsState {
  selectedItems: string[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      state.selectedItems.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.selectedItems = state.selectedItems.filter((item) => item !== action.payload);
    },
    setSelectedItems(state, action: PayloadAction<string[]>) {
      state.selectedItems = action.payload;
    },
  },
});

export const { addItem, removeItem, setSelectedItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
