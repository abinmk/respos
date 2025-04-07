import { Routes, Route } from 'react-router-dom';
import Auth from './Pages/Auth/Auth';
import WaiterDashboard from './Pages/Waiter/WaiterDashboard';
// import KitchebDashboard from './Pages/Kitchen/KitchenDashboard';
// import BillingDashboard from './Pages/Billing/BillingDashboard';
// import AdminDashboard from './Pages/Admin/AdminDashboard';

function App() {
  console.log("react app")
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      {/* <Route path="/admin" element={<AdminDashboard/>} /> */}
      <Route path="/waiter" element={<WaiterDashboard/>} />
      {/* <Route path="/kitchen" element={<KitchebDashboard/>} />
      <Route path="/cashier" element={<BillingDashboard/>} /> */}
    </Routes>
  );
}

export default App;