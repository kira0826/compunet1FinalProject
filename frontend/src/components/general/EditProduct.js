import { useState } from "react";
import InfoCell from "../general/InfoCell.js"

function EditProduct({ product, image }) {
  const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL_PROD : process.env.REACT_APP_URL_LOCAL;
  async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  console.log("Image en EP", image);

  const [formData, setFormData] = useState({
    name: product.name,
    stock: product.stock,
    brand: product.brand,
    category: product.category,
    id: product.id,
    price: product.price,
    description: product.description,
    discount: product.discount,
    image: image,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("cambio", name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Compara los valores del formulario con los valores originales del producto
    const changedValues = {};
    for (const key in formData) {
      if (formData[key] !== product[key] && formData[key] !== "") {
        changedValues[key] = formData[key];
        console.log("cambio", key, formData[key]);
      }
    }

    if (image instanceof Blob) {
      changedValues["image"] = image;
    }
    
    if (Object.keys(changedValues).length === 0) {
      console.log("No se han realizado cambios.");
      return;
    }
   
    
    console.log("Image recibida para 64", formData.image);
    console.log("Image en FM", formData.image);
    const formData2 = new FormData();
    Object.keys(changedValues).forEach(key => {
      formData2.append(key, changedValues[key]);
    });
    
    if (image instanceof Blob) {
      console.log("Image dentro del IF");
      let imageURL = await convertToBase64(image);
      formData2.append("image", imageURL);
      
      console.log("FormData2 a continuación");
      for (let [key, value] of formData2.entries()) {
        console.log(`${key}: ${value}`);
      }
    }
    ///////////////////////////////////////

    /*try {

    try {

      const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL_PROD : process.env.REACT_APP_URL_LOCAL;

      const response = await fetch(

        
        `${apiUrl}/products/${product.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(changedValues),
        }
      );

      if (!response.ok) {
        throw new Error("Error al realizar la actualización del producto.");
      }

      console.log("Producto actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el producto:", error.message);
    }*/
    try {
      const response = await fetch(
        `${apiUrl}/products/${product.id}`,
        {
          method: "PATCH",
          body: formData2,
        }
      );
      if (!response.ok) {
        throw new Error("Error al realizar la actualización del producto.");
      }

      console.log("Producto actualizado con éxito."); 
    } catch (error) {
      console.error("Error al enviar los datos del producto:", error.message);
    }
  };

  return (
    <div className="space-y-4 border-b border-gray-200">
      <h2 className="text-3xl font-medium uppercase mb-2">
        Editar contenido de {product.name}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InfoCell
          title="Product Name"
          type="text"
          name="name"
          value={formData.name}
          placeholder={formData.name}
          onChange={handleInputChange}
        />
        <InfoCell
          title="Stock"
          type="number"
          name="stock"
          value={formData.stock}
          placeholder={formData.stock}
          onChange={handleInputChange}
        />
        <InfoCell
          title="Brand"
          type="text"
          name="brand"
          value={formData.brand}
          placeholder={formData.brand}
          onChange={handleInputChange}
        />
        <InfoCell
          title="Category"
          type="text"
          name="category"
          value={formData.category}
          placeholder={formData.category}
          onChange={handleInputChange}
        />

        <InfoCell
          title="Price"
          type="number"
          name="price"
          value={formData.price}
          placeholder={formData.price}
          onChange={handleInputChange}
        />

        <InfoCell
          title="Discount"
          type="text"
          step="0.01"
          name="discount"
          value={formData.discount}
          placeholder={formData.discount}
          onChange={handleInputChange}
        />
        <InfoCell
          title="Description"
          type="text"
          name="description"
          value={formData.description}
          placeholder={formData.description}
          onChange={handleInputChange}
        />
        <div className="mt-6 flex gap-3 pb-5 pt-5">
          <button
            type="submit"
            className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
