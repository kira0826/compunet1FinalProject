import React, { useState, useEffect } from "react";
import { useCheckout, useCheckoutUpdate } from "../../CheckoutContext.js";
import { useUser } from "../../UserContext.js";
import VerificationPopup from "../general/VerificationPopup.js";

const buttonStyles = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
};

function Receipt({ substractCart }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isEmptyCart, setIsEmptyCart] = useState(false);

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_URL_PROD
      : process.env.REACT_APP_URL_LOCAL;

  const user = useUser();
  const updateCheckout = useCheckoutUpdate();

  const checkout = useCheckout();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(checkout);
  }, [checkout]);

  const subtotal = () => {
    return checkout.reduce((sum, product) => sum + product.price * (product.quantity || 1), 0);
  };

  const total = () => {
    return subtotal();
  };

  const handleDeleteClick = (id) => {
    updateCheckout({ id }, 0);
    substractCart();
  };

  const handlePlaceOrderClick = async () => {
    if (user) {
      let tempProducts = checkout;
      if (tempProducts.length === 0) {
        setIsEmptyCart(true);
        setShowPopup(true);
      } else {
        setIsEmptyCart(false);
        const orderData = {
          idUser: user.email,
          orders: {
            date: new Date().toISOString().split("T")[0],
            products: tempProducts.map((product) => ({
              idProduct: product.id,
              quantity: product.quantity,
            })),
          },
        };
  
        if (tempProducts.length > 0) {
          try {
            const response = await fetch(apiUrl + "/order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
            });
  
            if (!response.ok) {
              throw new Error("Error al crear la orden");
            }
  
            // Si la creación es exitosa, vaciar el carrito
            updateCheckout([]); // Vacía el carrito aquí
          } catch (error) {
            console.error("Error al crear la orden:", error);
          }
        }
        for (const product of checkout) {
          const updatedProduct = { ...product, stock: product.stock - product.quantity };
          const changedValues = { stock: updatedProduct.stock };
          try {
            const response = await fetch(apiUrl + "/products/" + product.id, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(changedValues),
            });
  
            if (!response.ok) {
              throw new Error("Error al actualizar el producto");
            }
  
            // Si la actualización es exitosa, actualiza localmente el checkout
            substractCart();
            updateCheckout(product.id, updatedProduct.stock);
          } catch (error) {
            console.error("Error al actualizar el producto:", error);
          }
        }
        setProducts(tempProducts);
        setShowPopup(true);
      }
    } else {
      setIsEmptyCart(true);
      setShowPopup(true);
    }
  };  

  return (
    <div className="col-span-4 border border-gray-200 p-4 rounded">
      <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">order summary</h4>
      <div className="space-y-2">
        {checkout.map((product) => (
          <div className="flex justify-between items-center" key={product.id}>
            <div>
              <h5 className="text-gray-800 font-medium">{product.name}</h5>
              <p className="text-sm text-gray-600">${product.price} x {product.quantity || 1}</p>
            </div>
            <button onClick={() => handleDeleteClick(product.id)} style={buttonStyles}>Delete</button>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between items-center">
          <h5 className="text-gray-800 font-medium">Subtotal</h5>
          <p className="text-gray-800">${subtotal()}</p>
        </div>
        <div className="flex justify-between items-center">
          <h5 className="text-gray-800 font-medium">Total</h5>
          <p className="text-gray-800">${total()}</p>
        </div>
      </div>
      <button onClick={handlePlaceOrderClick} className="w-full bg-red-600 text-white py-2 mt-4 rounded hover:bg-red-700 transition-colors">Place Order</button>
      {showPopup && (
        <VerificationPopup
          message={isEmptyCart ? "Tu carrito está vacío." : "Pedido realizado con éxito."}
          onAccept={() => setShowPopup(false)}
          products={products}
          isEmptyCart={isEmptyCart}
        />
      )}
    </div>
  );
}

export default Receipt;
