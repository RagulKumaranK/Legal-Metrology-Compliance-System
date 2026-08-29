import React, { useState, useEffect } from 'react';
import GovernmentEmblem from './GovernmentEmblem';
import { ShieldCheck } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Enforcement System...');

  useEffect(() => {
    const timer1 = setTimeout(() => setStatusText('Loading Legal Metrology Rules, 2011...'), 400);
    const timer2 = setTimeout(() => setStatusText('Verifying Encryption & Officer Credentials...'), 900);
    const timer3 = setTimeout(() => setStatusText('System Ready'), 1400);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(finishTimer);
      clearInterval(interval);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white flex flex-col items-center justify-between p-8 font-sans animate-in fade-in duration-300">
      
      {/* Top Meta */}
      <div className="pt-6 text-center">
        <span className="text-[10px] font-bold tracking-widest text-blue-300 uppercase px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
          Official Government Application
        </span>
      </div>

      {/* Center Emblem & Radar Scanner Pulse */}
      <div className="flex flex-col items-center text-center my-auto relative">
        
        {/* Animated Glowing Ring Backdrop */}
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full bg-blue-500/10 border border-blue-400/30 flex items-center justify-center animate-ping absolute inset-0"></div>
          <div className="w-28 h-28 rounded-full bg-blue-900/60 border-2 border-blue-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(29,78,216,0.5)]">
            <GovernmentEmblem size={64} />
          </div>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-white mb-1">
          Legal Metrology
        </h1>
        <p className="text-xs font-black uppercase tracking-widest text-blue-400">
          Compliance System
        </p>
        <p className="text-[11px] text-slate-300 font-medium mt-1">
          Department of Consumer Affairs
        </p>
        <p className="text-[10px] text-slate-400 font-semibold">
          Government of India
        </p>

        {/* Progress Bar Container */}
        <div className="w-56 mt-8">
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div 
              className="bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 h-full rounded-full transition-all duration-100 shadow-[0_0_10px_#3b82f6]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[10px] font-medium text-slate-300 mt-2.5 font-mono animate-pulse">
            {statusText}
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="pb-4 text-center">
        <p className="text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>v2.6 Enforcement Edition • 2026</span>
        </p>
      </div>

    </div>
  );
}
