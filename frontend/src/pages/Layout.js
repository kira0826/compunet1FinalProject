import React from "react";
import { Footer, Header, NavBar, CopyRight } from "../components/index.js";

function Layout({ currentPage, onPageChange, children }) {
  return (
    <div>
      <Header />
      <NavBar currentPage={currentPage} onPageChange={onPageChange} />
      <main>{children}</main>
      <Footer />
      <CopyRight />
    </div>
  );
}

export default Layout;
