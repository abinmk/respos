import Items from "../../components/items/Items";
import OrderHistory from "../../components/orderHistory/OrderHistor";
import TableList from "../../components/table/TableList";
import TableDetails from "../../components/tableDetails/tableDetails";
import User from "../../components/user/User";
import "./WaiterDashboard.css";

export default function Waiter() {
  return (
    <>
      {/* <h2>Waiter</h2> */}
      <div className="waiter-container">
        <div className="waiter-left">
          <TableList />
        </div>
        <div className="waiter-center">
          <Items />
          <TableDetails />
        </div>
        <div className="waiter-right">
          <User />
          <OrderHistory />
        </div>
      </div>
    </>
  );
}