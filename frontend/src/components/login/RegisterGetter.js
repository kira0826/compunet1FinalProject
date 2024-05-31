import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InfoCellRegister } from "../index.js";
import config from "../../config.json";
import {  useUserUpdate } from "../../UserContext.js";
import { useNavigate } from "react-router-dom";


function RegisterGetter() {
  const navigate = useNavigate(); // Inicializa el hook de navegación

  const setUser = useUserUpdate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("cambio", name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Datos: ", formData);

      console.log("Datos con format", JSON.stringify(formData));

      const response = await fetch(`${config["app.api"]}/register`, {
         headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al realizar el registro.");
      }

      console.log("Usuario registrado con éxito.");

      try {
        const response = await fetch(config["app.api"] + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
  
          body: JSON.stringify({ email:formData.email, password : formData.password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
  
          localStorage.setItem("user", JSON.stringify(data));
          
          navigate("/");
        } else {
          const errorData = await response.json();
          console.log(errorData);
        }
      } catch (error) {
        console.log(error);
      }



    } catch (error) {
      console.error("Error al actualizar el producto:", error.message);
    }
  };

  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">
          Create an account
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Register htmlFor new cosutumer
        </p>
        <form method="post" autoComplete="on" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <InfoCellRegister
              label="Full name"
              type="text"
              name="name"
              placeholder="Ingrese su nombre completo"
              onChange={handleInputChange}
            />

            <InfoCellRegister
              label="Email"
              type="email"
              name="email"
              placeholder="tuEmail@exmaple.com"
              onChange={handleInputChange}
            />

            <InfoCellRegister
              label="Password"
              type="password"
              name="password"
              placeholder="********"
              onChange={handleInputChange}
            />

            <InfoCellRegister
              label="COnfirm password"
              type="password"
              name="confirmPass"
              placeholder="********"
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
            >
              create account
            </button>
          </div>
        </form>

        <div className="mt-6 flex justify-center relative">
          <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
            OR
          </div>
          <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Already have account?{" "}
          <Link to="/login" className="text-primary">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterGetter;
