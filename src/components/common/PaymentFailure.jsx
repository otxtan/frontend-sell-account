import React from 'react';

const PaymentFailure = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Payment Failed</h2>
      <p className="text-gray-700">
        Oops! It seems there was an issue processing your payment. Please try again later.
      </p>
      {/* Thêm hướng dẫn hoặc liên hệ hỗ trợ nếu cần */}
    </div>
  );
};

export default PaymentFailure;
