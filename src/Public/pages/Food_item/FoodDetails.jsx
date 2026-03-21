import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { Bounce, toast } from "react-toastify";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { GiCircularSawblade } from "react-icons/gi";
import Loading from "../../../CustomeLoading/Loading";

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
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        setLoading(true)
        axiosPublic.get(`/api/restaurant/food_details/${id}`)
            .then(res => {
                setLoading(false)
                setFood(res.data)
            }).catch(err => {
                setLoading(false)
                console.log(err)
            })
    },[])

    if(loading){
        return <Loading></Loading>
    }
    if (!food) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl">
                Food not found !
            </div>
        );
    }


    const handleAddToCart = (id) => {
        setLoading(true)
        AxiosSecure.post(`/api/restaurant/AddToCart/${id}`, { quantity })
            .then(res => {
                if (res.data?.message === 'Item added to cart successfully') {
                    setLoading(false)
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
                    setLoading(false)
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
                setLoading(false)
                console.log(err);
            })
    }


    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="w-full mx-auto overflow-hidden">

                {/* Back Button */}
                <div className="p-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-green-600 font-medium hover:underline"
                    >
                        ← Back to Foods
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 py-6 ">

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
                        <h1 className="text-3xl capitalize font-bold text-gray-800">
                            {food?.food_name}
                        </h1>
                        <div className="flex items-center gap-4">

                            <span
                                className={`text-sm font-semibold ${food?.available ? "text-green-600" : "text-red-500"
                                    }`}
                            >
                                {food?.available ? "Available" : "Out of Stock"}
                            </span>
                        </div>
                        {/* For mobile device Start */}
                        <div className="w-full md:hidden flex justify-between">
                            <div className="text-3xl font-bold text-green-600">
                                ৳ {food?.price}
                            </div>
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
                        </div>

                        <div className="flex gap-4 pt-4 md:hidden">
                            {loading ? <button type="button" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold "><GiCircularSawblade className="text-2xl text-white animate-spin" /></button> :
                                <button
                                    disabled={!food.available}
                                    onClick={() => handleAddToCart(food.id)}
                                    className={`w-full py-3 rounded-xl font-semibold transition
                ${food?.available
                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                            : "bg-gray-300 cursor-not-allowed"
                                        }`}
                                >
                                    Add to Cart
                                </button>}

                            <button
                                disabled={!food.available}
                                onClick={() => navigate(`/order_confirm/${id}/${quantity}`)}
                                className={`w-full py-3 rounded-xl font-semibold transition
                ${food?.available
                                        ? "border border-green-600 text-green-600 hover:bg-green-50"
                                        : "border border-gray-300 text-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                Order Now
                            </button>
                        </div>
                        {/* For mobile device End */}

                        <p className="text-gray-600 leading-relaxed">
                            <div className="text-xl font-bold">Why You'll Love It</div>
                            {food?.description}
                        </p>

                        <div className="text-3xl hidden md:block font-bold text-green-600">
                            ৳ {food?.price}
                        </div>

                        {/* Quantity */}
                        <div className="md:flex hidden items-center gap-4 text-black">
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
                        <div className="md:flex hidden gap-4 pt-4">
                            {loading ? <button type="button" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold "><GiCircularSawblade className="text-2xl text-white animate-spin" /></button> :
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
                                </button>}

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
