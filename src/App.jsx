import { useState } from 'react'
import './bootstrap.min.css'
import { Routes,Route } from 'react-router-dom'
import AdminDashboard from '../Pages/Admin/AdminDashboard'
import WaiterDashboard from '../Pages/Waiter/WaiterDashboard'
import KitchenDashboard from '../Pages/Kitchen/KitchenDashboard'
import BillingDashboard from '../Pages/Billing/BillingDashboard'
import Landing from '../Pages/Landing'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
     <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/waiter' element={<WaiterDashboard/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/kitchen' element={<KitchenDashboard/>}/>
      <Route path='/cashier' element={<BillingDashboard/>}/>
     </Routes>
    </>
  )
}

export default App
