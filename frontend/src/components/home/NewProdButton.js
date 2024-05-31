import React from "react";
import { Link } from "react-router-dom";

const FixedButton = () => {
  return (
    <Link
      to="/productForm"
      className="fixed bottom-2 right-2 bg-primary w-14 h-14 text-white flex items-center justify-center rounded-full border-8 border-white hover:bg-primary-dark transition"
      style={{ zIndex: 9999 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </Link>
  );
};
export default FixedButton;
