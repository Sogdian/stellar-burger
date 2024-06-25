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
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  error: string | null | undefined;
}

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserDataSelector: (state) => state.user,
    getIsAuthCheckedSelector: (state) => state.isAuthChecked,
    getUserNameSelector: (state) => state.user?.name
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {
          email: '',
          name: ''
        };
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = true;
      });
  }
});

export const {
  getUserDataSelector,
  getIsAuthCheckedSelector,
  getUserNameSelector
} = userSlice.selectors;

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

export const getUser = createAsyncThunk('/user', async () => {
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

export const logout = createAsyncThunk('/logout', async () => {
  const response = await logoutApi();

  return response;
});
