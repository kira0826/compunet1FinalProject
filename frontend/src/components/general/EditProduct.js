import React from "react";
import { InfoCell } from "../index.js";

function EditProduct({product}) {
  return (
    <div className="space-y-2 border-b border-gray-200">
      <h2 className="text-3xl font-medium uppercase mb-2">
        Editar contenido de {product.name}
      </h2>
      <InfoCell
        title="Product Name"
        type="text"
        placeholder={product.name}
      />
      <InfoCell
        title="Stock"
        type="number"
        placeholder={product.stock}
      />
      <InfoCell title="Brand" type="text" placeholder={product.brand} />
      <InfoCell title="Category" type="text" placeholder={product.category} />
      <InfoCell title="SKU" type="text" placeholder={product.id} />
      <InfoCell title="Price" type="number" placeholder={product.price} />
      <InfoCell
        title="Description"
        type="text"
        placeholder={product.description}
      />
      <div className="mt-6 flex gap-3  pb-5 pt-5">
        <a
          href="#"
          className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
        >
          <i className="fa-solid fa-bag-shopping"></i> Guardar
        </a>
      </div>
    </div>
  );
}

export default EditProduct;
