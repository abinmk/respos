import React, { useEffect, useState } from "react";
import "./TableDetails.css";
import { useTable } from "../../context/TableContext";
import { toast } from "react-toastify";

export default function TableDetails() {
  const { selectedTable } = useTable();
  const [orderDetails, setOrderDetails] = useState(null); // To hold fetched order details
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!selectedTable) return;

      try {
        const res = await fetch(`/api/table/${selectedTable.tableNumber}`);
        if (res.ok) {
          const data = await res.json();
          setOrderDetails(data); // Set the fetched order data
        } else {
          toast.error("Failed to fetch table details.");
        }
      } catch (err) {
        toast.error("Error fetching order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [selectedTable]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails) {
    return <div>No order details available for this table.</div>;
  }

  const total = orderDetails.items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="table-details">
      <div className="table-header">
        <h3>Table #{orderDetails.tableNumber}</h3>
        <span className={`status ${orderDetails.status.toLowerCase()}`}>
          {orderDetails.status} Table
        </span>
      </div>

      <div className="items-list">
        {orderDetails.items.map((item) => (
          <div key={item.id} className="item-row">
            <div>
              <strong>{item.name}</strong> × {item.qty}
            </div>
            <div>₹{item.price * item.qty}</div>
          </div>
        ))}
      </div>

      <div className="table-footer">
        <h4>Total: ₹{total}</h4>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
}