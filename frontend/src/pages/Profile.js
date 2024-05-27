import React from "react";
import { Layout } from "./index.js";
import { ProfileData, ProfileSideBar } from "../components/index.js";

function Profile() {
  return (
    
      <div className="container grid grid-cols-12 items-start gap-6 mt-4 pt-4 pb-16">
        <ProfileSideBar />
        <ProfileData />
      </div>
  );
}

export default Profile;