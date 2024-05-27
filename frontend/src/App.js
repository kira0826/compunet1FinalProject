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
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} index />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product" element={<ProductInfo />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
