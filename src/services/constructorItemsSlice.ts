import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

export interface IConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: IConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const constructorItemsSlice = createSlice({
  name: 'constructorItems',
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
        payload: { ...ingredients, id: nanoid() }
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
  constructorItemsSlice.selectors;

export const { addIngredient, moveIngredients, clearIngredients } =
  constructorItemsSlice.actions;
export default constructorItemsSlice.reducer;
