import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

export default function OwnerDashboard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/stores/owner/stats', {
      headers: { Authorization: `Bearer ${getToken()}` }
    }).then(res => setCount(res.data.ratings));
  }, []);

  return (
    <div className="flex flex-col lg:flex-row p-6">
      {/* Sidebar */}
      <div className="lg:w-1/4 bg-gray-800 text-white p-6 rounded-lg shadow-md mb-6 lg:mb-0">
        <div className="text-xl font-bold mb-6">Owner Dashboard</div>
        <ul className="space-y-4">
          <li><a href="#" className="text-gray-300 hover:text-blue-400">Dashboard</a></li>
          <li><a href="#" className="text-gray-300 hover:text-blue-400">Store Overview</a></li>
          <li><a href="#" className="text-gray-300 hover:text-blue-400">Orders</a></li>
          <li><a href="#" className="text-gray-300 hover:text-blue-400">Settings</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="lg:w-3/4 p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Store Owner Dashboard</h1>
        
        {/* KPI Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-center">
            <h3 className="text-lg font-semibold text-gray-700">Total Ratings</h3>
            <p className="text-4xl font-bold text-blue-600">{count}</p>
          </div>
        </div>

        {/* Section Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">Store Stats</h2>

        {/* Stats Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">Orders Received</h3>
            <p className="text-2xl font-bold text-gray-800">150</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">Products Sold</h3>
            <p className="text-2xl font-bold text-gray-800">320</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
            <p className="text-2xl font-bold text-green-600">$5,200</p>
          </div>
        </div>
      </div>
    </div>
  );
}
