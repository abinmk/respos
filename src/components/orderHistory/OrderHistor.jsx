import React from "react";
import "./OrderHistory.css";

const mockHistory = [
  {
    id: "ORD123",
    table: 2,
    items: ["Chicken Biryani", "Sprite"],
    total: 320,
    time: "Today, 12:45 PM",
    status: "Completed",
  },
  {
    id: "ORD124",
    table: 5,
    items: ["Paneer Pizza", "Lemon Soda", "Gulab Jamun"],
    total: 460,
    time: "Today, 1:10 PM",
    status: "Completed",
  },
  {
    id: "ORD125",
    table: 1,
    items: ["Fried Rice", "Cold Coffee"],
    total: 280,
    time: "Yesterday, 8:30 PM",
    status: "Completed",
  },
];

export default function OrderHistory() {
  return (
    <div className="order-history">
      <h3 className="history-header">Order History</h3>
      <div className="history-list">
        {mockHistory.map((order) => (
          <div key={order.id} className="history-card">
            <div className="history-row">
              <span className="order-id">{order.id}</span>
              <span className="order-time">{order.time}</span>
            </div>
            <div className="history-row">
              <span className="order-items">
                {order.items.join(", ")}
              </span>
              <span className="order-total">₹{order.total}</span>
            </div>
            <div className="history-footer">
              <span>Table #{order.table}</span>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}