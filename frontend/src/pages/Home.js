import React, { useEffect, useState } from "react";
import { Banner, Features, Product } from "../components/index.js";
import config from "../config.json";

function Home({ incrementCartCount }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(config["app.api"] + "/products",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },  
        });

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Banner />
      <Features />
      <div className="container pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            products.map((product) => (
              <Product
                key={product.id}
                product={product}
                incrementCartCount={incrementCartCount}


              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
