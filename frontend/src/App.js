import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext.js";
import { CheckoutProvider } from "./CheckoutContext.js";
import '@fortawesome/fontawesome-free/css/all.min.css';

import {
  Home,
  Login,
  Register,
  Checkout,
  Profile,
  ProductInfo,
  Layout,
  ProductForm
} from "./pages/index.js";

import "./components/fontAwesome.js";


function App() {
  const [carCount, setCarCount] = useState(0);

  const incrementCartCount = () => {
    setCarCount(carCount + 1);
  };

  // restamos al cart 1
  // pasamos por props a checkout -> receipt
  const substractCart = () => {
    setCarCount(carCount - 1);
  }

  return (
    <Router>
      <CheckoutProvider>
        <UserProvider>
          <Layout carCount={carCount}>
            <Routes>
              <Route
                path="/"
                element={<Home incrementCartCount={incrementCartCount} />}
                index
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout substractCart={substractCart}/>} />
              <Route path="/profile" element={<Profile />} />
              <Route 
                path="/products/:id" 
                element={<ProductInfo incrementCartCount={incrementCartCount} />} 
              />
              <Route path="/productForm" element={<ProductForm incrementCartCount={incrementCartCount}/>} />
            </Routes>
          </Layout>
        </UserProvider>
      </CheckoutProvider>
    </Router>
  );
}

export default App;
