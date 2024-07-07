import reducer, { getIngredients } from '../ingredientsSlice';

describe('ingredientsSlice', () => {
  test('getIngredients', async () => {
    const initialState = {
      ingredients: [],
      loading: false,
      error: undefined
    };

    const addTestIngredient = {
      _id: '1',
      name: 'Краторная булка N-200i',
      type: 'main',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    const action = {
      type: getIngredients.fulfilled.type,
      payload: addTestIngredient
    };

    const expected = reducer(initialState, action);
    const actual = {
      ...initialState,
      ingredients: addTestIngredient
    };

    expect(expected).toEqual(actual);
    expect(expected.loading).toBeFalsy();
  });
});
