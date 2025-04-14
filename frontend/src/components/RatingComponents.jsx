import axios from 'axios';
import { getToken } from '../utils/auth';

export default function RatingComponent({ storeId, onRated }) {
  const rate = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/stores/rate',
        { storeId, rating: 5 }, // Submit a 5-star rating
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      onRated(); // Callback to indicate the store has been rated
    } catch (error) {
      alert('Error rating store: ' + error.message);
    }
  };

  return (
    <button className="bg-blue-400 px-2 py-1 mt-2" onClick={rate}>
      Submit 5⭐
    </button>
  );
}
