import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: '🏠' },
  { label: 'Send Funds', to: '/send-funds', icon: '📤' },
  { label: 'Add Funds', to: '/add-funds', icon: '💰' },
  { label: 'Withdraw', to: '/withdraw', icon: '📥' },
  { label: 'Crypto Deposit', to: '/crypto-deposit', icon: '🪙' },
  { label: 'Airtime', to: '/airtime', icon: '📱' },
  { label: 'Tickets', to: '/tickets', icon: '✈️' },
  { label: 'Support', to: '/support', icon: '🎧' },
  { label: 'History', to: '/history', icon: '🧾' },
];

const Sidebar = () => {
  const { logout, currentUser } = useAuth();

  return (
    <aside className="w-full xl:w-72 bg-slate-950 text-slate-100 p-5 space-y-8 rounded-3xl shadow-2xl">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-xl shadow-lg">
            💳
          </div>
          <div>
            <p className="text-sm text-slate-400">Welcome back</p>
            <p className="text-lg font-semibold">{currentUser?.username || 'User'}</p>
          </div>
        </div>
        <p className="text-sm text-slate-400">Mobile wallet interface with fast access.</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                isActive ? 'bg-slate-100 text-slate-950 shadow-lg' : 'hover:bg-slate-800/80'
              }`
            }
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-4 border-t border-slate-700">
        <button
          onClick={logout}
          className="w-full text-left px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
