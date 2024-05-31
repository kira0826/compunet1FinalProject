import React, { useEffect, useState } from "react";
import { useUser } from "../../UserContext.js";
import { ClientProductInfo, EditProduct,ImageUploader } from "../index.js";
import { useParams } from "react-router-dom";
import config from "../../config.json";

function ProductInfo({ incrementCartCount }) {
  const userContext = useUser();

  const { id } = useParams();


  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(config["app.api"] + "/products/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProduct(data.product);
      setImage(data.product.image);
    };

    fetchProduct();
  }, [id]);



  return (
    <div className="container grid grid-cols-2 gap-6 pt-4 mt-4">
      <div className="w-h-full">

      {product ? (
        userContext && userContext.role === "admin" ? (

          <ImageUploader setImageExt={setImage} imagePreview={product.image} />
            
        ) : (
          <img
          src={product && product.image }
          alt="product"
          className="w-full h-full"
        />
        )
      ) : (
        <p>Loading...</p>
      )}

       
      </div>

      {product ? (
        userContext && userContext.role === "admin" ? (
          <EditProduct product={product} image={image} />
        ) : (
          <ClientProductInfo
            incrementCartCount={incrementCartCount}
            product={product}
          />
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductInfo;
