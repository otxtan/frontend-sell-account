// OrderDetail.js
import React, { useEffect, useState } from 'react';
import transactionDetailService from '../../services/transactionDetailService';
import { useLocation } from 'react-router-dom';

const OrderDetail = () => {
  const location = useLocation();
  const { state } = location;
  const order = state && state.order;
  const [orderDetails,setOrderDetails]=useState([]);
  // Assume there are some order details to display
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await transactionDetailService.findbytransaction({id: order.id});
        setOrderDetails(data);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Detail - #{order?.id}</h2>
      <div className='flex flex-wrap'>

        <div className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4'>
          <span className="text-blue-500 font-semibold">Order #{order?.id}</span>
          <p className="text-gray-600"> {new Date(order?.transaction_date).toLocaleDateString()}</p>
        </div>
        <div className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4'>
          <span className="text-blue-500 font-semibold">status</span>
          <p className="text-gray-600">{order?.transaction_status}</p>
        </div>
        <div className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4'>
          <span className="text-blue-500 font-semibold">Total discount</span>
          <p className="text-gray-600">{order?.total_discount}</p>
        </div>
        <div className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4'>
          <span className="text-blue-500 font-semibold">Total amount</span>
          <p className="text-gray-600">{order?.total_amount}</p>
        </div>
        <div className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4'>
          <span className="text-blue-500 font-semibold">Total payment</span>
          <p className="text-gray-600">{order?.total_payment}</p>
        </div>
        <div className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4'>
          <span className="text-blue-500 font-semibold"> Payment Method</span>
          <p className="text-gray-600">{order?.PaymentMethodId}</p>
        </div>
        <div className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4'>
          <span className="text-blue-500 font-semibold"> Voucher</span>
          <p className="text-gray-600">{order?.VoucherCode}</p>
        </div>
      </div>

      <ul className="space-y-2">
        {console.log(orderDetails)}
        {orderDetails?.map(item => (
          <li key={item.id} className="flex items-center justify-between">
            <span className="font-semibold">{item?.Subscription_plan?.Product?.name}</span>
            <div>
              <span className="text-blue-500 font-semibold">Order Transaction #{item?.id}</span>
              <p className="text-gray-600"> {new Date(item?.transaction_date).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-blue-500 font-semibold">quantity</span>
              <p className="text-gray-600">{item?.quantity}</p>
            </div>
            <div>
              <span className="text-blue-500 font-semibold">price</span>
              <p className="text-gray-600">{item?.price}</p>
            </div>
            <div>
              <span className="text-blue-500 font-semibold">oldTotal</span>
              <p className="text-gray-600">{item?.oldTotal}</p>
            </div>
            <div>
              <span className="text-blue-500 font-semibold">Subscription_plan</span>
              <p className="text-gray-600">{item?.Subscription_plan?.packed_name}</p>
            </div>
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default OrderDetail;
