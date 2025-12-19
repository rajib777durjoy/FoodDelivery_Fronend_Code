import React from 'react';

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
            </div>
            <div className='my-4 lg:my-0'>
                <img src="/food-delivery-service-removebg-preview.png" alt="" className='w-full h-full' />
            </div>
        </div>
    );
};

export default Banner;