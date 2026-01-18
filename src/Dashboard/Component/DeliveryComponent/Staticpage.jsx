import React from "react";

const Staticpage = () => {
    // Dummy data
    const deliveryMan = {
        name: "Rakib Hasan",
        status: "Online",
        todayDeliveries: 12,
        totalDeliveries: 540,
        earningsToday: 1250,
        rating: 4.8,
    };

    const deliveries = [
        {
            id: "#DL1021",
            restaurant: "Foodi Express",
            customer: "Arif",
            address: "Dhanmondi 32, Dhaka",
            status: "On the way",
        },
        {
            id: "#DL1022",
            restaurant: "Burger Lab",
            customer: "Sadia",
            address: "Mirpur 10, Dhaka",
            status: "Picked up",
        },
        {
            id: "#DL1023",
            restaurant: "Pizza Hub",
            customer: "Naim",
            address: "Mohakhali, Dhaka",
            status: "Delivered",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Delivery Man Dashboard
                    </h1>
                    <p className="text-gray-500">Welcome, {deliveryMan.name}</p>
                </div>

                <span className="mt-4 md:mt-0 px-4 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    {deliveryMan.status}
                </span>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500 text-sm">Today Deliveries</p>
                    <h2 className="text-3xl font-bold text-blue-600">
                        {deliveryMan.todayDeliveries}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500 text-sm">Total Deliveries</p>
                    <h2 className="text-3xl font-bold text-gray-800">
                        {deliveryMan.totalDeliveries}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500 text-sm">Today Earnings</p>
                    <h2 className="text-3xl font-bold text-green-600">
                        ৳ {deliveryMan.earningsToday}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500 text-sm">Rating</p>
                    <h2 className="text-3xl font-bold text-yellow-500">
                        ⭐ {deliveryMan.rating}
                    </h2>
                </div>
            </div>

            {/* Active Deliveries */}
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Active & Recent Deliveries
                </h2>

                <div className="space-y-4">
                    {deliveries.map((item) => (
                        <div
                            key={item.id}
                            className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                        >
                            <div>
                                <p className="font-semibold text-gray-800">{item.id}</p>
                                <p className="text-gray-600">
                                    {item.restaurant} → {item.customer}
                                </p>
                                <p className="text-gray-500 text-sm">{item.address}</p>
                            </div>

                            <span
                                className={`mt-3 md:mt-0 px-3 py-1 text-sm rounded-full
                  ${item.status === "Delivered"
                                        ? "bg-green-100 text-green-700"
                                        : item.status === "Picked up"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-blue-100 text-blue-700"
                                    }`}
                            >
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Staticpage;
