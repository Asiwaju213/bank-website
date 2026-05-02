import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearPendingAccount, getPendingAccount, saveCurrentUser } from '../utils/storage';

const AccountCreated = () => {
  const [pending, setPending] = useState(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getPendingAccount();
    if (!data) {
      navigate('/signup');
      return;
    }
    setPending(data);
  }, [navigate]);

  const handleCopyAccountNumber = () => {
    if (pending?.accountNumber) {
      navigator.clipboard.writeText(pending.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGoToDashboard = () => {
    if (pending) {
      saveCurrentUser(pending.username);
      clearPendingAccount();
      navigate('/dashboard');
    }
  };

  if (!pending) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-[40px] border border-white/10 bg-slate-900/90 p-10 shadow-2xl shadow-slate-950/40">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Account Created</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Welcome aboard, {pending.fullName}!</h1>
          <p className="mt-3 text-slate-400">Your USDC wallet is ready. Keep your account details safe.</p>
        </div>

        <div className="space-y-6 rounded-[32px] bg-slate-950/90 p-8 shadow-inner shadow-slate-950/20">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Full Name</p>
              <p className="mt-3 text-lg font-semibold text-white">{pending.fullName}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Username</p>
              <p className="mt-3 text-lg font-semibold text-white">{pending.username}</p>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-violet-500/20 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Account Number</p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-4xl font-semibold text-white">{pending.accountNumber}</p>
              <button
                onClick={handleCopyAccountNumber}
                className="rounded-3xl bg-white/10 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-white/15"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <button
            onClick={handleGoToDashboard}
            className="w-full rounded-3xl bg-cyan-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCreated;
