import React, { useEffect, useState } from 'react';
import socket from '../../../Socket';
import { useSelector } from 'react-redux';
import useAxiosPublic from '../../Hook/useAxiosPublic';
import { Bounce, toast } from 'react-toastify';
import { FaBell } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const axiosPublic = useAxiosPublic();
    const userData = useSelector(state => state.user.user);
    const navigate = useNavigate()

    // fetch old notifications
    useEffect(() => {
        if (!userData?.id) return;

        const fetchNotifications = async () => {
            const res = await axiosPublic.get(
                `/api/user/notifications/${userData.id}`
            );
            setNotifications(res.data);
        };
        fetchNotifications();
    }, [userData?.id]);

    // listen new notification
    useEffect(() => {
        socket.on('order-assigned', (data) => {
            toast.info(data.message, {
                position: "top-center",
                autoClose: 5000,
                transition: Bounce,
            });

            setNotifications(prev => [data, ...prev]);
        });

        return () => socket.off('order-assigned');
    }, []);

    // time formatter
    const formatTime = (date) => {
        const diff = Math.floor((Date.now() - new Date(date)) / 1000);
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
        return new Date(date).toLocaleDateString();
    };
    console.log(notifications)
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <FaBell className="text-blue-600" size={28} />
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Notifications
                    </h2>
                </div>

                {/* Notification List */}
                {notifications.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                        No notifications yet
                    </div>
                ) : (
                    <div className="space-y-4">
                        
                            {notifications.map((n, index) => (
                                <div onClick={()=>navigate(`/OrderDetails/${n?.order_id}`)}
                                    key={index}
                                    className={`p-4 rounded-xl shadow-sm border 
                  ${!n.read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}
                `}
                                >
                                    <div className="flex justify-between items-start">
                                        <p className="text-gray-800 font-medium">
                                            {n.message}
                                        </p>
                                        {!n.read && (
                                            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                                                New
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm text-gray-500 mt-2">
                                        {formatTime(n.created_at || Date.now())}
                                    </p>
                                </div>
                            ))}

                    </div>
                )}

            </div>
        </div>
    );
};

export default NotificationPage;
