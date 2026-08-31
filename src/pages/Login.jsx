import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Fingerprint, ShieldCheck, Landmark, Contact, Shield } from 'lucide-react';
import GovernmentEmblem from '../components/GovernmentEmblem';
import ForgotPasswordModal from '../components/Modals/ForgotPasswordModal';
import BiometricModal from '../components/Modals/BiometricModal';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthInspection();

  const [identifier, setIdentifier] = useState('officer.sharma@gov.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Please enter your Officer ID or official email address.');
      return;
    }
    setErrorMessage('');
    const res = login(identifier, password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(res.message || 'Invalid officer credentials.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] px-4 py-6 text-slate-900 font-sans antialiased animate-in fade-in duration-200">

      {/* Top Government Emblem & Institutional Header */}
      <div className="flex flex-col items-center text-center pt-3 pb-2">

        {/* Emblem Container Box with Government Logo */}
        <div className="w-16 h-16 rounded-2xl bg-white border border-blue-200/80 shadow-md flex items-center justify-center mb-3 text-slate-900 relative p-2">
          <GovernmentEmblem size={52} />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-white shadow">
            <ShieldCheck className="w-3 h-3" />
          </div>
        </div>
        <h1 className="text-lg font-bold text-slate-900 tracking-tight">Govt of India</h1>
        <h2 className="text-base font-bold text-slate-900 tracking-tight mt-0.5">Legal Metrology Compliance System</h2>
        <p className="text-xs text-slate-600 font-medium mt-0.5">Dept of Consumer Affairs</p>
      </div>

      {/* Main Official Officer Authentication Card */}
      <div className="my-auto w-full max-w-sm mx-auto bg-white rounded-2xl border border-blue-200/80 shadow-lg overflow-hidden">

        {/* Blue Header Section */}
        <div className="bg-blue-50/80 px-6 py-5 text-center border-b border-blue-100">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Welcome Back, Officer</h3>
          <p className="text-xs text-slate-600 font-medium mt-1">Please authenticate to continue.</p>
        </div>

        <div className="p-6 space-y-4">

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0"></span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Officer ID / Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Officer ID / Email
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your official ID"
                  className="w-full px-3.5 py-2.5 pl-10 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <Contact className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pl-10 pr-10 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between pt-0.5 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 accent-blue-600 border-slate-300"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-blue-600 hover:text-blue-700 font-semibold text-xs transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Primary LOGIN Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#0a0f1d] hover:bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
            >
              <span>LOGIN</span>
            </button>

          </form>

          {/* Divider */}
          <div className="my-3 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">OR</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Biometric Login Button */}
          <button
            type="button"
            onClick={() => setShowBiometricModal(true)}
            className="w-full py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
          >
            <Fingerprint className="w-4.5 h-4.5 text-slate-800" />
            <span>Biometric Login</span>
          </button>

          {/* Register Link */}
          <div className="mt-3 text-center pt-1">
            <p className="text-xs text-slate-600 font-medium">
              Don't have an officer account?{' '}
              <Link to="/register" className="text-blue-600 font-bold hover:underline">
                Register Here
              </Link>
            </p>
          </div>

        </div>

        {/* Footer Security Badge Strip */}
        <div className="bg-blue-50/70 py-2.5 px-4 border-t border-blue-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-600 font-medium text-center">
          <Shield className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Secure • Encrypted • Government of India</span>
        </div>

      </div>

      {/* Version Tag */}
      <footer className="text-center pt-2">
        <p className="text-xs text-slate-400 font-mono">v2.4.1 (Build 8902)</p>
      </footer>

      {/* Modals */}
      <ForgotPasswordModal isOpen={showForgotModal} onClose={() => setShowForgotModal(false)} />
      <BiometricModal isOpen={showBiometricModal} onClose={() => setShowBiometricModal(false)} />

    </div>
  );
}
