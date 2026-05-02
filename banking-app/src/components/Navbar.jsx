import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../utils/storage';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">Banking App</Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/transactions" className="hover:underline">Transactions</Link>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;