import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { format } from "date-fns";
import { useNavigate } from "react-router";

const Static = () => {
  const userData = useSelector((state) => state.user.user);
  const axiosSecure = useAxiosSecure();
  const [OrderList, SetOrder_list] = useState([]);
  const [filter, setFilter] = useState("all"); // Filter: all, delivered, on_the_way
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalDue: 0,
    onTheWay: 0,
    delivered: 0,
  });
  
  const navigate= useNavigate()

  // Fetch orders
  useEffect(() => {
    if (userData?.id) {
      axiosSecure
        .get(`/api/restaurant/customer_static_page/${userData.id}`)
        .then((res) => {
          SetOrder_list(res.data);
          calculateStats(res.data);
        })
        .catch((err) => console.log("Error:", err?.message));
    }
  }, [userData?.id]);

  // Calculate stats for dashboard
  const calculateStats = (orders) => {
    const totalOrders = orders.length;
    const totalDue = orders.reduce((acc, o) => acc + Number(o.DueAmount), 0);
    const onTheWay = orders.filter((o) => o.status === "On_the_way").length;
    const delivered = orders.filter((o) => o.status === "Delivered").length;

    setStats({ totalOrders, totalDue, onTheWay, delivered });
  };

  // Filtered orders
  const filteredOrders =
    filter === "all" ? OrderList : OrderList.filter((o) => o.status === filter);

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      {/* Welcome / Stats */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Welcome, {userData?.name || "Customer"}!
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">On The Way</p>
          <p className="text-xl font-bold text-blue-600">{stats.onTheWay}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Delivered</p>
          <p className="text-xl font-bold text-green-600">{stats.delivered}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Total Due</p>
          <p className={`text-xl font-bold ${stats.totalDue > 0 ? "text-red-500" : "text-green-600"}`}>
            ৳ {stats.totalDue}
          </p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-3 mb-6">
        {["all", "On_the_way", "Delivered"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {f === "all" ? "All Orders" : f.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Orders grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">No orders found.</p>
        )}
        {filteredOrders.map((order) => (
          <div
            key={order.order_id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">Order #{order.order_id}</p>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  order.status === "On_the_way"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {order.status.replace("_", " ")}
              </span>
            </div>

            {/* Order Info */}
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Food ID:</span> {order.food_id}
              </p>
              <p>
                <span className="font-medium">Delivery Man:</span> {order.deliveryMan_name || 'NULL'}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {order.deliveryMan_phone || "NULL"}
              </p>
              <p>
                <span className="font-medium">Due Amount:</span>{" "}
                <span
                  className={`font-semibold ${
                    Number(order.DueAmount) > 0 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  ৳ {order.DueAmount}
                </span>
              </p>
              <p>
                <span className="font-medium">Order Date:</span>{" "}
                {order.createdAt ? format(new Date(order.createdAt), "dd MMM yyyy") : "N/A"}
              </p>
            </div>

            {/* OTP */}
            {order.OTP ? (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Delivery OTP</p>
                <p className="text-xl font-bold tracking-widest text-green-600">{order.OTP}</p>
              </div>
            ) : (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Delivery OTP</p>
                <p className=" text-gray-500">OTP will be available soon</p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-5 flex gap-3">
              {/* <button onClick={()=>navigate(``)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm">
                Details
              </button> */}
              {order.status === "On_the_way" && (
                <button onClick={()=>navigate(`/dashboard/TrackingMap`)} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm">
                  Track
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Static;


