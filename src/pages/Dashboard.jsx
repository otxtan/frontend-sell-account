// Dashboard.js
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserInfo from '../components/features/UserInfo';
import Orders from '../components/features/Orders';
import OrderDetail from '../components/features/OrderDetail';
import AccountManagement from '../components/features/AccountManagement';
import Sidebar from '../components/common/SidebarDashBoard';

const Dashboard = () => {

    return (

        <div className="container flex mx-auto mt-10 p-6 bg-white rounded-md shadow-md">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className=" w-4/5 mx-auto h-screen">

                <main className=" overflow-x-hidden h-full overflow-y-auto bg-gray-200 p-4">

                    <Routes>
                        <Route path="user-info" element={<UserInfo />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="order-details/" element={<OrderDetail />} />
                        {/* <Route path="/dashboard/account-management" element={<AccountManagement />} /> */}
                        <Route
                            path="/"
                            element={<Navigate to="user-info" replace />}
                        />
                    </Routes>
                </main>
            </div>
        </div>


    );
};

export default Dashboard;
