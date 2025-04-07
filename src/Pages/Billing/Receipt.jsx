import React from 'react';
import './Receipt.css'; // Import the CSS for styling

function Receipt({ table, items, total, status }) {
  // Get the current date for the receipt
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="receipt">
      <div className="receipt-header">
        <h1>Restaurant Name</h1>
        <p>Receipt</p>
        <p>Date: {currentDate}</p>
      </div>
      <div className="receipt-details">
        <h3>Bill Details</h3>
        <p><strong>Table Number:</strong> {table}</p>
        <p><strong>Items Ordered:</strong> {items}</p>
        <p><strong>Total Amount:</strong> ${total.toFixed(2)}</p>
        <p><strong>Payment Status:</strong> {status}</p>
      </div>
      <div className="receipt-footer">
        <p>Thank You for Dining with Us!</p>
        <button className="print-button" onClick={() => window.print()}>
          Print Receipt
        </button>
      </div>
    </div>
  );
}

export default Receipt;