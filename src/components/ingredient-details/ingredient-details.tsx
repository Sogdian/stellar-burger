import { FC } from 'react';
import { Preloader, IngredientDetailsUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  getIngredientsSelector,
  getLoadingIngredientsSelector
} from '../../services/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredients = useSelector(getIngredientsSelector);
  const ingredientData = ingredients.find(
    (element) => element._id === params.id!
  );

  const params = useParams();
  const isIngredientsLoading = useSelector(getLoadingIngredientsSelector);

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <IngredientDetailsUI ingredientData={ingredientData} />
      )}
    </>
  );
};
