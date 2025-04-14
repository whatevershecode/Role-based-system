import { useState, useEffect } from 'react'; 
import axios from 'axios';
import { getToken } from '../utils/auth';
import { FiSearch as MagnifyingGlassIcon } from 'react-icons/fi';
import { FiStar as StarIcon } from 'react-icons/fi';
import { FiMapPin as MapPinIcon } from 'react-icons/fi';

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stores', {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        setStores(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching stores:', error);
        setIsLoading(false);
      }
    };
    fetchStores();
  }, []);

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRateStore = async (rating) => {
    if (!selectedStore) return;
    
    try {
      await axios.post(
        'http://localhost:5000/api/stores/rate',
        { storeId: selectedStore.id, rating },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      
      const updatedStores = stores.map(store => {
        if (store.id === selectedStore.id) {
          return {
            ...store,
            userRating: rating,
            averageRating: ((store.averageRating * (store.ratingCount || 0)) + rating) / 
                          ((store.ratingCount || 0) + (store.userRating ? 0 : 1))
          };
        }
        return store;
      });
      
      setStores(updatedStores);
      setSelectedStore({
        ...selectedStore,
        userRating: rating
      });
    } catch (error) {
      console.error('Error rating store:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Store Ratings</h1>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by store name or address..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Store List */}
            <div className="md:col-span-2 space-y-4">
              {filteredStores.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <p className="text-gray-500">No stores found matching your search.</p>
                </div>
              ) : (
                filteredStores.map(store => (
                  <div 
                    key={store.id} 
                    className={`bg-white p-6 rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md border-l-4 ${selectedStore?.id === store.id ? 'border-blue-500' : 'border-transparent'}`}
                    onClick={() => {
                      setSelectedStore(store);
                      setUserRating(store.userRating || 0);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{store.name}</h3>
                        <p className="text-gray-600 mt-1 flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {store.address}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 text-gray-700">
                          {typeof store.averageRating === 'number' 
                            ? store.averageRating.toFixed(1) 
                            : 'No ratings'}
                        </span>
                      </div>
                    </div>
                    {store.userRating && (
                      <div className="mt-2 text-sm text-gray-500">
                        Your rating: {store.userRating}⭐
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            
            {/* Store Details and Rating */}
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6 h-fit">
              {selectedStore ? (
                <>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedStore.name}</h2>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {selectedStore.address}
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 text-gray-700 font-medium">
                        Average Rating: {typeof selectedStore.averageRating === 'number' 
                          ? selectedStore.averageRating.toFixed(1) 
                          : 'No ratings'}
                      </span>
                    </div>
                    {selectedStore.userRating && (
                      <div className="text-sm text-gray-600">
                        Your rating: {selectedStore.userRating}⭐
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-md font-semibold text-gray-800 mb-3">Rate this store</h3>
                    <div className="flex space-x-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRateStore(star)}
                          className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${userRating >= star ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                        >
                          <StarIcon className="h-5 w-5" />
                          <span className="sr-only">{star} star</span>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => handleRateStore(userRating)}
                      disabled={userRating === 0}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${userRating === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                      {selectedStore.userRating ? 'Update Rating' : 'Submit Rating'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <StarIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p>Select a store to view details and rate</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
