import React, { useContext, useEffect, useState } from 'react';
import ThemeContext, { ThemeContextProps } from './ThemeProvider';

import styles from '../styles/ChangeTheme.module.scss';

const ChangeTheme = () => {
  const themeContext: ThemeContextProps = useContext(ThemeContext);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  const toggleThemeHandler: () => void = () => {
    themeContext.toggleThemeHandler();
  };

  const changeThemeHandler = () => {
    if (theme === 'light') {
      setTheme('dark');
      window.localStorage.setItem('theme', 'dark');
      toggleThemeHandler();
    } else {
      setTheme('light');
      window.localStorage.setItem('theme', 'light');
      toggleThemeHandler();
    }
  };

  useEffect(() => {
    const initialTheme = (window.localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    setTheme(initialTheme);
  }, []);

  return (
    <button className={styles.button} onClick={changeThemeHandler}>
      {theme === 'light' ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.70002 14.1667L4.10835 14.7584C3.95314 14.9145 3.86603 15.1257 3.86603 15.3459C3.86603 15.566 3.95314 15.7772 4.10835 15.9334C4.26449 16.0886 4.4757 16.1757 4.69585 16.1757C4.91601 16.1757 5.12722 16.0886 5.28335 15.9334L5.87502 15.3417C6.01154 15.1823 6.08288 14.9772 6.07478 14.7675C6.06668 14.5577 5.97974 14.3588 5.83132 14.2104C5.68291 14.062 5.48396 13.975 5.27423 13.9669C5.0645 13.9588 4.85944 14.0302 4.70002 14.1667ZM4.16669 10C4.16669 9.77901 4.07889 9.56705 3.92261 9.41077C3.76633 9.25449 3.55437 9.16669 3.33335 9.16669H2.50002C2.27901 9.16669 2.06704 9.25449 1.91076 9.41077C1.75448 9.56705 1.66669 9.77901 1.66669 10C1.66669 10.221 1.75448 10.433 1.91076 10.5893C2.06704 10.7456 2.27901 10.8334 2.50002 10.8334H3.33335C3.55437 10.8334 3.76633 10.7456 3.92261 10.5893C4.07889 10.433 4.16669 10.221 4.16669 10ZM10 4.16669C10.221 4.16669 10.433 4.07889 10.5893 3.92261C10.7456 3.76633 10.8334 3.55437 10.8334 3.33335V2.50002C10.8334 2.27901 10.7456 2.06704 10.5893 1.91076C10.433 1.75448 10.221 1.66669 10 1.66669C9.77901 1.66669 9.56705 1.75448 9.41077 1.91076C9.25449 2.06704 9.16669 2.27901 9.16669 2.50002V3.33335C9.16669 3.55437 9.25449 3.76633 9.41077 3.92261C9.56705 4.07889 9.77901 4.16669 10 4.16669ZM4.70002 5.87502C4.85524 6.02897 5.06474 6.11577 5.28335 6.11669C5.39303 6.11732 5.50174 6.0963 5.60328 6.05483C5.70481 6.01336 5.79715 5.95226 5.87502 5.87502C6.03023 5.71889 6.11735 5.50768 6.11735 5.28752C6.11735 5.06737 6.03023 4.85616 5.87502 4.70002L5.28335 4.10835C5.12394 3.97183 4.91887 3.90049 4.70914 3.90859C4.49941 3.9167 4.30046 4.00364 4.15205 4.15205C4.00364 4.30046 3.9167 4.49941 3.90859 4.70914C3.90049 4.91887 3.97183 5.12394 4.10835 5.28335L4.70002 5.87502ZM14.7 6.11669C14.9186 6.11577 15.1281 6.02897 15.2834 5.87502L15.875 5.28335C15.9623 5.20865 16.0331 5.11672 16.0831 5.01333C16.1331 4.90994 16.1613 4.79733 16.1657 4.68256C16.1701 4.5678 16.1508 4.45336 16.1089 4.34642C16.067 4.23948 16.0034 4.14236 15.9222 4.06115C15.841 3.97993 15.7439 3.91638 15.637 3.87449C15.53 3.83259 15.4156 3.81326 15.3008 3.81769C15.186 3.82212 15.0734 3.85023 14.97 3.90025C14.8667 3.95027 14.7747 4.02112 14.7 4.10835L14.1667 4.70002C14.0115 4.85616 13.9244 5.06737 13.9244 5.28752C13.9244 5.50768 14.0115 5.71889 14.1667 5.87502C14.3136 6.02116 14.5097 6.10731 14.7167 6.11669H14.7ZM17.5 9.16669H16.6667C16.4457 9.16669 16.2337 9.25449 16.0774 9.41077C15.9212 9.56705 15.8334 9.77901 15.8334 10C15.8334 10.221 15.9212 10.433 16.0774 10.5893C16.2337 10.7456 16.4457 10.8334 16.6667 10.8334H17.5C17.721 10.8334 17.933 10.7456 18.0893 10.5893C18.2456 10.433 18.3334 10.221 18.3334 10C18.3334 9.77901 18.2456 9.56705 18.0893 9.41077C17.933 9.25449 17.721 9.16669 17.5 9.16669ZM10 15.8334C9.77901 15.8334 9.56705 15.9212 9.41077 16.0774C9.25449 16.2337 9.16669 16.4457 9.16669 16.6667V17.5C9.16669 17.721 9.25449 17.933 9.41077 18.0893C9.56705 18.2456 9.77901 18.3334 10 18.3334C10.221 18.3334 10.433 18.2456 10.5893 18.0893C10.7456 17.933 10.8334 17.721 10.8334 17.5V16.6667C10.8334 16.4457 10.7456 16.2337 10.5893 16.0774C10.433 15.9212 10.221 15.8334 10 15.8334ZM15.3 14.1667C15.1417 14.0786 14.959 14.0446 14.7796 14.0696C14.6002 14.0947 14.4338 14.1776 14.3057 14.3057C14.1776 14.4338 14.0947 14.6002 14.0696 14.7796C14.0446 14.959 14.0786 15.1417 14.1667 15.3L14.7584 15.8917C14.9145 16.0469 15.1257 16.134 15.3459 16.134C15.566 16.134 15.7772 16.0469 15.9334 15.8917C16.0886 15.7356 16.1757 15.5243 16.1757 15.3042C16.1757 15.084 16.0886 14.8728 15.9334 14.7167L15.3 14.1667ZM10 5.41669C9.09352 5.41669 8.20738 5.68549 7.45366 6.18912C6.69993 6.69274 6.11247 7.40856 5.76557 8.24605C5.41867 9.08355 5.32791 10.0051 5.50475 10.8942C5.6816 11.7833 6.11812 12.5999 6.75911 13.2409C7.4001 13.8819 8.21678 14.3184 9.10586 14.4953C9.99494 14.6721 10.9165 14.5814 11.754 14.2345C12.5915 13.8876 13.3073 13.3001 13.8109 12.5464C14.3145 11.7927 14.5834 10.9065 14.5834 10C14.5812 8.78512 14.0976 7.62061 13.2385 6.76155C12.3794 5.90248 11.2149 5.41889 10 5.41669ZM10 12.9167C9.42316 12.9167 8.85925 12.7456 8.37961 12.4251C7.89996 12.1047 7.52613 11.6491 7.30537 11.1162C7.08462 10.5832 7.02686 9.99679 7.1394 9.43101C7.25194 8.86523 7.52972 8.34553 7.93763 7.93763C8.34553 7.52972 8.86523 7.25194 9.43101 7.1394C9.99679 7.02686 10.5832 7.08462 11.1162 7.30537C11.6491 7.52613 12.1047 7.89996 12.4251 8.37961C12.7456 8.85925 12.9167 9.42316 12.9167 10C12.9167 10.7736 12.6094 11.5154 12.0624 12.0624C11.5154 12.6094 10.7736 12.9167 10 12.9167Z"
            fill="#813CAB"
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.0333 10.8334C17.913 10.7339 17.7672 10.6703 17.6125 10.6497C17.4578 10.629 17.3005 10.6523 17.1583 10.7167C16.2771 11.1199 15.3191 11.3275 14.35 11.325C12.5574 11.3229 10.8383 10.6121 9.56761 9.34761C8.29691 8.08316 7.57765 6.36761 7.56666 4.57502C7.57046 4.01322 7.64038 3.45381 7.77499 2.90836C7.80356 2.76297 7.79284 2.6126 7.74395 2.47274C7.69507 2.33287 7.60977 2.20857 7.49686 2.11263C7.38395 2.0167 7.2475 1.95261 7.10157 1.92695C6.95565 1.9013 6.80552 1.91502 6.66666 1.96669C5.36026 2.55411 4.22463 3.46399 3.36646 4.61084C2.50828 5.7577 1.95572 7.10388 1.7607 8.52293C1.56567 9.94198 1.73458 11.3873 2.25155 12.7232C2.76852 14.059 3.61658 15.2415 4.71607 16.1596C5.81556 17.0777 7.13039 17.7012 8.53703 17.9715C9.94367 18.2419 11.396 18.1503 12.7574 17.7052C14.1189 17.2602 15.345 16.4763 16.3203 15.4273C17.2957 14.3783 17.9884 13.0986 18.3333 11.7084C18.3753 11.5492 18.3693 11.3811 18.3159 11.2254C18.2625 11.0697 18.1642 10.9333 18.0333 10.8334V10.8334ZM10.1167 16.4084C8.71812 16.3985 7.35682 15.9566 6.21915 15.1431C5.08148 14.3297 4.22305 13.1845 3.76139 11.8643C3.29974 10.5441 3.25744 9.11351 3.64027 7.76836C4.02311 6.42321 4.81237 5.22927 5.89999 4.35002V4.57502C5.9022 6.81543 6.79317 8.96344 8.37737 10.5476C9.96158 12.1318 12.1096 13.0228 14.35 13.025C14.9382 13.0272 15.525 12.9657 16.1 12.8417C15.5249 13.9296 14.6637 14.8399 13.6093 15.4743C12.5549 16.1087 11.3472 16.4432 10.1167 16.4417V16.4084Z"
            fill="#813CAB"
          />
        </svg>
      )}
    </button>
  );
};

export default ChangeTheme;