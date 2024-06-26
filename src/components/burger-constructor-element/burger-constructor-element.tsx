import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredientsSelector,
  moveIngredients
} from '../../services/constructorItemsSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const constructorIngredients = useSelector(getIngredientsSelector);
    const handleMoveDown = () => {
      const updatedIngredients = [...constructorIngredients];
      const currentItem = updatedIngredients[index];
      updatedIngredients[index] = updatedIngredients[index + 1];
      updatedIngredients[index + 1] = currentItem;
      dispatch(moveIngredients(updatedIngredients));
    };

    const handleMoveUp = () => {
      const updatedIngredients = [...constructorIngredients];
      const currentItem = updatedIngredients[index];
      updatedIngredients[index] = updatedIngredients[index - 1];
      updatedIngredients[index - 1] = currentItem;
      dispatch(moveIngredients(updatedIngredients));
    };

    const handleClose = () => {
      const updatedIngredients = [...constructorIngredients];
      updatedIngredients.splice(index, 1);
      dispatch(moveIngredients(updatedIngredients));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
