import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface TUserState {
  isAuthChecked: boolean;
  userData: TUser | null;
}

const initialState: TUserState = {
  isAuthChecked: false,
  userData: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserDataSelector: (state) => state.userData,
    getIsAuthCheckedSelector: (state) => state.isAuthChecked
  }
});

export const { getUserDataSelector, getIsAuthCheckedSelector } =
  userSlice.selectors;

export default userSlice.reducer;
