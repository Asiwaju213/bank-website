import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserByUsername } from '../utils/storage';
import Navbar from '../components/Navbar';
import TransactionForm from '../components/TransactionForm';

const Transactions = () => {
  const [user, setUser] = useState(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;
    return getUserByUsername(currentUser);
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const refreshUser = () => {
    const currentUser = getCurrentUser();
    const userData = getUserByUsername(currentUser);
    setUser(userData);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Transactions</h1>
        <TransactionForm onTransaction={refreshUser} />
      </div>
    </div>
  );
};

export default Transactions;