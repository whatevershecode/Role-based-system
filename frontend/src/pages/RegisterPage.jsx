import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    if (username.length < 20 || username.length > 60) {
      alert('Username must be between 20 and 60 characters.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email.');
      return;
    }

    if (password.length < 8 || password.length > 16 || !/[A-Z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      alert('Password must be 8-16 characters, include at least one uppercase letter and one special character.');
      return;
    }

    if (address.length > 400) {
      alert('Address should not exceed 400 characters.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password, address, role });
      if (role === 'admin') navigate('/admin');
      else if (role === 'store_owner') navigate('/owner');
      else navigate('/user');
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={register} className="bg-white p-10 rounded-xl shadow-lg w-80">
        <h1 className="text-center text-2xl text-neutral-700 font-medium mb-2">Register</h1>
        <p className="text-sm text-center text-gray-500 mb-6">Create an account to continue</p>
        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mb-4">
          <input className="outline-none text-sm w-full" onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Username" required />
        </div>
        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mb-4">
          <input className="outline-none text-sm w-full" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required />
        </div>
        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mb-4">
          <input className="outline-none text-sm w-full" onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
        </div>
        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mb-6">
          <select className="outline-none text-sm w-full bg-transparent" onChange={(e) => setRole(e.target.value)} value={role} required>
            <option value="user">User</option>
            <option value="store_owner">Store Owner</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mb-4">
          <input className="outline-none text-sm w-full" onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder="Address" required />
        </div>
        <button type="submit" className="bg-blue-600 w-full text-white py-2 rounded-full">Register</button>
        <p className='mt-5 text-center text-sm'>
          Already have an account? <span onClick={() => navigate('/login')} className='text-blue-600 cursor-pointer'>login</span>
        </p>
      </form>
    </div>
  );
}
