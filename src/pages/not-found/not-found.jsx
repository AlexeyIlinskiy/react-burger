//Страница с 404 ошибкой.

import styles from './not-found.module.css';
 
export function NotFoundPage () {
 return (
   <div className={styles.container}>
     <p className="text_type_main-large mt-0">Страница не найдена. Ошибка 404. </p>
   </div>
 );
}