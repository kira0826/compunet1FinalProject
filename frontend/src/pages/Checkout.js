import React from "react";
import { PersonalInfo, Receipt } from "../components/index.js";

function Checkout({substractCart}) {
  return (
      <div className="container grid grid-cols-12 items-start mt-6 pb-4 pt-4 gap-6">
        <PersonalInfo />
        <Receipt substractCart={substractCart} />
      </div>
  );
}

export default Checkout;    
