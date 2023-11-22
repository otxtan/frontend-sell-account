// Dashboard.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import UserInfo from '../components/features/UserInfo';
import Orders from '../components/features/Orders';
import OrderDetail from '../components/features/OrderDetail';
import AccountManagement from '../components/features/AccountManagement';

const Dashboard = () => {
    const [selectedNavItem, setSelectedNavItem] = useState(null);

    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleNavItemClick = (navItem) => {
        setSelectedNavItem(navItem);
    };

    const renderContent = () => {
        switch (selectedNavItem) {
            case 'user-info':
              return <UserInfo />;
            case 'orders':
              return <Orders onOrderClick={handleOrderClick} />;
            case 'order-detail':
              return <OrderDetail orderId={selectedOrderId} onClose={handleOrderDetailClose} />;
            case 'account-management':
              return <AccountManagement />;
            // Add other cases as needed
            default:
              return <UserInfo/>;
        }
    };

    const handleOrderClick = (orderId) => {
        setSelectedNavItem('order-detail');
        setSelectedOrderId(orderId);
    };

    const handleOrderDetailClose = () => {
        setSelectedNavItem('orders');
        setSelectedOrderId(null);
    };


    return (

        <div className="md:flex my-10 mx-20 ">
            <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                <li>
                    <Link to="/dashboard/user-info" onClick={() => handleNavItemClick('user-info')} className="inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600" aria-current="page" >
                            <svg className="w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            Profile
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/orders" onClick={() => handleNavItemClick('orders')} className="inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600" aria-current="page" >
                        <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"><path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" /></svg>
                        Orders

                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/account-management" onClick={() => handleNavItemClick('account-management')} className="inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600" aria-current="page">
                
                            <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                            </svg>
                            Settings
                    
                    </Link>
                </li>

                <li>
                    <a className="inline-flex items-center px-4 py-3 text-gray-400 rounded-lg cursor-not-allowed bg-gray-50 w-full dark:bg-gray-800 dark:text-gray-500">
                        <svg className="w-4 h-4 me-2 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                        </svg>
                        Disabled</a>
                </li>
            </ul>
            <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-200 rounded-lg w-full">
                {renderContent()}
                {/* <Outlet /> */}
            </div>
        </div>


    );
};

export default Dashboard;
