import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import socket from '../../../Socket';


const Myorders = () => {
  const axiosPublic = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const orderListFunction = async () => {
      const res = await axiosPublic.get(
        `/api/restaurant/my_order_list/${user?.email}`
      );
      setOrderData(res.data);
      setIsLoading(false);
    }
    orderListFunction();

  }, [])

  useEffect(() => {
    socket.on('order_status_update', (data) => {
      console.log(
        "received order status update:", data
      )
      setOrderData(prev => [...prev, data])
    })

    return () => socket.off('order_status_update');
  }, [])

  console.log('orderData::', orderData)

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  const handleDuePayment = (id) => {  // id is order.id // 
    axiosPublic.post('/api/payment/duepayment_init', { order_id: id })
      .then((res) => {
        console.log(res.data.url)
        const url = res.data.url;
        if (url) {
          window.location.href = url;
        }
      }).catch(err => {
        console.log('Payment request error:', err);

      });
  }



  // cus_id
  // : 
  // 14
  // delivery_id
  // : 
  // null
  // delivery_location
  // : 
  // "Baniachong,Habiganj"
  // dueamount
  // : 
  // "0.00"
  // food_id
  // : 
  // 10
  // food_image
  // : 
  // "https://res.cloudinary.com/dwmkakht7/image/upload/v1776182777/restaurants/qrlm73hb5rbnqswmanjv.jpg"
  // food_name
  // : 
  // "French_Fries"
  // id
  // : 
  // 14
  // otp
  // : 
  // null
  // payment
  // : 
  // "250.00"
  // price
  // : 
  // "200"
  // quantity
  // : 
  // 1
  // status
  // : 
  // "panding"
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">My Orders</h2>
          <span className="text-sm text-gray-500">
            Total: {orderData.length}
          </span>
        </div>

        {/* Empty */}
        {orderData.length === 0 && (
          <div className="bg-white rounded-xl p-10 text-center shadow">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}

        {/* Orders */}
        {/* Todo for order details page */}
        <div className="space-y-6">
          {orderData.map(order => (
            <div className='w-full border-2 border-red-400 text-black '>
              <div className='flex justify-between'>

                <div className={`${order?.status === "panding" && "text-blue-400"}  rounded-full`}>
                  <span>panding</span>
                </div>
                  <div className={`${order?.status === "panding" && "text-blue-400"}  rounded-full`}>
                  <span>panding</span>
                </div>
                 <div className={`${order?.status === "panding" && "text-blue-400"}  rounded-full`}>
                  <span>panding</span>
                </div>
                  <div className={`${order?.status === "panding" && "text-blue-400"}  rounded-full`}>
                  <span>panding</span>
                </div>
              </div>
              <div>
                <h1>{order?.id}</h1>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
export default Myorders;


