import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryFilter } from '../models/queryModel';

let emptyQueryFilter = {
  availability: "",
  canton: "",
  job_role: "",
  skills: [],
  programming_languages: [],
  spoken_languages: [],
  work_experience: ""//0, 1-3, 4-6, 7-10+
}
interface ActiveFilters {
  activeFilter:QueryFilter;
}

const initialState: ActiveFilters = {
  activeFilter: emptyQueryFilter,
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
