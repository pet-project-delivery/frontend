import axios from 'axios';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import RestaurantCard from '../components/RestaurantCard';
import { Restaurant } from '../types/Restaurant';

import styles from '../styles/Home.module.scss';

export const getStaticProps = async () => {
  const { data } = await axios.get('http://localhost:5000/restaurants');

  return {
    props: { restaurants: data },
  };
};

interface HomeProps {
  restaurants: Restaurant[];
}

const Home: NextPage<HomeProps> = ({ restaurants }) => {
  return (
    <Layout>
      <div className={styles.restaurants}>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
