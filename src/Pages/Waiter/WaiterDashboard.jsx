import { useState } from "react";
import Items from "../../components/items/Items";
import OrderHistory from "../../components/orderHistory/OrderHistor";
import TableList from "../../components/table/TableList";
import TableDetails from "../../components/tableDetails/tableDetails";
import User from "../../components/user/User";
import "./WaiterDashboard.css";

export default function Waiter() {
  const [selectedTable,setSelectedTable] =  useState(0);
  return (
    <>
      <div className="waiter-container">
        <div className="waiter-left">
          <TableList setSelectedTable={setSelectedTable} />
        </div>
        <div className="waiter-center">
          <Items selectedTable={selectedTable} />
          <TableDetails selectedTable={selectedTable}  />
        </div>
      </div>
    </>
  );
}