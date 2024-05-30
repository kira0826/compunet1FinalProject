import React, { useState } from "react";
import Compressor from "compressorjs";

function NewImage({ setImageExt }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    new Compressor(e.target.files[0], {
      quality: 0.2, // Ajusta la calidad de la imagen comprimida (0.6 es un valor por defecto)
      maxWidth: 800, // Ajusta el ancho máximo de la imagen
      success(result) {
        setImageExt(result);
        setImage(result);
      },
      error(err) {
        console.error("Error al comprimir la imagen:", err);
      },
    });
  };

  return (
    <div>
      <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="product preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span>Upload Image</span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-2"
      />
    </div>
  );
}

export default NewImage;
