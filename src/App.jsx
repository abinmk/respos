import { Routes, Route } from 'react-router-dom';
import Auth from './Pages/Auth/Auth';
import WaiterDashboard from './Pages/Waiter/WaiterDashboard';
import AdminDashboard from './Pages/Admin/AdminDashboard';

function App() {
  console.log("react app")
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/waiter" element={<WaiterDashboard/>} />
      <Route path="/admin" element={<AdminDashboard/>} />
    </Routes>
  );
}

export default App;