import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const createOrder = createAsyncThunk(
  'order',
  async (ingredientIds: string[]) => {
    const response = await orderBurgerApi(ingredientIds);

    return response.order;
  }
);

interface TOrderState {
  order: TOrder | null;
  orderRequest: boolean;
  error: string | null | undefined;
}
const initialState: TOrderState = {
  order: null,
  orderRequest: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
  selectors: {
    getOrderModalData: (state) => state.order,
    getOrderRequest: (state) => state.orderRequest
  }
});

export const { getOrderModalData, getOrderRequest } = orderSlice.selectors;

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
