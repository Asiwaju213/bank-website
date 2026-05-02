import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import SupportChat from '../components/SupportChat';

const Support = () => {
  const [ticket, setTicket] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ticket.trim()) {
      setStatus({ type: 'error', text: 'Please describe your issue.' });
      return;
    }
    setStatus({ type: 'success', text: 'Support ticket submitted. We will follow up shortly.' });
    setTicket('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar />
        <main className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Support</p>
                <h1 className="text-3xl font-semibold text-white">Need help?</h1>
              </div>
              <p className="text-sm text-slate-400">Our support team is here to help with any wallet issue.</p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <SupportChat />
            <section className="rounded-3xl border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/40">
              <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Ticket Form</p>
                <h2 className="text-2xl font-semibold text-white">Submit a support request</h2>
              </div>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <textarea
                  rows="6"
                  value={ticket}
                  onChange={(e) => setTicket(e.target.value)}
                  placeholder="Describe your issue in detail..."
                  className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-4 text-white outline-none focus:border-cyan-400"
                />
                <button className="w-full rounded-3xl bg-cyan-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                  Submit Ticket
                </button>
                {status && (
                  <p className={`text-sm ${status.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {status.text}
                  </p>
                )}
              </form>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Support;
