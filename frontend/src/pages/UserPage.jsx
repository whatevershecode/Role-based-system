import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../Layouts/AdminLayout'; // Import the AdminLayout component

export default function AddUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/users', {
        name, email, password, address
      }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      alert('User added successfully!');
      navigate('/admin'); // Redirect back to the Admin Dashboard
    } catch (error) {
      alert('Error adding user: ' + (error.response?.data || error.message));
    }
  };

  return (
    <AdminLayout>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleAddUser} className="bg-white p-10 rounded-xl shadow-lg w-80">
          <h1 className="text-center text-2xl text-neutral-700 font-medium mb-4">Add User</h1>
          <div className="mb-4">
            <input
              className="w-full p-2 border rounded"
              placeholder="Name"
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
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Add User</button>
        </form>
      </div>
    </AdminLayout>
  );
}
