import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../utils/auth';
import { useUser } from '../context/UserContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser(); 

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

    
      const token = res.data.token;
      saveToken(token);

    
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const userInfo = {
        username: decoded.username,
        role: decoded.role,
      };

      setUser(userInfo);

      
      if (decoded.role === 'admin') navigate('/admin');
      else if (decoded.role === 'store_owner') navigate('/owner');
      else navigate('/user');

    } catch (error) {
      alert('Login failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <form onSubmit={login} className='bg-white p-10 rounded-xl shadow-lg w-80'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium mb-2'>Login</h1>
        <p className='text-sm text-center text-gray-500 mb-6'>Welcome back! Please sign in to continue</p>


        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mb-4'>
          <input
            className='outline-none text-sm w-full'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder='Email'
            required
          />
        </div>

       
        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mb-4'>
          <input
            className='outline-none text-sm w-full'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder='Password'
            required
          />
        </div>

        <p className='text-sm text-blue-600 mt-2 mb-4 cursor-pointer text-right'>Forgot password?</p>

        <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full'>
          Login
        </button>

        <p className='mt-5 text-center text-sm'>
          Don't have an account? <span onClick={() => navigate('/register')} className='text-blue-600 cursor-pointer'>Sign Up</span>
        </p>
      </form>
    </div>
  );
}
