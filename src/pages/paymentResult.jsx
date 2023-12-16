import React, { useEffect, useState } from 'react';
import transactionService from '../services/transactionService';
import { useLocation } from 'react-router-dom';

const PaymentResult = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Xử lý kết quả thanh toán từ VNPAY
    const fetchData = async () => {
      await transactionService.confirmPayment(location.state.id,{transaction_status:true})
      // const queryParams = new URLSearchParams(window.location.search);
      
      setIsSuccess(true);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full mx-auto my-20 flex items-center justify-center ">
      <div className="bg-gray-100 p-8 shadow-md rounded-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Payment Result</h2>
        {isSuccess ? (
          <div className="text-green-500">
            <p className="text-lg">Payment Successful!</p>
            {/* Hiển thị thông tin khác nếu cần */}
          </div>
        ) : (
          <div className="text-red-500">
            <p className="text-lg">Payment Failed!</p>
            {/* Hiển thị thông tin khác nếu cần */}
          </div>
        )}
        {/* Thêm các phần khác cần hiển thị */}
      </div>
    </div>
  );
};

export default PaymentResult;
