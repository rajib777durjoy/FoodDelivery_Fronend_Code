import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useAxiosPublic from "../../../Public/Hook/useAxiosPublic";
import { Link } from "react-router";

const OrdersPage = () => {
  const userData = useSelector((state) => state.user.user);
  const AxiosPublic = useAxiosPublic();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", userData?.id],
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/api/restaurant/order_list/${userData?.id}`
      );
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
    <div className="p-3 sm:p-4 md:p-6 space-y-5">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
        Orders
      </h1>

      {/* table wrapper for mobile scroll */}
      <div className="w-full overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-225 w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Sl_No
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Food Item
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Quantity
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer Phone
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Payment Status
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Select DV_hero
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order.order_id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-3 py-3 text-sm font-medium text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-3 py-3 flex items-center gap-2 text-sm">
                    {order.food_image && (
                      <img
                        src={order.food_image}
                        alt={order.food_name}
                        className="w-9 h-9 rounded object-cover"
                      />
                    )}
                    <span className="whitespace-nowrap">
                      {order.food_name}
                    </span>
                  </td>

                  <td className="px-3 py-3 text-sm text-gray-700">
                    {order.quantity}
                  </td>

                  <td className="px-3 py-3 text-sm text-gray-700">
                    {order.payment}
                  </td>

                  <td className="px-3 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {order.customer_phone}
                  </td>

                  <td className="px-3 py-3">
                    <span
                      className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${statusColor(
                        order.payment_status ? "Delivered" : "Pending"
                      )}`}
                    >
                      {order.payment_status ? "Paid" : "Pending"}
                    </span>
                  </td>

                  <td className="px-3 py-3">
                    <Link
                      to={`/restaurant_Dashboard/select_deliver_hero/${order?.order_id}`}
                      className="inline-block px-3 py-2 text-xs sm:text-sm rounded bg-green-600 text-white hover:bg-green-700 transition"
                    >
                      Click Here
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-gray-500"
                >
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



