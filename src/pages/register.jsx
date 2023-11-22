// RegisterForm.js
import React, { useState } from 'react';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Logic for handling registration
    console.log('Registering with:', email, password);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Register</h2>
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
      <button
        className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-all duration-300"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
