import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const Myorders = () => {
  const axiosPublic = useAxiosSecure();
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
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  const handleDuePayment = (id) => {  // id is order.id // 
    axiosPublic.post('/api/payment/duepayment_init', { order_id: id })
      .then((res) => {
        console.log(res.data.url)
        const url = res.data.url;
        if (url) {
          window.location.href = url;
        }
      }).catch(err => {
        console.log('Payment request error:', err);

      });
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">My Orders</h2>
          <span className="text-sm text-gray-500">
            Total: {orderData.length}
          </span>
        </div>

        {/* Empty */}
        {orderData.length === 0 && (
          <div className="bg-white rounded-xl p-10 text-center shadow">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}

        {/* Orders */}
        <div className="space-y-6">
          {orderData.map(order => (
            <div
              key={order.id}
              onClick={() => handleDuePayment(order.id)}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-6"
            >
              {/* Top */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Order #{order.id}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleString()}
                </span>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <Info label="Delivery Location" value={order.delivery_location} />
                <Info label="Customer Phone" value={order.customer_phone} />
                <Info label="Quantity" value={order.quantity} />
                <Info label="Payment Method" value={order.payment_method.toUpperCase()} />
                <Info label="Total Amount" value={`৳ ${order.payment}`} />
                <Info label="Due Amount" value={`৳ ${order.dueAmount}`} />
                <Status value={order.status} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

const Status = ({ value }) => {
  const color =
    value === 'panding'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-green-100 text-green-700';

  return (
    <div className="flex justify-between sm:col-span-2 lg:col-span-3">
      <span className="text-gray-600">Order Status</span>
      <span className={`px-3 py-1 text-black rounded-full text-xs font-semibold ${color}`}>
        {value}
      </span>
    </div>
  );
};

export default Myorders;


