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
import PrivateRoutes from './context/PrivateRoutes';
import { UserProvider } from './context/userProvider';
import OrderDetail from './components/features/OrderDetail';
import CMS from './pages/CMS';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchProduct from './pages/Search';
const App = () => {

  return (
    <UserProvider>

      <Router>
        <div className="flex flex-col min-h-screen ">
          <ToastContainer />
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Set up a Route for the Home component */}
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchProduct />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/logout" element={<Logout />} />
              {/* <Route path="/" element={<UserInfo />} /> */}
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route element={<PrivateRoutes />}>
              <Route path="/cms/*" element={<CMS />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path='/cart' element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment-result" element={<PaymentResult />} />

              </Route>
              {/* Add other routes if needed */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
