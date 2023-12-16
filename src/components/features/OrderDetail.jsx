// OrderDetail.js
import React, { useEffect, useState } from 'react';
import transactionDetailService from '../../services/transactionDetailService';
import { useLocation } from 'react-router-dom';

const OrderDetail = () => {
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const location = useLocation();
  const { state } = location;
  const order = state && state.order;
  const [orderDetails, setOrderDetails] = useState([]);
  // Assume there are some order details to display

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await transactionDetailService.findbytransaction({ id: order.id });
        setOrderDetails(data);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-gray-900 p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Detail - #{order?.id}</h2>


      <div className='flex flex-wrap'>

        <div className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4'>
          <span className="text-blue-500 font-semibold">Order #{order?.id}</span>
          <p className="text-gray-100"> {new Date(order?.transaction_date).toLocaleDateString()}</p>
        </div>
        <div className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4'>
          <span className="text-blue-500 font-semibold">status</span>
          <p className="text-gray-100">{order?.transaction_status == 1 ? 'đã thanh toán': 'chưa thanh toán'
          
        }</p>
        </div>
        <div className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4'>
          <span className="text-blue-500 font-semibold">Total discount</span>
          <p className="text-gray-100">{VND.format(order?.total_discount)}</p>
        </div>
        <div className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4'>
          <span className="text-blue-500 font-semibold">Total amount</span>
          <p className="text-gray-100">{VND.format(order?.total_amount)}</p>
        </div>
        <div className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4'>
          <span className="text-blue-500 font-semibold">Total payment</span>
          <p className="text-gray-100">{VND.format(order?.total_payment)}</p>
        </div>
        <div className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4'>
          <span className="text-blue-500 font-semibold"> Payment Method</span>
          <p className="text-gray-100">{order?.PaymentMethodId}</p>
        </div>
        <div className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4'>
          <span className="text-blue-500 font-semibold"> Voucher</span>
          <p className="text-gray-100">{order?.VoucherCode}</p>
        </div>
      </div>
      <div className='overflow-x-auto bg-gray-800' >
        <table className='w-full '>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 my-10'>
            <tr className=''>
              <th>
                <span className="text-blue-500 font-semibold">Order Transaction </span>

              </th>
              <th>account</th>
              <th>Created</th>
              <th>quantity</th>
              <th>price</th>
              <th>Total</th>
              <th>Subscription_plan</th>
              {/* <th>subscription plan</th>
              <th>Updated Date</th>
              <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {orderDetails?.map(item => (
              <tr key={item?.id} className='border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'>

                <td key={item?.id} className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white '>
                  <span key={item?.id} className='p-2 rounded-md overflow-x-auto bg-blue-500 '>
                    #{item?.id}
                  </span>
                </td>
                <td class="overflow-x-auto max-w-xs px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>{item?.Account?.information}</span>
                </td>
                <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{new Date(item?.transaction_date).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}</td>
                <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  <span className='p-2 rounded-md overflow-x-auto '>
                    {item?.quantity}
                  </span>
                </td>
                <td className='overflow-x-auto max-w-xs px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  <span className='p-2  rounded-md'>
                    {VND.format(item?.price)}
                  </span>
                </td>
                <td className='overflow-x-auto max-w-xs px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  <span className='p-2  rounded-md'>
                    {VND.format(item?.oldTotal)}
                  </span>
                </td>
                <td className='overflow-x-auto max-w-xs px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  <span className='p-2  rounded-md'>
                    {item?.Subscription_plan?.packed_name}
                  </span>
                </td>
                {/* <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  <button className='bg-orange-500 p-2' onClick={() => handleClick(item)}>Order Details</button>
                </td> */}

              </tr>

            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default OrderDetail;
