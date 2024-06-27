import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';

export const registerUser = createAsyncThunk(
  'register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);

    return response;
  }
);

export const loginUser = createAsyncThunk('login', async (data: TLoginData) => {
  const response = await loginUserApi(data);
  localStorage.setItem('refreshToken', response.refreshToken);
  setCookie('accessToken', response.accessToken);

  return response;
});

export const getUser = createAsyncThunk(
  'getUser',
  async () => await getUserApi()
);

export const updateUser = createAsyncThunk(
  'updateUser',
  async (data: Partial<TRegisterData>) => {
    await updateUserApi(data);

    return getUserApi();
  }
);

export const logout = createAsyncThunk('logoutUser', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

interface IUserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginError: string | null | undefined;
  logoutError: string | null | undefined;
}

const initialState: IUserState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginError: null,
  logoutError: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.rejected, (state, action) => {
        state.loginError = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loginError = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutError = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      });
  },
  selectors: {
    getUserSelector: (state) => state.user,
    getIsAuthCheckedSelector: (state) => state.isAuthChecked,
    getIsAuthSelector: (state) => state.isAuthenticated,
    getUserNameSelector: (state) => state.user?.name
  }
});

export const {
  getUserSelector,
  getIsAuthCheckedSelector,
  getUserNameSelector,
  getIsAuthSelector
} = userSlice.selectors;

export default userSlice.reducer;
