// LoginForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logic for handling login
    console.log('Logging in with:', email, password);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-3 rounded-md border border-gray-300"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full p-3 rounded-md border border-gray-300"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Link to="/forgot-password" className="text-blue-500 hover:underline ">
        Forgot Password?
      </Link>
      <button
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
