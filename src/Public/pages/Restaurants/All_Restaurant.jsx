import React, { useEffect, useState } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const All_Restaurant = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    // Fetch Restaurants
    useEffect(() => {
        axiosPublic
            .get("/api/restaurant/view_restaurant")
            .then((res) => {
                setAllRestaurants(res.data);
                setFilteredRestaurants(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // Filter based on active status
    useEffect(() => {
        if (!selectedStatus || selectedStatus.value === 'all') {
            setFilteredRestaurants(allRestaurants);
        } else {
            const filtered = allRestaurants.filter(
                (r) => r.active === (selectedStatus.value === "active")
            );
            setFilteredRestaurants(filtered);
        }
    }, [selectedStatus, allRestaurants]);

    const statusOptions = [
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
    ];

    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                All Restaurants
            </h2>

            {/* Filter Section */}
            <div className="mb-6 max-w-sm text-black">
                <Select
                    options={statusOptions}
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                    placeholder="Filter by status"
                />
            </div>

            {/* Restaurants Grid */}
            {filteredRestaurants.length === 0 ? (
                <p className="text-gray-500">No restaurants found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredRestaurants.map((restaurant) => (
                        <motion.div
                            key={restaurant.id}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-xl shadow-md  overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col"
                            onClick={() => navigate(`/menu_Of_restaurant/${restaurant.id}`)}
                        >
                            {/* Cover Image */}
                            <div className="h-32 w-full overflow-hidden">
                                {restaurant.cover ? (
                                    <img
                                        src={restaurant.cover}
                                        alt={restaurant.restaurant_name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                                        No Cover Image
                                    </div>
                                )}
                            </div>

                            {/* Restaurant Info */}
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                                        {restaurant.restaurant_name}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1 truncate">
                                        {restaurant.address}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1 truncate">
                                        Phone: {restaurant.phone}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1 truncate">
                                        Email: {restaurant.email}
                                    </p>
                                </div>

                                {/* Active/Inactive Badge */}
                                <div className="mt-3">
                                    <span
                                        className={`px-2 py-1 text-xs  font-semibold rounded-full ${restaurant.active
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {restaurant.active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default All_Restaurant;



