import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../src/services/store';

describe('rootReducer', () => {
  test('Проверка правильной инициализации rootReducer', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    const UNKNOWN_ACTION = {
      type: 'UNKNOWN_ACTION'
    };
    const state = rootReducer(undefined, UNKNOWN_ACTION);

    expect(state).toEqual(store.getState());
  });
});