import React from 'react';

const PaymentSuccess = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Payment Successful</h2>
      <p className="text-gray-700">
        Thank you for your purchase! Your payment was successful, and your order has been confirmed.
      </p>
      {/* Thêm thông tin đơn hàng nếu cần */}
    </div>
  );
};

export default PaymentSuccess;
