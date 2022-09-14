import { FC, useCallback } from "react";
import { Restaurant } from "../types/Restaurant";

import styles from "../styles/Restaurant.module.scss";
import Image from "next/image";
import { getRating } from "../helpers/getRating";
import { getMinPrice } from "../helpers/getMinPrice";
import Link from "next/link";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: FC<RestaurantCardProps> = ({ restaurant }) => {
  const { name, imageUrl, timeRange, reviews, reviewsAmount, items } =
    restaurant;
  const rating = getRating(reviews, reviewsAmount);
  const minPrice = getMinPrice(items);

  return (
    <Link href="/">
      <a className={styles.card}>
        <Image
          className={styles.image}
          src={`http://localhost:5000/${imageUrl}`}
          alt={name}
          height={150}
          width={440}
        />
        <div className={styles.wrapper}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.desc}>
            <div className={styles.descItem}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1.5C7.51664 1.5 6.0666 1.93987 4.83323 2.76398C3.59986 3.58809 2.63856 4.75943 2.07091 6.12987C1.50325 7.50032 1.35472 9.00832 1.64411 10.4632C1.9335 11.918 2.64781 13.2544 3.6967 14.3033C4.7456 15.3522 6.08197 16.0665 7.53683 16.3559C8.99168 16.6453 10.4997 16.4968 11.8701 15.9291C13.2406 15.3614 14.4119 14.4001 15.236 13.1668C16.0601 11.9334 16.5 10.4834 16.5 9C16.5 8.01509 16.306 7.03982 15.9291 6.12987C15.5522 5.21993 14.9997 4.39314 14.3033 3.6967C13.6069 3.00026 12.7801 2.44781 11.8701 2.0709C10.9602 1.69399 9.98492 1.5 9 1.5V1.5ZM9 15C7.81332 15 6.65328 14.6481 5.66658 13.9888C4.67989 13.3295 3.91085 12.3925 3.45673 11.2961C3.0026 10.1997 2.88378 8.99334 3.11529 7.82946C3.3468 6.66557 3.91825 5.59647 4.75736 4.75736C5.59648 3.91824 6.66558 3.3468 7.82946 3.11529C8.99335 2.88378 10.1997 3.0026 11.2961 3.45672C12.3925 3.91085 13.3295 4.67988 13.9888 5.66658C14.6481 6.65327 15 7.81331 15 9C15 10.5913 14.3679 12.1174 13.2426 13.2426C12.1174 14.3679 10.5913 15 9 15V15ZM11.325 9.4725L9.75 8.565V5.25C9.75 5.05109 9.67099 4.86032 9.53033 4.71967C9.38968 4.57902 9.19892 4.5 9 4.5C8.80109 4.5 8.61033 4.57902 8.46967 4.71967C8.32902 4.86032 8.25 5.05109 8.25 5.25V9C8.25 9 8.25 9.06 8.25 9.09C8.25444 9.14168 8.2671 9.19231 8.2875 9.24C8.30295 9.2845 8.32306 9.32724 8.3475 9.3675C8.36803 9.41013 8.39318 9.45037 8.4225 9.4875L8.5425 9.585L8.61 9.6525L10.56 10.7775C10.6743 10.8423 10.8036 10.8759 10.935 10.875C11.1011 10.8762 11.2628 10.8222 11.3949 10.7215C11.527 10.6208 11.6219 10.4792 11.6648 10.3187C11.7077 10.1583 11.6961 9.98819 11.6319 9.83503C11.5677 9.68188 11.4545 9.55437 11.31 9.4725H11.325Z"
                  fill="white"
                />
              </svg>
              {timeRange}
            </div>
            <div className={styles.descItem}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 8.25C4.35166 8.25 4.20666 8.29399 4.08332 8.3764C3.95999 8.45881 3.86386 8.57594 3.80709 8.71299C3.75032 8.85003 3.73547 9.00083 3.76441 9.14632C3.79335 9.2918 3.86478 9.42544 3.96967 9.53033C4.07456 9.63522 4.2082 9.70665 4.35368 9.73559C4.49917 9.76453 4.64997 9.74968 4.78701 9.69291C4.92406 9.63614 5.04119 9.54001 5.1236 9.41668C5.20601 9.29334 5.25 9.14834 5.25 9C5.25 8.80109 5.17098 8.61032 5.03033 8.46967C4.88968 8.32902 4.69891 8.25 4.5 8.25ZM13.5 8.25C13.3517 8.25 13.2067 8.29399 13.0833 8.3764C12.96 8.45881 12.8639 8.57594 12.8071 8.71299C12.7503 8.85003 12.7355 9.00083 12.7644 9.14632C12.7933 9.2918 12.8648 9.42544 12.9697 9.53033C13.0746 9.63522 13.2082 9.70665 13.3537 9.73559C13.4992 9.76453 13.65 9.74968 13.787 9.69291C13.9241 9.63614 14.0412 9.54001 14.1236 9.41668C14.206 9.29334 14.25 9.14834 14.25 9C14.25 8.80109 14.171 8.61032 14.0303 8.46967C13.8897 8.32902 13.6989 8.25 13.5 8.25ZM15 3.75H3C2.40326 3.75 1.83097 3.98705 1.40901 4.40901C0.987053 4.83097 0.75 5.40326 0.75 6V12C0.75 12.5967 0.987053 13.169 1.40901 13.591C1.83097 14.0129 2.40326 14.25 3 14.25H15C15.5967 14.25 16.169 14.0129 16.591 13.591C17.0129 13.169 17.25 12.5967 17.25 12V6C17.25 5.40326 17.0129 4.83097 16.591 4.40901C16.169 3.98705 15.5967 3.75 15 3.75ZM15.75 12C15.75 12.1989 15.671 12.3897 15.5303 12.5303C15.3897 12.671 15.1989 12.75 15 12.75H3C2.80109 12.75 2.61032 12.671 2.46967 12.5303C2.32902 12.3897 2.25 12.1989 2.25 12V6C2.25 5.80109 2.32902 5.61032 2.46967 5.46967C2.61032 5.32902 2.80109 5.25 3 5.25H15C15.1989 5.25 15.3897 5.32902 15.5303 5.46967C15.671 5.61032 15.75 5.80109 15.75 6V12ZM9 6.75C8.55499 6.75 8.11998 6.88196 7.74997 7.12919C7.37996 7.37643 7.09157 7.72783 6.92127 8.13896C6.75097 8.5501 6.70642 9.0025 6.79323 9.43895C6.88005 9.87541 7.09434 10.2763 7.40901 10.591C7.72368 10.9057 8.12459 11.12 8.56105 11.2068C8.9975 11.2936 9.4499 11.249 9.86104 11.0787C10.2722 10.9084 10.6236 10.62 10.8708 10.25C11.118 9.88002 11.25 9.44501 11.25 9C11.25 8.40326 11.0129 7.83097 10.591 7.40901C10.169 6.98705 9.59674 6.75 9 6.75ZM9 9.75C8.85166 9.75 8.70666 9.70601 8.58332 9.6236C8.45999 9.54119 8.36386 9.42406 8.30709 9.28701C8.25032 9.14997 8.23547 8.99917 8.26441 8.85368C8.29335 8.7082 8.36478 8.57456 8.46967 8.46967C8.57456 8.36478 8.7082 8.29335 8.85368 8.26441C8.99917 8.23547 9.14997 8.25032 9.28701 8.30709C9.42406 8.36386 9.54119 8.45999 9.6236 8.58332C9.70601 8.70666 9.75 8.85166 9.75 9C9.75 9.19891 9.67098 9.38968 9.53033 9.53033C9.38968 9.67098 9.19891 9.75 9 9.75Z"
                  fill="white"
                />
              </svg>
              от {minPrice} ₽
            </div>
            <div className={styles.descItem}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 7.2525C16.4526 7.11532 16.3665 6.99482 16.252 6.90563C16.1375 6.81643 15.9996 6.76237 15.855 6.75L11.5875 6.1275L9.675 2.25C9.61358 2.1232 9.5177 2.01626 9.39831 1.94143C9.27893 1.86661 9.14089 1.82692 9 1.82692C8.85911 1.82692 8.72106 1.86661 8.60168 1.94143C8.4823 2.01626 8.38641 2.1232 8.325 2.25L6.4125 6.12L2.145 6.75C2.00619 6.76973 1.87569 6.82797 1.76831 6.91812C1.66093 7.00827 1.58097 7.12671 1.5375 7.26C1.49771 7.39026 1.49414 7.52889 1.52717 7.66102C1.5602 7.79315 1.62859 7.9138 1.725 8.01L4.8225 11.01L4.0725 15.27C4.04572 15.4106 4.05974 15.5559 4.1129 15.6888C4.16606 15.8217 4.25614 15.9366 4.3725 16.02C4.48591 16.1011 4.61968 16.1489 4.75878 16.1582C4.89789 16.1675 5.03683 16.1378 5.16 16.0725L9 14.07L12.825 16.08C12.9303 16.1394 13.0491 16.1704 13.17 16.17C13.3289 16.1706 13.4838 16.1207 13.6125 16.0275C13.7289 15.9441 13.8189 15.8292 13.8721 15.6963C13.9253 15.5634 13.9393 15.4181 13.9125 15.2775L13.1625 11.0175L16.26 8.0175C16.3683 7.92576 16.4483 7.80518 16.4908 7.66976C16.5333 7.53435 16.5365 7.38966 16.5 7.2525ZM11.8875 10.2525C11.7995 10.3376 11.7337 10.4429 11.6958 10.5592C11.6579 10.6756 11.649 10.7994 11.67 10.92L12.21 14.0625L9.39 12.5625C9.28149 12.5047 9.16043 12.4745 9.0375 12.4745C8.91456 12.4745 8.79351 12.5047 8.685 12.5625L5.865 14.0625L6.405 10.92C6.42595 10.7994 6.41708 10.6756 6.37917 10.5592C6.34126 10.4429 6.27546 10.3376 6.1875 10.2525L3.9375 8.0025L7.095 7.545C7.2165 7.5281 7.332 7.48166 7.43137 7.40974C7.53075 7.33782 7.61097 7.24263 7.665 7.1325L9 4.275L10.41 7.14C10.464 7.25013 10.5442 7.34532 10.6436 7.41724C10.743 7.48916 10.8585 7.5356 10.98 7.5525L14.1375 8.01L11.8875 10.2525Z"
                  fill="white"
                />
              </svg>
              {rating}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default RestaurantCard;
