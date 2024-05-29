import React, { useContext, useState  } from "react";

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

  // anadimos al carrito el producto que el
  // usuario escogio
  function updateCheckout(product, cond) {
    // si 1 : agregamos (pasa producto)
    // si 0 : quitamos (pasa ID producto)
    if (cond == 1) {
        setCheckout([...checkout, product]);
    } else {
        setCheckout(checkout.filter(item => item.id != product));
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
