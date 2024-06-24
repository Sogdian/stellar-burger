import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {TLoginData, TRegisterData} from "@api";

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

export const registerUser = createAsyncThunk(
    'auth/register',
);

export const loginUser = createAsyncThunk(
    'auth/login',
);

export const forgotPassword = createAsyncThunk(
    'auth/password-reset',
);

export const resetPassword = createAsyncThunk(
    'auth/password-reset/reset',
);

export const getUser = createAsyncThunk(
    'auth/user',
);

export const updateUser = createAsyncThunk(
    'auth/user',
);

export const logout = createAsyncThunk(
    'auth/logout',
);
