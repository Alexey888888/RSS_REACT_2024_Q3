import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISelectedItemState {
  selectedItemId: string | null;
}

const initialState: ISelectedItemState = {
  selectedItemId: null,
};

const selectedItemSlice = createSlice({
  name: 'selectedItem',
  initialState,
  reducers: {
    setSelectedItem(state, action: PayloadAction<string | null>) {
      state.selectedItemId = action.payload;
    },
  },
});

export const { setSelectedItem } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;
