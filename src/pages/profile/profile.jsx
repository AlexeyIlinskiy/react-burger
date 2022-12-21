//Страница профиля пользователя /profile

import styles from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logout, updateUser } from '../../services/actions/user'; //Функции для выхода и обновления информации о пользователе

export function ProfilePage () {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.authReducer);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [buttonsShow, setButtonsShow] = useState(false);

  useEffect(() => {
    setFormData({ ...user, password: '' });
  }, []);

  const hadleChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setButtonsShow(true);
  };

  const handleReset = () => {
    setFormData({ ...user, name: '', email: '', password: '' });
    setButtonsShow(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUserUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    setButtonsShow(true);
  };

  
  
  return (
    <section className={`${styles.container} pl-5`}>
      <div className={ `${styles.menu} mr-15` }>
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
      <form className={`${styles.form} pt-20`} onSubmit={ handleUserUpdate }>
      <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={hadleChangeFormData}
            value={formData.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={hadleChangeFormData}
            value={formData.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={hadleChangeFormData}
            value={formData.password}
            name={'password'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        { buttonsShow && (
        <div className={styles.buttons}>
          <Button type="secondary" htmlType="button" size="medium" onClick={handleReset}>
            Отменить
          </Button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
        )}
      </form>
    </section>
  )
};
