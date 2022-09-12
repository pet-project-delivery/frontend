import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.png';

import styles from '../styles/Logo.module.scss';

const Logo = () => {
  return (
    <Link href="/">
      <a className={styles.logo}>
        <Image src={logo} width={40} height={40} alt="avatar" />
        Delivery
      </a>
    </Link>
  );
};

export default Logo;
