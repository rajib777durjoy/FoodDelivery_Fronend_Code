import React, { useContext, useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { AuthContext } from '../Public/Provider/AuthProvider';
import { CiMenuFries } from "react-icons/ci";


const RestaurantOwnerDashboard = () => {
    const { SignOutUser, user } = useContext(AuthContext);
    const [menu, setMenu] = useState(true);
    console.log('menu', menu)
    const linkClass = ({ isActive }) =>
        isActive
            ? "bg-green-500 text-white px-4 py-2 my-2 rounded-md block"
            : "text-gray-300 hover:bg-green-600 hover:text-white px-4 py-2 my-2 rounded-md block";

    return (
        <div className="w-full flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden lg:block min-w-48 h-150 sticky top-0 rounded-br-md bg-gray-600 py-2 px-2">
                <div className='px-4 py-4 flex items-center gap-2'>
                    <img src={user?.photoURL} className='w-8 h-8 rounded-full mt-1' alt="" />
                    <h1 className='text-2xl'>Eatnow</h1>
                </div>
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
                <NavLink to="/notification" className={linkClass}>
                    Notification
                </NavLink>

                <button
                    onClick={SignOutUser}
                    className="text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md block w-full text-left mt-6"
                >
                    Signout
                </button>
            </div>
            {
                menu ? <div className={`min-w-36 bg-gray-600 py-2 px-2 lg:hidden h-150 sticky top-0 rounded-br-md   ${menu && 'translate-x-0' || '-translate-x-48 '} `}>
                    <div className='px-4 py-4 flex items-center gap-2'>
                        <img src={user?.photoURL} className='w-6 h-6 rounded-full mt-1' alt="" />
                        <h1 className='text-xl'>Eatnow</h1>
                    </div>
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
                    <NavLink to="/notification" className={linkClass}>
                        Notification
                    </NavLink>

                    <button
                        onClick={SignOutUser}
                        className="text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md block w-full text-left mt-6"
                    >
                        Signout
                    </button>
                </div> : ""
            }

            {/* Main content */}
            <div className="flex-1 bg-white text-black">
                {/* Top navbar (optional) */}
                <div className="h-20 border-b flex items-center justify-between px-6">
                    <h2 className="text-xl font-semibold">
                        Restaurant Owner Panel
                    </h2>
                    <div className='lg:hidden'>
                        <button onClick={() => setMenu(!menu)} className=''><CiMenuFries className='text-3xl' /></button>
                    </div>
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

