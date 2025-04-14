import AdminKPI from '../components/AdminKPI';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaStore, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import React Icons

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [isUsersTab, setIsUsersTab] = useState(true);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    address: '',
    role: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/users', {
      headers: { Authorization: `Bearer ${getToken()}` }
    }).then(res => {
      setUsers(res.data);
      setFilteredUsers(res.data);
    });

    axios.get('http://localhost:5000/api/admin/stores', {
      headers: { Authorization: `Bearer ${getToken()}` }
    }).then(res => {
      setStores(res.data);
      setFilteredStores(res.data);
    });

    axios.get('http://localhost:5000/api/admin/ratings', {
      headers: { Authorization: `Bearer ${getToken()}` }
    }).then(res => {
      setRatings(res.data);
    });
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [name]: value };
      filterResults(newFilters);
      return newFilters;
    });
  };

  const filterResults = (newFilters) => {
    if (isUsersTab) {
      setFilteredUsers(
        users.filter((user) =>
          user.username.toLowerCase().includes(newFilters.name.toLowerCase()) &&
          user.email.toLowerCase().includes(newFilters.email.toLowerCase()) &&
          user.address.toLowerCase().includes(newFilters.address.toLowerCase()) &&
          (newFilters.role ? user.role === newFilters.role : true)
        )
      );
    } else {
      setFilteredStores(
        stores.filter((store) =>
          store.name.toLowerCase().includes(newFilters.name.toLowerCase()) &&
          store.email.toLowerCase().includes(newFilters.email.toLowerCase()) &&
          store.address.toLowerCase().includes(newFilters.address.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 h-screen bg-gray-50 border border-1 rounded-r-lg border-gray-600 text-gray-600 p-4">
        <div className="text-xl font-bold mb-6 flex items-center">
          <FaHome className="mr-2" /> Admin Dashboard
        </div>
        <ul className="space-y-4">
          <li className="flex items-center">
            <FaHome className="mr-2" />
            <a href="#" className="hover:text-blue-400">Dashboard</a>
          </li>
          <li className="flex items-center">
            <FaUser className="mr-2" />
            <Link to={'/admin/add-user'} className="hover:text-blue-400">Add User</Link>
          </li>
          <li className="flex items-center">
            <FaStore className="mr-2" />
            <Link to={'/admin/add-store'} className="hover:text-blue-400">Add Store</Link>
          </li>
          <li className="flex items-center">
            <FaCog className="mr-2" />
            <Link to={'/admin/settings'} className="hover:text-blue-400 ">Settings</Link>
          </li>
          <li className="flex items-center">
           
            <Link to={'/admin/logout'} className="hover:text-blue-400 flex  bg-red-100 border border-1 py-2 px-4 rounded-lg border-red-600 text-red-600">{ <FaSignOutAlt className="mr-2" />}Logout</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

        <AdminKPI totalUsers={users.length} totalStores={stores.length} totalRatings={ratings.length} />

        {/* Toggle Tabs */}
        <div className="mt-6 flex space-x-4">
          <button
            className={`px-6 py-2 rounded-lg ${isUsersTab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setIsUsersTab(true)}
          >
            Users
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${!isUsersTab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setIsUsersTab(false)}
          >
            Stores
          </button>
        </div>

        {/* Search Filters */}
        <div className="mt-6 flex space-x-4">
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleSearchChange}
            placeholder="Search by name"
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="email"
            value={filters.email}
            onChange={handleSearchChange}
            placeholder="Search by email"
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="address"
            value={filters.address}
            onChange={handleSearchChange}
            placeholder="Search by address"
            className="p-2 border rounded-lg"
          />
          {isUsersTab && (
            <select
              name="role"
              value={filters.role}
              onChange={handleSearchChange}
              className="p-2 border rounded-lg"
            >
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="store_owner">Store Owner</option>
              <option value="admin">Admin</option>
            </select>
          )}
        </div>

        {/* Conditional Rendering for Users or Stores */}
        {isUsersTab ? (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">All Users</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-6 py-3 text-left">Username</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Role</th>
                    <th className="px-6 py-3 text-left">Address</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="border-t">
                      <td className="px-6 py-4">{user.username}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className="px-6 py-4">{user.address}</td>
                      <td className="px-6 py-4">
                        <Link to={`/admin/user/${user.id}`} className="text-blue-600 hover:underline">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">All Stores</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Address</th>
                    <th className="px-6 py-3 text-left">Rating</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStores.map(store => (
                    <tr key={store.id} className="border-t">
                      <td className="px-6 py-4">{store.name}</td>
                      <td className="px-6 py-4">{store.email}</td>
                      <td className="px-6 py-4">{store.address}</td>
                      <td className="px-6 py-4">{store.rating}</td>
                      <td className="px-6 py-4">
                        <Link to={`/admin/store/${store.id}`} className="text-blue-600 hover:underline">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
