import axios from "axios";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import RestaurantCard from "../components/RestaurantCard";
import { Restaurant } from "../types/Restaurant";

import styles from "../styles/Home.module.scss";
import { Promo } from "../types/Promo";
import PromoCard from "../components/PromoCard";
import Link from "next/link";

export const getStaticProps = async () => {
  const { data } = await axios.get("http://localhost:5000/restaurants");
  const { data: promos } = await axios.get("http://localhost:5000/promos");
  return {
    props: { restaurants: data, promos: promos },
  };
};

interface HomeProps {
  restaurants: Restaurant[];
  promos: Promo[];
}

const Home: NextPage<HomeProps> = ({ restaurants, promos }) => {
  return (
    <Layout>
      <div className={styles.restaurants}>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
      <div className={styles.promos}>
        {promos.map((promo, index) => (
          <Link href={`/promo/${promo._id}`} key={index}>
            <a href="">
              <PromoCard
                name={promo.name}
                promocode={promo.promocode}
                url={promo.url}
              />
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
