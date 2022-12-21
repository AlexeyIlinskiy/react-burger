//Главная страница с конструктором /

import styles from './main.module.css';
import PropTypes from 'prop-types';
 
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'; //Компонент с ингредиентами
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'; //Компонент с конструктором
 
export function MainPage ({ openIngredientModal, createOrder }) {
 
 return (
   <main className={`${styles.container} pl-10`}>
     <BurgerIngredients openModal={openIngredientModal}/>
     <BurgerConstructor openOrderDetails={createOrder} />
   </main>
 );
};
 
MainPage.propTypes = {
 createOrder: PropTypes.func.isRequired,
 openIngredientModal: PropTypes.func.isRequired
};
