import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaStore, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import React Icons

export default function AdminLayout({ children }) {
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
            <Link to="/admin" className="hover:text-blue-400">Dashboard</Link>
          </li>
          <li className="flex items-center">
            <FaUser className="mr-2" />
            <Link to="/admin/add-user" className="hover:text-blue-400">Add User</Link>
          </li>
          <li className="flex items-center">
            <FaStore className="mr-2" />
            <Link to="/admin/add-store" className="hover:text-blue-400">Add Store</Link>
          </li>
          <li className="flex items-center">
            <FaCog className="mr-2" />
            <Link to="/admin/settings" className="hover:text-blue-400 ">Settings</Link>
          </li>
          <li className="flex items-center">
            <FaSignOutAlt className="mr-2" />
            <Link to="/admin/logout" className="hover:text-blue-400  bg-red-100 border border-1 py-2 px-4 rounded-lg border-red-600 text-red-600">Logout</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
