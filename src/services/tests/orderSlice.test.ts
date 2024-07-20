import reducer, { getOrders, orderBurger } from '../orderSlice';

describe('Проверка экшенов в редьюсере orderSlice', () => {
  const initialState = {
    profileOrders: [],
    order: null,
    name: null,
    error: null,
    loading: false,
    feedItems: [],
    orderModalData: [],
    total: null,
    totalToday: null
  };
  test('Проверка экшена getOrders', async () => {
    const profileOrdersTest = [
      { _id: '1', status: 'status', name: 'name', number: '1' }
    ];
    const action = {
      type: getOrders.fulfilled.type,
      payload: profileOrdersTest
    };

    const expected = reducer(initialState, action);
    const actual = {
      ...initialState,
      profileOrders: profileOrdersTest
    };

    expect(expected).toEqual(actual);
  });

  test('Проверка экшена orderBurger', () => {
    const orderTest = { name: 'TestName', order: 'OrderTest' };
    const action = {
      type: orderBurger.fulfilled.type,
      payload: orderTest
    };
    const state = reducer(initialState, action);

    const expected = {
      name: state.name,
      order: state.order
    };
    const actual = orderTest;

    expect(expected).toStrictEqual(actual);
  });
});
