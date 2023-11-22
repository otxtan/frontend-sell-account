// UserInfo.js
import React from 'react';

const UserInfo = () => {
  // Giả sử có một số thông tin người dùng để hiển thị
  const user = {
    username: 'john_doe',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    address: ''
    // Thêm thông tin khác nếu cần
  };

  return (
    <div>
      <h2>User Information</h2>
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username:</label>
          <input
            type="text"
            id="username"
            value={user.username}
            readOnly
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={user.fullName}
            readOnly
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email:</label>
          <input
            type="text"
            id="email"
            value={user.email}
            readOnly
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Address:</label>
          <input
            type="text"
            id="email"
            value={user.Address}
            readOnly
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        {/* Hiển thị thông tin khác nếu cần */}
      </div>
    </div>
  );
};

export default UserInfo;
