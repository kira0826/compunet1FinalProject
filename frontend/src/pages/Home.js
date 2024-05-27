import React from "react";
import { Banner, Features, Product } from "../components/index.js";

function Home() {
  return (
      <div>
      <Banner />
      <Features />
      <div className="container pb-16"></div>
      </div>
  );
}

export default Home;
