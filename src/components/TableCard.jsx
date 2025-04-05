import React from 'react';
import './TableCard.css'; // Import the CSS for styling

function TableCard({ tableNumber, status, onClick }) {
  return (
    <div
      className={`table-card ${status.toLowerCase().replace(' ', '-')}`}
      onClick={onClick}
    >
      <h3>Table {tableNumber}</h3>
      <p>Status: {status}</p>
    </div>
  );
}

export default TableCard;