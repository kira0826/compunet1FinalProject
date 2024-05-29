import React from "react";
import { Link } from 'react-router-dom';


function NavBar({ }) {
  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
          
        <Link to="/products" className="text-gray-200 font-bold hover:text-white transition" > 

          
            Home
        </Link>

        </div>

        <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
          <div className="flex items-center space-x-3 capitalize"></div>
          <Link to="/login"
            className="text-gray-200 hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
