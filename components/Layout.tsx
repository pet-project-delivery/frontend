import React, { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayOutChildren {
  children: ReactNode | JSX.Element[] | JSX.Element;
}

const Layout: FC<LayOutChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
