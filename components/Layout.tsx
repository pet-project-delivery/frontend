import React, { FC, ReactNode } from "react";
import Header from "./Header";

interface LayOutChildren {
  children: ReactNode | JSX.Element[] | JSX.Element;
}

const Layout: FC<LayOutChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
