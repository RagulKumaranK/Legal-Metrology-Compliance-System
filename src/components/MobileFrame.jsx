import React from 'react';
import { useLocation } from 'react-router-dom';

export default function MobileFrame({ children }) {
  const location = useLocation();

  if (location.pathname === '/admin') {
    return (
      <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans antialiased">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-900 flex justify-center items-center font-sans antialiased selection:bg-blue-600 selection:text-white">
      <div className="w-full max-w-md min-h-screen bg-slate-50 text-slate-900 flex flex-col relative shadow-2xl overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
