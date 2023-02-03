import styles from './order-details.module.css';
import doneImg from '../../images/done.svg';
import { FC } from 'react';
import { useParams } from 'react-router';

interface IParams  {
  orderNumber: string
}

const OrderDetails: FC = () => {

  const {orderNumber} = useParams<IParams>();
  
  return (
    <section className={`${styles.root}`}>
      <span className={`${styles.title} text_type_digits-large mt-4 mb-8`}>{orderNumber}</span>
      <p className={`${styles.subTitle} text_type_main-medium mb-15`}>идентификатор заказа</p>
      <img src={doneImg} alt="Заказ принят" className="mb-15"/>
      <p className={`${styles.orderInfo} text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
      <p className={`${styles.orderInfo} ${styles.textColor} text_type_main-default mb-2`}>Дождитесь готовности на орбитальной станции</p>
    </section>
  )
};

export default OrderDetails;