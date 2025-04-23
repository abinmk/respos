import React from "react";
import "./TableList.css";

const tables = Array.from({ length: 20 }, (_, i) => ({
  name: `Table ${i + 1}`,
  occupied: Math.random() < 0.5 // random occupied status for demo
}));

export default function TableList() {
  return (
    <div className="menu-container">
      <h2>Tables</h2>
      <div className="table-list">
        {tables.map((table, index) => (
          <div key={index} className={`table-item ${table.occupied ? "occupied" : "free"}`}>
            <span className="table-name">{table.name}</span>
            <span className={`status-dot ${table.occupied ? "dot-occupied" : "dot-free"}`}></span>
            <span className="status-label">
              {table.occupied ? "Occupied" : "Free"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}