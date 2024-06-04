import React, { useContext, useState, useCallback } from "react";

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
  const updateCheckout = useCallback((product, cond) => {
    if (cond === 1) {
      setCheckout((prevCheckout) => [...prevCheckout, product]);
    } else {
      setCheckout((prevCheckout) => {
        const index = prevCheckout.findIndex((item) => item.id === product);
        if (index !== -1) {
          return [
            ...prevCheckout.slice(0, index),
            ...prevCheckout.slice(index + 1),
          ];
        }
        return prevCheckout;
      });
    }
  }, []);

  return (
    <CheckoutContext.Provider value={checkout}>
      <CheckoutUpdateContext.Provider value={updateCheckout}>
        {children}
      </CheckoutUpdateContext.Provider>
    </CheckoutContext.Provider>
  );
}
