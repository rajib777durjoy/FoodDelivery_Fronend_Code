import React from 'react';
import { ImLocation2 } from "react-icons/im";
import { TbTruckDelivery } from "react-icons/tb";
import { IoRestaurant } from "react-icons/io5";
const Services = () => {
    return (
        <div className="w-full py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                    Why Choose <span className="text-green-500">Eat_Now</span>?
                </h2>

                
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
                   
                    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                        <TbTruckDelivery className="text-6xl text-green-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-black">Super Fast Delivery</h3>
                        <p className="text-gray-600">
                            Faster than your cravings can blink. Experience super-fast delivery and get fresh food.
                        </p>
                    </div>

                  
                    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                        <ImLocation2 className="text-6xl text-green-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-black">Live Order Tracking</h3>
                        <p className="text-gray-600">
                            Track your order while it is delivered to your doorstep from the restaurant.
                        </p>
                    </div>

                    
                    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                        <IoRestaurant className="text-6xl text-green-500 mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-black">Your Favorite Restaurants</h3>
                        <p className="text-gray-600">
                            Find the best and nearest top restaurants from your selected location.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;