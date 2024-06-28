import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk('feed', async () => {
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

interface IFeedState {
  orders: TOrder[];
  orderModalData: TOrder[];
  profileOrders: TOrder[];
  total: number | null;
  totalToday: number | null;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: IFeedState = {
  orders: [],
  orderModalData: [],
  profileOrders: [],
  total: null,
  totalToday: null,
  loading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
      })
      .addCase(getFeeds.rejected, (state, action) => {
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
    getOrdersSelector: (state) => state.orders,
    getOrderModalDataSelector: (state) => state.orderModalData[0],
    getProfileOrdersSelector: (state) => state.profileOrders,
    getTotalSelector: (state) => state.total,
    getTotalTodaySelector: (state) => state.totalToday,
    getLoadingSelector: (state) => state.loading
  }
});

export const {
  getOrdersSelector,
  getOrderModalDataSelector,
  getProfileOrdersSelector,
  getTotalSelector,
  getTotalTodaySelector,
  getLoadingSelector
} = feedSlice.selectors;
