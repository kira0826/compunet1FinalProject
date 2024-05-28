import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Home,
  Login,
  Register,
  Checkout,
  Profile,
  ProductInfo,
  Layout,
} from "./pages/index.js";

import "./components/fontAwesome.js";
import { Product } from "./components/index.js";


function App() {

  const [carCount, setCarCount] = useState(0)

  const incrementCartCount = () => {
    setCarCount(carCount + 1)

  }


  return (
    <Router>
      <Layout carCount={carCount} >
        <Routes>
          <Route path="/" element={<Home incrementCartCount={incrementCartCount} />} index />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product" element={<ProductInfo incrementCartCount={incrementCartCount}/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
