import React, { useContext } from 'react';
import useAxiosPublic from '../../Hook/useAxiosPublic';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const Myorders = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { data: orderData = [], isLoading } = useQuery({
    queryKey: ['orders', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/restaurant/my_order_list/${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          My Orders
        </h2>

        {/* Empty State */}
        {orderData.length === 0 && (
          <div className="bg-white rounded-lg p-8 text-center shadow">
            <p className="text-gray-500">
              You have not placed any orders yet.
            </p>
          </div>
        )}

        {/* Order List */}
        <div className="space-y-4">
          {orderData.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow p-5"
            >
              {/* Top Row */}
              <div className="flex flex-wrap justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">
                  Order #{order.id}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleString()}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <Info label="Transaction ID" value={order.payment_tran_id} />
                <Info label="Payment Method" value={order.payment_method.toUpperCase()} />
                <Info label="Amount" value={`৳ ${order.payment}`} />
                <Info label="dueAmount" value={`৳ ${order.dueAmount || 0}`} />
                <Info
                  label="Payment Status"
                  value={order.payment_status ? 'Paid' : 'Unpaid'}
                  green={order.payment_status}
                />
                <Info label="delivery Status" value={order.status} />
                <Info label="Delivery Location" value={order.delivery_location} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

const Info = ({ label, value, green }) => (
  <div className="flex justify-between">
    <span className="text-gray-700">{label}</span>
    <span className={`font-medium text-gray-800 ${green && 'text-green-600'}`}>
      {value}
    </span>
  </div>
);

export default Myorders;
