import { NextComponentType } from "next";
import Link from "next/link";
import React, { FC, ReactElement, useState } from "react";
import ChangeTheme from "./ChangeTheme";
import Modal from "./Modal";
import LoginPopup from "./LoginPopup";
import Logo from "./Logo";

import styles from "../styles/Header.module.scss";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { logout } from "../store/slices/userSlice";

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const setIsOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  const { isAuth } = useAppSelector((state) => state.user);

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.wrapper}>
            <div className={styles.flex}>
              <Logo />
              <div className={styles.address}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2.33331C11.5247 2.33331 9.15068 3.31664 7.40034 5.06698C5.65 6.81732 4.66667 9.19129 4.66667 11.6666C4.66667 17.9666 12.8917 25.0833 13.2417 25.3866C13.453 25.5674 13.7219 25.6667 14 25.6667C14.2781 25.6667 14.547 25.5674 14.7583 25.3866C15.1667 25.0833 23.3333 17.9666 23.3333 11.6666C23.3333 9.19129 22.35 6.81732 20.5997 5.06698C18.8493 3.31664 16.4754 2.33331 14 2.33331V2.33331ZM14 22.925C11.515 20.5916 7.00001 15.5633 7.00001 11.6666C7.00001 9.81013 7.7375 8.02965 9.05026 6.7169C10.363 5.40414 12.1435 4.66665 14 4.66665C15.8565 4.66665 17.637 5.40414 18.9498 6.7169C20.2625 8.02965 21 9.81013 21 11.6666C21 15.5633 16.485 20.6033 14 22.925ZM14 6.99998C13.077 6.99998 12.1748 7.27367 11.4073 7.78645C10.6399 8.29923 10.0418 9.02807 9.68857 9.88079C9.33536 10.7335 9.24294 11.6718 9.42301 12.5771C9.60307 13.4823 10.0475 14.3138 10.7002 14.9665C11.3528 15.6191 12.1843 16.0636 13.0896 16.2436C13.9948 16.4237 14.9331 16.3313 15.7859 15.9781C16.6386 15.6249 17.3674 15.0267 17.8802 14.2593C18.393 13.4919 18.6667 12.5896 18.6667 11.6666C18.6667 10.429 18.175 9.24198 17.2998 8.36681C16.4247 7.49164 15.2377 6.99998 14 6.99998ZM14 14C13.5385 14 13.0874 13.8631 12.7037 13.6067C12.32 13.3504 12.0209 12.9859 11.8443 12.5596C11.6677 12.1332 11.6215 11.6641 11.7115 11.2114C11.8015 10.7588 12.0238 10.3431 12.3501 10.0167C12.6764 9.69041 13.0922 9.46818 13.5448 9.37815C13.9974 9.28811 14.4666 9.33432 14.8929 9.51093C15.3193 9.68753 15.6837 9.9866 15.9401 10.3703C16.1965 10.754 16.3333 11.2052 16.3333 11.6666C16.3333 12.2855 16.0875 12.879 15.6499 13.3166C15.2123 13.7541 14.6188 14 14 14Z"
                    fill="white"
                  />
                </svg>
                <div className={styles.title}>Адрес Доставки</div>
              </div>
            </div>
            <nav className={styles.links}>
              <Link href="/">
                <a className={styles.link}>Главная</a>
              </Link>
              <Link href="/">
                <a className={styles.link}>Поиск</a>
              </Link>
              <Link href="/">
                <a className={styles.link}>Рестораны</a>
              </Link>
              <Link href="/">
                <a className={styles.link}>Магазины</a>
              </Link>
            </nav>
            <div className={styles.buttons}>
              {isAuth ? (
                <button className={styles.button} onClick={logoutHandler}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.71 12.71C16.6904 11.9387 17.406 10.8809 17.7572 9.68394C18.1085 8.48697 18.0779 7.21027 17.6698 6.03147C17.2617 4.85267 16.4963 3.83039 15.4801 3.10686C14.4639 2.38332 13.2474 1.99451 12 1.99451C10.7525 1.99451 9.53611 2.38332 8.51993 3.10686C7.50374 3.83039 6.73834 4.85267 6.33021 6.03147C5.92208 7.21027 5.89151 8.48697 6.24276 9.68394C6.59401 10.8809 7.3096 11.9387 8.29 12.71C6.61007 13.383 5.14428 14.4994 4.04889 15.9399C2.95349 17.3805 2.26956 19.0913 2.07 20.89C2.05555 21.0213 2.06711 21.1542 2.10402 21.2811C2.14093 21.4079 2.20246 21.5263 2.28511 21.6293C2.45202 21.8375 2.69478 21.9708 2.96 22C3.22521 22.0292 3.49116 21.9518 3.69932 21.7849C3.90749 21.618 4.04082 21.3752 4.07 21.11C4.28958 19.1552 5.22168 17.3498 6.68822 16.0388C8.15475 14.7278 10.0529 14.003 12.02 14.003C13.9871 14.003 15.8852 14.7278 17.3518 16.0388C18.8183 17.3498 19.7504 19.1552 19.97 21.11C19.9972 21.3557 20.1144 21.5827 20.2991 21.747C20.4838 21.9114 20.7228 22.0015 20.97 22H21.08C21.3421 21.9698 21.5817 21.8373 21.7466 21.6313C21.9114 21.4252 21.9881 21.1624 21.96 20.9C21.7595 19.0962 21.0719 17.381 19.9708 15.9382C18.8698 14.4954 17.3969 13.3795 15.71 12.71ZM12 12C11.2089 12 10.4355 11.7654 9.77772 11.3259C9.11992 10.8864 8.60723 10.2616 8.30448 9.53074C8.00173 8.79983 7.92251 7.99557 8.07686 7.21964C8.2312 6.44372 8.61216 5.73099 9.17157 5.17158C9.73098 4.61217 10.4437 4.2312 11.2196 4.07686C11.9956 3.92252 12.7998 4.00173 13.5307 4.30448C14.2616 4.60724 14.8863 5.11993 15.3259 5.77772C15.7654 6.43552 16 7.20888 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12Z"
                      fill="#813CAB"
                    />
                  </svg>
                  Выйти
                </button>
              ) : (
                <button onClick={setIsOpenHandler} className={styles.button}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.71 12.71C16.6904 11.9387 17.406 10.8809 17.7572 9.68394C18.1085 8.48697 18.0779 7.21027 17.6698 6.03147C17.2617 4.85267 16.4963 3.83039 15.4801 3.10686C14.4639 2.38332 13.2474 1.99451 12 1.99451C10.7525 1.99451 9.53611 2.38332 8.51993 3.10686C7.50374 3.83039 6.73834 4.85267 6.33021 6.03147C5.92208 7.21027 5.89151 8.48697 6.24276 9.68394C6.59401 10.8809 7.3096 11.9387 8.29 12.71C6.61007 13.383 5.14428 14.4994 4.04889 15.9399C2.95349 17.3805 2.26956 19.0913 2.07 20.89C2.05555 21.0213 2.06711 21.1542 2.10402 21.2811C2.14093 21.4079 2.20246 21.5263 2.28511 21.6293C2.45202 21.8375 2.69478 21.9708 2.96 22C3.22521 22.0292 3.49116 21.9518 3.69932 21.7849C3.90749 21.618 4.04082 21.3752 4.07 21.11C4.28958 19.1552 5.22168 17.3498 6.68822 16.0388C8.15475 14.7278 10.0529 14.003 12.02 14.003C13.9871 14.003 15.8852 14.7278 17.3518 16.0388C18.8183 17.3498 19.7504 19.1552 19.97 21.11C19.9972 21.3557 20.1144 21.5827 20.2991 21.747C20.4838 21.9114 20.7228 22.0015 20.97 22H21.08C21.3421 21.9698 21.5817 21.8373 21.7466 21.6313C21.9114 21.4252 21.9881 21.1624 21.96 20.9C21.7595 19.0962 21.0719 17.381 19.9708 15.9382C18.8698 14.4954 17.3969 13.3795 15.71 12.71ZM12 12C11.2089 12 10.4355 11.7654 9.77772 11.3259C9.11992 10.8864 8.60723 10.2616 8.30448 9.53074C8.00173 8.79983 7.92251 7.99557 8.07686 7.21964C8.2312 6.44372 8.61216 5.73099 9.17157 5.17158C9.73098 4.61217 10.4437 4.2312 11.2196 4.07686C11.9956 3.92252 12.7998 4.00173 13.5307 4.30448C14.2616 4.60724 14.8863 5.11993 15.3259 5.77772C15.7654 6.43552 16 7.20888 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12Z"
                      fill="#813CAB"
                    />
                  </svg>
                  Войти
                </button>
              )}

              <button className={styles.button}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 18C14.2652 18 14.5195 17.8947 14.7071 17.7071C14.8946 17.5196 15 17.2652 15 17V15C15 14.7348 14.8946 14.4805 14.7071 14.2929C14.5195 14.1054 14.2652 14 14 14C13.7348 14 13.4804 14.1054 13.2929 14.2929C13.1053 14.4805 13 14.7348 13 15V17C13 17.2652 13.1053 17.5196 13.2929 17.7071C13.4804 17.8947 13.7348 18 14 18ZM9.99998 18C10.2652 18 10.5195 17.8947 10.7071 17.7071C10.8946 17.5196 11 17.2652 11 17V15C11 14.7348 10.8946 14.4805 10.7071 14.2929C10.5195 14.1054 10.2652 14 9.99998 14C9.73476 14 9.48041 14.1054 9.29287 14.2929C9.10533 14.4805 8.99998 14.7348 8.99998 15V17C8.99998 17.2652 9.10533 17.5196 9.29287 17.7071C9.48041 17.8947 9.73476 18 9.99998 18ZM19 6.00003H17.62L15.89 2.55003C15.8371 2.42308 15.7586 2.3084 15.6594 2.21316C15.5603 2.11791 15.4425 2.04414 15.3135 1.99647C15.1845 1.94879 15.0471 1.92823 14.9098 1.93607C14.7725 1.94392 14.6383 1.97999 14.5156 2.04204C14.3929 2.10408 14.2843 2.19078 14.1966 2.2967C14.1089 2.40261 14.044 2.52548 14.0059 2.65762C13.9678 2.78976 13.9574 2.92833 13.9753 3.06467C13.9932 3.20102 14.0391 3.3322 14.11 3.45003L15.38 6.00003H8.61998L9.88998 3.45003C9.98704 3.21693 9.99234 2.95575 9.9048 2.71891C9.81726 2.48208 9.64337 2.28712 9.41804 2.17319C9.19271 2.05926 8.93262 2.03479 8.68999 2.10469C8.44736 2.17458 8.24016 2.33368 8.10998 2.55003L6.37998 6.00003H4.99998C4.29316 6.01078 3.61285 6.27077 3.07903 6.73416C2.5452 7.19755 2.19215 7.83455 2.08215 8.53283C1.97214 9.23112 2.11225 9.94581 2.47776 10.5509C2.84327 11.1559 3.4107 11.6125 4.07998 11.84L4.81998 19.3C4.8946 20.0426 5.24332 20.7307 5.79805 21.2299C6.35278 21.7292 7.07368 22.0038 7.81998 22H16.2C16.9463 22.0038 17.6672 21.7292 18.2219 21.2299C18.7766 20.7307 19.1254 20.0426 19.2 19.3L19.94 11.84C20.6107 11.6118 21.179 11.1536 21.5443 10.5465C21.9095 9.93942 22.0481 9.22266 21.9355 8.52317C21.823 7.82368 21.4664 7.18661 20.9291 6.7248C20.3918 6.26299 19.7084 6.00624 19 6.00003ZM17.19 19.1C17.1651 19.3475 17.0489 19.5769 16.864 19.7433C16.679 19.9098 16.4387 20.0013 16.19 20H7.80998C7.56121 20.0013 7.32091 19.9098 7.136 19.7433C6.95109 19.5769 6.83485 19.3475 6.80998 19.1L6.09998 12H17.9L17.19 19.1ZM19 10H4.99998C4.73476 10 4.48041 9.89467 4.29287 9.70713C4.10533 9.5196 3.99998 9.26524 3.99998 9.00003C3.99998 8.73481 4.10533 8.48046 4.29287 8.29292C4.48041 8.10538 4.73476 8.00003 4.99998 8.00003H19C19.2652 8.00003 19.5195 8.10538 19.7071 8.29292C19.8946 8.48046 20 8.73481 20 9.00003C20 9.26524 19.8946 9.5196 19.7071 9.70713C19.5195 9.89467 19.2652 10 19 10Z"
                    fill="#813CAB"
                  />
                </svg>
                Корзина
              </button>
              <ChangeTheme />
            </div>
          </div>
        </div>
      </header>
      <Modal isOpen={isOpen} setOpen={setIsOpenHandler}>
        <LoginPopup setOpen={setIsOpenHandler} />
      </Modal>
    </>
  );
};

export default Header;
