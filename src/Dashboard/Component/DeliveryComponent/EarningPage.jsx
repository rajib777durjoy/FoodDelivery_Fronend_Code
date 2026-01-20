import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Public/Hook/useAxiosSecure";
import { useSelector } from "react-redux";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const EarningPage = () => {
    const axioSecure = useAxiosSecure();
    const userData = useSelector((state) => state.user.user);
    const [deliveryData, setDeliveryData] = useState([]);

    useEffect(() => {
        if (userData.id) {
            axioSecure
                .get(`/api/deliveryHero/totalEarning/${userData.id}`)
                .then((res) => {
                    setDeliveryData(res.data);
                })
                .catch((err) => {
                    console.log("error ", err);
                });
        }

    }, [userData.id]);

    // Dummy chart data 
    const earningLineData = [
        { month: "Jan", earning: 4000 },
        { month: "Feb", earning: 6000 },
        { month: "Mar", earning: 7500 },
        { month: "Apr", earning: 9000 },
    ];

    const earningBarData = [
        { name: "Week 1", amount: 2000 },
        { name: "Week 2", amount: 3000 },
        { name: "Week 3", amount: 2500 },
        { name: "Week 4", amount: 4000 },
    ];

    const rideData = [
        { name: "Bike", value: 70 },
        { name: "Cycle", value: 30 },
    ];

    const COLORS = ["#16a34a", "#22c55e"];
    console.log('delivery data::', deliveryData)
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <h2 className="text-2xl font-bold text-green-700 mb-6">
                Delivery Hero Earnings
            </h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500">Total Earning</p>
                    <h3 className="text-2xl font-bold text-green-600">
                        ৳ {deliveryData?.balance || 0}
                    </h3>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500">Status</p>
                    <h3 className="text-xl font-semibold text-green-600">
                        {deliveryData?.status ? "Active" : "Inactive"}
                    </h3>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500">Ride Type</p>
                    <h3 className="text-xl font-semibold text-green-600">
                        {deliveryData?.ride || "N/A"}
                    </h3>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Line Chart */}
                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="font-semibold mb-4 text-gray-700">
                        Earnings Growth
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={earningLineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="earning"
                                stroke="#16a34a"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="font-semibold mb-4 text-gray-700">
                        Weekly Earnings
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={earningBarData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="amount" fill="#22c55e" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-xl shadow p-5 lg:col-span-2">
                    <h3 className="font-semibold mb-4 text-gray-700">
                        Ride Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={rideData}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {rideData.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default EarningPage;
