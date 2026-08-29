import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Shield, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import GovernmentEmblem from '../components/GovernmentEmblem';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function Register() {
  const navigate = useNavigate();
  const { registerUser } = useAuthInspection();

  const [formData, setFormData] = useState({
    fullName: '',
    officerId: '',
    email: '',
    department: 'Legal Metrology',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.officerId || !formData.email || !formData.password) {
      setErrorMsg('All fields are mandatory.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setErrorMsg('');
    registerUser(formData);
    setSuccessMsg('Account registered successfully! Redirecting to login...');
    setTimeout(() => {
      navigate('/login');
    }, 1200);
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-slate-50 p-5 text-slate-900 animate-in fade-in duration-300">
      
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Link 
          to="/login"
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <GovernmentEmblem size={42} />
        <div className="w-8"></div>
      </div>

      {/* Title */}
      <div className="text-center my-3">
        <h1 className="text-lg font-bold text-blue-950">Legal Metrology</h1>
        <p className="text-[11px] font-semibold text-blue-900 uppercase tracking-wider">Compliance System</p>
        <h2 className="text-sm font-bold text-slate-800 mt-2">Create Your Account</h2>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-sm mx-auto bg-white rounded-2xl p-5 shadow-xl border border-slate-100 mb-4">
        
        {errorMsg && (
          <div className="mb-3 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-3.5 py-2.5 pl-9 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-900"
              />
              <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Officer ID */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Officer ID</label>
            <div className="relative">
              <input
                type="text"
                name="officerId"
                value={formData.officerId}
                onChange={handleChange}
                placeholder="Enter your officer ID"
                className="w-full px-3.5 py-2.5 pl-9 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-900"
              />
              <Shield className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Official Email */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Official Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 pl-9 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-900"
              />
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Department Dropdown */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-900"
            >
              <option value="Legal Metrology">Legal Metrology Department</option>
              <option value="Weights & Measures">Weights & Measures Inspectorate</option>
              <option value="Consumer Affairs">Department of Consumer Affairs</option>
              <option value="Standards & Enforcement">Standards Bureau & Enforcement</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full px-3.5 py-2.5 pl-9 pr-9 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-900"
              />
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-3.5 py-2.5 pl-9 pr-9 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-900"
              />
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl shadow-md active:scale-[0.99] transition-all text-xs uppercase tracking-wider mt-2"
          >
            Create Account
          </button>
        </form>

        {/* Back link */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-900 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
