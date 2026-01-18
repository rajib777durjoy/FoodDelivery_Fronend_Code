import React from "react";

const Static = () => {
  // Dummy data
  const customer = {
    name: "Sadia Akter",
    address: "Mirpur 10, Dhaka",
    totalOrders: 86,
    walletBalance: 520,
  };

  const activeOrder = {
    id: "#OD2091",
    restaurant: "Foodi Express",
    status: "On the way",
    deliveryMan: "Rakib Hasan",
    eta: "15 mins",
  };

  const recentOrders = [
    {
      id: "#OD2088",
      restaurant: "Burger Lab",
      amount: 450,
      status: "Delivered",
    },
    {
      id: "#OD2087",
      restaurant: "Pizza Hub",
      amount: 890,
      status: "Cancelled",
    },
    {
      id: "#OD2086",
      restaurant: "KFC",
      amount: 620,
      status: "Delivered",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Customer Dashboard
        </h1>
        <p className="text-gray-500">
          Hello, {customer.name}
        </p>
      </div>

      {/* Profile & Wallet */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-2">Profile</h2>
          <p className="text-gray-700">{customer.name}</p>
          <p className="text-gray-500 text-sm">{customer.address}</p>
          <p className="mt-2 text-sm text-gray-500">
            Total Orders: {customer.totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-2">Wallet</h2>
          <p className="text-3xl font-bold text-green-600">
            ৳ {customer.walletBalance}
          </p>
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            Add Balance
          </button>
        </div>
      </div>

      {/* Active Order */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Active Order</h2>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border rounded-lg p-4">
          <div>
            <p className="font-semibold text-gray-800">
              Order ID: {activeOrder.id}
            </p>
            <p className="text-gray-600">
              {activeOrder.restaurant}
            </p>
            <p className="text-gray-500 text-sm">
              Delivery Man: {activeOrder.deliveryMan}
            </p>
          </div>

          <div className="mt-3 md:mt-0 text-right">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              {activeOrder.status}
            </span>
            <p className="text-sm text-gray-500 mt-1">
              ETA: {activeOrder.eta}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-2">Order ID</th>
                <th className="py-2">Restaurant</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-3 font-medium">{order.id}</td>
                  <td className="py-3">{order.restaurant}</td>
                  <td className="py-3">৳ {order.amount}</td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm
                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
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

export default Static;
