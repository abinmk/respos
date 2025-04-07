// import React, { useState } from 'react';
// import Navbar from '../../components/Navbar';
// import OrderCard from '../../components/OrderCard'; // Import the OrderCard component
// import './KitchenDashboard.css';

// function KitchenDashboard() {
//   const [orders, setOrders] = useState([
//     { id: 1, table: 'Table 1', items: 'Burger, Fries', status: 'Pending' },
//     { id: 2, table: 'Table 2', items: 'Pizza, Soda', status: 'Pending' },
//     { id: 3, table: 'Table 3', items: 'Salad, Water', status: 'Prepared' },
//   ]);

//   const markAsPrepared = (id) => {
//     setOrders(orders.map(order =>
//       order.id === id ? { ...order, status: 'Prepared' } : order
//     ));
//   };

//   return (
//     <div className="kitchen-dashboard">
//       <Navbar />
//       <div className="dashboard-content">
//         {/* <h1>Kitchen Dashboard</h1> */}
//         <div className="orders-section">
//           <h2>Incoming Orders</h2>
//           {orders.length === 0 ? (
//             <p>No orders at the moment.</p>
//           ) : (
//             <div className="orders-list">
//               {orders.map(order => (
//                 <OrderCard
//                   key={order.id}
//                   order={order}
//                   actionText={order.status === 'Pending' ? 'Mark as Prepared' : null}
//                   onAction={markAsPrepared}
//                   actionDisabled={order.status !== 'Pending'}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default KitchenDashboard;