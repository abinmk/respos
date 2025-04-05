import React, { useState } from 'react';
import Navbar from '../../src/components/Navbar';
import OrderForm from './OrderForm';
import TableView from './TableView';
import OrderCard from '../../src/components/OrderCard'; // Import the OrderCard component
import './WaiterDashboard.css';

function WaiterDashboard() {
  const [menuItems] = useState([
    { id: 1, name: 'Burger', category: 'Main Course', price: 10.00 },
    { id: 2, name: 'Pizza', category: 'Main Course', price: 12.00 },
    { id: 3, name: 'Soda', category: 'Beverage', price: 2.00 },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, table: 'Table 1', items: 'Burger, Fries', status: 'Pending' },
    { id: 2, table: 'Table 2', items: 'Pizza, Soda', status: 'Pending' },
    { id: 3, table: 'Table 3', items: 'Salad, Water', status: 'Served' },
  ]);

  const markAsServed = (id) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: 'Served' } : order
    ));
  };

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  return (
    <div className="waiter-dashboard">
      <Navbar />
      <div className="dashboard-content">
        {/* <h1>Waiter Dashboard</h1> */}

        <TableView orders={orders} menuItems={menuItems} onAddOrder={addOrder} />
        <OrderForm menuItems={menuItems} onAddOrder={addOrder} />

        <div className="orders-section">
          <h2>Current Orders</h2>
          {orders.length === 0 ? (
            <p>No orders at the moment.</p>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  actionText={order.status === 'Pending' ? 'Mark as Served' : null}
                  onAction={markAsServed}
                  actionDisabled={order.status !== 'Pending'}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WaiterDashboard;