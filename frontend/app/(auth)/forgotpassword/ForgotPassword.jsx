'use client';

import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !phone) {
      setError('Please enter either email or phone number');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setMessage('A confirmation code has been sent to your provided contact. Your password has been successfully reset.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-teal-500 to-magenta-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Forgot Password</h2>
        <p className="text-gray-600 text-center mt-2">Enter your email or phone number to reset your password.</p>
        
        <form onSubmit={handleSubmit} className="mt-6">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <label className="block text-gray-700 mt-4">Phone Number</label>
          <input
            type="tel"
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          
          <label className="block text-gray-700 mt-4">New Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          
          <label className="block text-gray-700 mt-4">Confirm New Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          
          <button
            type="submit"
            className="w-full mt-4 bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition"
          >
            Reset Password
          </button>
        </form>
        
        {message && <p className="mt-4 text-center text-teal-700">{message}</p>}
      </div>
    </div>
  );
}
