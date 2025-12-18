import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Public/pages/Navbar';
import Footer from '../Public/pages/Footer';

const Layoutpage = () => {
    return (
        <div className=' w-full min-h-screen bg-amber-50'>
            <div className='w-full bg-green-800 fixed  shadow shadow-gray-500 left-0 right-0 '>
                <Navbar></Navbar>
            </div>
            <div className='w-full mx-auto h-20'></div>
            <main className='w-[90%] mx-auto '>
                <Outlet></Outlet>
            </main>
            <footer className='w-full '>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Layoutpage;