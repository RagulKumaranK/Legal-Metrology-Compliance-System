import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Settings as SettingsIcon, Shield, Mail, Phone, MapPin, Key, Info, LogOut, ChevronRight, Check, Briefcase
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useAuthInspection } from '../context/AuthInspectionContext';
import officerImg from '../assets/officer.png';

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
    <div className="flex-1 flex flex-col bg-[#f4f7fc] text-slate-900 font-sans antialiased animate-in fade-in duration-200 min-h-screen">

      <Header />

      <div className="flex-1 p-4 pb-24 space-y-4 overflow-y-auto">

        {toastMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Profile Card Header Box */}
        <div className="bg-[#eef4ff] p-6 rounded-2xl border border-blue-100 text-center space-y-3 shadow-xs">

          {/* Avatar Photo Frame */}
          <div className="relative w-24 h-24 mx-auto rounded-2xl overflow-hidden border-2 border-blue-400 shadow-md bg-white">
            <img
              src={officerImg}
              alt="Officer Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200";
              }}
            />
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {officer?.name || "Officer Sharma"}
            </h2>
            <p className="text-xs font-bold text-blue-600 mt-0.5">
              {officer?.role || "Enforcement Officer"}
            </p>
          </div>

          {/* Badge ID Tag Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0c1322] text-white rounded-full text-xs font-mono font-bold shadow-xs">
            <Briefcase className="w-3.5 h-3.5 text-blue-300" />
            <span>ID: {officer?.officerId || "INS-7721"}</span>
          </div>

          {/* Department & Contact Metadata Container */}
          <div className="bg-white rounded-xl p-4 text-left space-y-2 border border-blue-100 text-xs shadow-2xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">DEPARTMENT</span>
              <span className="font-extrabold text-slate-900">{officer?.department || "Legal Metrology Division"}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">EMAIL</span>
              <span className="font-semibold text-slate-800">{officer?.email || "o.sharma@gov.metrology.in"}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">JURISDICTION</span>
              <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Northern District, Sector 4</span>
              </span>
            </div>
          </div>

        </div>

        {/* Options List Cards */}
        <div className="space-y-2.5">

          {/* Card 1: Security Password */}
          <button
            onClick={() => showToast('Redirecting to Security Credentials')}
            className="w-full p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:bg-slate-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Key className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Security Password
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">Update your access credentials</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Card 2: System Config */}
          <button
            onClick={() => navigate('/settings')}
            className="w-full p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:bg-slate-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <SettingsIcon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  System Config
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">App preferences and notifications</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Card 3: About */}
          <button
            onClick={() => showToast('Legal Metrology Rules 2011 Engine v4.2.0')}
            className="w-full p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:bg-slate-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Info className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  About
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">App version and legal policies</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3.5 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-rose-600 font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
        >
          <LogOut className="w-4 h-4 text-rose-600" />
          <span>Logout</span>
        </button>

      </div>

      <BottomNav />

    </div>
  );
}
