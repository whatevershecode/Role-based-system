import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../Layouts/AdminLayout'; // Import the AdminLayout component

export default function AddStorePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/stores', // POST request to the backend to add store
        { name, email, password, address },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      alert('Store added successfully!');
      navigate('/admin'); // Redirect to admin page after successful store addition
    } catch (error) {
      alert('Error adding store: ' + (error.response?.data || error.message));
    }
  };

  return (
    <AdminLayout>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleAddStore} className="bg-white p-10 rounded-xl shadow-lg w-80">
          <h1 className="text-center text-2xl text-neutral-700 font-medium mb-4">Add Store</h1>
          <div className="mb-4">
            <input
              className="w-full p-2 border rounded"
              placeholder="Store Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-2 border rounded"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-2 border rounded"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-2 border rounded"
              placeholder="Store Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg">Add Store</button>
        </form>
      </div>
    </AdminLayout>
  );
}
