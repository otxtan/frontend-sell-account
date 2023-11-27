// Orders.js
import React, { useEffect, useState } from 'react';
import transactionService from '../../services/transactionService';
import { useUser } from '../../context/userProvider';
import OrderDetail from './OrderDetail';
import { Link, useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const [page, setPage] = useState(1);
  const { user } = useUser();
  const [orders, setOrders] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await transactionService.findByUser({ page: page, size: 5, UserId: user.UserId });
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [page]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await transactionService.findByUser({ page: page, size: 5, UserId: user.UserId });
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (order) => {
    navigate('/dashboard/order-details', { state: { order } });
  }
  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <ul className="space-y-4">
        {orders?.items?.map(order => (
          <li key={order?.id} className="flex flex-wrap items-center justify-between border-b border-gray-300 py-2">
            <div>
              <span className=" font-semibold">Order #{order?.id}</span>
              <p className="text-gray-600"> {new Date(order?.transaction_date).toLocaleDateString()}</p>
            </div>
            <div>
              <span className=" font-semibold">status</span>
              <p className="text-gray-600">{order?.transaction_status}</p>
            </div>
            <div>
              <span className=" font-semibold">Total amount</span>
              <p className="text-green-500 font-semibold">{VND.format(order?.total_payment)}</p>

            </div>
              <button className='bg-orange-500 p-2' onClick={() => handleClick(order)}>Order Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
