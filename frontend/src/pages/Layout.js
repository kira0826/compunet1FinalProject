import React from "react";
import { Footer, Header, NavBar, CopyRight } from "../components/index.js";

function Layout({ carCount, children }) {
  return (
    <div>
      <Header carCount={carCount}/>
      <NavBar />
      <main>{children}</main>
      <Footer />
      <CopyRight />
    </div>
  );
}

export default Layout;
