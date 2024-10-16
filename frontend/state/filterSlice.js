// state/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'sizeFilter',
  initialState: 'All',
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;