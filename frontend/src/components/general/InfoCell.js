import React from "react";
import { useUser } from "../../UserContext.js";

function InfoCell({ title,type, placeholder }) {
  const userContext = useUser();

  return (
    <p className="text-gray-800 font-semibold space-x-2 flex justify-between items-baseline ">
      <span className=" text-center  h-full">{title} : </span>
      
        <input
          type={type}
          placeholder={placeholder}
          className="h-8 w-auto"
        />
    </p>
  );
}

export default InfoCell;
