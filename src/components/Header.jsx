import React, { useState } from 'react';
import { Menu, Bell, ShieldCheck, Check } from 'lucide-react';
import { useAuthInspection } from '../context/AuthInspectionContext';

export default function Header({ title, showBack = false, onBack, rightAction }) {
  const { officer } = useAuthInspection();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "Legal Metrology Amendment Rules 2026 released.", time: "10 mins ago" },
    { id: 2, text: "Special Audit Drive scheduled in District 4.", time: "1 hour ago" },
    { id: 3, text: "3 Non-Compliant flags filed for review.", time: "05 Sep 2026" }
  ];

  return (
    <header className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between shadow-md relative z-30 shrink-0 border-b border-slate-800">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button 
            onClick={onBack}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 active:scale-95 transition-all"
            aria-label="Go back"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
        ) : (
          <button 
            className="p-1.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          {title ? (
            <h1 className="text-base font-bold tracking-tight text-white">{title}</h1>
          ) : (
            <div>
              <p className="text-[11px] text-slate-400 font-medium leading-none">Good Morning,</p>
              <h1 className="text-sm font-bold text-white mt-0.5">{officer?.name || "Officer Sharma"}</h1>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {rightAction ? (
          rightAction
        ) : (
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-slate-900"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" /> Notifications
                  </h4>
                  <button onClick={() => setShowNotifications(false)} className="text-[10px] text-blue-600 font-medium">Clear</button>
                </div>
                <div className="space-y-2">
                  {notifications.map(n => (
                    <div key={n.id} className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-left transition-colors">
                      <p className="text-xs font-medium text-slate-800">{n.text}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
