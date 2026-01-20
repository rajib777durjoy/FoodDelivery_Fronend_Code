import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router';

import useAxiosSecure from '../../Hook/useAxiosSecure';

const Successpage = () => {
  const { tran_id } = useParams();
  const axiosPublic = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['order', tran_id],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/payment/paymentInformation/${tran_id}`
      );
      return res.data;
    },
    enabled: !!tran_id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white max-w-lg w-full rounded-xl shadow-md p-6">

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 text-2xl">✓</span>
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold text-green-600">
          Order Confirmed
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Thank you! Your order has been placed successfully.
        </p>

        {/* Order Info */}
        <div className="mt-6 space-y-3 text-sm">
          <Info label="Order ID" value={`#${data?.id}`} />
          <Info label="Transaction ID" value={data?.payment_tran_id} />
          <Info label="Payment Amount" value={`৳ ${data?.payment}`} />
          <Info label="dueAmount" value={`৳ ${data?.dueAmount || 0}`} />
          <Info
            label="Payment Method"
            value={data?.payment_method?.toUpperCase()}
          />
          <Info
            label="Payment Status"
            value={data?.payment_status ? 'Paid' : 'Unpaid'}
            green
          />
          <Info label="delivery Status" value={data?.status} />
          <Info label="Delivery Location" value={data?.delivery_location} />
          <Info label="Customer Phone" value={data?.customer_phone} />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <Link
            to="/"
            className="flex-1 py-2 text-center rounded-lg border bg-gray-800"
          >
            Go Home
          </Link>
          <Link
            to="/dashboard/payment_inbox"
            className="flex-1 py-2 text-center rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Payment history
          </Link>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value, green }) => (
  <div className="flex justify-between">
    <span className="text-gray-800">{label}</span>
    <span className={`font-medium text-gray-800 ${green && 'text-green-600'}`}>
      {value}
    </span>
  </div>
);

export default Successpage;

