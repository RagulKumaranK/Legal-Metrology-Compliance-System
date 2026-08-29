import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Shield, Mail, Phone, MapPin, Key, Info, LogOut, ChevronRight, Check } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function Profile() {
  const navigate = useNavigate();
  const { officer, logout } = useAuthInspection();

  const [toastMsg, setToastMsg] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 animate-in fade-in duration-300">
      
      {/* Header */}
      <Header 
        title="Profile" 
        rightAction={
          <button 
            onClick={() => showToast('App Settings opened')}
            className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        }
      />

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        
        {toastMsg && (
          <div className="p-3 bg-blue-900 text-white text-xs rounded-xl font-medium shadow-md flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* User Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto flex items-center justify-center border-2 border-blue-900 text-slate-400 mb-3 shadow-inner">
            <User className="w-10 h-10 text-slate-500" />
          </div>
          <h2 className="text-base font-bold text-slate-900">{officer?.name || "Officer Sharma"}</h2>
          <p className="text-xs font-semibold text-blue-900">{officer?.role || "Enforcement Officer"}</p>
          <p className="text-[11px] font-mono text-slate-400 mt-0.5">ID: {officer?.officerId || "LM/EG/2026/1001"}</p>
        </div>

        {/* Officer Details Grid */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
            Official Details
          </h3>

          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-slate-500 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-900" /> Department
            </span>
            <span className="font-semibold text-slate-900">{officer?.department || "Legal Metrology"}</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-slate-500 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-900" /> Email
            </span>
            <span className="font-semibold text-slate-900">{officer?.email || "officer.sharma@gov.in"}</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-slate-500 flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-900" /> Phone
            </span>
            <span className="font-semibold text-slate-900">{officer?.phone || "+91 96765 43210"}</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-slate-500 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-900" /> Location
            </span>
            <span className="font-semibold text-slate-900">{officer?.location || "New Delhi, India"}</span>
          </div>
        </div>

        {/* Settings Links */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
          
          <button 
            onClick={() => showToast('Change password prompt sent to registered email')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
          >
            <span className="text-xs font-bold text-slate-800 flex items-center gap-2.5">
              <Key className="w-4 h-4 text-slate-500" /> Change Password
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => showToast('App Settings: Legal Metrology Rules 2011 v2.4 (2026)')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
          >
            <span className="text-xs font-bold text-slate-800 flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-slate-500" /> App Settings
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button 
            onClick={() => showToast('Legal Metrology Compliance System v2.6 (Govt of India)')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
          >
            <span className="text-xs font-bold text-slate-800 flex items-center gap-2.5">
              <Info className="w-4 h-4 text-slate-500" /> About Us
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="w-full p-3.5 flex items-center justify-between hover:bg-rose-50 text-left transition-colors"
          >
            <span className="text-xs font-bold text-rose-600 flex items-center gap-2.5">
              <LogOut className="w-4 h-4 text-rose-600" /> Logout
            </span>
            <ChevronRight className="w-4 h-4 text-rose-400" />
          </button>

        </div>

      </div>

      {/* Bottom Nav */}
      <BottomNav />

    </div>
  );
}
