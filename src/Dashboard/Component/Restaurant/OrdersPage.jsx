import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useAxiosPublic from "../../../Public/Hook/useAxiosPublic";

const OrdersPage = () => {
  const userData = useSelector((state) => state.user.user);
  const AxiosPublic = useAxiosPublic();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", userData?.id],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/api/restaurant/order_list/${userData?.id}`);
      return res.data;
    },
  });

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Assigned":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Orders</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sl_No
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Food Item
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length > 0 ? (
              orders.map((order,index) => (
                <tr key={order.order_id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-4 py-3 text-gray-700 font-medium">{index+1}</td>
                  <td className="px-4 py-3 flex items-center space-x-2">
                    {order.food_image && (
                      <img
                        src={order.food_image}
                        alt={order.food_name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                    )}
                    <span>{order.food_name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{order.quantity}</td>
                  <td className="px-4 py-3 text-gray-700">{order.payment}</td>
                  <td className="px-4 py-3 text-gray-700">{order.customer_phone}</td>
                  <td>
                    <span
                      className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${statusColor(
                        order.payment_status ? "Delivered" : "Pending"
                      )}`}
                    >
                      {order.payment_status ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;

