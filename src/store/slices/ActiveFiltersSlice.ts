import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { List } from 'reselect/es/types';

interface ActiveFilters {
  activeFilter:any;
}

const initialState: ActiveFilters = {
  activeFilter: [],
};

const ActiveFiltersSlice = createSlice({
  name: 'activeFilter',
  initialState: initialState,
  reducers: {
    setActiveFilter(state, action: PayloadAction<List>) {
      state.activeFilter = action.payload
    },
  },
});

export const ActiveFiltersActions = ActiveFiltersSlice.actions;
export default ActiveFiltersSlice.reducer;
