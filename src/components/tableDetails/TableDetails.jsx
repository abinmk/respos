import React, { useEffect, useState } from "react";
import "./TableDetails.css";
import { toast } from "react-toastify";

export default function TableDetails({ selectedTable }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!selectedTable || !selectedTable.tableNumber) return;

      try {
        const res = await fetch(
          `http://localhost:8080/api/tabledetails/${selectedTable.tableNumber}`
        );
        if (res.ok) {
          const data = await res.json();
          setOrderDetails(data);
        } else {
          toast.error("Failed to fetch table details.");
        }
      } catch (err) {
        setError("Error fetching order details.");
        toast.error("Error fetching order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [selectedTable]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!orderDetails) return <div>No order details available.</div>;

  const total = orderDetails.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = 0; // Can add discount logic here if needed
  const tax = total * 0.05;
  const finalAmount = total - discount + tax;

  return (
    <div className="table-details">
      <div className="table-header">
        <h2>Bill for Table #{selectedTable.tableNumber}</h2>
      </div>

      <div className="tableItems-list">
        <div className="tableItem-row header">
          <div>Item</div>
          <div>Price</div>
          <div>Qty</div>
          <div>Total</div>
        </div>

        {orderDetails.items.map((item) => (
          <div className="tableItem-row" key={item.id}>
            <div>{item.itemName}</div>
            <div>₹{item.price}</div>
            <div>{item.quantity}</div>
            <div>₹{(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="bill-summary">
        <div className="summary-row">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax (5%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Final Amount</span>
          <span>₹{finalAmount.toFixed(2)}</span>
        </div>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
}