import React, { useState } from 'react';
import { Fingerprint, CheckCircle } from 'lucide-react';
import { useAuthInspection } from '../../context/AuthInspectionContext';
import { useNavigate } from 'react-router-dom';

export default function BiometricModal({ isOpen, onClose }) {
  const { loginWithBiometric } = useAuthInspection();
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleTouchSensor = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setSuccess(true);
      setTimeout(() => {
        loginWithBiometric();
        onClose();
        navigate('/dashboard');
      }, 700);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center border border-slate-100 animate-in zoom-in-95 duration-200">
        <h3 className="text-base font-bold text-slate-900 mb-1">Login with Biometric</h3>
        <p className="text-xs text-slate-500 mb-6">Scan your fingerprint to continue</p>

        {/* Fingerprint Sensor Trigger Container */}
        <div 
          onClick={handleTouchSensor}
          className={`w-28 h-28 mx-auto rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative ${
            success 
              ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-500 shadow-lg scale-105'
              : scanning 
                ? 'bg-blue-50 text-blue-700 border-2 border-blue-500 animate-pulse'
                : 'bg-slate-50 text-blue-900 border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 shadow-sm'
          }`}
        >
          {success ? (
            <CheckCircle className="w-14 h-14 animate-in zoom-in duration-300" />
          ) : (
            <Fingerprint className={`w-14 h-14 transition-transform ${scanning ? 'scale-110' : ''}`} />
          )}

          {scanning && (
            <span className="absolute inset-0 rounded-3xl border-2 border-blue-500 animate-ping opacity-25"></span>
          )}
        </div>

        <p className={`text-xs font-semibold mt-4 transition-colors ${success ? 'text-emerald-600' : 'text-blue-900'}`}>
          {success ? "Identity Verified!" : scanning ? "Scanning Fingerprint..." : "Touch the fingerprint sensor"}
        </p>

        <div className="mt-8 border-t border-slate-100 pt-4">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
