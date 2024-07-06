import constructorItemsReducer, {
  addIngredient,
  initialState
} from '../src/services/constructorItemsSlice';
describe('constructor', () => {
  test('Добавление ингредиента', () => {
    const newIngredient = {
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
      addIngredient(newIngredient)
    );

    const { id, ...expectReceived } = addState.ingredients[0];

    expect(expectReceived).toEqual(newIngredient);
  });
});
