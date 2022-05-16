import { configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from './slices/UserSlice';
import ActiveFiltersSliceReducer from './slices/ActiveFiltersSlice';

const store = configureStore({
    reducer: {
            user: UserSliceReducer,
            activeFilters: ActiveFiltersSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;