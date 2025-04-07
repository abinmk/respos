import React from "react";
import "./TableDetails.css";

const mockOrder = {
  tableNumber: 5,
  status: "Occupied",
  items: [
    { id: 1, name: "Chicken Biryani", qty: 2, price: 150 },
    { id: 2, name: "Veg Fried Rice", qty: 1, price: 120 },
    { id: 3, name: "Margherita Pizza", qty: 1, price: 200 },
  ],
};

export default function TableDetails() {
  const total = mockOrder.items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="table-details">
      <div className="table-header">
        <h3>Table #{mockOrder.tableNumber}</h3>
        <span className={`status ${mockOrder.status.toLowerCase()}`}>
          {mockOrder.status}
        </span>
      </div>

      <div className="items-list">
        {mockOrder.items.map((item) => (
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