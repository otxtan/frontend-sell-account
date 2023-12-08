// src/components/CMS.js
import React from 'react';
import RoleManager from '../components/features/RoleManager';
import ProductManagement from '../components/features/ProductManagement';
import UserManagement from '../components/features/UserMangaement';
import SidebarCMS from '../components/common/SiderbarCMS';
import { Navigate, Route, Routes } from 'react-router-dom';
import AccountManagement from '../components/features/AccountManagement'
const CMS = () => {
  return (
    <div className="container flex mx-auto mt-10 bg-white rounded-md shadow-md">

            {/* Sidebar */}
            <SidebarCMS />

            {/* Main Content */}
            <div className=" w-4/5 mx-auto h-screen">

                <main className=" overflow-x-hidden h-full overflow-y-auto bg-gray-900 mx-2 rounded-md">

                    <Routes>
                        {/* <Route path="role-manager" element={<roleManager />} /> */}
                        <Route path="user-manager" element={<UserManagement />} />
                        {/* <Route path="customer-manager" element={<customerManager />} /> */}
                        {/* <Route path="type-manager" element={<typeManager />} />
                        <Route path="category-manager" element={<categoryManagement />} /> */}
                        <Route path="product-manager" element={<ProductManagement />} />
                        {/* <Route path="subscriptionplan-manager" element={<subscriptionPlanManager />} /> */}
                        <Route path="account-manager" element={<AccountManagement />} />
                        <Route path="transaction-manager" element={<transactionManager />} />
                        {/* <Route path="transactiondetail-manager" element={<transactionDetailManager />} /> */}
                        <Route path="voucher-manager" element={<voucherManager />} />
                        <Route path="paymentmethod-manager" element={<paymentMethodManager />} />
                        {/* <Route path="/dashboard/account-management" element={<AccountManagement />} /> */}
                        {/* <Route
                            path="/"
                            element={<Navigate to="user-info" replace />}
                        /> */}
                    </Routes>
                </main>
            </div>
        </div>

  );
};

export default CMS;
