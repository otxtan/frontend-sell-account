// UserInfo.js
import React, { useEffect, useState } from 'react';
import customerService from '../../services/customerService';
import { useUser } from '../../context/userProvider';

const UserInfo = () => {
const [customer,setCustomer]=useState(null);
  
  const {user} =useUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await customerService.findone(user.UserId);
        console.log(data);
        setCustomer(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>User Information</h2>
      <div className="bg-gray-900 p-4 rounded-md shadow-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-100">Username:</label>
          <input
            type="text"
            id="username"
            value={user?.username||''}
            readOnly
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-100">Full Name:</label>
          <input
            type="text"
            id="full_name"
            value={customer?.full_name||''}
            readOnly
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-100">Email:</label>
          <input
            type="text"
            id="phone_number"
            value={customer?.phone_number||''}
            readOnly
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email_address" className="block text-sm font-medium text-gray-100">Address:</label>
          <input
            type="text"
            id="email_address"
            value={customer?.email_address||''}
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
