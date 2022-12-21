import { getCookie } from './cookies';
const api = 'https://norma.nomoreparties.space/api';
 
//Обрабатываем ошибку
const checkResponse = (res) => {
 return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
 
//Создадим единый запрос
const request = (url, options) => {
 return fetch(url, options).then(checkResponse)
}
 
//Получаем ингредиенты
export const getIngredientsApi = () => request(`${api}/ingredients`)
 
//Получаем номер заказа
export const getOrderNumber = (data) => request(`${api}/orders`, {
 method: 'POST',
 headers: {'Content-Type': 'application/json',
 Authorization: `${getCookie('token')}`},
 body: JSON.stringify({ ingredients: data }),
})
 .then((data) => data.order)
 
//Регистрация
export const signUp = (data) => request(`${api}/auth/register`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(data)
})
 
//Логин     
export const signIn = (data) => request(`${api}/auth/login`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(data),
})
 
//Логаут     
export const signOut = () => request(`${api}/auth/logout`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ token: localStorage.getItem('jwt') }),
})
 
//Получаем инфу от пользователя     
export const getUserInfo = () => request(`${api}/auth/user`, {
 method: 'GET',
 headers: { 'Content-Type': 'application/json',
   Authorization: `${getCookie('token')}` }
})
 
//Обновляем инфу от пользователя     
export const updateUserInfo = (data) => request(`${api}/auth/user`, {
 method: 'PATCH',
 headers: { 'Content-Type': 'application/json',
   Authorization: `${getCookie('token')}` },
 body: JSON.stringify(data)
})
 
//Забыли пароль
export const restorePassword = (email) => request(`${api}/password-reset`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ email })
})
 
//Новый пароль
export const setNewPassword = (data) => request(`${api}/password-reset/reset`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(data)
})
 
//Обновление токена 
export const updateToken = () => request(`${api}/auth/token`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ token: localStorage.getItem('jwt') })
})