import React from "react";

// Components
import Header from "./Header/Header";
import Footer from "./Footer";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
