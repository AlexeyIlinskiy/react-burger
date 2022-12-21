import styles from './app-header.module.css';
 
import {NavLink} from 'react-router-dom';
 
import {
 BurgerIcon,
 ListIcon,
 Logo,
 ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
 
function AppHeader() {
 return (
   <header className={`${styles.header} pt-4 pb-4`}>
     <nav className={styles.nav}>
       <NavLink
         to='/'
         exact={true}
         className={`${styles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}
         activeClassName={styles.buttonActive}
       >
         <BurgerIcon type="primary" />
         <span className={`${styles.button_text} ml-2 text_type_main-default`}>Конструктор</span>
       </NavLink>
       <NavLink
         to='/feed'
         className={`${styles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}
         activeClassName={styles.buttonActive}
       >
         <ListIcon type="secondary" />
         <span className={`${styles.button_text} ml-2 text_type_main-default`}>Лента заказов</span>
       </NavLink>
       <NavLink
         to='/'
         className={styles.logo}
       >
         <Logo />
       </NavLink>
       <NavLink
         to='/profile'
         className={`${styles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}
         activeClassName={styles.buttonActive}
       >
         <ProfileIcon type="secondary" />
         <span className={`${styles.button_text} ml-2 text_type_main-default`}>Личный кабинет</span>
       </NavLink>
     </nav>
   </header>
 );
}
 
export default AppHeader;