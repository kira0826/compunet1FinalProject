import React from "react";
import { useCheckout, useCheckoutUpdate } from "../../CheckoutContext.js";
import { useUser } from "../../UserContext.js";

// substractCar -> func que viene de checkout
// para restarle cantidad al carrito cada vez
// que quite un producto
function Receipt({ substractCart }) {
  const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL_PROD : process.env.REACT_APP_URL_LOCAL;
  const user = useUser();
  const updateCheckout = useCheckoutUpdate(); // funcion updateCheckout

  // costo de envio
  var shipping = 0;

  // obtenemos productos del checkout context
  const checkout = useCheckout();

  // calculamos subtotal
  const subtotal = () => {
    var sum = 0;

    checkout.map((product) => {
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

  const handleDeleteClick = (id) => {
    updateCheckout(id, 0);
    substractCart();
  };

  const handlePlaceOrderClick = async () => {
    let tempProducts = checkout;
    console.log("Productos en el carrito:", tempProducts);
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

    console.log("Datos de la orden:", orderData);
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
        //checkout.forEach((product) => substractCart());
        console.log("Orden creada exitosamente");
      } catch (error) {
        console.error("Error al crear la orden:", error);
      }
    }
    for (const product of checkout) {
      const updatedProduct = { ...product, stock: product.stock - 1 };
      const changedValues = {};
      changedValues["stock"] = updatedProduct.stock;
      const formData = new FormData();
      formData.append("stock", updatedProduct.stock);
      try {
        const response = await fetch(
          apiUrl+ "/products/" + product.id,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(changedValues),
          }
        );

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
              <p className="text-sm text-gray-600">Size: {product.size}</p>
            </div>
            <div className="flex items-center">
              <button
                style={buttonStyles}
                className="mr-2 hover:bg-transparent hover:text-primary"
                onClick={() => handleDeleteClick(product.id)}
              >
                -
              </button>
              <p className="text-gray-800 font-medium">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
        <p>subtotal</p>
        <p>${subtotal()}</p>
      </div>

      <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
        <p>shipping</p>
        <p>Free</p>
      </div>

      <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
        <p className="font-semibold">Total</p>
        <p>${total()}</p>
      </div>

      <div className="flex items-center mb-4 mt-2">
        <input
          type="checkbox"
          name="aggrement"
          id="aggrement"
          className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
        />
        <label
          htmlFor="aggrement"
          className="text-gray-600 ml-3 cursor-pointer text-sm"
        >
          I agree to the{" "}
          <a href="#" className="text-primary">
            terms & conditions
          </a>
        </label>
      </div>

      <a
        onClick={() => handlePlaceOrderClick()}
        className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
      >
        Place order
      </a>
    </div>
  );
}

export default Receipt;
