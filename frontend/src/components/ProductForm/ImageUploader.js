import React, { useState } from "react";

function NewImage({ setImageExt, imagePreview }) {
  const [image, setImage] = useState(null);

  console.log("ImagePreview ", imagePreview);

  const handleImageChange = (e) => {
    console.log("Image IF");
    console.log("image", image);
    setImageExt(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <div className="h-full w-full">
      <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="product preview"
            className="w-full h-full object-cover"
          />
        ) : imagePreview ? (
          
          <img
            src={imagePreview}
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
