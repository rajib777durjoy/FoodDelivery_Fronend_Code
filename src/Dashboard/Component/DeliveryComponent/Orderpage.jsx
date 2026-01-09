import React from 'react';
import useAxiosPublic from '../../../Public/Hook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const Orderpage = () => {
  const axiosPublic = useAxiosPublic();
  const userData = useSelector((state) => state.user.user);

  const { data: orders = [] } = useQuery({
    queryKey: ['orders', userData?.id],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/restaurant/all_order_list');
      return res.data;
    },
  });

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
        
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="  p-4 md:p-6 space-y-6 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-100">All Orders</h1>

      {/* Desktop / Tablet Table */}
      <div className="hidden md:block bg-white overflow-x-auto  shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl_No</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food Item</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">delivery_location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Phone</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length > 0 ? (
              orders.map((order,index) => (
                <tr key={order.order_id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-4 py-3 text-gray-700 font-medium">{index+1}</td>
                  <td className="px-4 py-3 flex items-center space-x-2">
                    {order.food_image && <img src={order.food_image} alt={order.food_name} className="w-10 h-10 rounded-md object-cover" />}
                    <span>{order.food_name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{order.quantity}</td>
                  <td className="px-4 py-3 text-gray-700">{order.payment}</td>
                  <td className="px-4 py-3 text-gray-700">{order.delivery_location}</td>
                  <td className="px-4 py-3 text-gray-700">{order.customer_phone}</td>
                  <td>
                    <span className={`px-3 py-1 inline-flex mx-4 text-xs font-semibold rounded-full ${statusColor(order.payment_status ? "Delivered" : "Pending")}`}>
                      {order.payment_status ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm">{order?.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 h-screen">
        {orders.length > 0 ? (
          orders.map((order,index) => (
            <div key={order.order_id} className="bg-white shadow rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Order #{index+1}</span>
                <span className={`px-3 py-1 inline-flex text-xs mx-4 font-semibold rounded-full ${statusColor(order.payment_status ? "Delivered" : "Pending")}`}>
                  {order.payment_status ? "Paid" : "Pending"}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {order.food_image && <img src={order.food_image} alt={order.food_name} className="w-12 h-12 rounded-md object-cover" />}
                <div>
                  <p className="font-semibold text-gray-800">Food:{order.food_name}</p>
                  <p className="text-gray-600 text-sm">Qty: {order.quantity}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Amount: {order.payment}</p>
              <p className="text-gray-600 text-sm">Location:{order.delivery_location}</p>
              <p className="text-gray-600 text-sm">Customer: {order.customer_phone}</p>
              <p className="text-gray-500 text-xs">Status{order?.status}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orderpage;
