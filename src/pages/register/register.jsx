//Страница регистрации нового пользователя /register

import styles from './register.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { register } from '../../services/actions/user'; //Функция регистрации пользователя

export function RegisterPage () {
  const { isAuth } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const hadleChangeFormData = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register({ ...formData }));
  }

  if (isAuth) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <section className={styles.container}>
        <h1 className={`${styles.title} text_type_main-medium mb-6`}>
            Регистрация
        </h1>
        <form 
          id="register-form" 
          className={styles.form} 
          onSubmit={handleRegister}
          >
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
          <Button type="primary" size="medium">
            Зарегистироваться
          </Button>
        </form>
        <p className="mt-20 text text_color_inactive text_type_main-small">
            Вы уже зарегистрированы?<Link className={"ml-4 " + styles.link} to='/login'>Войти</Link>
        </p>
    </section>
)
};
