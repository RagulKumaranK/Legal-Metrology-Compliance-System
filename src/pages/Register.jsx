import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ShieldCheck, Contact, Building2, Briefcase, RotateCcw, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import GovernmentEmblem from '../components/GovernmentEmblem';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function Register() {
  const navigate = useNavigate();
  const { registerUser } = useAuthInspection();

  const [formData, setFormData] = useState({
    fullName: '',
    officerId: '',
    department: 'Legal Metrology',
    email: '',
    designation: 'Enforcement Officer',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.officerId || !formData.email || !formData.password) {
      setErrorMessage('Please fill in all mandatory officer registration fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Security passwords do not match.');
      return;
    }
    setErrorMessage('');

    const res = registerUser(formData);
    if (res.success) {
      setSuccessMessage('Officer account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } else {
      setErrorMessage('Failed to register officer account.');
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

      {/* Main Official Officer Registration Card */}
      <div className="my-auto w-full max-w-sm mx-auto bg-white rounded-2xl border border-blue-200/80 shadow-lg overflow-hidden">
        
        {/* Blue Header Section */}
        <div className="bg-blue-50/80 px-6 py-5 text-center border-b border-blue-100">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Register Officer</h3>
          <p className="text-xs text-slate-600 font-medium mt-1">Fill details below to create your official account.</p>
        </div>

        <div className="p-6 space-y-3.5">

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0"></span>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full px-3.5 py-2.5 pl-10 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Officer ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Officer ID
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="officerId"
                  value={formData.officerId}
                  onChange={handleChange}
                  placeholder="ID Number"
                  className="w-full px-3.5 py-2.5 pl-10 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <Contact className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Dept */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dept
              </label>
              <div className="relative flex items-center">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 pl-10 pr-8 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                >
                  <option value="Legal Metrology">Legal Metrology</option>
                  <option value="Consumer Affairs">Consumer Affairs</option>
                  <option value="Food & Public Distribution">Food & Public Distribution</option>
                </select>
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-500"></div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="official.email@gov.domain"
                  className="w-full px-3.5 py-2.5 pl-10 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Designation
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. Senior Inspector"
                  className="w-full px-3.5 py-2.5 pl-10 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pl-10 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm
              </label>
              <div className="relative flex items-center">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pl-10 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <RotateCcw className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Primary CREATE ACCOUNT Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#0a0f1d] hover:bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-3"
            >
              <span>CREATE ACCOUNT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-3 text-center pt-1">
            <p className="text-xs text-slate-600 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">
                Login Here
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

    </div>
  );
}
