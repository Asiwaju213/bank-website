import { useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/useAuth';
import { addDeposit, getDepositsByUser, updateDeposit, updateUser } from '../utils/storage';

const CryptoDeposit = () => {
  const { currentUser, refreshUser } = useAuth();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState(null);
  const userDeposits = useMemo(() => {
    return currentUser ? getDepositsByUser(currentUser.username) : [];
  }, [currentUser]);
  const [deposits, setDeposits] = useState(() => userDeposits);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!value || value <= 0) {
      setMessage({ type: 'error', text: 'Enter a valid USDC amount.' });
      return;
    }
    if (!currentUser) return;

    const deposit = {
      id: Date.now().toString(),
      user: currentUser.username,
      amount: value,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    addDeposit(deposit);
    setDeposits((prev) => [deposit, ...prev]);
    setAmount('');
    setMessage({ type: 'success', text: 'Deposit request submitted. Status pending.' });

    setTimeout(() => {
      updateDeposit(deposit.id, { status: 'confirmed' });
      setDeposits((prev) => prev.map((item) => (item.id === deposit.id ? { ...item, status: 'confirmed' } : item)));
      if (currentUser) {
        const updatedUser = { ...currentUser, balance: currentUser.balance + value };
        updateUser(currentUser.username, updatedUser);
        refreshUser();
        setMessage({ type: 'success', text: 'Deposit confirmed and balance updated.' });
      }
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar />
        <main className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Crypto Deposit</p>
                <h1 className="text-3xl font-semibold text-white">Deposit USDC</h1>
              </div>
              <p className="text-sm text-slate-400">Receive deposits directly to your account.</p>
            </div>
          </div>

          <section className="rounded-3xl border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/40">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm text-slate-300">USDC Amount</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="250.00"
                  className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4 text-white outline-none focus:border-cyan-400"
                />
              </div>
              <button className="w-full rounded-3xl bg-cyan-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                Request Deposit
              </button>
              {message && (
                <p className={`text-sm ${message.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {message.text}
                </p>
              )}
            </form>

            <div className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-white">Recent Deposit Requests</h2>
              {deposits.length === 0 ? (
                <p className="text-sm text-slate-500">No deposit activity yet.</p>
              ) : (
                <div className="space-y-3">
                  {deposits.map((deposit) => (
                    <div key={deposit.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{deposit.status}</p>
                          <p className="mt-2 text-lg font-semibold text-white">{deposit.amount.toFixed(2)} USDC</p>
                        </div>
                        <p className="text-sm text-slate-400">{new Date(deposit.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CryptoDeposit;
