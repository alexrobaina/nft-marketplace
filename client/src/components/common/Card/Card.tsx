import { FC } from 'react';
import BaseButton from '../BaseButton';
import styles from './Card.module.scss';

interface Props {
  name?: string;
  price?: number;
  image?: string;
  testId?: string;
  category?: string;
  marginTop?: number;
  description: string;
  handleBuy?: Function;
  marginBottom?: number;
  handlePreview?: Function;
}

const Card: FC<Props> = ({
  name,
  price,
  image,
  testId,
  category,
  marginTop,
  handleBuy,
  description,
  marginBottom,
  handlePreview,
}) => {
  return (
    <div
      test-id={testId}
      style={{ marginTop, marginBottom }}
      className={styles.cardContainar}
    >
      <div className={styles.imageContainer}>
        <img src={image} alt="content" />
      </div>
      <div className={styles.content}>
        <div className={styles.category}>{category} NFT</div>
        <p className={styles.name}>{name}</p>
        <p className={styles.description}>{description}</p>
        <div>
          <div>
            <div className={styles.price}>{price} ETH</div>
            <div className={styles.priceTitle}>Price</div>
          </div>
        </div>
        <div className={styles.containerActions}>
          <BaseButton onClick={handleBuy} text="Buy" />
          <BaseButton onClick={handlePreview} text="Preview" />
        </div>
      </div>
    </div>
  );
};

export default Card;
