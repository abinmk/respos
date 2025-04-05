import React, { useState, useEffect } from 'react';
import './OrderForm.css';

function OrderForm({ menuItems, onAddOrder, preselectedTable }) {
  // State for the form
  const [tableNumber, setTableNumber] = useState(preselectedTable || '');
  const [selectedItems, setSelectedItems] = useState([]);

  // Update table number if preselectedTable changes
  useEffect(() => {
    if (preselectedTable) {
      setTableNumber(preselectedTable);
    }
  }, [preselectedTable]);

  // Handle table number selection
  const handleTableChange = (e) => {
    setTableNumber(e.target.value);
  };

  // Handle menu item selection
  const handleItemChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tableNumber || selectedItems.length === 0) {
      alert('Please select a table and at least one menu item.');
      return;
    }

    const selectedMenuItems = menuItems
      .filter(item => selectedItems.includes(item.id))
      .map(item => item.name)
      .join(', ');

    const newOrder = {
      id: Date.now(),
      table: `Table ${tableNumber}`,
      items: selectedMenuItems,
      status: 'Pending',
    };

    onAddOrder(newOrder);

    // Reset the form (except for the preselected table)
    setSelectedItems([]);
  };

  return (
    <div className="order-form">
      <h2>Place New Order</h2>
      <form onSubmit={handleSubmit}>
        {/* Table Number Selection */}
        <div className="form-group">
          <label htmlFor="tableNumber">Table Number:</label>
          <select
            id="tableNumber"
            value={tableNumber}
            onChange={handleTableChange}
            required
            disabled={!!preselectedTable} // Disable if preselected
          >
            <option value="">Select a table</option>
            {[...Array(10).keys()].map(i => (
              <option key={i + 1} value={i + 1}>
                Table {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Menu Items Selection */}
        <div className="form-group">
          <label>Menu Items:</label>
          <div className="menu-items-list">
            {menuItems.length === 0 ? (
              <p>No menu items available.</p>
            ) : (
              menuItems.map(item => (
                <div key={item.id} className="menu-item">
                  <input
                    type="checkbox"
                    id={`item-${item.id}`}
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemChange(item.id)}
                  />
                  <label htmlFor={`item-${item.id}`}>
                    {item.name} - ${item.price.toFixed(2)} ({item.category})
                  </label>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">Place Order</button>
      </form>
    </div>
  );
}

export default OrderForm;