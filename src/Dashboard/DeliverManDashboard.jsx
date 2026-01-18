import { NavLink, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Public/Provider/AuthProvider";


const DeliveryManDashboard = () => {
  const { SignOutUser } = useContext(AuthContext);

  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-green-500 text-white px-4 py-2 my-2 rounded-md block"
      : "text-gray-300 hover:bg-green-600 hover:text-white px-4 py-2 my-2 rounded-md block";

  return (
    <div className="w-full flex min-h-screen ">
      {/* left sidebar */}
      <div className="min-w-40 bg-gray-600 py-4  ">
        <NavLink to="/delivery_Dashboard" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/delivery_Dashboard/order_page" className={linkClass}>
          Assigned Orders
        </NavLink>

        <NavLink to="/delivery_Dashboard/active-delivery" className={linkClass}>
          Active Delivery
        </NavLink>

        <NavLink to="/delivery_Dashboard/delivery-history" className={linkClass}>
          Delivery History
        </NavLink>

        <NavLink to="/delivery_Dashboard/earnings" className={linkClass}>
          Earnings
        </NavLink>

        <NavLink to="/delivery_Dashboard/profile" className={linkClass}>
          Profile
        </NavLink>
        <NavLink to="/delivery_Dashboard/notification" className={linkClass}>
          Notification
        </NavLink>

        <NavLink to="/delivery_Dashboard/TrackingMap" className={linkClass}>
          Track Delivery
        </NavLink>

        <button
          onClick={SignOutUser}
          className="text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md block w-full text-left mt-6"
        >
          Signout
        </button>
      </div>

      {/* main pages */}
     
        <div className="w-full  rounded-lg shadow min-h-screen">
          <Outlet />
        </div>
    </div>
  );
};

export default DeliveryManDashboard;
