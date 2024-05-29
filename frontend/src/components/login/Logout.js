import React from "react";
import { useUser, useUserUpdate } from "../../UserContext.js";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  const user = useUser();
  const setUser = useUserUpdate();
  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">
          LogOut {user.name}
        </h2>
        <p className="text-gray-600 mb-6 text-sm">welcome back customer</p>
        <div>
          <button
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
            onClick={() => {
              localStorage.removeItem("user");
              setUser(null);
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
