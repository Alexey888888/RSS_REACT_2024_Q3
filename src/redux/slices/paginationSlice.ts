import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPaginationState {
  currentPage: number;
  term: string;
}

const initialState: IPaginationState = {
  currentPage: 1,
  term: '',
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTerm(state, action: PayloadAction<string>) {
      state.term = action.payload;
    },
  },
});

export const { setPage, setTerm } = paginationSlice.actions;
export default paginationSlice.reducer;
