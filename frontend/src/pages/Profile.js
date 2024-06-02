import React, { useState } from "react";
import { Layout } from "./index.js";
import { ProfileData, ProfileSideBar, OrderHistory } from "../components/index.js";


function Profile() {
  const [selectedComponent, setSelectedComponent] = useState("ProfileData");

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };
  

  return (
    <div className="container grid grid-cols-12 items-start gap-6 mt-4 pt-4 pb-16">
      <ProfileSideBar onComponentChange={handleComponentChange} />
      {selectedComponent === "ProfileData" && <ProfileData />}
      {selectedComponent === "OrderHistory" && <OrderHistory />}
    </div>
  );
}

export default Profile;
