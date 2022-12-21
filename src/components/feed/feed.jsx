//Компонент для Ленты заказов

import styles from './feed.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { wsConnectionClosed, wsConnectionStart } from '../../services/actions/wsActions';
import FeedElement from '../feed-element/feed-element'; //Компонент 1 заказа
import FeedInfo from '../feed-info/feed-info'; //Компонент с информацией о всех заказах

function Feed () {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(wsConnectionStart());
      return () => {
        dispatch(wsConnectionClosed());
      };
    },[]);

  const orders = useSelector((store) => store.wsReducer.messages.orders);
  const total = useSelector((store) => store.wsReducer.messages.total);
  const totalToday = useSelector((store) => store.wsReducer.messages.totalToday);
  const isUserOrders = useRouteMatch({ path: '/profile/orders' });

  return (
    <div className={ styles.container }>
      <div className={ styles.feed }>
        <ul className={ styles.list }>
        {orders.map((item) => (
          <FeedElement
            key={item._id }
            number={ item.number }
            name={ item.name }
            status={ item.status }
            createdAt={ item.createdAt }
            components={ item.ingredients }
            isUserOrders={ isUserOrders }
          />))}
        </ul>
      </div>
      <FeedInfo />
    </div>
  );
}

export default Feed;