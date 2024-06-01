import React, { useState } from "react";
import ImageUploader from "./ImageUploader.js";
import config from "../../config.json";

function NewProduct() {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL_PROD : process.env.REACT_APP_URL_LOCAL;

  async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageURL = await convertToBase64(image);
    console.log("Image URL new:", imageURL);
    const formData2 = new FormData();
    formData2.append("name", productName);
    formData2.append("brand", brand);
    formData2.append("category", category);
    formData2.append("sku", sku);
    formData2.append("price", price);
    formData2.append("discount", discount);
    formData2.append("stock", quantity);
    formData2.append("image", imageURL);
    formData2.append("description", description);
    try {
      await fetch(apiUrl + "/products", {
        method: "POST",
        body: formData2,
      });
    } catch (error) {
      console.error("Error al enviar los datos del producto:", error);
    }
  };

  return (
    <div className="container grid grid-cols-2 gap-6 pt-4 mt-4">
      <ImageUploader setImageExt={setImage} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="text-gray-800 font-semibold">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded focus:ring-0 focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="brand" className="text-gray-800 font-semibold">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded focus:ring-0 focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="text-gray-800 font-semibold">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded focus:ring-0 focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="text-gray-800 font-semibold">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded focus:ring-0 focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="discount" className="text-gray-800 font-semibold">
            Discount
          </label>
          <input
            type="number"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded focus:ring-0 focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="quantity" className="text-gray-800 font-semibold">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded focus:ring-0 focus:border-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="text-gray-800 font-semibold">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded focus:ring-0 focus:border-primary"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase hover:bg-transparent hover:text-primary transition"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
