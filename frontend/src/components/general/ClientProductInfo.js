import React, { useEffect } from "react";
import { useCheckoutUpdate } from "../../CheckoutContext.js"; // importar car context

function ClientProductInfo({ incrementCartCount, product }) {
  const updateCheckout = useCheckoutUpdate(); // funcion updateCheckout
  
  const handleAddToCart = () => {
    updateCheckout(product, 1); // anadimos product al carrito
    incrementCartCount();
  };

  return (
    <div>
      <h2 className="text-3xl font-medium uppercase mb-2">
        {product.name}
      </h2>
      <div className="flex items-center mb-4">
        <div className="text-xs text-gray-500 ">(150 Reviews)</div>
      </div>
      <div className="space-y-2">
        <p className="text-gray-800 font-semibold space-x-2">
          <span>Availability: </span>
          <span className="text-green-600">{product.stock}</span>
        </p>
        <p className="space-x-2">
          <span className="text-gray-800 font-semibold">Brand: </span>
          <span className="text-gray-600">{product.brand}</span>
        </p>
        <p className="space-x-2">
          <span className="text-gray-800 font-semibold">Category: </span>
          <span className="text-gray-600">{product.category}</span>
        </p>
        <p className="space-x-2">
          <span className="text-gray-800 font-semibold">SKU: </span>
          <span className="text-gray-600">{product.id}</span>
        </p>
      </div>
      <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
        <p className="text-xl text-primary font-semibold">${Number(product.price) - (Number(product.price) * Number(product.discount))}</p>
        <p className="text-base text-gray-400 line-through">{product.price}</p>
      </div>

      <p className="mt-4 text-gray-600">
        {product.description}
      </p>

      <div className="mt-4">
        <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
        <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
          <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
            -
          </div>
          <div className="h-8 w-8 text-base flex items-center justify-center">
            4
          </div>
          <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
            +
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3 pb-5 pt-5">
        <a
          className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
          onClick={handleAddToCart}
        >
          <i className="fa-solid fa-bag-shopping"></i> Add to cart
        </a>
      </div>
    </div>
  );
}

export default ClientProductInfo;
