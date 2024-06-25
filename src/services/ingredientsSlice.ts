import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export interface TIngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredients', async () => {
  const response = await getIngredientsApi();

  return response;
});

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getLoadingIngredientsSelector: (state) => state.loading
  }
});

export const { getIngredientsSelector, getLoadingIngredientsSelector } =
  ingredientSlice.selectors;

export default ingredientSlice.reducer;
