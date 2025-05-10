import React, { useEffect, useState } from "react";
import "./TableDetails.css";
import { toast } from "react-toastify";
import { loadRazorpayScript } from "./utils/razorpay";

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
  const discount = 0;
  const tax = total * 0.05;
  const finalAmount = total - discount + tax;

  const handleCheckout = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Failed to load Razorpay SDK. Check internet connection.");
      return;
    }

    if (finalAmount < 10) {
      toast.error("No items to checkout");
      alert("No items to checkout");
      return;
    }

    const options = {
      key: "rzp_test_x5Csa53ryAG0Gu",
      currency: "INR",
      amount: finalAmount * 100,
      name: "POS Restaurant",
      description: `Payment for Table ${selectedTable.tableNumber}`,
      handler: function (response) {
        toast.success("Payment successful!");
        console.log("Razorpay Response:", response);
        setOrderDetails({ items: [] });

        fetch(`http://localhost:8080/api/clear/${selectedTable.tableNumber}`, {
          method: "DELETE",
        });

        window.location.reload(); // corrected from `window.reload()`
      },
      prefill: {
        name: "Demo User",
        email: "demo@example.com",
        contact: "9123491234",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="table-details">
      <div className="table-header">
        <div className="table-header-top">
          <h2>Bill for Table : {selectedTable.tableNumber}</h2>
          <span className="item-count">
            Total Items: {orderDetails.items.length}
          </span>
        </div>
        <div className="tableItem-row header">
          <div>Item</div>
          <div>Price</div>
          <div>Qty</div>
          <div>Total</div>
        </div>
      </div>

      <div className="tableItems-list">
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
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
          <span>₹{finalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}