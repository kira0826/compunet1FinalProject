import React, { useEffect } from "react";
import { useUser } from "../../UserContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useCheckout, useCheckoutUpdate } from "../../CheckoutContext.js"; // importar car context

function Product({ product, incrementCartCount }) {
  const user = useUser();
  const navigate = useNavigate();
  const updateCheckout = useCheckoutUpdate(); // funcion updateCheckout

  const { price, name, image, discount } = product;
  const total = price - Number(price) * discount;

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
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
      <button onClick={() => handleProductClick(product.id)}>
        <div className="relative">
          <img src={image} alt="product" className="w-full" />
          <div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
          ></div>
        </div>
        <div className="pt-4 pb-3 px-4">
          <a href="#">
            <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
              {name}
            </h4>
          </a>
          <div className="flex items-baseline justify-between mb-1 ">
            <div className="flex space-x-2">
              <p className="text-xl text-primary font-semibold"> ${total}</p>
              <p className="text-sm mt-1 text-gray-400 line-through">
                ${price}
              </p>
            </div>

            {user && user.role === "admin" && (
              <button className="text-xl text-primary font-semibold h-full">
                <FontAwesomeIcon icon={["far", "edit"]} />
              </button>
            )}
          </div>
        </div>
      </button>
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
