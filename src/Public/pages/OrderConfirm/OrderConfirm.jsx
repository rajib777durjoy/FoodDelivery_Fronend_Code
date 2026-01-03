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



    const handleConfirmOrder = () => {
     let amount ;
     if(paymentMethod === 'cod'){
      amount = delivery_charge;
     }
     else{
        amount = (parseInt(price) * quantity) + delivery_charge; 
     }
      const data ={food_id:id,food_name,amount};

      axiosPublic.get('/api/payment/init',data)
      .then(res=>{
        console.log('successfull payment init:: ',res.data.url)
      }).catch(err=>{
        console.log('error',err)
      })

    };



    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">

                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Confirm Your Order
                </h2>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Left Column – Order Summary */}
                    <div className="border rounded-lg p-5">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Order Summary
                        </h3>

                        {paymentMethod === 'cod' && <div className="space-y-3 text-gray-600">
                            <div className="flex justify-between">
                                <span>Total Food item </span>
                                <span>{quantity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Charge</span>
                                <span>{delivery_charge}</span>
                            </div>
                            <hr />

                            <p className="text-sm text-red-500 text-center">
                                * Now you only need to pay the delivery charge. Food price will be paid later.
                            </p>

                            <div className="flex justify-between font-semibold text-gray-800">
                                <span>Total</span>
                                <span>{delivery_charge}</span>
                            </div>
                        </div>
                            || <div className="space-y-3 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Total Food item </span>
                                    <span>{quantity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Charge</span>
                                    <span>{delivery_charge}</span>
                                </div>
                                <hr />
                                <div className="flex justify-between font-semibold text-gray-800">
                                    <span>Total Amount</span>
                                    <span>{(parseInt(price) * quantity) + delivery_charge}</span>
                                </div>
                            </div>
                        }
                    </div>

                    {/* Right Column – Payment Method */}
                    <div className="border rounded-lg p-5">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Payment Method
                        </h3>

                        <div className="space-y-4">
                            {/* Cash on Delivery */}
                            <label className="flex items-center gap-3 text-gray-800 cursor-pointer border p-3 rounded-lg">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={() => setPaymentMethod('cod')}
                                />
                                <span className="font-medium">
                                    Cash on Delivery
                                </span>
                            </label>

                            {/* Advance Payment */}
                            <label className="flex items-center gap-3 text-gray-800 cursor-pointer border p-3 rounded-lg">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="advance"
                                    checked={paymentMethod === 'advance'}
                                    onChange={() => setPaymentMethod('advance')}
                                />
                                <span className="font-medium">
                                    Advance Payment
                                </span>
                            </label>
                        </div>

                        <button
                            onClick={handleConfirmOrder}
                            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-black py-3 rounded-lg font-semibold transition"
                        >
                            Confirm Order
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OrderConfirm;
