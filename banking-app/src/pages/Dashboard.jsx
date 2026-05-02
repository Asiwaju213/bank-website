import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Sidebar from '../components/Sidebar';
import BalanceCard from '../components/BalanceCard';
import FeatureCard from '../components/FeatureCard';
import SupportChat from '../components/SupportChat';

const features = [
  { title: 'Send Funds', icon: '📤', subtitle: 'Transfer USDC to any user', to: '/send-funds' },
  { title: 'Add Funds', icon: '💰', subtitle: 'Boost your wallet balance', to: '/add-funds' },
  { title: 'Withdraw Funds', icon: '📥', subtitle: 'Withdraw to your account', to: '/withdraw' },
  { title: 'Transaction History', icon: '🧾', subtitle: 'Review your ledger', to: '/history' },
  { title: 'Buy Airtime', icon: '📱', subtitle: 'Top up your phone', to: '/airtime' },
  { title: 'Deposit Crypto', icon: '🪙', subtitle: 'Receive USDC deposits', to: '/crypto-deposit' },
];

const extraServices = [
  { title: 'Buy Airline Ticket', icon: '✈️', subtitle: 'Book travel with your balance', to: '/tickets' },
  { title: 'Rewards System', icon: '🎁', subtitle: 'Unlock loyalty perks', to: '/support' },
  { title: 'Spending Overview', icon: '📊', subtitle: 'Track spending trends', to: '/history' },
];

const Dashboard = () => {
  const { currentUser } = useAuth();
  const featureCards = useMemo(() => features, []);
  const serviceCards = useMemo(() => extraServices, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar />

        <main className="space-y-8">
          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Dashboard</p>
                <h1 className="mt-2 text-3xl font-semibold text-white">Hello, {currentUser?.fullName}</h1>
                <p className="mt-2 text-slate-400">Your modern USDC wallet dashboard is ready.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 px-5 py-4 text-right shadow-lg shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Current Balance</p>
                <p className="mt-2 text-3xl font-semibold text-white">{(currentUser?.balance || 0).toFixed(2)} USDC</p>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <BalanceCard fullName={currentUser?.fullName} accountNumber={currentUser?.accountNumber} balance={currentUser?.balance || 0} />

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {featureCards.map((feature) => (
                  <FeatureCard key={feature.title} {...feature} />
                ))}
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/40">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Extra Services</p>
                    <h2 className="text-2xl font-semibold text-white">More ways to manage funds</h2>
                  </div>
                  <Link to="/support" className="text-sm text-cyan-300 hover:text-cyan-200">
                    View support
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {serviceCards.map((item) => (
                    <Link
                      key={item.title}
                      to={item.to}
                      className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 transition hover:-translate-y-1 hover:bg-slate-800"
                    >
                      <div className="flex items-center gap-3 text-2xl">{item.icon}</div>
                      <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{item.subtitle}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <SupportChat />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;