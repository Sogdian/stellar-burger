import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const orderBurger = createAsyncThunk(
  'order',
  async (ingredientIds: string[]) => {
    const response = await orderBurgerApi(ingredientIds);

    return response;
  }
);

interface IOrderState {
  order: TOrder | null;
  name: string | null;
  error: string | null | undefined;
  loading: boolean;
}
const initialState: IOrderState = {
  order: null,
  name: null,
  error: null,
  loading: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.name = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.order = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    getOrderSelector: (state) => state.order,
    getLoadingSelector: (state) => state.loading
  }
});

export const { getOrderSelector, getLoadingSelector } = orderSlice.selectors;

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
