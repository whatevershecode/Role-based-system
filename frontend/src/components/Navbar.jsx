import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user, setUser } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white text-blue-800 p-4 shadow-lg flex justify-between shadow py-4">
      <Link to='/' className="text-xl ml-10 font-bold">Store<span className='text-blue-600'>Rater</span> </Link>
      <div className="relative flex items-center gap-4">
        {!user ? (
          <>
          <button className=' text-blue-600 border border-1 border-blue-600 bg-blue-50 px-4 py-1 rounded-xl'> <Link to="/login" className="hover:text-blue-800">Login</Link> </button> 
           <button className=' text-black border border-1 border-black px-4 py-1 rounded-xl'> <Link to="/register" className="hover:text-blue-800">Register</Link></button>
          </>
        ) : (
          <>
            {user.role === 'user' && <Link to="/user" className="hover:text-blue-800">User Dashboard</Link>}
            {user.role === 'store_owner' && <Link to="/owner" className="hover:text-blue-800">Owner Dashboard</Link>}
            {user.role === 'admin' && <Link to="/admin" className="hover:text-blue-800">Admin Dashboard</Link>}

            <div className="relative">
              <button onClick={() => setShowDropdown(!showDropdown)} className="ml-4 font-semibold hover:text-blue-800">
                {user.username}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-32">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;