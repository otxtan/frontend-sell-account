// OrderDetail.js
import React from 'react';

const OrderDetail = ({ orderId, onClose }) => {
  // Assume there are some order details to display
  const orderDetails = {
    items: [
      { id: 1, name: 'Item A', price: 20.0, quantity: 2 },
      { id: 2, name: 'Item B', price: 30.5, quantity: 1 },
    ],
    total: 70.5,
    shippingAddress: '123 Main St, City, Country',
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Detail - #{orderId}</h2>
      <ul className="space-y-2">
        {orderDetails.items.map(item => (
          <li key={item.id} className="flex items-center justify-between">
            <span className="font-semibold">{item.name}</span>
            <span>${item.price} x {item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-300 mt-4 pt-4">
        <p className="text-lg font-semibold">Total: ${orderDetails.total}</p>
        <p className="text-gray-600"><strong>Shipping Address:</strong> {orderDetails.shippingAddress}</p>
      </div>
      <button onClick={onClose} className="text-blue-500 hover:underline mt-4">Close</button>
    </div>
  );
};

export default OrderDetail;
