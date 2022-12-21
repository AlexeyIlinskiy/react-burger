//Страница для восстановления пароля /forgot-password

import styles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';

import {sendPasswordEmail} from '../../services/actions/user'; //Функция отправки письма с кодом для сброса пароля

export function ForgotPasswordPage () {
  const { isAuth } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState('');
  
  const handleChangeEmail = (e) => {setEmail(e.target.value)}
  
  const handleSendEmail = (e) => {
    e.preventDefault();
    dispatch(sendPasswordEmail(email));
    history.push({ pathname: '/reset-password', state: { previousPath: history.location.pathname } });
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
        <h1 className="text text_type_main-medium">
            Восстановление пароля
        </h1>
        <form
        id="forgot-password-form"
        className={styles.form}
        onSubmit={handleSendEmail}
        >
        <div className="mt-6">
            <Input 
              type={'email'}
              placeholder='Укажите e-mail'
              onChange={handleChangeEmail}
              value={email}
              name={'email'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              />
        </div>
        <div className="mt-6">
            <Button type="primary" size="medium">
                Восстановить
            </Button>
        </div>
        </form>
        <p className="mt-20 text text_color_inactive text_type_main-small">
            Вспомнили пароль?<Link className={"ml-4 " + styles.link} to='/login'>Войти</Link>
        </p>
    </section>
)
};
