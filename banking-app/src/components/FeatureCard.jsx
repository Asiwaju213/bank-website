import { Link } from 'react-router-dom';

const FeatureCard = ({ title, icon, subtitle, to }) => {
  return (
    <Link
      to={to}
      className="group block rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/90"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-3xl">{icon}</span>
        <span className="rounded-2xl bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300 transition-colors duration-300 group-hover:bg-cyan-500/20">
          Action
        </span>
      </div>
      <p className="mt-6 text-xl font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
    </Link>
  );
};

export default FeatureCard;
