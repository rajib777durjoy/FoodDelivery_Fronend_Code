import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import useAxiosSecure from "../../../Public/Hook/useAxiosSecure";

const Delivery_History = () => {
    const user  = useSelector(state => state.user.user);
   
    const axiosPublic = useAxiosSecure();
    // Sample data

    const { data: order_list = [] } = useQuery({
        queryKey: ['order_list', user?.id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/deliveryHero/order_for_delivery_list/${user.id}/${user.email}`);
            return res.data;
        }
    })
//   
    // Status color mapping
    const statusColor = (status) => {
        switch (status) {
            case "Delivered":
                return "text-green-600";
            case "Pending":
                return "text-yellow-600";
            case "Cancelled":
                return "text-red-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800">
                Delivery History
            </h1>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-sm text-gray-600">Order ID</th>
                            <th className="p-3 text-sm text-gray-600">Customer</th>
                            <th className="p-3 text-sm text-gray-600">Delivery Man</th>
                            <th className="p-3 text-sm text-gray-600">Amount </th>
                            <th className="p-3 text-sm text-gray-600">Due_amount </th>
                            <th className="p-3 text-sm text-gray-600">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {order_list.map((order) => (
                            <tr key={order.id} className="border-t">
                                <td className="p-3">{order.id}</td>
                                <td className="p-3">{order.customer}</td>
                                <td className="p-3">{order.deliverMan}</td>
                                <td className="p-3">{order.amount}</td>
                                <td className="p-3">{order.DueAmount}</td>
                                <td className={`p-3 font-medium ${statusColor(order.status)}`}>
                                    {order.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Delivery_History;
