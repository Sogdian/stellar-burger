import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

export interface TConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredients: TIngredient) => ({
        payload: {
          ...ingredients,
          id: v4()
        }
      })
    },
    moveIngredients: (
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.constructorItems.ingredients = action.payload;
    },
    clearIngredients: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    }
  },
  selectors: {
    getItemsSelector: (state) => state.constructorItems,
    getIngredientsSelector: (state) => state.constructorItems.ingredients
  }
});

export const { getItemsSelector, getIngredientsSelector } =
  constructorSlice.selectors;

export const { addIngredient, moveIngredients, clearIngredients } =
  constructorSlice.actions;
export default constructorSlice.reducer;
