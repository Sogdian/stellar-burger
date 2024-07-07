import { configureStore } from '@reduxjs/toolkit';
import { getUser } from '../userSlice';
import { rootReducer } from '../store';

const MAIL = 'mail@fortest.com';
const USER = 'testUser';
jest.mock('@api', () => ({
  getUserApi: jest.fn(() =>
    Promise.resolve({
      user: {
        email: MAIL,
        name: USER
      }
    })
  )
}));

describe('userSlice', () => {
  test('getUser', async () => {
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
});
