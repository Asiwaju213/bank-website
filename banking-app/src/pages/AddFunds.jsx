import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/useAuth';
import { addTransaction } from '../utils/storage';

const AddFunds = () => {
  const { currentUser, updateBalance, refreshUser } = useAuth();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!value || value <= 0) {
      setMessage({ type: 'error', text: 'Enter a valid amount above zero.' });
      return;
    }
    if (!currentUser) return;

    const newBalance = currentUser.balance + value;
    updateBalance(newBalance);
    addTransaction({
      id: Date.now().toString(),
      user: currentUser.username,
      type: 'Deposit',
      amount: value,
      target: null,
      timestamp: new Date().toISOString(),
      description: `Added ${value.toFixed(2)} USDC to wallet`,
    });

    setAmount('');
    refreshUser();
    setMessage({ type: 'success', text: 'Funds added successfully.' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar />
        <main className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Add Funds</p>
                <h1 className="text-3xl font-semibold text-white">Top up your wallet</h1>
              </div>
              <p className="text-sm text-slate-400">Deposit funds to your account.</p>
            </div>
          </div>

          <section className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Your Account</p>
              <div className="mt-4 flex items-center justify-between gap-4 rounded-3xl bg-slate-950/90 p-4">
                <div>
                  <p className="text-sm text-slate-400">Account Number</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{currentUser?.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Current Balance</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{(currentUser?.balance || 0).toFixed(2)} USDC</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/40">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm text-slate-300">Deposit Amount</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="100.00"
                    className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4 text-white outline-none focus:border-cyan-400"
                  />
                </div>
                <button className="w-full rounded-3xl bg-cyan-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                  Add Funds
                </button>
                {message && (
                  <p className={`text-sm ${message.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {message.text}
                  </p>
                )}
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AddFunds;
