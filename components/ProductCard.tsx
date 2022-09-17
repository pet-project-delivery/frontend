import Image from 'next/image';
import { FC, useState } from 'react';
import styles from '../styles/ProductCard.module.scss';
import { RestaurantItem } from '../types/Restaurant';

interface ProductCardProps {
  product: RestaurantItem;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, calories, category, imageUrl, price, weight } = product;
  const [amount, setAmount] = useState(0);

  const addToCartHandler = () => {
    setAmount((amount) => amount + 1);
  };

  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        src={`http://localhost:5000/${imageUrl}`}
        width={250}
        height={140}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <div className={styles.info}>
          <div className={styles.infoItem}>{weight} гр.</div>
          <div className={styles.infoItem}>{calories} ккал.</div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>{price} ₽</div>
          <button className={styles.button} onClick={addToCartHandler}>
            В корзину {amount ? <div className={styles.amount}>{amount}</div> : null}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
