import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosSecure from "../../../Public/Hook/useAxiosSecure";

const Staticpage = () => {
    const userData = useSelector(state => state.user.user);
    const axiosSecure = useAxiosSecure();
    const [deliverList, setDeliverylist] = useState([]);
    const [todayDeliveries, SetTodayDeliveries] = useState([]);
    const [Balance, setBalance] = useState(0)
    useEffect(() => {
        axiosSecure.get(`/api/deliveryHero/static_page/${userData?.id}`)
            .then(res => {
                setDeliverylist(res?.data);
                todayDeliveris(res?.data);
                delivery_Total_balance(res?.data)
            }).catch(err => {
                console.log('error', err?.message)
            })
    }, [userData?.id])

    const todayDeliveris = (data) => {
        const today = new Date().getDate();
        const todayDelivery = data?.filter(dt => {
            return new Date(dt?.updated_at).getDate() - 1 === today
        })
        SetTodayDeliveries(todayDelivery)
    }
    const delivery_Total_balance = (data) => {
        let totalbalance = 0;
        const balance = data?.map(item => {
            totalbalance = totalbalance + Number(item?.balance);
        })
        setBalance(totalbalance)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Delivery Man Dashboard
                    </h1>
                    <p className="text-gray-500">Welcome, {userData?.fullname}</p>
                </div>

                <span className={`${userData.socket_id ? 'text-green-700 bg-green-100' : "bg-red-100 text-red-700"} mt-4 md:mt-0 px-4 py-1 rounded-full text-sm `}>
                    {userData.socket_id && "Online" || "Offline"}
                </span>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500 text-sm">Today Deliveries</p>
                    <h2 className="text-3xl font-bold text-blue-600">
                        {todayDeliveries.length}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500 text-sm">Total Deliveries</p>
                    <h2 className="text-3xl font-bold text-gray-800">
                        {deliverList.length}
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <p className="text-gray-500 text-sm">Today Earnings</p>
                    <h2 className="text-3xl font-bold text-green-600">
                        ৳ {Balance}
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

                <div className="space-y-5">
                    {deliverList?.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-4">

                                {/* Left Content */}
                                <div className="space-y-1">
                                    <p className="text-lg font-semibold text-gray-900">
                                        Order ID: <span className="text-gray-700">{item.id}</span>
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        📞 Customer Phone: <span className="font-medium">{item.cus_phone}</span>
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        📍 Location: {item?.location}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-500 mt-2">
                                        <p>💳 Method: {item?.payment_method}</p>
                                        <p>💰 Amount: {item?.payment}</p>
                                        <p>💰 Due_Amount: {item?.DueAmount}</p>
                                        <p>🔐 Transaction: {item?.payment_tran}</p>
                                        <p>📦 Quantity: {item?.quantity}</p>
                                        <p>🔢 OTP: {item?.OTP || 'Null'}</p>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-start md:items-center">
                                    <span
                                        className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap
              ${item.status === "complete"
                                                ? "bg-green-100 text-green-700"
                                                : item.status === "On_the_way"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-blue-100 text-blue-700"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Staticpage;
