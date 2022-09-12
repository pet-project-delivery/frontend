import React, { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayOutChildren {
  children: ReactNode | JSX.Element[] | JSX.Element;
}

const Layout: FC<LayOutChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
