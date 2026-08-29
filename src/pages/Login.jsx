import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Fingerprint, ShieldCheck } from 'lucide-react';
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
      setErrorMessage('Please enter your Officer ID/Email and password.');
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
    <div className="min-h-full flex flex-col justify-between bg-slate-50 p-6 text-slate-900 animate-in fade-in duration-300">
      
      {/* Top Branding Section */}
      <div className="flex flex-col items-center text-center pt-4">
        <GovernmentEmblem size={56} className="mb-2" />
        <h1 className="text-xl font-bold tracking-tight text-blue-950">Legal Metrology</h1>
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-900">Compliance System</p>
        <p className="text-[11px] text-slate-500 font-medium mt-1">Department of Consumer Affairs</p>
        <p className="text-[10px] text-slate-400 font-medium">Government of India</p>
      </div>

      {/* Main Login Card */}
      <div className="my-6 w-full max-w-sm mx-auto bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">Welcome Back, Officer</h2>
          <p className="text-xs text-slate-500 mt-0.5">Login to continue</p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Officer ID / Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Officer ID / Email
            </label>
            <div className="relative">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your officer ID or email"
                className="w-full px-3.5 py-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3.5 py-3 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-blue-900 accent-blue-900"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-blue-900 hover:text-blue-950 font-semibold text-xs"
            >
              Forgot Password?
            </button>
          </div>

          {/* Primary Login Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider mt-2"
          >
            <Lock className="w-4 h-4" />
            <span>Login</span>
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-[10px] text-slate-400 font-semibold uppercase">or continue with</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* Login with Biometric */}
        <button
          type="button"
          onClick={() => setShowBiometricModal(true)}
          className="w-full py-3 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-blue-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
        >
          <Fingerprint className="w-4 h-4 text-blue-900" />
          <span>Login with Biometric</span>
        </button>

        {/* Register Account Link */}
        <div className="mt-5 text-center">
          <p className="text-xs text-slate-500 font-medium">
            Don't have an officer account?{' '}
            <Link to="/register" className="text-blue-900 font-bold hover:underline">
              Register Here
            </Link>
          </p>
        </div>

      </div>

      {/* Footer */}
      <footer className="text-center pb-2">
        <p className="text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-900" />
          <span>Secure • Encrypted • Government of India</span>
        </p>
      </footer>

      {/* Modals */}
      <ForgotPasswordModal isOpen={showForgotModal} onClose={() => setShowForgotModal(false)} />
      <BiometricModal isOpen={showBiometricModal} onClose={() => setShowBiometricModal(false)} />

    </div>
  );
}
