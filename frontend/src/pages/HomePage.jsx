import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import store_rating from '../assets/store-rating.jpg'

const HomePage = () => {

    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Section */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold text-blue-700 leading-tight mb-6">
            Welcome to Store Rating System
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Discover and rate local stores based on your experience. Help others make informed decisions and support quality service.
          </p>
          <div className="flex gap-4">
            <button onClick={()=>navigate('/login')} className='bg-blue-50 border border-1 border-blue-600 py-4 px-4 rounded-lg text-blue-600'>Get Started</button>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="w-full md:w-1/2">
          <img
            src={store_rating}
            alt="Store Rating"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
