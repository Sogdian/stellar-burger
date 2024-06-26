import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

export interface IConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: []
};

const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredients: TIngredient) => ({
        payload: { ...ingredients, id: nanoid() }
      })
    },
    moveIngredients: (
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.ingredients = action.payload;
    },
    clearIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getItemsSelector: (state) => state,
    getIngredientsSelector: (state) => state.ingredients
  }
});

export const { getItemsSelector, getIngredientsSelector } =
  constructorItemsSlice.selectors;

export const { addIngredient, moveIngredients, clearIngredients } =
  constructorItemsSlice.actions;
export default constructorItemsSlice.reducer;
