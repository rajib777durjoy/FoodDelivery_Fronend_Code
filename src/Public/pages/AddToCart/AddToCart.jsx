import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router';
import { Bounce, toast } from 'react-toastify';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const AddToCart = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosSecure();
    const navigate = useNavigate()

    // Fetch Cart Items
    const { data: cart_item = [], isLoading, refetch } = useQuery({
        queryKey: ['cart_item', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/restaurant/cart_item_list/${user?.email}`);
            return res.data;
        },
    });

    const handleRemoveItem = (id) => {
        axiosPublic.delete(`/api/restaurant/cart_item_delete/${id}`)
            .then(res => {
                // console.log(res.data?.message)
                if (res.data?.message === "Delete successfull") {
                    refetch()
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
                    toast.error(res.data?.message, {
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
            })
    }



    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">My Cart</h2>

                {/* Empty State */}
                {cart_item.length === 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <p className="text-gray-500">Your cart is empty!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cart_item.map((item) => (
                            <div
                                key={item.cart_id}
                                className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between"
                            >
                                {/* Left: Food Image */}
                                <div className="flex items-center gap-4 flex-1">
                                    <img
                                        src={item.food_image}
                                        alt={item.food_name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{item.food_name}</h3>
                                        <p className="text-gray-500 text-sm">{item.category}</p>
                                        <p className="text-gray-500 text-sm">{item.description.substring(0, 60)}...</p>
                                        <p className="text-gray-700 font-medium mt-1">
                                            Price: ৳ {item.price} | Quantity: {item.quantity}
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Buttons */}
                                <div className="flex gap-2 mt-4 md:mt-0">
                                    <button
                                        onClick={() => navigate(`/order_confirm/${item?.food_id}/${item?.quantity}`)}
                                        className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700"
                                    >
                                        Order Now
                                    </button>

                                    <button
                                        onClick={() => handleRemoveItem(item?.cart_id)}
                                        className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700"
                                    >
                                        Remove Item
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddToCart;

