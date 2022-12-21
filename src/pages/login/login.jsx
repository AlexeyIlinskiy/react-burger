//Страница для входа в систему /login

import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { login } from '../../services/actions/user'; //Функция для входа в систему

export function LoginPage () {
  const { isAuth } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const hadleChangeFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ ...formData }));
  }


  if (isAuth) {
    return (
      <Redirect to={location.state?.from || "/"}/>
    );
  }

  return (
    <section className={styles.container}>
        <h1 className={`${styles.title} text_type_main-medium mb-6`}>
            Вход
        </h1>
        <form 
          id="login-form" 
          className={`${styles.form}`}
          onSubmit={handleLogin}
        >
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
            Войти
          </Button>
        </form>
        <p className="mt-20 text text_color_inactive text_type_main-small">
            Вы — новый пользователь?<Link className={"ml-4 " + styles.link} to='/register'>Зарегистрироваться</Link>
        </p>
        <p className="mt-4 text text_color_inactive text_type_main-small">
            Забыли пароль?<Link className={"ml-4 " + styles.link} to='/forgot-password'>Восстановить пароль</Link>
        </p>
    </section>
)


};
