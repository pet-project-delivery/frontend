import axios from "axios";
import { NextPage } from "next";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import RestaurantCard from "../../components/RestaurantCard";
import TextField from "../../components/TextField";

import styles from "../../styles/Search.module.scss";
import { Restaurant } from "../../types/Restaurant";

export const getStaticProps = async () => {
  const { data } = await axios.get("http://localhost:5000/restaurants");
  return {
    props: { restaurants: data },
  };
};

interface SearchPageProps {
  restaurants: Restaurant[];
}

const SearchPage: NextPage<SearchPageProps> = ({ restaurants }) => {
  const [value, setValue] = React.useState("");
  const [restaurant, setRestaurants] = React.useState(restaurants);

  const onChange = (value: string) => {
    setValue(value);
    const filteredRestaurants = value
      ? restaurants.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(value.toLowerCase())
        )
      : restaurants;
    setRestaurants(filteredRestaurants);
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className={styles.block}>
            <h1 className={styles["h1"]}>Поиск</h1>
            <TextField
              placeholder="Поиск..."
              value={value}
              onChange={onChange}
            />
          </div>
          <div className={styles.restaurants}>
            {restaurant.map((i) => (
              <RestaurantCard restaurant={i} key={i._id} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SearchPage;
