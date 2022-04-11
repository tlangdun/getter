import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetterUser } from '../models/userModel';

interface UserState {
  user: GetterUser;
}

const initialState: UserState = {
  user: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setFirebaseUser(state, action: PayloadAction<GetterUser>) {
      state.user = action.payload;
    },
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
