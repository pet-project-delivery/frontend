import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/Layout";
import Link from "next/link";
import { Restaurant } from "../../types/Restaurant";
import { User } from "../../types/User";

import styles from "../../styles/Restaurant.module.scss";
import { useState } from "react";
import { getMinPrice } from "../../helpers/getMinPrice";
import { getRating } from "../../helpers/getRating";
import Head from "next/head";
import ProductCard from "../../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { change } from "../../store/slices/userSlice";

interface RestaurantProps {
  restaurant: Restaurant;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { id } = query;
  const { data: restaurant }: { data: Restaurant } = await axios.get(
    `http://localhost:5000/restaurants/${id}`
  );

  if (!restaurant) {
    return {
      notFound: true,
    };
  }

  return {
    props: { restaurant },
  };
};

const Restaurant: NextPage<RestaurantProps> = ({ restaurant }) => {
  const { name, categories, items, reviews, reviewsAmount, _id } = restaurant;
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLike, setLike] = useState(false);
  const minPrice = getMinPrice(items);
  const rating = getRating(reviews, reviewsAmount);
  const reviewsAmountText = `${rating} / ${reviewsAmount} ${
    reviewsAmount === 0
      ? "отзывов"
      : reviewsAmount === 1
      ? "отзыв"
      : reviewsAmount < 5
      ? "отзыва"
      : "отзывов"
  }`;

  const { user } = useAppSelector((state) => state.user);
  const userId = user?._id;
  const dispatch = useAppDispatch();

  const addRestaurantToUserHandler = (
    updatedUser: Pick<
      User,
      "email" | "likedRestaurants" | "likedShops" | "password"
    >
  ) => {
    if (updatedUser.likedRestaurants) {
      updatedUser.likedRestaurants = [
        ...updatedUser.likedRestaurants,
        restaurant,
      ];
    }
    axios
      .put(`http://localhost:5000/users/${userId}`, updatedUser)
      .then(({ data }) => dispatch(change(data)));
  };

  const removeRestaurantToUserHandler = (
    updatedUser: Pick<
      User,
      "email" | "likedRestaurants" | "likedShops" | "password"
    >
  ) => {
    if (updatedUser.likedRestaurants) {
      updatedUser.likedRestaurants = [...updatedUser.likedRestaurants].filter(
        (i) => i._id !== _id
      );
    }
    axios
      .put(`http://localhost:5000/users/${userId}`, updatedUser)
      .then(({ data }) => dispatch(change(data)));
  };

  const likeHandler = () => {
    setLike((prev) => !prev);
    if (user) {
      const updatedUser = {
        email: user.email,
        password: user.password,
        likedRestaurants: user.likedRestaurants,
        likedShops: user.likedShops,
      };

      if (isLike) {
        addRestaurantToUserHandler(updatedUser);
      } else {
        removeRestaurantToUserHandler(updatedUser);
      }
    }
  };

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Layout>
        <div className={styles.top}>
          <h1 className={styles.title}>{name}</h1>
          <div className={styles.info}>
            <button className={styles.infoItem}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20ZM15.1 12.63L13 11.42V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V12C11 12 11 12.08 11 12.12C11.0059 12.1889 11.0228 12.2564 11.05 12.32C11.0706 12.3793 11.0974 12.4363 11.13 12.49C11.1574 12.5468 11.1909 12.6005 11.23 12.65L11.39 12.78L11.48 12.87L14.08 14.37C14.2324 14.4564 14.4048 14.5012 14.58 14.5C14.8014 14.5015 15.0171 14.4296 15.1932 14.2953C15.3693 14.1611 15.4959 13.9722 15.5531 13.7583C15.6103 13.5444 15.5948 13.3176 15.5092 13.1134C15.4236 12.9092 15.2726 12.7392 15.08 12.63H15.1Z"
                  fill="#813CAB"
                />
              </svg>
              20-40 мин.
            </button>
            <button className={styles.infoItem}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 11C5.80222 11 5.60888 11.0586 5.44443 11.1685C5.27998 11.2784 5.15181 11.4346 5.07612 11.6173C5.00043 11.8 4.98063 12.0011 5.01921 12.1951C5.0578 12.3891 5.15304 12.5673 5.29289 12.7071C5.43275 12.847 5.61093 12.9422 5.80491 12.9808C5.99889 13.0194 6.19996 12.9996 6.38268 12.9239C6.56541 12.8482 6.72159 12.72 6.83147 12.5556C6.94135 12.3911 7 12.1978 7 12C7 11.7348 6.89464 11.4804 6.70711 11.2929C6.51957 11.1054 6.26522 11 6 11ZM18 11C17.8022 11 17.6089 11.0586 17.4444 11.1685C17.28 11.2784 17.1518 11.4346 17.0761 11.6173C17.0004 11.8 16.9806 12.0011 17.0192 12.1951C17.0578 12.3891 17.153 12.5673 17.2929 12.7071C17.4327 12.847 17.6109 12.9422 17.8049 12.9808C17.9989 13.0194 18.2 12.9996 18.3827 12.9239C18.5654 12.8482 18.7216 12.72 18.8315 12.5556C18.9414 12.3911 19 12.1978 19 12C19 11.7348 18.8946 11.4804 18.7071 11.2929C18.5196 11.1054 18.2652 11 18 11ZM20 5H4C3.20435 5 2.44129 5.31607 1.87868 5.87868C1.31607 6.44129 1 7.20435 1 8V16C1 16.7956 1.31607 17.5587 1.87868 18.1213C2.44129 18.6839 3.20435 19 4 19H20C20.7956 19 21.5587 18.6839 22.1213 18.1213C22.6839 17.5587 23 16.7956 23 16V8C23 7.20435 22.6839 6.44129 22.1213 5.87868C21.5587 5.31607 20.7956 5 20 5ZM21 16C21 16.2652 20.8946 16.5196 20.7071 16.7071C20.5196 16.8946 20.2652 17 20 17H4C3.73478 17 3.48043 16.8946 3.29289 16.7071C3.10536 16.5196 3 16.2652 3 16V8C3 7.73478 3.10536 7.48043 3.29289 7.29289C3.48043 7.10536 3.73478 7 4 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V16ZM12 9C11.4067 9 10.8266 9.17595 10.3333 9.50559C9.83994 9.83524 9.45542 10.3038 9.22836 10.8519C9.0013 11.4001 8.94189 12.0033 9.05764 12.5853C9.1734 13.1672 9.45912 13.7018 9.87868 14.1213C10.2982 14.5409 10.8328 14.8266 11.4147 14.9424C11.9967 15.0581 12.5999 14.9987 13.1481 14.7716C13.6962 14.5446 14.1648 14.1601 14.4944 13.6667C14.8241 13.1734 15 12.5933 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 13C11.8022 13 11.6089 12.9414 11.4444 12.8315C11.28 12.7216 11.1518 12.5654 11.0761 12.3827C11.0004 12.2 10.9806 11.9989 11.0192 11.8049C11.0578 11.6109 11.153 11.4327 11.2929 11.2929C11.4327 11.153 11.6109 11.0578 11.8049 11.0192C11.9989 10.9806 12.2 11.0004 12.3827 11.0761C12.5654 11.1518 12.7216 11.28 12.8315 11.4444C12.9414 11.6089 13 11.8022 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13Z"
                  fill="#813CAB"
                />
              </svg>
              От {minPrice} ₽
            </button>
            <Link href="/">
              <a className={styles.infoItem}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 9.67002C21.9368 9.48711 21.822 9.32645 21.6693 9.20753C21.5167 9.0886 21.3328 9.01652 21.14 9.00002L15.45 8.17002L12.9 3.00002C12.8181 2.83095 12.6903 2.68837 12.5311 2.5886C12.3719 2.48883 12.1879 2.43591 12 2.43591C11.8121 2.43591 11.6281 2.48883 11.4689 2.5886C11.3097 2.68837 11.1819 2.83095 11.1 3.00002L8.55 8.16002L2.86 9.00002C2.67492 9.02633 2.50092 9.10399 2.35775 9.22418C2.21458 9.34438 2.10796 9.5023 2.05 9.68002C1.99695 9.8537 1.99218 10.0385 2.03623 10.2147C2.08027 10.3909 2.17146 10.5517 2.3 10.68L6.43 14.68L5.43 20.36C5.3943 20.5475 5.41299 20.7413 5.48387 20.9185C5.55475 21.0957 5.67485 21.2489 5.83 21.36C5.98122 21.4681 6.15957 21.5319 6.34505 21.5443C6.53052 21.5567 6.71577 21.5171 6.88 21.43L12 18.76L17.1 21.44C17.2403 21.5192 17.3989 21.5606 17.56 21.56C17.7718 21.5608 17.9784 21.4942 18.15 21.37C18.3051 21.2589 18.4252 21.1057 18.4961 20.9285C18.567 20.7513 18.5857 20.5575 18.55 20.37L17.55 14.69L21.68 10.69C21.8244 10.5677 21.9311 10.4069 21.9877 10.2264C22.0444 10.0458 22.0486 9.8529 22 9.67002ZM15.85 13.67C15.7327 13.7835 15.645 13.9239 15.5944 14.079C15.5439 14.2341 15.5321 14.3993 15.56 14.56L16.28 18.75L12.52 16.75C12.3753 16.673 12.2139 16.6327 12.05 16.6327C11.8861 16.6327 11.7247 16.673 11.58 16.75L7.82 18.75L8.54 14.56C8.56794 14.3993 8.55611 14.2341 8.50557 14.079C8.45502 13.9239 8.36728 13.7835 8.25 13.67L5.25 10.67L9.46 10.06C9.622 10.0375 9.776 9.97556 9.9085 9.87967C10.041 9.78379 10.148 9.65686 10.22 9.51002L12 5.70002L13.88 9.52002C13.952 9.66686 14.059 9.79379 14.1915 9.88968C14.324 9.98556 14.478 10.0475 14.64 10.07L18.85 10.68L15.85 13.67Z"
                    fill="#813CAB"
                  />
                </svg>
                {reviewsAmountText}
              </a>
            </Link>
            <button
              className={`${styles.like} ${isLike ? styles.activeLike : ""}`}
              onClick={likeHandler}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.16 5.00004C19.1 3.93725 17.6948 3.28858 16.1983 3.17121C14.7019 3.05384 13.2128 3.47551 12 4.36004C10.7277 3.41368 9.14399 2.98455 7.56792 3.15908C5.99185 3.33361 4.54044 4.09882 3.50597 5.30063C2.47151 6.50244 1.93082 8.05156 1.9928 9.63606C2.05478 11.2206 2.71482 12.7227 3.84 13.84L10.05 20.06C10.57 20.5718 11.2704 20.8587 12 20.8587C12.7296 20.8587 13.43 20.5718 13.95 20.06L20.16 13.84C21.3276 12.6653 21.9829 11.0763 21.9829 9.42004C21.9829 7.76377 21.3276 6.17478 20.16 5.00004ZM18.75 12.46L12.54 18.67C12.4693 18.7414 12.3852 18.798 12.2925 18.8367C12.1999 18.8753 12.1004 18.8953 12 18.8953C11.8996 18.8953 11.8001 18.8753 11.7075 18.8367C11.6148 18.798 11.5307 18.7414 11.46 18.67L5.25 12.43C4.46576 11.6284 4.02661 10.5515 4.02661 9.43004C4.02661 8.30858 4.46576 7.2317 5.25 6.43004C6.04916 5.64103 7.12697 5.19861 8.25 5.19861C9.37303 5.19861 10.4508 5.64103 11.25 6.43004C11.343 6.52377 11.4536 6.59817 11.5754 6.64893C11.6973 6.6997 11.828 6.72584 11.96 6.72584C12.092 6.72584 12.2227 6.6997 12.3446 6.64893C12.4664 6.59817 12.577 6.52377 12.67 6.43004C13.4692 5.64103 14.547 5.19861 15.67 5.19861C16.793 5.19861 17.8708 5.64103 18.67 6.43004C19.465 7.22119 19.9186 8.29223 19.9335 9.41373C19.9485 10.5352 19.5236 11.618 18.75 12.43V12.46Z"
                  fill="#BCBCBC"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.categories}>
          <button
            className={`${styles.category} ${
              activeCategory === 0 ? styles.active : ""
            }`}
            onClick={() => setActiveCategory(0)}
          >
            Все
          </button>
          {categories.map((category, index) => (
            <button
              key={category._id}
              className={`${styles.category} ${
                activeCategory === index + 1 ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(index + 1)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className={styles.products}>
          {items.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Restaurant;
