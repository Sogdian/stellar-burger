import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { setCookie } from '../utils/cookie';

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
  '/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);

    return response;
  }
);

export const loginUser = createAsyncThunk(
  '/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);

    return response;
  }
);

export const forgotPassword = createAsyncThunk(
  '/password-reset',
  async (data: { email: string }) => {
    const response = await forgotPasswordApi(data);

    return response;
  }
);

export const resetPassword = createAsyncThunk(
  '/password-reset/reset',
  async (data: { password: string; token: string }) => {
    const response = await resetPasswordApi(data);

    return response;
  }
);

export const getUser = createAsyncThunk(
  '/user', async () => {
  const response = await getUserApi();

  return response;
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: TRegisterData) => {
    const response = await updateUserApi(user);

    return response;
  }
);

export const logout = createAsyncThunk(
  '/logout', async () => {
  const response = await logoutApi();

  return response;
});
