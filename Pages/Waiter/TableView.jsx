import React, { useState } from 'react';
import OrderForm from './OrderForm';
import TableCard from '../../src/components/TableCard'; // Import the TableCard component
import './TableView.css';

function TableView({ orders, menuItems, onAddOrder }) {
  const [selectedTable, setSelectedTable] = useState(null);

  // Sample table data (in a real app, this might come from an API)
  const tables = Array.from({ length: 10 }, (_, i) => ({
    tableNumber: i + 1,
    status: 'Available',
  }));

  // Update table status based on orders
  const updatedTables = tables.map(table => {
    const tableOrders = orders.filter(
      order => order.table === `Table ${table.tableNumber}`
    );
    if (tableOrders.length === 0) {
      return { ...table, status: 'Available' };
    }
    const hasPendingOrder = tableOrders.some(order => order.status === 'Pending');
    return {
      ...table,
      status: hasPendingOrder ? 'Occupied' : 'Needs Attention',
    };
  });

  // Handle table click to open the OrderForm
  const handleTableClick = (tableNumber) => {
    setSelectedTable(tableNumber);
  };

  // Close the OrderForm
  const closeOrderForm = () => {
    setSelectedTable(null);
  };

  return (
    <div className="table-view">
      <h2>Table View</h2>
      <div className="tables-grid">
        {updatedTables.map(table => (
          <TableCard
            key={table.tableNumber}
            tableNumber={table.tableNumber}
            status={table.status}
            onClick={() => handleTableClick(table.tableNumber)}
          />
        ))}
      </div>

      {selectedTable && (
        <div className="order-form-modal">
          <div className="order-form-modal-content">
            <button className="close-button" onClick={closeOrderForm}>
              Close
            </button>
            <OrderForm
              menuItems={menuItems}
              onAddOrder={(newOrder) => {
                onAddOrder(newOrder);
                closeOrderForm();
              }}
              preselectedTable={selectedTable}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TableView;