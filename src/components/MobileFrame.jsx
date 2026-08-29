import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

export default function MobileFrame({ children }) {
  const [isFramed, setIsFramed] = useState(true);
  const [isStandaloneOrMobile, setIsStandaloneOrMobile] = useState(false);

  useEffect(() => {
    // Detect if running on an actual mobile device or installed as standalone PWA app
    const checkMobile = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
      const isMobileWidth = window.innerWidth <= 768;
      if (isStandalone || isMobileWidth) {
        setIsStandaloneOrMobile(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On actual mobile device or installed PWA app mode, render edge-to-edge
  if (isStandaloneOrMobile) {
    return (
      <div className="w-full min-h-[100dvh] h-[100dvh] bg-slate-50 text-slate-900 overflow-hidden flex flex-col antialiased select-none">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Desktop view controller toggle bar */}
      <header className="hidden md:flex items-center justify-between w-full max-w-4xl px-6 py-3 bg-slate-950/80 backdrop-blur border-b border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-200">Legal Metrology Compliance System</span>
          <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">Government Prototype</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsFramed(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${isFramed ? 'bg-blue-600 border-blue-500 text-white shadow-sm' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'}`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Device Frame</span>
          </button>
          <button 
            onClick={() => setIsFramed(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${!isFramed ? 'bg-blue-600 border-blue-500 text-white shadow-sm' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'}`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Responsive Full View</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-1 flex items-center justify-center p-0 md:p-6">
        {isFramed ? (
          <div className="relative w-full md:w-[410px] h-[100dvh] md:h-[840px] bg-slate-950 md:rounded-[44px] md:shadow-[0_25px_70px_rgba(0,0,0,0.8)] md:border-[10px] md:border-slate-800 flex flex-col overflow-hidden transition-all duration-300">
            {/* Phone Notch & Top Status Bar */}
            <div className="bg-slate-900 text-slate-200 text-[11px] font-medium px-6 pt-2 pb-1 flex justify-between items-center select-none z-50 shrink-0">
              <span>9:41</span>
              {/* Dynamic Island / Speaker Notch */}
              <div className="hidden md:block w-24 h-4 bg-black rounded-full shadow-inner mx-auto -mt-1"></div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 3C6.95 3 2.55 5.57 0 9.5L12 21L24 9.5C21.45 5.57 17.05 3 12 3Z"/></svg>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M17 4H7C5.9 4 5 4.9 5 6V18C5 19.1 5.9 20 7 20H17C18.1 20 19 19.1 19 18V6C19 4.9 18.1 4 17 4Z"/></svg>
              </div>
            </div>

            {/* Inner Content Area */}
            <div className="relative flex-1 bg-slate-50 text-slate-900 overflow-y-auto flex flex-col scrollbar-thin">
              {children}
            </div>

            {/* Bottom Home Indicator */}
            <div className="hidden md:flex bg-slate-950 py-2 justify-center items-center shrink-0">
              <div className="w-32 h-1 bg-slate-600 rounded-full"></div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md h-[100dvh] md:h-[840px] bg-slate-50 text-slate-900 md:rounded-2xl md:shadow-2xl overflow-hidden flex flex-col">
            {children}
          </div>
        )}
      </main>
    </div>
  );
}
