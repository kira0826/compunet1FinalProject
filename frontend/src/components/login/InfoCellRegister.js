import React from "react";

function InfoCellRegister({ label, type, name, placeholder, onChange }) {


    return (

        <div>
              <label htmlFor="name" className="text-gray-600 mb-2 block">
                {label}
              </label>
              <input
                required
                type={type}
                name={name}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder={placeholder}
                onChange={onChange}
              />
            </div>
    )


}


export default InfoCellRegister;