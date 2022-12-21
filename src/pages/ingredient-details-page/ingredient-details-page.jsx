//Страница с детальной информацией об ингредиенте /ingredients/:id

import styles from './ingredient-details-page.module.css';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import IngredientDetails from '../../components/ingredient-details/ingredient-details'; //Компонент с детальной информацией об ингредиенте

export function IngredientDetailsPage() {
  const { id } = useParams();
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  const currentIngredient = useMemo(() => ingredients.find((item) => item._id === id), [ingredients]);

  return (
    <section className={ styles.container }>
      {currentIngredient && (<IngredientDetails ingredient={currentIngredient} />)}
    </section>
  )
} 