import React, { useEffect, useState } from "react";
import config from "../../config.json";
import { useUser } from "../../UserContext.js";

function PurchaseHistory() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      if (!user) { 
        setLoading(false);
        return;
      }

      try {
        const productsResponse = await fetch(config["app.api"] + "/products", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

        const productsData = await productsResponse.json();

        const response = await fetch(
          `${config["app.api"]}/orderHistory/${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("Data", data.order);
        console.log("Products", productsData);
        
        if (data.order ) {
          const formattedOrders = data.order.orders.flatMap((order) =>
            order.products.map((product) => ({
              idOrder: order.idOrder,
              datePurchased: order.date,
              productName: `${productsData.find((p) => p.id === product.idProduct).name}`, // Ajusta esto según los nombres de productos reales
              quantity: product.quantity,
              totalPrice: `${productsData.find((p) => p.id === product.idProduct).price * (1-productsData.find((p) => p.id === product.idProduct).discount)}`, // Ejemplo de precio, ajustar según sea necesario
            }))
          );

          setPurchaseHistory(formattedOrders);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
        setLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, [user]);

  return (
    <div className="container pb-16">
      <h2 className="text-3xl font-medium uppercase mb-6">Purchase History</h2>
      {loading ? (
        <p>Loading purchase history...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Date Purchased</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{item.productName}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(item.datePurchased).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{item.quantity}</td>
                <td className="py-2 px-4 border-b">${item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PurchaseHistory;
