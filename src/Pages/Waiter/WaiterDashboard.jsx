import Items from "../../components/items/Items";
import Menu from "../../components/menu/Menu";
import OrderHistory from "../../components/orderHistory/OrderHistor";
import TableDetails from "../../components/tableDetails/tableDetails";
import User from "../../components/user/User";
import "./WaiterDashboard.css";

export default function Waiter()
{
  return(
    <>
    {/* <h2>Waiter</h2> */}
      <div className="waiter-container">
        <div className="waiter-left">
          <Menu/>
        </div>
        <div className="waiter-center">
          <Items/>
          <TableDetails/>
        </div>
        <div className="waiter-right">
          <User/>
          <OrderHistory/>
        </div>
      </div>
    </>
  );
}