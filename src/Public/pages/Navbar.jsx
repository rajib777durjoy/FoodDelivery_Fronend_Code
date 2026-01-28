import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosPublic from '../Hook/useAxiosPublic';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../Redux/userSlice';



const Navbar = () => {
    const { user, SignOutUser, loading } = useContext(AuthContext)
    const userData = useSelector(state => state.user.user);
    const axiosPublic = useAxiosPublic();
    const dispatch = useDispatch()

    const handleSingOut = () => {
        SignOutUser().then(() => {
            dispatch(setUser({}))
        })
    }
    
    const role = userData?.role;
    // const role = 'delivery';
    console.log('role', role)
    return (
        <div className='w-[90%] mx-auto '>
            <div className="navbar text-black">
                <div className="navbar-start">
                    <a className="flex w-12 h-12"><img src='/EatNowLogo-removebg-preview.png' alt="" /></a>
                </div>

                <div className="navbar-end">
                    <button className="btn btn-ghost hover:bg-green-800 border-0 hover:scale-90 btn-circle mx-2">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>

                        </div>
                    </button>
                    {userData?.email && <div className="dropdown dropdown-center">
                        <div tabIndex={0} role="button" className="mx-2"><img src={userData?.profile} className='w-10 h-10 rounded-full' alt="" /></div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-white mt-3 rounded-box z-1 w-52 py-2 px-2 shadow-sm">
                            <NavLink to="/" className='my-2 hover:bg-green-600 font-medium px-4 py-1 rounded-md hover:text-white hover:shadow shadow-green-900'>
                                Home
                            </NavLink>
                            <NavLink to="/" className='my-2 hover:bg-green-600 font-medium px-4 py-1 rounded-md hover:text-white hover:shadow shadow-green-900' >
                                Profile
                            </NavLink>
                            <NavLink to="/All_FoodItem" className='my-2 hover:bg-green-600 font-medium px-4 py-1 rounded-md hover:text-white hover:shadow shadow-green-900'>
                                Food list
                            </NavLink>
                            <NavLink to="/All_restaurant" className='my-2 hover:bg-green-600 font-medium px-4 py-1 rounded-md hover:text-white hover:shadow shadow-green-900'>
                                Restaurants
                            </NavLink>
                            {role === 'customer' && <NavLink to="/dashboard" className='my-2 hover:bg-green-600 font-medium px-4 py-1 rounded-md hover:text-white hover:shadow shadow-green-900'>
                                Dashboard
                            </NavLink>}
                            {role === 'deliver_hero' && <NavLink to="/delivery_Dashboard" className='my-2 hover:bg-green-600 font-medium px-4 py-1 rounded-md hover:text-white hover:shadow shadow-green-900'>
                                Dashboard
                            </NavLink>}
                            {role === 'partner' && <NavLink to="/restaurant_Dashboard" className='my-2 hover:bg-green-600 font-medium px-4 py-1 rounded-md hover:text-white hover:shadow shadow-green-900'>
                                Dashboard
                            </NavLink>}

                            <NavLink to='#' onClick={handleSingOut} className='my-2 hover:bg-green-600 font-medium px-4 py-1 rounded-md hover:text-white hover:shadow shadow-green-900'>
                                Sign Out
                            </NavLink>
                            <NavLink to="/" className='my-2 hover:bg-green-600 font-medium px-4 py-1 rounded-md hover:text-white hover:shadow shadow-green-900'>
                                Help
                            </NavLink>
                        </ul>
                    </div> || <div className='flex gap-2 flex-row-reverse '>
                            <NavLink to='/SignUp' className='btn bg-white hover:scale-95 transition-all duration-300 text-black hover:bg-green-800 border-0 hover:text-white'>SignUp</NavLink>
                            <NavLink to='/SignIn' className='btn bg-white hover:scale-95 transition-all duration-300 text-black hover:bg-green-800 border-0 hover:text-white'>Sign_in</NavLink>
                        </div>}

                </div>
            </div>
        </div>

    );
};

export default Navbar;