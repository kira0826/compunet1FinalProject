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
      // no podemos hacer un filter porque seria
      // por ID y, cuando hayan varios productos iguales
      // se eliminarian todos los que tengan el mismo
      // ID, no solo el seleccionado
      var index = 0;

      for (let i = 0; i < checkout.length; i++) {
        if (checkout[i].id == product) {
          break; 
        }

        index++;
      }

      checkout[index] = null;
      var newCheckout = []

      checkout.forEach(element => {
        if (element != null) {
          newCheckout.push(element)
        }
      });

      setCheckout(newCheckout);
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
