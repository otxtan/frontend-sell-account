// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/register';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import Orders from './components/features/Orders';
import AccountManagement from './components/features/AccountManagement';
import UserInfo from './components/features/UserInfo';
import Cart from './pages/Cart';
import ForgotPassword from './pages/ForgotPassword';
import Checkout from './pages/checkout';
import PaymentResult from './pages/paymentResult';
import ProductDetail from './pages/productDetail';
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <Routes>
            {/* Set up a Route for the Home component */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} >
              <Route path="/dashboard/" element={<UserInfo />} />
              <Route path="/dashboard/user-info" element={<UserInfo />} />
              <Route path="/dashboard/orders" element={<Orders />} />
              <Route path="/dashboard/account-management" element={<AccountManagement />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<UserInfo />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-result" element={<PaymentResult/>} />

            {/* Add other routes if needed */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
