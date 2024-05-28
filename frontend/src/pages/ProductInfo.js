import React from "react";
import { Layout } from "./index.js";
import { ProductInfo } from "../components/index.js";

function ProductInfoPage({incrementCartCount}) {

    return(

        <div>
            <ProductInfo incrementCartCount={incrementCartCount}/>
        </div>

    )

}

export default ProductInfoPage;