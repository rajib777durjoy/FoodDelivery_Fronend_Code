import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router';
import { AuthContext } from '../Public/Provider/AuthProvider';


const CustomerDashboard = () => {
    const { SignOutUser } = useContext(AuthContext);

    const linkClass = ({ isActive }) =>
        isActive
            ? "bg-green-500 text-white px-4 py-2 my-2 rounded-md block"
            : "text-gray-300 hover:bg-green-600 hover:text-white px-4 py-2 my-2 rounded-md block";

    return (
        <div className="w-full flex min-h-screen bg-gray-100">
            {/* left sidebar */}
            <div className="min-w-40 bg-gray-600 py-4 ">
                <NavLink to="/dashboard" end className={linkClass}>
                    Dashboard
                </NavLink>

                <NavLink to="/dashboard/orders" className={linkClass}>
                    My Orders
                </NavLink>

                <NavLink to="/dashboard/track-order" className={linkClass}>
                    Track Order
                </NavLink>

                <NavLink to="/dashboard/favourites" className={linkClass}>
                    Favourites
                </NavLink>

                <NavLink to="/dashboard/payments" className={linkClass}>
                    Payments
                </NavLink>

                <NavLink to="/dashboard/offers" className={linkClass}>
                    Offers
                </NavLink>

                <NavLink to="/dashboard/profile" className={linkClass}>
                    Profile
                </NavLink>

                <NavLink to="/dashboard/support" className={linkClass}>
                    Support
                </NavLink>

                <button
                    onClick={SignOutUser}
                    className="text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md block w-full text-left mt-6"
                >
                    Signout
                </button>
            </div>

            {/* main pages */}
            <div className="w-full h-screen  bg-white">
                <nav className='w-full h-20 border-l-0 border border-red-300'>

                </nav>
               
            </div>
        </div>
    );
};

export default CustomerDashboard;
