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
    setCheckout(prevCheckout => {
      const existingProductIndex = prevCheckout.findIndex(item => item.id === product.id);

      if (cond === 1) {
        if (existingProductIndex !== -1) {
          return prevCheckout.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCheckout, { ...product, quantity: 1 }];
        }
      } else {
        if (existingProductIndex !== -1) {
          const updatedCheckout = [...prevCheckout];
          const existingProduct = updatedCheckout[existingProductIndex];

          if (existingProduct.quantity === 1) {
            updatedCheckout.splice(existingProductIndex, 1);
          } else {
            updatedCheckout[existingProductIndex] = { ...existingProduct, quantity: existingProduct.quantity - 1 };
          }
          return updatedCheckout;
        }
        return prevCheckout; // Si el producto no existe, simplemente retorna el estado anterior
      }
    });
  }

  return (
    <CheckoutContext.Provider value={checkout}>
      <CheckoutUpdateContext.Provider value={updateCheckout}>
        {children}
      </CheckoutUpdateContext.Provider>
    </CheckoutContext.Provider>
  );
}
