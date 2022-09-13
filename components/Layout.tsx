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
      <main>
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
