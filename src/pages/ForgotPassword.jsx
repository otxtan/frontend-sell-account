import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Gửi yêu cầu khôi phục mật khẩu đến server
    console.log('Sending password reset request for:', email);
    // Gọi hàm API hoặc service của bạn để xử lý quên mật khẩu
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-3 rounded-md border border-gray-300"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300"
        onClick={handleForgotPassword}
      >
        Reset Password
      </button>
    </div>
  );
};

export default ForgotPassword;
