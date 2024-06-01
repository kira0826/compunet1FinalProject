import React, { useState } from "react";
import { useUser } from "../../UserContext.js";
import InfoCell from "../general/InfoCell.js";

function PersonalInfo() {
  const user = useUser();
  console.log("user", user);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastname: user.lastName,
    city: "",
    streetAddress: "",
    phone: user.phone,
    email: user.email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("cambio", name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="col-span-8 border border-gray-200 p-4 rounded">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first-name" className="text-gray-600">
              First Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              className="input-box"
              placeholder={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-gray-600">
              Last Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              className="input-box"
              placeholder={formData.lastname}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="city" className="text-gray-600">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="input-box"
            placeholder={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="address" className="text-gray-600">
            Street address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="input-box"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-gray-600">
            Phone number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="input-box"
            placeholder={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="text-gray-600">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="input-box"
            placeholder={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
