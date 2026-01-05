import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosPublic from '../../Hook/useAxiosPublic';

const OrderConfirm = () => {
    const { id, quantity } = useParams();
    const axiosPublic = useAxiosPublic();
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const delivery_charge = 50;
  
    const { data: food_details = {} } = useQuery({
        queryKey: ['food_details', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/restaurant/food_details/${id}`);
            return res.data
        }
    })
    console.log('food details in order page!!:', food_details);
    const { price, food_name, res_id } = food_details || {}



    const handleConfirmOrder = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        console.log(name, phone, address)
        let amount;
        if (paymentMethod === 'cod') {
            amount = delivery_charge;
        }
        else {
            amount = (parseInt(price) * quantity) + delivery_charge;
        }
        const data = { food_id:id,paymentMethod, name, phone, address, food_name, quantity };

        axiosPublic.post(`/api/payment/init`,data)
            .then(res => {
                const url = res.data.url; 
                if (url) {
                    window.location.href = url; 
                }
            })
            .catch(err => {
                console.log('Payment request error:', err);
               
            });


    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">

                <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
                    Confirm Your Order
                </h2>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* CUSTOMER INFO */}
                    <div className="border rounded-lg p-5">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Customer Information
                        </h3>

                        <form onSubmit={handleConfirmOrder} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                required
                                className="w-full border text-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                            />

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                required
                                className="w-full border text-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                            />

                            <textarea
                                name="address"
                                placeholder="Delivery Address"
                                rows="3"
                                required
                                className="w-full border text-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                            />
                            {/* CONFIRM BUTTON */}
                            <button
                                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-gray-900 py-3 rounded-lg font-semibold transition"
                            >
                                Confirm Order
                            </button>
                        </form>
                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="border rounded-lg p-5">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Order Summary
                        </h3>

                        <div className="space-y-3 text-gray-800">
                            <div className="flex justify-between">
                                <span>Food Item</span>
                                <span>{food_name}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Quantity</span>
                                <span>{quantity}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Delivery Charge</span>
                                <span>৳ {delivery_charge}</span>
                            </div>

                            <hr />

                            {paymentMethod === 'cod' ? (
                                <>
                                    <p className="text-sm text-red-500 text-center">
                                        * Only delivery charge is required now
                                    </p>
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>৳ {delivery_charge}</span>
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-between font-semibold">
                                    <span>Total Amount</span>
                                    <span>
                                        ৳ {(parseInt(price) * quantity) + delivery_charge}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* PAYMENT METHOD */}
                    <div className="border rounded-lg p-5">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Payment Method
                        </h3>

                        <div className="space-y-4 text-gray-800">
                            <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer">
                                <input
                                    type="radio"
                                    checked={paymentMethod === 'cod'}
                                    onChange={() => setPaymentMethod('cod')}
                                />
                                Cash on Delivery
                            </label>

                            <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer">
                                <input
                                    type="radio"
                                    checked={paymentMethod === 'advance'}
                                    onChange={() => setPaymentMethod('advance')}
                                />
                                Advance Payment
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

};

export default OrderConfirm;
