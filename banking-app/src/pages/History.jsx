import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getTransactionsByUser } from '../utils/storage';
import { useAuth } from '../context/useAuth';

const History = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setTransactions(getTransactionsByUser(currentUser));
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar />
        <main className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Transaction History</p>
                <h1 className="text-3xl font-semibold text-white">All movements</h1>
              </div>
              <p className="text-sm text-slate-400">Latest operations saved in local storage.</p>
            </div>
          </div>

          <div className="space-y-4">
            {transactions.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-center text-slate-400">
                No transactions recorded yet.
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-slate-400 uppercase tracking-[0.25em]">{tx.type}</p>
                        <p className="text-xl font-semibold text-white">{tx.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-white">{tx.amount > 0 ? `+${tx.amount} USDC` : `${tx.amount} USDC`}</p>
                        <p className="text-sm text-slate-500">{new Date(tx.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    {tx.target && <p className="mt-3 text-sm text-slate-400">Target: {tx.target}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default History;
