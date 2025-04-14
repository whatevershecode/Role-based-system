import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

export default function AdminKPI() {
  const [data, setData] = useState({ users: 0, stores: 0, ratings: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/kpi', {
      headers: { Authorization: `Bearer ${getToken()}` }
    }).then(res => setData(res.data));
  }, []);

  return (



    <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-blue-50 border border-1 border-blue-600 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">{data.users}</p>
          </div>
          <div className="bg-blue-50 border border-1 border-blue-600 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Stores</h3>
            <p className="text-2xl font-bold">{data.stores}</p>
          </div>
          <div className="bg-blue-50 border border-1 border-blue-600 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Ratings</h3>
            <p className="text-2xl font-bold">{data.ratings}</p>
          </div>
        </div>
   
  );
}