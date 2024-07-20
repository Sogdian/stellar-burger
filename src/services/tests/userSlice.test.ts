import { configureStore } from '@reduxjs/toolkit';
import { getUser, loginUser } from '../userSlice';
import { rootReducer } from '../store';

const MAIL = 'mail@fortest.com';
const USER = 'testUser';
const PASSWORD = 'test';

jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn()
}));

global.localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(() => null),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn((index: number) => null)
};

jest.mock('@api', () => ({
  getUserApi: jest.fn(() =>
    Promise.resolve({
      user: {
        email: MAIL,
        name: USER
      }
    })
  ),
  loginUserApi: jest.fn(() =>
    Promise.resolve({
      user: {
        email: MAIL,
        name: USER
      },
      accessToken: 'access-token',
      refreshToken: 'refresh-token'
    })
  )
}));

describe('Проверка экшенов в редьюсере userSlice', () => {
  test('Проверка экшена getUser', async () => {
    const store = configureStore({
      reducer: { user: rootReducer }
    });
    await store.dispatch(getUser());

    const state = store.getState().user;
    const expected = state.user.user;

    const actual = {
      email: MAIL,
      name: USER
    };

    expect(expected).toEqual(actual);
    expect(state.user.isAuthChecked).toBeTruthy();
    expect(state.user.isAuthenticated).toBeTruthy();
  });

  test('Проверка экшена loginUser', async () => {
    const store = configureStore({
      reducer: { user: rootReducer }
    });
    await store.dispatch(
      loginUser({
        email: MAIL,
        password: PASSWORD
      })
    );

    const state = store.getState().user;
    const expected = state.user.user;

    const actual = {
      email: MAIL,
      name: USER
    };

    expect(expected).toEqual(actual);
    expect(state.user.isAuthChecked).toBeTruthy();
    expect(state.user.isAuthenticated).toBeTruthy();
  });
});
