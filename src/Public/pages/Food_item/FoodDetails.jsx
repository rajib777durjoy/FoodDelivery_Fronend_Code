import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { Bounce, toast } from "react-toastify";
import useAxiosSecure from "../../Hook/useAxiosSecure";

// /* Demo Food Data */
// const foodItems = [
//     {
//         id: 1,
//         name: "Chicken Burger",
//         image:
//             "https://images.unsplash.com/photo-1606755962773-d324e4fdf3e7",
//         price: 250,
//         rating: 4.5,
//         description:
//             "Juicy grilled chicken patty topped with fresh lettuce, tomato, and special sauce.",
//         category: "Burger",
//         restaurant: "Foodi Express",
//         available: true,
//     },
//     {
//         id: 2,
//         name: "Beef Pizza",
//         image:
//             "https://images.unsplash.com/photo-1601924582975-7aa3b9a9d4e4",
//         price: 650,
//         rating: 4.7,
//         description:
//             "Cheesy beef pizza loaded with premium beef chunks and mozzarella cheese.",
//         category: "Pizza",
//         restaurant: "Pizza Hub",
//         available: true,
//     },
//     {
//         id: 3,
//         name: "French Fries",
//         image:
//             "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
//         price: 120,
//         rating: 4.2,
//         description:
//             "Crispy golden french fries served with special dipping sauce.",
//         category: "Snacks",
//         restaurant: "Snack Corner",
//         available: false,
//     },
//     {
//         id: 4,
//         name: "Chicken Biryani",
//         image:
//             "https://images.unsplash.com/photo-1628294896516-344152572fc0",
//         price: 320,
//         rating: 4.8,
//         description:
//             "Traditional chicken biryani cooked with aromatic basmati rice and spices.",
//         category: "Rice",
//         restaurant: "Biryani House",
//         available: true,
//     },
// ];

const FoodDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const AxiosSecure = useAxiosSecure();
    const [food, setFood] = useState({})
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate()
    useEffect(() => {
        axiosPublic.get(`/api/restaurant/food_details/${id}`)
            .then(res => {
                setFood(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    if (!food) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl">
                Food not found ❌
            </div>
        );
    }

    const handleAddToCart = (id) => {
        AxiosSecure.post(`/api/restaurant/AddToCart/${id}`, { quantity })
            .then(res => {
                if (res.data?.message === 'Item added to cart successfully') {
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
                else {
                    toast.warning(res.data?.message, {
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

    // const handleOrderFood = (id) => {
    //     axiosPublic.post(`/api/restaurant/food_order/${id}`)
    //         .then(res => {
    //             if (res.data?.message) {
    //                 toast.success(res.data?.message, {
    //                     position: "top-center",
    //                     autoClose: 3000,
    //                     hideProgressBar: false,
    //                     closeOnClick: false,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                     transition: Bounce,
    //                 });
    //             }
    //         }).catch(err => {
    //             console.log(err)
    //         })
    // }

    console.log('food::', food)
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* Back Button */}
                <div className="p-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-green-600 font-medium hover:underline"
                    >
                        ← Back to Foods
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 p-6">

                    {/* Image */}
                    <div className="h-87">
                        <img
                            src={food?.food_image}
                            alt={food.food_name}
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {food.food_name}
                        </h1>

                        {/* <p className="text-sm text-gray-500">
              Restaurant:{" "}
              <span className="font-medium">{food.restaurant}</span>
            </p> */}

                        <div className="flex items-center gap-4">
                            {/* <span className="text-yellow-500 font-semibold">
                ⭐ {food.rating}
              </span> */}
                            <span
                                className={`text-sm font-semibold ${food.available ? "text-green-600" : "text-red-500"
                                    }`}
                            >
                                {food.available ? "Available" : "Out of Stock"}
                            </span>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                            {food.description}
                        </p>

                        <div className="text-3xl font-bold text-green-600">
                            ৳ {food.price}
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-4 text-black">
                            <span className="font-medium">Quantity:</span>
                            <div className="flex items-center border rounded-lg text-black">
                                <button
                                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                    className="px-3 py-1 text-lg font-bold text-black"
                                >
                                    -
                                </button>
                                <span className="px-4 text-black">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-1 text-lg font-bold text-black"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-4">
                            <button
                                disabled={!food.available}
                                onClick={() => handleAddToCart(food.id)}
                                className={`w-full py-3 rounded-xl font-semibold transition
                ${food.available
                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                        : "bg-gray-300 cursor-not-allowed"
                                    }`}
                            >
                                Add to Cart
                            </button>

                            <button
                                disabled={!food.available}
                                onClick={() => navigate(`/order_confirm/${id}/${quantity}`)}
                                className={`w-full py-3 rounded-xl font-semibold transition
                ${food.available
                                        ? "border border-green-600 text-green-600 hover:bg-green-50"
                                        : "border border-gray-300 text-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;
