import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { Bounce, toast } from "react-toastify";

const AllFood = () => {
    const axiosPublic = useAxiosPublic();
    const [foodItems, setFoodItems] = useState([])
    useEffect(() => {
        axiosPublic.get('/api/restaurant/Allfood_item')
            .then(res => {
                setFoodItems(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const handleAddToCart = (id) => {
        axiosPublic.post(`/api/restaurant/AddToCart/${id}`)
            .then(res => {
                if (res.data?.message) {
                    toast.success(res.data?.message, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            }).catch(err => {
                console.log(err);
            })
    }

    const handleOrderFood = (id) => {
        axiosPublic.post(`/api/restaurant/food_order/${id}`)
            .then(res => {
                if (res.data?.message) {
                    toast.success(res.data?.message, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    🍔 All Food Items
                </h1>

                {/* Food Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {foodItems?.map((food) => (
                        <div
                            key={food.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                        >
                            {/* Image Section */}
                            <div className="relative h-52">
                                <img
                                    src={food.food_image}
                                    alt={food.food_name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Availability Badge */}
                                <span
                                    className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full
          ${food.available
                                            ? "bg-green-600 text-white"
                                            : "bg-red-600 text-white"
                                        }`}
                                >
                                    {food.available ? "Available" : "Out of Stock"}
                                </span>

                                {/* Add to Cart Icon */}
                                <button
                                    onClick={() => handleAddToCart(food.id)}
                                    disabled={!food.available}
                                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-green-100 transition"
                                    title="Add to Cart"
                                >
                                    🛒
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-4 space-y-2">
                                <h2 className="text-lg font-semibold capitalize text-black truncate">
                                    {food.food_name}
                                </h2>

                                <p className="text-sm text-gray-600">
                                    {food.category}
                                </p>

                                <div className="text-green-600 font-bold text-lg">
                                    ৳ {food.price}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-3">
                                    <Link
                                        to={`/Food_details/${food.id}`}
                                        className="w-1/2 text-center border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-lg font-medium transition"
                                    >
                                        View Details
                                    </Link>

                                    <button
                                        disabled={!food.available}
                                        onClick={() => handleOrderFood(food.id)}
                                        className={`w-1/2 py-2 rounded-lg font-medium transition
            ${food.available
                                                ? "bg-green-600 hover:bg-green-700 text-white"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            }`}
                                    >
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-[30%] mx-auto mt-6">
                    <button className="btn text-black bg-green-400 w-full border-0 outline-0">View All Food </button>
                </div>
            </div>
        </div>
    );
};

export default AllFood;