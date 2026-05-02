import { useState } from 'react';

const BalanceCard = ({ fullName, accountNumber, balance }) => {
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAccountNumber = () => {
    if (accountNumber) {
      navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-[40px] border border-white/10 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 shadow-2xl shadow-slate-950/40">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Wallet Overview</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">{fullName}'s USDC Wallet</h2>
          <div className="mt-4 flex items-center gap-3">
            <p className="text-sm text-slate-400">Account: <span className="font-semibold text-white">{accountNumber}</span></p>
            <button
              onClick={handleCopyAccountNumber}
              className="rounded-2xl bg-white/10 px-3 py-1 text-xs font-semibold text-cyan-300 transition hover:bg-white/15"
            >
              {copied ? '✓' : 'Copy'}
            </button>
          </div>
        </div>
        <div className="rounded-3xl bg-slate-900/70 px-6 py-5 text-right shadow-xl shadow-cyan-500/10">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Balance</p>
          <p className="mt-3 text-4xl font-semibold text-white">{hidden ? '****' : `${balance.toFixed(2)} USDC`}</p>
          <button
            onClick={() => setHidden((prev) => !prev)}
            className="mt-4 rounded-3xl bg-white/10 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/15"
          >
            {hidden ? 'Show Balance' : 'Hide Balance'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;