import React from 'react';
import { Link } from 'react-router';

const PaymentFail = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">

        {/* Red Cross Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-red-600">
          Payment Failed
        </h2>

        {/* Message */}
        <p className="text-gray-500 mt-2">
          Oops! Something went wrong with your payment. Please try again.
        </p>

        {/* Home Button */}
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
