import { configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from './slices/UserSlice';

const store = configureStore({
    reducer: {
            user: UserSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;