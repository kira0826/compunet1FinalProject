import React from "react";

function PersonalInfo() {
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
              name="first-name"
              id="first-name"
              className="input-box"
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
            />
          </div>
        </div>
        <div>
          <label htmlFor="company" className="text-gray-600">
            Company
          </label>
          <input type="text" name="company" id="company" className="input-box" />
        </div>
        <div>
          <label htmlFor="region" className="text-gray-600">
            Country/Region
          </label>
          <input type="text" name="region" id="region" className="input-box" />
        </div>
        <div>
          <label htmlFor="address" className="text-gray-600">
            Street address
          </label>
          <input type="text" name="address" id="address" className="input-box" />
        </div>
        <div>
          <label htmlFor="city" className="text-gray-600">
            City
          </label>
          <input type="text" name="city" id="city" className="input-box" />
        </div>
        <div>
          <label htmlFor="phone" className="text-gray-600">
            Phone number
          </label>
          <input type="text" name="phone" id="phone" className="input-box" />
        </div>
        <div>
          <label htmlFor="email" className="text-gray-600">
            Email address
          </label>
          <input type="email" name="email" id="email" className="input-box" />
        </div>
        <div>
          <label htmlFor="company" className="text-gray-600">
            Company
          </label>
          <input type="text" name="company" id="company" className="input-box" />
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
