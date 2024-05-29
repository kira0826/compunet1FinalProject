import React, { useState } from "react";

function NewImage( {setImageExt} ) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImageExt(e.target.files[0]);
    setImage(e.target.files[0]);
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
