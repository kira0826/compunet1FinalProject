import React, { useState } from "react";
import { useCheckout, useCheckoutUpdate } from "../../CheckoutContext.js";
import { useUser } from "../../UserContext.js";
import VerificationPopup from "../general/VerificationPopup.js";

function Receipt({ substractCart }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isEmptyCart, setIsEmptyCart] = useState(false);

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_URL_PROD
      : process.env.REACT_APP_URL_LOCAL;

  const user = useUser();
  const updateCheckout = useCheckoutUpdate(); // función updateCheckout

  // costo de envío
  var shipping = 0;

  // obtenemos productos del checkout context
  const checkout = useCheckout();
  const [products, setProducts] = useState(checkout);

  // calculamos subtotal
  const subtotal = () => {
    var sum = 0;
    checkout.forEach((product) => {
      sum += parseInt(product.price);
    });
    return sum;
  };

  // calculamos total
  const total = () => {
    return shipping + subtotal();
  };

  // Estilos para los botones
  const buttonStyles = {
    backgroundColor: "#fd3d57",
    color: "white",
    fontWeight: "bold",
    padding: "0.2rem 0.7rem", // Hacer el botón más pequeño
    borderRadius: "0.25rem",
    fontSize: "0.75rem", // Tamaño de la fuente más pequeño
  };

  const onAccept = () => {
    setShowPopup(false);
  };

  const handleDeleteClick = (id) => {
    updateCheckout(id, 0);
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
              quantity: 1, // Ajustar la cantidad según sea necesario
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
          } catch (error) {
            console.error("Error al crear la orden:", error);
          }
        }
        for (const product of checkout) {
          const updatedProduct = { ...product, stock: product.stock - 1 };
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
      <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
        order summary
      </h4>
      <div className="space-y-2">
        {checkout.map((product) => (
          <div className="flex justify-between items-center" key={product.id}>
            <div>
              <h5 className="text-gray-800 font-medium">{product.name}</h5>
              <p className="text-sm text-gray-600">${product.price}</p>
            </div>
            <button
              onClick={() => handleDeleteClick(product.id)}
              style={buttonStyles}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between items-center">
          <h5 className="text-gray-800 font-medium">Subtotal</h5>
          <p className="text-gray-800">${subtotal()}</p>
        </div>
        <div className="flex justify-between items-center">
          <h5 className="text-gray-800 font-medium">Shipping</h5>
          <p className="text-gray-800">${shipping}</p>
        </div>
        <div className="flex justify-between items-center">
          <h5 className="text-gray-800 font-medium">Total</h5>
          <p className="text-gray-800">${total()}</p>
        </div>
      </div>
      <button
        onClick={handlePlaceOrderClick}
        className="w-full bg-red-600 text-white py-2 mt-4 rounded hover:bg-red-700 transition-colors"
      >
        Place Order
      </button>
      {showPopup && (
        <VerificationPopup
          message={isEmptyCart ? "tu carrito está vacío." : "Order placed successfully."}
          onAccept={onAccept}
          products={products}
          isEmptyCart={isEmptyCart}
        />
      )}
    </div>
  );
}

export default Receipt;
