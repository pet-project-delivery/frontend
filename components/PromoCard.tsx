import Image from "next/image";
import React, { FC } from "react";
import styles from "../styles/PromoCard.module.scss";

interface PromoCardProps {
  name: string;
  promocode: string;
  url: string;
}

const PromoCard: FC<PromoCardProps> = ({ name, promocode, url }) => {
  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        width={320}
        src={`http://localhost:5000/${url}`}
        alt={name}
        height={180}
      />
      <h2 className={styles["h2"]}>{name}</h2>
      {promocode && <div className={styles.promocode}>{promocode}</div>}
    </div>
  );
};

export default PromoCard;
