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
  name: string | null;
  loading: boolean;
  error: string | null | undefined;
}
const initialState: TOrderState = {
  order: null,
  name: null,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrder(state) {
      state.order = null;
      state.name = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    getOrderSelector: (state) => state.order,
    getLoadingOrderSelector: (state) => state.loading
  }
});

export const { getOrderSelector, getLoadingOrderSelector } =
  orderSlice.selectors;
export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
