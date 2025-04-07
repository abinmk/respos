import { Routes, Route } from 'react-router-dom';
import Auth from './Pages/Auth/Auth';
import WaiterDashboard from './Pages/Waiter/WaiterDashboard';

function App() {
  console.log("react app")
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/waiter" element={<WaiterDashboard/>} />
    </Routes>
  );
}

export default App;