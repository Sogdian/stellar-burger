import reducer, { getOrders } from '../orderSlice';

describe('orderSlice', () => {
  test('getOrders', async () => {
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
});
