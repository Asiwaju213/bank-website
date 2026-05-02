import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AccountCreated from './pages/AccountCreated';
import Dashboard from './pages/Dashboard';
import SendFunds from './pages/SendFunds';
import AddFunds from './pages/AddFunds';
import Withdraw from './pages/Withdraw';
import CryptoDeposit from './pages/CryptoDeposit';
import Airtime from './pages/Airtime';
import Tickets from './pages/Tickets';
import Support from './pages/Support';
import History from './pages/History';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading wallet...
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading wallet...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/account-created" element={<AccountCreated />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/send-funds" element={<ProtectedRoute><SendFunds /></ProtectedRoute>} />
      <Route path="/add-funds" element={<ProtectedRoute><AddFunds /></ProtectedRoute>} />
      <Route path="/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
      <Route path="/crypto-deposit" element={<ProtectedRoute><CryptoDeposit /></ProtectedRoute>} />
      <Route path="/airtime" element={<ProtectedRoute><Airtime /></ProtectedRoute>} />
      <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
      <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path="/" element={currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
