import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "../Public/Provider/AuthProvider";
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const RestaurantOwnerDashboard = () => {
  const { SignOutUser, user } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm transition
    ${
      isActive
        ? "bg-green-500 text-white"
        : "text-gray-300 hover:bg-green-600 hover:text-white"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100 relative">
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-64 flex-col bg-gray-800 text-white sticky top-0 h-screen p-4">
        {/* Logo / Profile */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src={user?.photoURL}
            className="w-10 h-10 rounded-full object-cover"
            alt="profile"
          />
          <div>
            <h1 className="text-lg font-semibold">EatNow</h1>
            <p className="text-xs text-gray-400">Restaurant Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 z-50">
          <NavLink to="/restaurant_Dashboard" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/restaurant_Dashboard/orders" className={linkClass}>
            Orders
          </NavLink>
          <NavLink to="/restaurant_Dashboard/TrackingMap" className={linkClass}>
            Track Delivery Man
          </NavLink>
          <NavLink
            to="/restaurant_Dashboard/delivery_history"
            className={linkClass}
          >
            Delivery History
          </NavLink>
          <NavLink to="/restaurant_Dashboard/menu" className={linkClass}>
            Manage Menu
          </NavLink>
          <NavLink to="/restaurant_Dashboard/earnings" className={linkClass}>
            Earnings
          </NavLink>
          <NavLink to="/restaurant_Dashboard/profile" className={linkClass}>
            Profile
          </NavLink>
          <NavLink
            to="/restaurant_Dashboard/notification"
            className={linkClass}
          >
            Notification
          </NavLink>
          <NavLink to="/" className={linkClass}>
            Back to Home
          </NavLink>
        </nav>

        {/* Sign Out */}
        <button
          onClick={SignOutUser}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
        >
          Sign Out
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition ${
          menu ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 ${
            menu ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenu(false)}
        />

        <aside
          className={`absolute left-0 top-0 w-64 h-full bg-gray-800 p-4 transform transition-transform duration-300
          ${menu ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <img
                src={user?.photoURL}
                className="w-8 h-8 rounded-full"
                alt=""
              />
              <h2 className="text-white font-semibold">Restaurant Panel</h2>
            </div>
            <button onClick={() => setMenu(false)}>
              <IoClose className="text-white text-2xl" />
            </button>
          </div>

          <nav className="space-y-1 z-50">
            <NavLink onClick={() => setMenu(false)} to="/restaurant_Dashboard" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink onClick={() => setMenu(false)} to="/restaurant_Dashboard/orders" className={linkClass}>
              Orders
            </NavLink>
            <NavLink onClick={() => setMenu(false)} to="/restaurant_Dashboard/TrackingMap" className={linkClass}>
              Track Delivery Man
            </NavLink>
            <NavLink onClick={() => setMenu(false)} to="/restaurant_Dashboard/delivery_history" className={linkClass}>
              Delivery History
            </NavLink>
            <NavLink onClick={() => setMenu(false)} to="/restaurant_Dashboard/menu" className={linkClass}>
              Manage Menu
            </NavLink>
            <NavLink onClick={() => setMenu(false)} to="/restaurant_Dashboard/earnings" className={linkClass}>
              Earnings
            </NavLink>
            <NavLink onClick={() => setMenu(false)} to="/restaurant_Dashboard/profile" className={linkClass}>
              Profile
            </NavLink>
            <NavLink onClick={() => setMenu(false)} to="/restaurant_Dashboard/notification" className={linkClass}>
              Notification
            </NavLink>
            <NavLink onClick={() => setMenu(false)} to="/" className={linkClass}>
              Back to Home
            </NavLink>
          </nav>

          <button
            onClick={SignOutUser}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg w-full"
          >
            Sign Out
          </button>
        </aside>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
          <button
            onClick={() => setMenu(true)}
            className="lg:hidden text-gray-700"
          >
            <CiMenuFries className="text-3xl" />
          </button>

          <h1 className="text-lg font-semibold text-gray-800">
            Restaurant Dashboard
          </h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RestaurantOwnerDashboard;


