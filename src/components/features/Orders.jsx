// orders?.js
import React, { useEffect, useState } from 'react';
import transactionService from '../../services/transactionService';
import { useUser } from '../../context/userProvider';
import OrderDetail from './OrderDetail';
import { Link, useNavigate } from 'react-router-dom';
import { pagination } from '../common/pagination';

const Orders = () => {
  const navigate = useNavigate();
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const [page, setPage] = useState(1);
  const { user } = useUser();
  const [orders, setOrders] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [paginationArray, setPaginationArray] = useState([]);
  const handleClickPrevious = () => {
    if (pageNumber >= 2) {
      setPageNumber(pageNumber - 1);
    }
  }
  const handleClickNext = () => {
    if (pageNumber < paginationArray[paginationArray.length - 1]) {
      setPageNumber(pageNumber + 1);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setPaginationArray(pagination(pageNumber, ))
        const data = await transactionService.findByUser({ page: pageNumber, size: 5, UserId: user.UserId });
        // setPaginationArray(pagination(data.currentPage, data.totalPages));
        setOrders(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [pageNumber]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await transactionService.findByUser({ page: pageNumber, size: 5, UserId: user.UserId });
        setPaginationArray(pagination(data.currentPage, data.totalPages));
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
    <div className="bg-gray-800 p-2 p-2 rounded-md shadow-md">
      <h2 className="text-2xl text-white font-bold mb-4">Orders</h2>

      <div className='overflow-x-auto bg-gray-800' >
        <table className='w-full '>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 my-10'>
            <tr className=''>
              <th>Order #</th>
              <th>Created</th>
              <th>status</th>
              <th>Total amount</th>
              <th>Order Details</th>
              {/* <th>subscription plan</th>
              <th>Updated Date</th>
              <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {orders?.items?.map(item => (
              <tr key={item?.id} className='border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'>

                <td key={item?.id} className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white '>
                  <span key={item?.id} className='p-2 rounded-md overflow-x-auto bg-blue-500 '>
                    #{item?.id}
                  </span>
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
                    {item?.transaction_status}
                  </span>
                </td>
                <td className='overflow-x-auto max-w-xs px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  <span className='p-2  rounded-md'>
                    {VND.format(item?.total_payment)}
                  </span>
                </td>
                <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white '>
                  <button className='bg-orange-500 p-2 rounded-md' onClick={() => handleClick(item)}>Order Details</button>
                </td>

              </tr>

            ))}
          </tbody>

        </table>
      </div>

      <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing &nbsp;
          <span className="font-semibold  ">{orders?.currentPage * 10 - 9}-{(orders?.currentPage * 10) > orders?.totalItems ? orders?.totalItems : orders?.currentPage * 10} </span>
          &nbsp; of &nbsp;
          <span className="font-semibold  ">{orders?.totalItems}</span>
        </span>

        <ul className="inline-flex items-stretch -space-x-px">
          <li>
            <button onClick={() => handleClickPrevious()} className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Previous</span>
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </button>
          </li>
          {paginationArray.map(item => (
            <li key={item}>
              {item == pageNumber ?
                (<button onClick={() => setPageNumber(item)} aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{item}</button>) :
                item !== '...' ? (<button onClick={() => setPageNumber(item)} className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >{item}</button>) : (<button className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >{item}</button>)
              }

            </li>)
          )}

          <li>
            <button onClick={() => handleClickNext()} className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Next</span>
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>

  );
};

export default Orders;
