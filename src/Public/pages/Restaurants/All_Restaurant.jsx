import React, { useEffect, useState } from "react";

import Select from "react-select";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { restaurants } from "../../DemoDB/Db";

const All_Restaurant = () => {
    const [allRestaurants, setAllRestaurants] = useState(restaurants);
    const [Restaurants, setRestaurants] = useState(restaurants);
    const [selectValue, setSelectedValue] = useState([]);
     let navigate = useNavigate();

    const location = allRestaurants.map(item => ({ value: item.location, label: item.location }));

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0 },
    };

    // Filter restaurants whenever selectValue changes
    useEffect(() => {
        if (!selectValue || selectValue.length === 0) {
            setRestaurants(allRestaurants);
        } else {
            const filtered = allRestaurants.filter(item =>
                selectValue.some(option => option.value === item.location)
            );
            setRestaurants(filtered);
        }
    }, [selectValue]);

    return (
        <div className="bg-gray-100 min-h-screen p-6 text-black">
            <h1 className="text-2xl font-bold mb-4">All Restaurants </h1>
                <h2 className="text-md font-medium text-gray-500">Show Restaurants {Restaurants.length}</h2>

            <div className="grid grid-cols-12 gap-6">
                {/* Left Side */}
                <div className="col-span-12 md:col-span-3 border-0 bg-white p-4 ">
                    <h2 className="text-lg font-semibold mb-4">Locations</h2>
                    <Select
                        isMulti
                        options={location}
                        placeholder="Select location"
                        value={selectValue}
                        onChange={setSelectedValue} // directly update state
                    />
                </div>

                {/* Right Side */}
                <div className="col-span-12 md:col-span-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Restaurants.map((restaurant, index) => (
                        <motion.div
                            key={restaurant.id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition"
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                            <img
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="h-40 w-full object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                                <p className="text-sm text-gray-600">📍 {restaurant.location}</p>
                                <p className="text-sm">🍽 {restaurant.cuisine}</p>
                                <p className="text-sm">⭐ {restaurant.rating}</p>
                                <p className="text-sm">
                                    Status:{" "}
                                    <span className={restaurant.isOpen ? "text-green-600" : "text-red-500"}>
                                        {restaurant.isOpen ? "Open" : "Closed"}
                                    </span>
                                </p>
                                <button onClick={()=>navigate(`/menu_Of_restaurant/${restaurant.id}`)} className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                                    Vist Restaurant
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default All_Restaurant;


