import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeed = createAsyncThunk('feed', async () => {
  const response = await getFeedsApi();

  return response;
});

export const getOrders = createAsyncThunk('orders', async () => {
  const response = await getOrdersApi();

  return response;
});

export const getOrderByNumber = createAsyncThunk(
  'order',
  async (data: number) => {
    const response = await getOrderByNumberApi(data);

    return response;
  }
);

interface TFeedState {
  orders: TOrder[];
  orderModalData: TOrder[];
  profileOrders: TOrder[];
  total: number | null;
  totalToday: number | null;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: TFeedState = {
  orders: [],
  orderModalData: [],
  profileOrders: [],
  total: null,
  totalToday: null,
  loading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.profileOrders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload.orders;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    getLoadingSelector: (state) => state.loading,
    getOrdersSelector: (state) => state.orders,
    getProfileOrdersSelector: (state) => state.profileOrders,
    getTotalSelector: (state) => state.total,
    getTotalTodaySelector: (state) => state.totalToday,
    getOrderModalDataSelector: (state) => state.orderModalData[0]
  }
});

export const {
  getLoadingSelector,
  getOrdersSelector,
  getProfileOrdersSelector,
  getTotalSelector,
  getTotalTodaySelector,
  getOrderModalDataSelector
} = feedSlice.selectors;

export default feedSlice.reducer;
