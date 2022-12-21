//Страница Лента заказов /feed

import styles from './feed.module.css';
import Feed from '../../components/feed/feed'; //Компонент для ленты заказов
 
export function FeedPage () {
 return (
  <section className={ styles.root }>
    <div className={ styles.container }>
    <h1 className={ `${styles.title} text text_type_main-large text_color_primary pl-5` }>Лента заказов</h1>
    <Feed />
    </div>
  </section>
 );
}