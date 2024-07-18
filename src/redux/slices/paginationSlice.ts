import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPaginationState {
  currentPageRRR: number;
  termRRR: string;
}

const getInitialState = (): IPaginationState => {
  const location = window.location;
  const queryParams = new URLSearchParams(location.search);
  const pageQueryParam = parseInt(queryParams.get('page') || '1', 10);
  const searchQueryParam = queryParams.get('search') || '';

  return {
    currentPageRRR: pageQueryParam,
    termRRR: searchQueryParam,
  };
};

const initialState: IPaginationState = getInitialState();

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPageRRR = action.payload;
    },
    setTerm(state, action: PayloadAction<string>) {
      state.termRRR = action.payload;
    },
  },
});

export const { setPage, setTerm } = paginationSlice.actions;
export default paginationSlice.reducer;
