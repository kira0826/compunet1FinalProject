import React, { useContext, useState } from "react";

const CheckoutContext = React.createContext();
const CheckoutUpdateContext = React.createContext();

export function useCheckout() {
  return useContext(CheckoutContext);
}

export function useCheckoutUpdate() {
  return useContext(CheckoutUpdateContext);
}

export function CheckoutProvider({ children }) {
  const [checkout, setCheckout] = useState([]);

  // Añadimos al carrito el producto que el usuario escogió
  function updateCheckout(product, cond) {
    if (cond === 1) {
      setCheckout(prevCheckout => [...prevCheckout, product]);
    } else {
      setCheckout(prevCheckout => prevCheckout.filter(item => item.id !== product));
    }
  }

  return (
    <CheckoutContext.Provider value={checkout}>
      <CheckoutUpdateContext.Provider value={updateCheckout}>
        {children}
      </CheckoutUpdateContext.Provider>
    </CheckoutContext.Provider>
  );
}
