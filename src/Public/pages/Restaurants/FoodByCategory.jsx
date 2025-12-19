import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { restaurantItems } from '../../DemoDB/Db';

const FoodByCategory = () => {
    const { name } = useParams() // food category name 
    const [FoodItem, setFoodItem] = useState([])
    console.log(name)
    useEffect(() => {
        const FoodByCategory = restaurantItems.filter(item => item.category === name);
        setFoodItem(FoodByCategory.slice(0,10))
    }, [name])
    const handleViewMoreFood = () => {
        setFoodItem(FoodItem.slice(0, foodItem.length + 10))
    }
    return (
        <div className='bg-gray-100 min-h-screen p-6'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {FoodItem?.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden group"
                    >
                        {/* Image */}
                        <div className="relative h-44 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                            />
                            <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                                {item.category}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {item.name}
                            </h3>

                            <div className="flex justify-between text-sm text-gray-600 mt-2">
                                <span>⏱ {item.delivery_time}</span>
                                <span>💰 ৳{item.price}</span>
                            </div>

                            <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-[20%] mx-auto mt-8 mb-5">
                {FoodItem.length > 10 && <button onClick={handleViewMoreFood} className="btn w-full hover:shadow-xl ">View more</button>}
            </div>
        </div>
    );
};

export default FoodByCategory;