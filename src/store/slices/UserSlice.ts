import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCredential } from 'firebase/auth';

interface UserState {
  userCredentials: UserCredential | null;
}

const initialState: UserState = {
  userCredentials: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setFirebaseUserCredentials(state, action: PayloadAction<UserCredential>) {
      state.userCredentials = action.payload;
    },
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
