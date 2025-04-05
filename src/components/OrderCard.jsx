import React from 'react';
import './OrderCard.css'; // Import the CSS for styling

function OrderCard({ order, actionText, onAction, actionDisabled }) {
  return (
    <div className={`order-card ${order.status.toLowerCase()}`}>
      <div className="order-details">
        <h3>{order.table}</h3>
        <p><strong>Items:</strong> {order.items}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>
      {actionText && !actionDisabled && (
        <button
          className="action-button"
          onClick={() => onAction(order.id)}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default OrderCard;