import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username.trim(), password.trim());
    if (result.success) {
      navigate('/dashboard');
      return;
    }
    setMessage({ type: 'error', text: result.message });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Secure login</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Welcome back</h1>
          <p className="mt-2 text-slate-400">Access your wallet and start managing funds.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-slate-400">Username, email, or account number</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username, email, or account number"
              className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4 text-white outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4 text-white outline-none focus:border-cyan-400"
            />
          </div>
          <button className="w-full rounded-3xl bg-cyan-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            Login
          </button>
        </form>
        {message && <p className={`mt-4 text-center text-sm ${message.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>{message.text}</p>}
        <p className="mt-6 text-center text-slate-400">
          Don’t have an account?{' '}
          <Link to="/signup" className="font-medium text-cyan-300 hover:text-cyan-200">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;