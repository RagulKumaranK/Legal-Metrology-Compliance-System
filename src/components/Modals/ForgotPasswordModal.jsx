import React from 'react';
import { Lock, Key, X } from 'lucide-react';

export default function ForgotPasswordModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center border border-slate-100 relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock with Key Graphic */}
        <div className="w-16 h-16 bg-blue-50 rounded-2xl mx-auto flex items-center justify-center mb-4 text-blue-900 border border-blue-100 shadow-inner">
          <div className="relative">
            <Lock className="w-8 h-8 stroke-[1.75]" />
            <Key className="w-4 h-4 text-amber-500 absolute -bottom-1 -right-2" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2">Forgot Password?</h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-6">
          Password recovery is not available in this demo prototype. Please contact your administrator.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded-xl shadow-md active:scale-[0.99] transition-all text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
