import React from 'react';
import { Link, NavLink } from 'react-router';


const Navbar = () => {
    const links = <>
        <Link to={'/'}>Home</Link>
        <Link></Link>
    </>
    return (
        <div className='w-[90%] mx-auto '>
            <div className="navbar text-black">
                <div className="navbar-start">
                    <a className="flex w-12 h-12"><img src='/EatNowLogo-removebg-preview.png' alt="" /></a>
                </div>

                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle mx-2">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
                           
                        </div>
                    </button>
                    <div className="dropdown dropdown-center">
                        <div tabIndex={0} role="button" className="mx-2">profile</div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-white mt-5 rounded-box z-1 w-52 py-2 px-6 shadow-sm">
                            <NavLink to="/" className='my-2' >
                                Home
                            </NavLink>
                            <NavLink to="/" className='my-2'>
                                Home
                            </NavLink>
                            <NavLink to="/" className='my-2'>
                                Home
                            </NavLink>
                            <NavLink to="/" className='my-2' >Home</NavLink>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;