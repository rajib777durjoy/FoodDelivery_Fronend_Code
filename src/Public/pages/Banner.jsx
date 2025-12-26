import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className='w-full lg:grid grid-cols-2 gap-6  min-h-125 '>
            <div className='mt-40'>
                <h1 className="text-5xl font-bold text-green-500 py-4">
                    EatNow Fresh ,<br /> Flavors, Fast Delivery <span className="text-gray-700">To Your Door</span>
                </h1>
                <p className='text-gray-700 text-sm'>Order dishes from favorite restaurants near you.</p>
                <div className='border border-green-500  h-15 rounded-md mt-4 flex '>
                    <input type="search" className='w-[80%] px-2 outline-0 text-gray-700' placeholder='Enter your location' />
                    <button className='bg-green-600 w-[20%] font-bold text-lg rounded-r-md cursor-pointer'>Find Food</button>
                </div>
                <div className='w-[40%]  mt-20'>
                    <Link to='/JoinOurTeam' ><div className="cursor-pointer w-40 transform tr mt-10 px-6 py-3 rounded-lg font-semibold text-white
                          bg-linear-to-r from-green-500 to-emerald-600
                                   hover:from-emerald-600 hover:to-green-500
                                   shadow-lg hover:shadow-xl transition duration-300">
                        Join Our Team
                    </div></Link>
                </div>


            </div>
            <div className='my-4 lg:my-0'>
                <img src="/food-delivery-service-removebg-preview.png" alt="" className='w-full h-full' />
            </div>
        </div>
    );
};

export default Banner;