import axios from "axios";
import { GetServerSideProps } from "next";
import React, { FC } from "react";
import { Promo } from "../types/Promo";
import { Restaurant } from "../types/Restaurant";
import PromoCard from "./PromoCard";
import RestaurantCard from "./RestaurantCard";

import styles from "../styles/PromoPage.module.scss";
import Link from "next/link";

interface PromoPageProps {
  name: string;
  restaurants: Restaurant[];
  promos: Promo[];
}

const PromoPage: FC<PromoPageProps> = ({ name, restaurants, promos }) => {
  return (
    <main>
      <div className="container">
        <div className={styles.wrapper}>
          <h1 className={styles["h1"]}>{name}</h1>
          <div className={styles.restaurants}>
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
          <h2 className={styles["h2"]}>Новые акции</h2>
          <div className={styles.promos}>
            {promos &&
              promos.map((promo, index) => (
                <Link href={`/promo/${promo._id}`} key={index}>
                  <a href="">
                    <PromoCard
                      name={promo.name}
                      promocode={promo.promocode}
                      url={promo.url}
                      key={index}
                    />
                  </a>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PromoPage;
