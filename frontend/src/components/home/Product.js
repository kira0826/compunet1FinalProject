import React from "react";

function Product({ product }) {
  console.log(product);

  const { price, name, image, discount } = product;

  console.log(price, name, image, discount);
  const total = price - Number(price) * discount;
  console.log(total);

  return (
    <div className="bg-white shadow rounded overflow-hidden group">
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
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">${price}</p>
          <p className="text-sm text-gray-400 line-through">${total}</p>
        </div>
      </div>
      <a
        href="#"
        className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
      >
        Add to cart
      </a>
    </div>
  );
}

export default Product;
