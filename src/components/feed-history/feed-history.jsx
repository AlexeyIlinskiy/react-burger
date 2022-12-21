//Компонент с информацией о всех заказах

import styles from "./feed-history.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useRouteMatch } from 'react-router-dom';
import { wsUserConnectionStart, wsUserConnectionClosed } from '../../services/actions/wsActions';

import FeedElement from "../feed-element/feed-element"; //Компонент 1 заказа

export function FeedHistory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsUserConnectionStart());
      return () => {
        dispatch(wsUserConnectionClosed());
      };
    }, []);

  const isUserOrders = useRouteMatch({ path: '/profile/orders' });
  const userOrders = useSelector((store) => store.wsReducer.userMessages.orders);
  const currentOrders = [...userOrders].reverse();

  return (
      <ul className={styles.list}>
        { currentOrders && currentOrders.map((item) => (
          <FeedElement
          key={ item._id }
          number={ item.number }
          name={ item.name }
          status={ item.status }
          createdAt={ item.createdAt }
          components={ item.ingredients }
          isUserOrders={ isUserOrders }
          />
        ))}
      </ul>
  );
}