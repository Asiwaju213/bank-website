import { useState } from 'react';
import { getUserByUsername, updateUser, getCurrentUser } from '../utils/storage';

const TransactionForm = ({ onTransaction }) => {
  const [type, setType] = useState('add');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = getCurrentUser();
    const user = getUserByUsername(currentUser);
    let newBalance = user.balance;

    if (type === 'add') {
      newBalance += parseFloat(amount);
      updateUser(currentUser, { ...user, balance: newBalance });
      setMessage('Funds added successfully!');
    } else if (type === 'withdraw') {
      if (parseFloat(amount) > user.balance) {
        setMessage('Insufficient balance!');
        return;
      }
      newBalance -= parseFloat(amount);
      updateUser(currentUser, { ...user, balance: newBalance });
      setMessage('Funds withdrawn successfully!');
    } else if (type === 'transfer') {
      const recipUser = getUserByUsername(recipient);
      if (!recipUser) {
        setMessage('Recipient not found!');
        return;
      }
      if (parseFloat(amount) > user.balance) {
        setMessage('Insufficient balance!');
        return;
      }
      newBalance -= parseFloat(amount);
      updateUser(currentUser, { ...user, balance: newBalance });
      updateUser(recipient, { ...recipUser, balance: recipUser.balance + parseFloat(amount) });
      setMessage('Transfer successful!');
    }

    setAmount('');
    setRecipient('');
    onTransaction(); // callback to refresh balance
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Transaction Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="add">Add Funds</option>
            <option value="withdraw">Withdraw Funds</option>
            <option value="transfer">Transfer Funds</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {type === 'transfer' && (
          <div className="mb-4">
            <label className="block text-gray-700">Recipient Username</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700">
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default TransactionForm;