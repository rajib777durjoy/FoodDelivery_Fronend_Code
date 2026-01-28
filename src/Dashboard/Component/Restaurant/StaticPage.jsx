import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosSecure from "../../../Public/Hook/useAxiosSecure";

const StaticPage = () => {
  const userData = useSelector(state => state.user.user);
  const [order, setOrder] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [TodayOrder, setTodayOrder] = useState([])
  const axiosSecure = useAxiosSecure();
  // Dummy data
  const restaurant = {
    name: "Foodi Express",
    owner: "Mr. Rahman",
    location: "Dhanmondi, Dhaka",
    status: "Open",
    rating: 4.6,
    totalOrders: 1240,
    todayOrders: 38,
    revenue: 98500,
  };
  useEffect(() => {
    axiosSecure.get(`/api/restaurant/owner_static_page/${userData?.id}`)
      .then(res => {
        console.log('owner order::', res?.data)
        setOrder(res?.data)
        TotalPayment(res?.data || []);
        todayOrder(res?.data || [])
      }).catch(err => {
        console.log('error', err?.message)
      })
  }, [])

  const TotalPayment = (data) => {
    let total = 0;
    data?.forEach(py => {
      total = total + Number(py?.payment)
    });
    setTotalPayment(total)
  }

  const todayOrder = (data) => {
    const today = new Date().getDate();
    const todayOrder = data?.filter(dt => {
      return new Date(dt?.created_at).getDate()-1 === today
    })
    setTodayOrder(todayOrder)
  }




  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Restaurant Owner Dashboard
        </h1>
        <p className="text-gray-500">
          Welcome back, {userData?.fullname}
        </p>
      </div>

      {/* Restaurant Info */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold">Restaurant</h2>
          <p className="text-gray-700 font-medium">{restaurant.name}</p>
          <p className="text-gray-500 text-sm">{restaurant.location}</p>
          <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
            {restaurant.status}
          </span>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold">Today Orders</h2>
          <p className="text-3xl font-bold text-blue-600">
            {TodayOrder.length}
          </p>
          <p className="text-gray-500 text-sm">
            Total Orders: {order.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-3xl font-bold text-green-600">
            ৳ {totalPayment}
          </p>
          <p className="text-gray-500 text-sm">
            Rating: ⭐ {restaurant.rating}
          </p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer Phone</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Due Amount</th>
                <th className="py-2">Delivery Status</th>
              </tr>
            </thead>
            <tbody>
              {order.length>0 && order?.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="py-3 font-medium">{item?.id}</td>
                  <td className="py-3">{item?.customer_phone}</td>
                  <td className="py-3">৳ {item?.payment}</td>
                  <td className="py-3">৳ {item?.dueAmount}</td>
                  <td className="py-3">৳ {item?.status}</td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 text-sm rounded-full
                        ${order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Preparing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
