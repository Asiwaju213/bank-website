import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { generateAccountNumber, savePendingAccount } from '../utils/storage';

const Signup = () => {
  const { signup } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePhone = (value) => /^\+1\d{10}$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedFullName || !trimmedEmail || !trimmedPhone || !trimmedUsername || !trimmedPassword) {
      setMessage({ type: 'error', text: 'Please complete all fields.' });
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setMessage({ type: 'error', text: 'Enter a valid email address.' });
      return;
    }

    if (!validatePhone(trimmedPhone)) {
      setMessage({ type: 'error', text: 'Phone must be in +1XXXXXXXXXX format.' });
      return;
    }

    const accountNumber = generateAccountNumber();
    const result = signup({
      fullName: trimmedFullName,
      email: trimmedEmail,
      phone: trimmedPhone,
      username: trimmedUsername,
      password: trimmedPassword,
      accountNumber,
    });

    if (result.success) {
      savePendingAccount(result.user);
      navigate('/account-created');
      return;
    }

    setMessage({ type: 'error', text: result.message });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Create account</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Start your USDC wallet</h1>
          <p className="mt-2 text-slate-400">Sign up with your profile and secure your unique USDC wallet.</p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-slate-400">Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4 text-white outline-none focus:border-cyan-400"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-slate-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4 text-white outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+11234567890"
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-slate-400">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4 text-white outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a secure password"
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>
          <button className="w-full rounded-3xl bg-cyan-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            Create Account
          </button>
        </form>
        {message && <p className={`mt-4 text-center text-sm ${message.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>{message.text}</p>}
        <p className="mt-6 text-center text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-cyan-300 hover:text-cyan-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;