import React from "react";
import { OrderHistory, ProfileSideBar } from "../components/index.js";

function History() {
  return (
    <div className="container grid grid-cols-12 items-start mt-6 pb-4 pt-4 gap-6">
      <ProfileSideBar />
      <div className="ml-16">
        <OrderHistory />
      </div>
    </div>
  );
}

export default History;
