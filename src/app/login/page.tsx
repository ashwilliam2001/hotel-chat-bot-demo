'use client';
import React, { useState } from 'react';
import { Button } from "../../app/components/ui/button";
import { Input } from "../../app/components/ui/input";
import { Label } from "../../app/components/ui/label";

export default function Login() {
  const [userType, setUserType] = useState('customer');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [bookingNumber, setBookingNumber] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login Attempt:', { userType, identifier, password, roomNumber, bookingNumber });
    alert(`Logging in as ${userType} with ${identifier}`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1470')",
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 space-y-6 bg-opacity-90 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Hotel Chatbot Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700">User Type</Label>
            <select
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
                if (e.target.value !== 'customer') {
                  setRoomNumber(''); // Clear room number for non-customers
                  setBookingNumber(''); // Clear booking number for non-customers
                }
              }}
              className="block w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="customer">Customer</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              {userType === 'customer' ? 'Email' : userType === 'staff' ? 'Employee ID' : 'Username'}
            </Label>
            <Input
              placeholder={`Enter your ${userType === 'customer' ? 'email' : userType === 'staff' ? 'employee ID' : 'username'}`}
              type={userType === 'customer' ? 'email' : 'text'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          {userType === 'customer' && (
            <>
              <div>
                <Label className="block text-sm font-medium text-gray-700">Room Number</Label>
                <Input
                  placeholder="Enter your room number"
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  required
                  className="w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700">Booking Number</Label>
                <Input
                  placeholder="Enter your booking number"
                  type="text"
                  value={bookingNumber}
                  onChange={(e) => setBookingNumber(e.target.value)}
                  required
                  className="w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </>
          )}
          <div>
            <Label className="block text-sm font-medium text-gray-700">Password</Label>
            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Button
              type="button"
              className="text-sm mb-2 sm:mb-0 bg-gray-200 hover:bg-gray-300 rounded-md transition"
            >
              Register
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white w-full sm:w-auto rounded-md transition hover:bg-blue-700"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
