import React, { useState } from "react";
import ImageUploader from "./ImageUploader.js";
import config from "../../config.json";
import Compressor from "compressorjs";
//import sharp from "sharp";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

    try {
      setLoading(true);

      let imageURL = await convertToBase64(image);
      console.log("Image URL OG:", imageURL);
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

      const formData = {
        name: productName,
        brand,
        category,
        sku: parseInt(sku),
        price: parseFloat(price),
        discount: parseFloat(discount),
        stock: parseInt(quantity),
        image: imageURL,
        description,
      };

      const response = await fetch(config["app.api"] + "/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData2),
      });
    } catch (error) {
      setError("Error creating product");
      setLoading(false);
    }

    let newImage;

    new Compressor(image, {
      quality: 0.2, // Ajusta la calidad de la imagen comprimida (0.6 es un valor por defecto)
      maxWidth: 800, // Ajusta el ancho máximo de la imagen
      success(result) {
        newImage = result;
      },
      error(err) {
        console.error("Error al comprimir la imagen:", err);
      },
    });

    let imageURL = await convertToBase64(image);
    console.log("Image URL new:", imageURL);
    //const imageData = new FormData();
    //imageData.append("image", image);
    //console.log("Image data:", imageData);
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
      await fetch(config["app.api"] + "/products", {
        method: "POST",
        headers: {},
        body: formData2,
      });
    } catch (error) {
      console.error("Error al enviar los datos del producto:", error);
    }
  };

  const prod = {
    productName,
    brand,
    category,
    sku,
    price,
    quantity,
    description,
  };
  console.log("Producto creado:", prod);

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
