import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Shield, BellRing, Camera, Info, ChevronRight, LogOut, Check
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function Settings() {
  const navigate = useNavigate();
  const { logout } = useAuthInspection();

  const [twoFactor, setTwoFactor] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [autoFocus, setAutoFocus] = useState(true);

  const [toastMsg, setToastMsg] = useState('');

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f4f7fc] text-slate-900 font-sans antialiased animate-in fade-in duration-200 min-h-screen">
      
      <Header showBack={true} onBack={() => navigate(-1)} />

      <div className="flex-1 p-4 pb-24 space-y-4 overflow-y-auto">
        
        {toastMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Title Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Settings
          </h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Manage your enterprise account and system preferences.
          </p>
        </div>

        {/* Section 1: Account */}
        <div className="bg-[#e9f1fc] rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
          <div className="bg-[#dce7fc] px-4 py-2.5 flex items-center gap-2 border-b border-blue-200/60">
            <User className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-extrabold text-slate-900 tracking-wider uppercase">Account</h3>
          </div>

          <div className="bg-white divide-y divide-slate-100 text-xs">
            <button 
              onClick={() => showToast('Personal Info form active')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
            >
              <div>
                <h4 className="font-bold text-slate-900">Personal Information</h4>
                <p className="text-[11px] text-slate-500">Update your name and contact details</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button 
              onClick={() => showToast('Organization assignments locked by Administrator')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
            >
              <div>
                <h4 className="font-bold text-slate-900">Organization Profile</h4>
                <p className="text-[11px] text-slate-500">Manage department and role assignments</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Section 2: Security */}
        <div className="bg-[#e9f1fc] rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
          <div className="bg-[#dce7fc] px-4 py-2.5 flex items-center gap-2 border-b border-blue-200/60">
            <Shield className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-extrabold text-slate-900 tracking-wider uppercase">Security</h3>
          </div>

          <div className="bg-white divide-y divide-slate-100 text-xs">
            <button 
              onClick={() => showToast('Password reset link generated')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
            >
              <div>
                <h4 className="font-bold text-slate-900">Change Password</h4>
                <p className="text-[11px] text-slate-500">Ensure your account is secure</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* 2FA Toggle */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Two-Factor Authentication (2FA)</h4>
                <p className="text-[11px] text-slate-500">Require extra security for login</p>
              </div>

              <button 
                onClick={() => setTwoFactor(!twoFactor)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  twoFactor ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform"></div>
              </button>
            </div>

            {/* Biometric Toggle */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Biometric Login</h4>
                <p className="text-[11px] text-slate-500">Use FaceID or Fingerprint on mobile</p>
              </div>

              <button 
                onClick={() => setBiometric(!biometric)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  biometric ? 'bg-blue-600 justify-end' : 'bg-slate-200 border border-slate-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-slate-400 shadow-xs transform transition-transform"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Notifications */}
        <div className="bg-[#e9f1fc] rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
          <div className="bg-[#dce7fc] px-4 py-2.5 flex items-center gap-2 border-b border-blue-200/60">
            <BellRing className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-extrabold text-slate-900 tracking-wider uppercase">Notifications</h3>
          </div>

          <div className="bg-white divide-y divide-slate-100 text-xs">
            {/* System Alerts Toggle */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">System Alerts</h4>
                <p className="text-[11px] text-slate-500">Critical compliance updates</p>
              </div>

              <button 
                onClick={() => setSystemAlerts(!systemAlerts)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  systemAlerts ? 'bg-blue-400 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform"></div>
              </button>
            </div>

            {/* Reminders Toggle */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Inspection Reminders</h4>
                <p className="text-[11px] text-slate-500">Push notifications for upcoming tasks</p>
              </div>

              <button 
                onClick={() => setReminders(!reminders)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  reminders ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Camera & Scanning */}
        <div className="bg-[#e9f1fc] rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
          <div className="bg-[#dce7fc] px-4 py-2.5 flex items-center gap-2 border-b border-blue-200/60">
            <Camera className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-extrabold text-slate-900 tracking-wider uppercase">Camera & Scanning</h3>
          </div>

          <div className="bg-white divide-y divide-slate-100 text-xs">
            {/* Auto Focus Toggle */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Auto-Focus Mode</h4>
                <p className="text-[11px] text-slate-500">Continuous focus for barcode scanning</p>
              </div>

              <button 
                onClick={() => setAutoFocus(!autoFocus)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                  autoFocus ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform"></div>
              </button>
            </div>

            <button 
              onClick={() => showToast('Scan quality set to High (300 DPI OCR Mode)')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
            >
              <div>
                <h4 className="font-bold text-slate-900">Scan Quality</h4>
                <p className="text-[11px] text-slate-500">High (Recommended for OCR)</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* System Info Box */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center space-y-2">
          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-700">
            <Info className="w-5 h-5" />
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Legal Metrology System
            </h3>
            <p className="text-[11px] font-mono text-slate-500 mt-0.5">
              Version 4.2.0 (Build 9821)
            </p>
          </div>

          <div className="pt-1 flex items-center justify-center gap-2 text-[11px] font-semibold text-blue-600">
            <button onClick={() => showToast('Opening Privacy Policy...')} className="hover:underline">Privacy Policy</button>
            <span className="text-slate-400">•</span>
            <button onClick={() => showToast('Opening Terms of Service...')} className="hover:underline">Terms of Service</button>
          </div>
        </div>

        {/* Sign Out Button */}
        <button 
          onClick={handleSignOut}
          className="w-full py-3.5 bg-white hover:bg-rose-50 border border-rose-200 text-rose-600 font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
        >
          <LogOut className="w-4 h-4 text-rose-600" />
          <span>Sign Out</span>
        </button>

      </div>

      <BottomNav />

    </div>
  );
}
