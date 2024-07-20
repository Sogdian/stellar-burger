import constructorItemsReducer, {
  addIngredient,
  initialState,
  moveIngredient,
  removeIngredients
} from '../constructorItemsSlice';
describe('Проверка экшенов в редьюсере constructor', () => {
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

    expect(expected).toEqual(addTestIngredient);
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

  test('Изменение порядка ингредиентов в начинке', () => {
    const moveTestIngredient_1 = {
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

    const moveTestIngredient_2 = {
      id: '2',
      _id: '2',
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
      ingredients: [moveTestIngredient_1, moveTestIngredient_2]
    };

    const expected = constructorItemsReducer(
      initialState,
      moveIngredient({ index: 1, step: -1 })
    );

    expect(expected.ingredients[0]).toEqual(moveTestIngredient_2);
    expect(expected.ingredients[1]).toEqual(moveTestIngredient_1);
  });
});
