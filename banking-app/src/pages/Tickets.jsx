import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/useAuth';
import { addTransaction } from '../utils/storage';

const Tickets = () => {
  const { currentUser, updateBalance, refreshUser } = useAuth();
  const [destination, setDestination] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(price);
    if (!destination.trim() || !value || value <= 0) {
      setMessage({ type: 'error', text: 'Enter a destination and valid price.' });
      return;
    }
    if (!currentUser) return;
    if (value > currentUser.balance) {
      setMessage({ type: 'error', text: 'Insufficient balance to buy ticket.' });
      return;
    }

    const newBalance = currentUser.balance - value;
    updateBalance(newBalance);
    addTransaction({
      id: Date.now().toString(),
      user: currentUser.username,
      type: 'Ticket',
      amount: -value,
      target: destination,
      timestamp: new Date().toISOString(),
      description: `Purchased airline ticket to ${destination}`,
    });

    setDestination('');
    setPrice('');
    refreshUser();
    setMessage({ type: 'success', text: 'Ticket booked successfully.' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar />
        <main className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Airline Tickets</p>
                <h1 className="text-3xl font-semibold text-white">Book your flight</h1>
              </div>
              <p className="text-sm text-slate-400">Reserve a ticket while keeping your wallet in check.</p>
            </div>
          </div>

          <section className="rounded-3xl border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/40">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm text-slate-300">Destination</label>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. New York"
                  className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4 text-white outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Ticket Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="499.00"
                  className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4 text-white outline-none focus:border-cyan-400"
                />
              </div>
              <button className="w-full rounded-3xl bg-cyan-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                Buy Ticket
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

export default Tickets;
