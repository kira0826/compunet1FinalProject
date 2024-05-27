import React from "react";

function Banner() {
  const backgroundImageStyle = {
    backgroundImage: "url(assets/images/banner-bg.jpg)",
    backgroundCover: "cover",
    backgroundNoRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center py-36"
      style={backgroundImageStyle}
    >
      <div className="container">
        <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
          best collection htmlFor <br /> home decoration
        </h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam{" "}
          <br />
          accusantium perspiciatis, sapiente magni eos dolorum ex quos dolores
          odio
        </p>
      </div>
    </div>
  );
}

export default Banner;
