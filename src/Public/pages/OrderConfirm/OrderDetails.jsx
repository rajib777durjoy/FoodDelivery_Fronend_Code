import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosPublic from '../../Hook/useAxiosPublic';
import {
    FaBox,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaMoneyBillWave,
    FaClock,
    FaCreditCard
} from 'react-icons/fa';

const OrderDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: order, isLoading } = useQuery({
        queryKey: ['order_details', id],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/api/user/notifications/order_details/${id}`
            );
            return res.data;
        },
        enabled: !!id
    });

    if (isLoading) {
        return (
            <div className="p-6 text-center text-gray-600">
                Loading order details...
            </div>
        );
    }

    if (!order) {
        return (
            <div className="p-6 text-center text-red-500">
                Order not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center gap-3">
                    <FaBox className="text-blue-600 text-2xl" />
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Order Details
                    </h2>
                </div>

                {/* Order Card */}
                <div className="bg-white rounded-xl shadow p-6 space-y-6">

                    {/* Order Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <InfoItem label="Order ID" value={`#${order?.id}`} />
                        <InfoItem label="Order Status" value={order.status} badge />
                        <InfoItem label="Quantity" value={order.quantity} />
                        <InfoItem
                            label="Order Time"
                            value={new Date(order.created_at).toLocaleString()}
                            icon={<FaClock />}
                        />
                    </div>

                    <hr />

                    {/* Delivery Info */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-3">
                            Delivery Information
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <InfoItem
                                label="Delivery Location"
                                value={order.delivery_location}
                                icon={<FaMapMarkerAlt />}
                            />
                            <InfoItem
                                label="Customer Phone"
                                value={order.customer_phone}
                                icon={<FaPhoneAlt />}
                            />
                        </div>
                    </div>

                    <hr />

                    {/* Payment Info */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-3">
                            Payment Information
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <InfoItem
                                label="Payment Amount"
                                value={`৳${order.payment}`}
                                icon={<FaMoneyBillWave />}
                            />
                            <InfoItem
                                label="Due Amount"
                                value={`৳${order.dueAmount || 0}`}
                            />
                            <InfoItem
                                label="Payment Method"
                                value={order.payment_method}
                                icon={<FaCreditCard />}
                            />
                            <InfoItem
                                label="Payment Status"
                                value={order.payment_status ? 'Paid' : 'Unpaid'}
                                badge
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

/* Reusable Info Component */
const InfoItem = ({ label, value, icon, badge }) => {
    const isBadge =
        label === 'Order Status' || label === 'Payment Status';

    return (
        <div>
            <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                {icon} {label}
            </p>

            {badge && isBadge ? (
                <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium
            ${value === 'Paid' || value === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : value === 'processing'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                        }
          `}
                >
                    {value}
                </span>
            ) : (
                <p className="font-medium text-gray-800">{value}</p>
            )}
        </div>
    );
};

export default OrderDetails;

