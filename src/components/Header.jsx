import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, ShieldCheck, Monitor } from 'lucide-react';
import heroImg from '../assets/hero.png';

export default function Header({ 
  title = "LEGAL METROLOGY COMPLIANCE SYSTEM", 
  showBack = false, 
  onBack, 
  rightAction 
}) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "Legal Metrology Amendment Rules 2026 released.", time: "10 mins ago" },
    { id: 2, text: "Special Audit Drive scheduled in District 4.", time: "1 hour ago" },
    { id: 3, text: "3 Non-Compliant flags filed for review.", time: "05 Sep 2026" }
  ];

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200/90 shadow-xs shrink-0 relative z-30">
      {/* Top Accent Strip */}
      <div className="h-1 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800"></div>

      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={handleBack}
              className="p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center justify-center">
              <img src={heroImg} alt="Legal Metro Logo" className="w-5 h-5 object-contain" />
            </div>
            <div>
              <h1 className="text-xs font-black uppercase tracking-tight text-slate-900 leading-tight">
                {title}
              </h1>
              <p className="text-[9px] font-bold font-mono text-slate-500 uppercase tracking-widest pt-0.5">
                Govt. of India • Legal Metrology
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/admin')}
            className="p-1.5 px-2.5 rounded-xl text-[10px] font-extrabold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200 flex items-center gap-1.5 active:scale-95"
            title="Switch to Admin Desktop Portal"
          >
            <Monitor className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">ADMIN</span>
          </button>

          {rightAction ? (
            rightAction
          ) : (
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all relative active:scale-95 border border-slate-200/80 shadow-2xs"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-2">
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600" /> Notifications
                    </h4>
                    <button onClick={() => setShowNotifications(false)} className="text-[10px] text-blue-600 font-bold hover:underline">Clear</button>
                  </div>
                  <div className="space-y-2">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition-colors border border-slate-100">
                        <p className="text-xs font-semibold text-slate-800">{n.text}</p>
                        <span className="text-[10px] font-mono text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
