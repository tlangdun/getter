import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmptyQueryFilter, QueryFilter } from '../models/queryModel';

interface ActiveFilters {
  activeFilter:QueryFilter;
}

const initialState: ActiveFilters = {
  activeFilter: EmptyQueryFilter,
};

const ActiveFiltersSlice = createSlice({
  name: 'activeFilter',
  initialState: initialState,
  reducers: {
    setActiveFilter(state, action: PayloadAction<QueryFilter>) {
      state.activeFilter = action.payload
    },
  },
});

export const ActiveFiltersActions = ActiveFiltersSlice.actions;
export default ActiveFiltersSlice.reducer;
