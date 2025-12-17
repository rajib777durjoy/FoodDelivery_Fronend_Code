
import React from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import CounterPage from './CounterPage';
import Services from './Services';

const Home = () => {
    return (
        <div className=' w-full min-h-screen bg-amber-50'>
            <div className='w-full bg-green-800 fixed border-b shadow-md shadow-gray-500 left-0 right-0 '>
                <Navbar></Navbar>
            </div>
            <div className='w-full h-20'></div>
            <main className='w-[90%] mx-auto'>
                <Banner></Banner>
                <CounterPage></CounterPage>
                <Services></Services>
            </main>

        </div>
    );
};

export default Home;