import constructorItemsReducer, {
  addIngredient,
  initialState,
  removeIngredients
} from '../src/services/constructorItemsSlice';
describe('constructor', () => {
  test('Добавление ингредиента', () => {
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

    const addState = constructorItemsReducer(
      initialState,
      addIngredient(addTestIngredient)
    );

    const { id, ...expected } = addState.ingredients[0];

    const actual = addTestIngredient;

    expect(expected).toEqual(actual);
  });

  test('Удаление ингредиента', () => {
    const removeTestIngredient = {
      id: '1',
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

    const initialState = {
      bun: null,
      ingredients: [removeTestIngredient]
    };

    const expected = constructorItemsReducer(
      initialState,
      removeIngredients('1')
    );

    const actual = {
      ...initialState,
      ingredients: []
    };

    expect(expected).toEqual(actual);
  });
});
