// Orders.js
import React from 'react';

const Orders = ({ onOrderClick }) => {
  const orders = [
    { id: 1, customer: 'Customer A', total: 50.0 },
    { id: 2, customer: 'Customer B', total: 75.5 },
    { id: 3, customer: 'Customer C', total: 30.25 },
  ];

  return (
    <div className="bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <ul className="space-y-4">
        {orders.map(order => (
          <li key={order.id} className="flex items-center justify-between border-b border-gray-300 py-2">
            <div>
              <span className="text-blue-500 font-semibold">Order #{order.id}</span>
              <p className="text-gray-600">Customer: {order.customer}</p>
            </div>
            <div>
              <span className="text-green-500 font-semibold">${order.total}</span>
              <button
                onClick={() => onOrderClick(order.id)}
                className="text-blue-500 hover:underline ml-2"
              >
                View Details
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
