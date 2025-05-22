import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { FaTrashAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [newItem, setNewItem] = useState({
    name: '',
    image: '',
    price: '',
  });

  useEffect(() => {
    fetchMenuItems();
    fetchOrders();
    fetchUsers();
  }, []);


  useEffect(() => {
    fetchMenuItems();
    fetchUsers();
  
    // Initial fetch for orders
    fetchOrders();
  
    // Poll orders every 5 seconds
    const intervalId = setInterval(() => {
      fetchOrders();
      fetchUsers();
    }, 1000);
  
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/menuItems');
      const data = await response.json();
      if (response.ok) {
        setMenuItems(data);
      } else {
        console.error('Failed to fetch menu items:', data.message);
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/getOrders');
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      } else {
        console.error('Failed to fetch orders:', data.message);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users');
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        console.error('Failed to fetch users:', data.message);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleAddMenu = async () => {
    if (!newItem.name || !newItem.image || !newItem.price) return;

    try {
      const response = await fetch('http://localhost:8080/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      const data = await response.json();
      if (response.ok) {
        setMenuItems((prev) => [...prev, data.item]);
        setNewItem({ name: '', image: '', price: '' });
      } else {
        alert(data.message || 'Failed to add item');
      }
    } catch (err) {
      console.error('API error:', err);
    }
  };

  // New function to delete menu item
  const handleDeleteMenuItem = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this menu item?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8080/api/menu/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from state
        setMenuItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete menu item');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">🍽️ Restaurant Admin Dashboard</h2>

      {/* User List */}
      <div className="section">
        <h3>User List</h3>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="order-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Menu Section */}
      <div className="section">
        <h3>Add Menu Item</h3>
        <div className="form-wrapper">
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newItem.image}
              onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            />
            <button onClick={handleAddMenu}>Add Item</button>
          </div>
        </div>
      </div>

      {/* Menu Display */}
      <div className="section">
        <h3>Menu Items</h3>
        {menuItems.length === 0 ? (
          <p>No menu items found.</p>
        ) : (
          <div className="menu-grid">
            {menuItems.map((item) => (
              <div key={item._id} className="menu-card">
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <button
                aria-label={`Delete menu item ${item.name}`}
                className="delete-button"
                onClick={() => handleDeleteMenuItem(item._id)}
              >
                <FaTrashAlt fontSize={25}/>
              </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order History */}
      <div className="section">
        <h3>Order History</h3>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Table</th>
                <th>Items</th>
                <th>Total</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.tableNumber}</td>
                  <td>
                    {order.items
                      .map((item) => `${item.itemName} x${item.quantity}`)
                      .join(', ')}
                  </td>
                  <td>₹{order.totalAmount}</td>
                  <td>{new Date(order.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;