import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/useAuth';
import { getUserByIdentifier, addTransaction, updateUser } from '../utils/storage';

const SendFunds = () => {
  const { currentUser, refreshUser } = useAuth();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!recipient.trim() || !value || value <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid recipient and amount.' });
      return;
    }
    if (!currentUser) return;
    if (recipient.trim() === currentUser.username || recipient.trim() === currentUser.accountNumber) {
      setMessage({ type: 'error', text: 'You cannot send funds to yourself.' });
      return;
    }

    const targetUser = getUserByIdentifier(recipient.trim());
    if (!targetUser) {
      setMessage({ type: 'error', text: 'Recipient not found.' });
      return;
    }
    if (value > currentUser.balance) {
      setMessage({ type: 'error', text: 'Insufficient balance.' });
      return;
    }

    const senderUpdated = { ...currentUser, balance: currentUser.balance - value };
    const recipientUpdated = { ...targetUser, balance: targetUser.balance + value };
    updateUser(currentUser.username, senderUpdated);
    updateUser(targetUser.username, recipientUpdated);

    const timestamp = new Date().toISOString();
    addTransaction({
      id: `${Date.now()}-out`,
      user: currentUser.username,
      type: 'Transfer',
      amount: -value,
      target: targetUser.username,
      timestamp,
      description: `Sent ${value.toFixed(2)} USDC to ${targetUser.username}`,
    });
    addTransaction({
      id: `${Date.now()}-in`,
      user: targetUser.username,
      type: 'Receive',
      amount: value,
      target: currentUser.username,
      timestamp,
      description: `Received ${value.toFixed(2)} USDC from ${currentUser.username}`,
    });

    refreshUser();
    setAmount('');
    setRecipient('');
    setMessage({ type: 'success', text: 'Funds sent successfully.' });
    navigate('/history');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar />
        <main className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Send Funds</p>
                <h1 className="text-3xl font-semibold text-white">Transfer USDC</h1>
              </div>
              <p className="text-sm text-slate-400">Secure wallet transfers with instant ledger updates.</p>
            </div>
          </div>

          <section className="rounded-3xl border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/40">
            <div className="mb-6 flex items-center justify-between gap-4 rounded-3xl bg-slate-900/80 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Current Balance</p>
                <p className="text-3xl font-semibold text-white">{(currentUser?.balance || 0).toFixed(2)} USDC</p>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm text-slate-300">Recipient Username or Account Number</label>
                <input
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Enter username or account number"
                  className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4 text-white outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Amount (USDC)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4 text-white outline-none focus:border-cyan-400"
                />
              </div>
              <button className="w-full rounded-3xl bg-cyan-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                Send Funds
              </button>
              {message && (
                <p className={`text-sm ${message.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {message.text}
                </p>
              )}
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SendFunds;
