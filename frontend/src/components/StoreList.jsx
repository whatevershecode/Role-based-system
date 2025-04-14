import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

export default function StoreList({ onRate }) {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stores', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setStores(response.data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Stores</h2>
      {stores.map((store) => (
        <div key={store.id} className="border p-4 mb-4 rounded-lg shadow-sm bg-white">
          <p className="text-lg font-semibold text-gray-800">{store.name}</p>
          <p className="text-sm text-gray-600">{store.address}</p>
          <p className="text-sm text-gray-600">Average Rating: {store.averageRating || 'No ratings yet'}</p>
          {onRate && (
            <button
              className="mt-3 inline-block bg-yellow-400 hover:bg-yellow-500 text-sm px-4 py-2 rounded"
              onClick={() => onRate(store.id)}
            >
              Rate ⭐
            </button>
          )}
        </div>
      ))}
    </div>
  );
}