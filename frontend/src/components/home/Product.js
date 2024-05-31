import React, { useEffect, useState } from "react";
import { useUser } from "../../UserContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"; // Importa el ícono de eliminación de FontAwesome
import { Link } from "react-router-dom";
import { Popup } from "../index.js";
 import { useNavigate } from "react-router-dom";
import { useCheckout, useCheckoutUpdate } from "../../CheckoutContext.js"; // importar car context
import config from "../../config.json";

function Product({ product, incrementCartCount }) {
  const [showPopup, setShowPopup] = useState(false);
  const user = useUser();
  const navigate = useNavigate();
  const updateCheckout = useCheckoutUpdate(); // funcion updateCheckout
  const { price, name, image, discount } = product;
  const total = price - Number(price) * discount;

  const handleDelete = () => {
    setShowPopup(true);
  };

  const handleConfirmDelete = () => {
    async function deleteProduct() {
      const response = await fetch(
        config["app.api"] + "/products/" + product.id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Producto eliminado");
      }
    }
    deleteProduct();  
    setShowPopup(false);
    window.location.reload(); 

  };

  const handleCancelDelete = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        console.log("Admin identificado");
      }
    }
  }, [user]);

  const handleAddToCart = () => {
    updateCheckout(product, 1); // anadimos product al carrito
    incrementCartCount();
  };

  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <Link to={`/products/${product.id}`}>
        <div className="relative">
          <img src={image} alt="product" className="w-full" />
          <div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
          ></div>
        </div>
      </Link>

      <div className="pt-4 pb-3 px-4">
        <div>
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
            {name}
          </h4>
        </div>
        <div className="flex items-baseline justify-between mb-1 ">
          <div className="flex space-x-2">
            <p className="text-xl text-primary font-semibold"> ${total}</p>
            <p className="text-sm mt-1 text-gray-400 line-through">${price}</p>
          </div>

          {user && user.role === "admin" && (
            <div className=" w-14 flex items-baseline justify-between">
              <button className="text-xl text-primary font-semibold h-full">
                <Link to={`/products/${product.id}`}>
                  <FontAwesomeIcon icon={["far", "edit"]} />
                </Link>
              </button>

              <button
                className="text-xl text-primary font-semibold  h-full delete-button"
                onClick={handleDelete}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" />
              </button>
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <Popup
          message="¿Estás seguro de que quieres eliminar este producto?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <a
        className="block w-full py-1 text-center  hover:cursor-pointer text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
        onClick={handleAddToCart}
      >
        Add to cart
      </a>
    </div>
  );
}

export default Product;
