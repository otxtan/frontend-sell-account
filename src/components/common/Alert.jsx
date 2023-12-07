import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Alert ={
    showMessage:  (message) => {
        toast.success(message, {
          position: 'top-right',
          autoClose: 3000, // Đóng tự động sau 3000 milliseconds (3 giây)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    
};
export default Alert;