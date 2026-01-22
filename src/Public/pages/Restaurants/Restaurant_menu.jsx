import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import Banner from "./Banner";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const Restaurant_menu = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [Food_item, SetFood_item] = useState([]);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()

    useEffect(() => {
        axiosPublic.get(`/api/restaurant/view_restaurant_item/${id}`)
            .then(res => {
                setRestaurant(res.data)
            }).catch(err => {
                console.log('error ', err?.message)
            })
    }, [id]);

    // get all restaurant food_item //
    useEffect(() => {
        axiosPublic.get(`/api/restaurant/view_restaurant_food_item/${id}`)
            .then(res => {
                console.log('food item::',res.data)
                SetFood_item(res.data)
            }).catch(err => {
                console.log('erro', err?.message)
            })
    }, [id])
    const { email, logo, cover, active, name, } = restaurant || {};

    return (
        <div className="w-full min-h-screen bg-gray-50 text-gray-900">
            {/* Banner */}
            {cover ? (
                <Banner image={cover} logo={logo} name={name} isOpen={active} />
            ) : (
                <div className="h-64 w-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl">
                    No Image
                </div>
            )}

            {/* Restaurant Info */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <h1 className="text-3xl font-bold mb-2">{name}</h1>
                <p className="text-gray-500 mb-4">{email}</p>
                <p
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                >
                    {active === true ? "Open" : "Closed"}
                </p>
            </div>
            {/* Food Items */}


            <div className="max-w-7xl mx-auto p-5 sm:px-6 lg:px-8 mt-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.12 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {Food_item?.map((item) => (
                        <motion.div
                            key={item.food_id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="bg-white rounded-xl shadow hover:shadow-xl overflow-hidden flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden">
                                <motion.img
                                    src={item.food_image}
                                    alt={item.food_name}
                                    className="w-full h-48 object-cover"
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ duration: 0.4 }}
                                />

                                {/* Category */}
                                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                                    {item.category}
                                </span>

                                {/* Availability */}
                                {item.available ? (
                                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                                        Available
                                    </span>
                                ) : (
                                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                                        Not Available
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col grow">
                                <h3 className="text-lg font-semibold text-gray-800 capitalize">
                                    {item.food_name}
                                </h3>

                                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                    {item.description}
                                </p>

                                <div className="mt-auto flex items-center justify-between pt-4">
                                    <p className="text-xl font-bold text-orange-600">
                                        ৳ {item.price}
                                    </p>

                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        whileHover={{ scale: item.available ? 1.05 : 1 }}
                                        disabled={!item.available}
                                        onClick={() => navigate(`/Food_details/${item?.food_id}`)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium
                ${item.available
                                                ? "bg-orange-500 text-white hover:bg-orange-600"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            }`}
                                    >
                                        Add to Cart
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>


        </div>
    );
};

export default Restaurant_menu;
