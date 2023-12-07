// src/components/Header.js
import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import { useUser } from '../../context/userProvider';
import '../../assets/styles/Header.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const showMessage = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000, // Đóng tự động sau 3000 milliseconds (3 giây)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  const { user, login, logout, cartContext, setCartContext } = useUser();
  const [isListVisible, setListVisible] = useState(false);



  const toggleListVisibility = () => {
    setListVisible(!isListVisible);
  };

  return (
    <header className="bg-gray-800 p-4">
      <ToastContainer />
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo hoặc Tên ứng dụng */}
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="text-white text-2xl font-bold">
            AccTradeRent
          </Link>
        </div>

        {/* Tìm kiếm và Danh mục */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={toggleListVisibility}
            className="bg-orange-500 text-white px-4 py-2 rounded-md md:hidden"
          >
            Danh Mục
          </button>
          {isListVisible && (
            <div className="absolute top-20 right-1/2 transform translate-x-1/2 bg-gray-800 text-white border border-gray-300 p-6 rounded-md z-20 w-screen md:w-4/5 md:relative md:flex md:space-x-4">
              {/* Danh sách loại sản phẩm */}
              <ul className="space-y-2 md:space-y-0 md:flex md:items-center">
                <li>Loại sản phẩm 1</li>
                <li>Loại sản phẩm 2</li>
                <li>Loại sản phẩm 3</li>
                {/* Thêm các mục loại sản phẩm khác tùy ý */}
              </ul>
            </div>
          )}

          <input
            type="text"
            placeholder="Search..."
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 w-full md:w-64"
          />
         
         
        </div>

        {/* Giỏ hàng và Đăng nhập/Đăng ký */}
        {!user ? (<div className="flex items-center space-x-4">
          <Link to="/cart" className="text-white hover:text-gray-300 ">
            <i className="fas fa-shopping-cart text-2xl"></i>

          </Link>
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
          <Link to="/register" className="bg-orange-500 text-white-500 px-4 py-2 rounded-md hover:bg-gray-100">
            Sign Up
          </Link>
        </div>) : (<div className="flex items-center space-x-4">
          <Link to="/cart" className="text-white hover:text-gray-300">
            <div className='cart-icon-container'>
              <i className="fas fa-shopping-cart text-2xl"></i>
              <span className="cart-badge">{cartContext?.length}</span>
              {console.log(cartContext?.length)}
            </div>
          </Link>
          <Link to="/dashboard" className="text-white hover:text-gray-300">
            {user.username}
          </Link>
          <button to="/login" onClick={logout} className="bg-orange-500 text-white-500 px-4 py-2 rounded-md hover:bg-gray-100">
            Logout
          </button>
        </div>)}


      </div>
    </header>
  );
};

export default Header;
