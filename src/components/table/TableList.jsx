import React from "react";
import "./TableList.css";

const tables = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Table ${i + 1}`,
  occupied: Math.random() < 0.5,
}));

export default function TableList({setSelectedTable}) {


  const handleTableClick = (table) => {
    setSelectedTable({ tableNumber: table.id });
  };

  return (
    <div className="menu-container">
      <h2>Tables</h2>
      <div className="table-list">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`table-item ${table.length<=0 ? "free" : "occupied"}`}
            onClick={() => handleTableClick(table)}
          >
            <span className="table-name">{table.name}</span>
            {/* <span className={`status-dot ${table.occupied ? "dot-occupied" : "dot-free"}`}></span>
            <span className="status-label">
              {table.occupied ? "Occupied" : "Free"}
            </span> */}
          </div>
        ))}
      </div>
    </div>
  );
}