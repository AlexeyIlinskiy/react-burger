//Страница с деталями заказа /feed/:id и /profile/orders/:id
import styles from './feed-order.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useMemo } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { 
  wsConnectionStart, 
  wsUserConnectionStart,
  wsConnectionClosed, 
  wsUserConnectionClosed
} from '../../services/actions/wsActions';

import { formatDate, formatStatus } from '../../utils/constants';


export function FeedOrderPage () {
  const dispatch = useDispatch();

  const isUserOrders = useRouteMatch({ path: '/profile/orders/:id' });

  useEffect(() => {
    dispatch(isUserOrders ? wsUserConnectionStart() : wsConnectionStart());
      return () => {
        dispatch(isUserOrders ? wsUserConnectionClosed() : wsConnectionClosed());
      };
    }, []);

  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const orders= useSelector((store) => store.wsReducer.messages.orders);
  const userOrders = useSelector((store) => store.wsReducer.userMessages.orders);
 
  const { id } = useParams();
  const order = orders && orders.find((item) => item.number === +id);
  const userOrder = userOrders && userOrders.find((item) => item.number === +id);
  const currentOrder = isUserOrders ? userOrder : order;
  const orderIngredients = currentOrder ? currentOrder.ingredients : [];

  const feedIngredients = useMemo(() =>
    orderIngredients.length && ingredients.length ? Object.values(orderIngredients
      .map((item) => {
        return ingredients
          .find((element) => element._id === item)})
          .filter((ingredient) => ingredient !== undefined)
          .reduce((total, current) => {
            total[current.name] = total[current.name]
            ? { ...total[current.name],
                count: total[current.name].count + 1}
            : { ...current, count: 1 };
                return total;
          }, {}))
          .sort((ingredient) => (ingredient.type === "bun" ? -1 : 1))
    : [], [orderIngredients, ingredients]
  );

  const price = useMemo(() => {
    return feedIngredients.length ? feedIngredients.reduce((total, current) => 
(current.count && current.type !== 'bun' ? total + current.price * current.count : total + current.price * 2), 0) : 0;
}, [feedIngredients]);

  return (
    <section className={styles.root}>
    <div className={styles.container}>
      { currentOrder && (
      <>
        <p className={ `${styles.number} text text_type_digits-default` }>#{ currentOrder.number }</p>
        <h2 className={ `text text_type_main-medium` }>{ currentOrder.name }</h2>
        <p className={ `${styles.status} text text_type_main-default ${currentOrder.status === 'done' && styles.done} ${currentOrder.status === 'canceled' && styles.canceled}` } >
          { formatStatus(currentOrder.status) }
        </p>
        <p className='text text_type_main-medium'>Состав:</p>
        <ul className={ styles.list }>
          {feedIngredients && feedIngredients
            .map((item) => (
              <li key={ item._id } className={ styles.item }>
                <div className={ styles.info }>
                  <div className={ styles.icon }>
                    <img src={ item.image } alt={ item.name }/>
                  </div>
                  <p className='text text_type_main-default'>{ item.name }</p>
                </div>
                {item.type === 'bun' 
                  ? (<p className={ `${styles.price} text text_type_digits-default` }>
                    { 2 }{ ' ' } x { ' ' }{ item.price }
                    <CurrencyIcon type="primary" />
                    </p>)
                  : (<p className={ `${styles.price} text text_type_digits-default` }>
                    { item.count }{ ' ' } x { ' ' }{ item.price }
                    <CurrencyIcon type="primary" />
                    </p>)}
              </li>
            ))}
        </ul>
        <div className={ styles.footer }>
          <p className='text text_type_main-default text_color_inactive'>{ formatDate(currentOrder.createdAt) }</p>
          <p className={ `${styles.price} text text_type_digits-default` }>
            { price }
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </>)}
    </div>
    </section>
  );
};