import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router';
import { AuthContext } from '../Public/Provider/AuthProvider';

const RestaurantOwnerDashboard = () => {
    const { SignOutUser } = useContext(AuthContext);

    const linkClass = ({ isActive }) =>
        isActive
            ? "bg-green-500 text-white px-4 py-2 my-2 rounded-md block"
            : "text-gray-300 hover:bg-green-600 hover:text-white px-4 py-2 my-2 rounded-md block";

    return (
        <div className="w-full flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="min-w-48 bg-gray-600 py-4 px-2">
                <NavLink to="/restaurant_Dashboard" end className={linkClass}>
                    Dashboard
                </NavLink>

                <NavLink to="/restaurant_Dashboard/orders" className={linkClass}>
                    Orders
                </NavLink>

                <NavLink to="/restaurant_Dashboard/delivery_history" className={linkClass}>
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

                <button
                    onClick={SignOutUser}
                    className="text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md block w-full text-left mt-6"
                >
                    Signout
                </button>
            </div>

            {/* Main content */}
            <div className="flex-1 bg-white text-black">
                {/* Top navbar (optional) */}
                <div className="h-20 border-b flex items-center px-6">
                    <h2 className="text-xl font-semibold">
                        Restaurant Owner Panel
                    </h2>
                </div>

                {/* Page content */}
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default RestaurantOwnerDashboard;

