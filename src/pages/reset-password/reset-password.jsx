//Страница сброса пароля (ввода нового пароля). /reset-password

import styles from './reset-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';

import { resetPassword } from '../../services/actions/user'; //Функция для замены старого пароля новым с вводом кода из письма

export function ResetPasswordPage () {
  const { isAuth } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [formData, setFormData] = useState(
    {
      password: '', 
      token: ''
    }
  )

  const prevPath = history.location.state?.previousPath;

  const handleChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword(formData));
    history.push('/login');
  }

  if (isAuth) {
    return (
      <Redirect to={"/"}/>
    );
  }

  if (!prevPath) {
    return (
      <Redirect to={{
        pathname: '/login',
      }}
      />
    );
  }

  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text_type_main-medium mb-6`}>
            Восстановление пароля
      </h1>
      <form 
        id="reset-password-form" 
        className={`${styles.form}`}
        onSubmit={handleResetPassword}
      >
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          onChange={handleChangeFormData}
          value={formData.password}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChangeFormData}
          value={formData.token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className="mt-20 text text_color_inactive text_type_main-small">
        Вспомнили пароль?<Link className={`${styles.link} ml-4`} to='/login'>Войти</Link>
      </p>
    </section>
 )


};
