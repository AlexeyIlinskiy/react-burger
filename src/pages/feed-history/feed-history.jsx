//Страница Истории заказов пользователя /profile/orders
import styles from './feed-history.module.css';

import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../services/actions/user';

import { FeedHistory } from '../../components/feed-history/feed-history'; //Компонент с историей заказов пользователя

export function FeedHistoryPage () {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section className={ `${styles.container} pl-5 pt-20`}>
    <div className={ `${styles.menu}` }>
      <nav className={styles.nav}>
        <NavLink to='/profile' exact={ true } className={ `${styles.link} text text_type_main-medium text_color_inactive`} activeClassName={ styles.linkActive }>
          Профиль
        </NavLink>
        <NavLink to='/profile/orders' exact={ true } className={ `${styles.link} text text_type_main-medium text_color_inactive` } activeClassName={ styles.linkActive }>
          История заказов
        </NavLink>
        <button type="button" className={ `${styles.link} text text_type_main-medium text_color_inactive` } onClick={ handleLogout }>
          Выход
        </button>
      </nav>
      <p className={`${styles.description} text text_type_main-default text_color_inactive`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
    <div className={ styles.history }>
      <FeedHistory />
    </div>
  </section>
  );
}