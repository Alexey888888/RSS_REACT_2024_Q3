import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISelectedItemState {
  selectedItemId: string | null;
}

const initialState: ISelectedItemState = {
  selectedItemId: null,
};

const selectedItemDetailsSlice = createSlice({
  name: 'selectedDetailItem',
  initialState,
  reducers: {
    setSelectedItemDetails(state, action: PayloadAction<string | null>) {
      state.selectedItemId = action.payload;
    },
  },
});

export const { setSelectedItemDetails } = selectedItemDetailsSlice.actions;
export default selectedItemDetailsSlice.reducer;
